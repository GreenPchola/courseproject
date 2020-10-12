const {signUp} = require("../controllers/users-controller")
const {Router} = require("express")
const {userValidator} = require("../services/validation-service")
const router = Router()
router.post("/signup/",userValidator,signUp)
module.exports = router
