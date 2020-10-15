const { User, Number } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const { validationResult } = require("express-validator/check")

const signUp = async (req, res) => {
    try {
        const { name, number, password } = req.body
        const error = validationResult(req)
        const candidate = await Number.findOne({ where: { number } })
        if (!candidate) {
            if (error.isEmpty()) {
                const hashedPassword = await bcrypt.hash(password, 5)
                await User.create({ name, userNumber: number, password: hashedPassword })
                await Number.create({ number })
                res.status(200).json({ message: "User was registered" })
            }
        } else {
            res.status(443).json({ message: "Такой пользователь уже существует" })
        }
    }
    catch (e) {
        res.status(500).json({ message: `Error: ${e.message}` })
    }
}
const login = async (req, res) => {
    try {
        const { number, password } = req.body
        const loginCandidate = await Number.findOne({ where: { number } })
        if (loginCandidate) {
            const passwordCandidate = await User.findOne({where:{id:loginCandidate.id}})
            const checkPassword = await bcrypt.compare(password, passwordCandidate.password)
            if (checkPassword) {
                const token = await jwt.sign({ userID: loginCandidate.id }, config.server.secret, { expiresIn: "1h" })
                res.json({ token, userID: loginCandidate.id, secret: config.server.secret })
            } else {
                res.status(443).json({ message: "Password is incorected" })
            }
        }else{
            res.status(443).json({message:"data is incorected"})
        }
    } catch (e) {
        res.json({ message: `Error: ${e.message}` })
    }


}
module.exports = {
    signUp,
    login
}