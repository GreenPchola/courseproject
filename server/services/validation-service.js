const {body} = require("express-validator/check")
module.exports = {
    userValidator:[
        body("name").trim().notEmpty(),
        body("number").trim().notEmpty().isMobilePhone()
    ]
}
