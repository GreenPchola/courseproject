const {signUp,login} = require("../controllers/users-controller")
const {Router} = require("express")
const {userValidator} = require("../services/validation-service")
const userRouter = Router()
userRouter.post("/signup/",userValidator,signUp)
userRouter.post("/login/",login)
module.exports = userRouter
