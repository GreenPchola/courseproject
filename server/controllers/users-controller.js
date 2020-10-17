const { User, Number, userData } = require("../models")
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
                await User.create({ name, password: hashedPassword })
                await Number.create({ number })
                await userData.create({})
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
const updateUserData = async(req,res)=>{
    const {country, city, workOrganization,profession, aboutUser} = req.body
    await userData.update({country,city,workOrganization,profession,aboutUser}, {returning:true, where:{id:req.params.id}})
    res.json({message:"user updated"})
}

module.exports = {
    signUp,
    login,
    updateUserData
}