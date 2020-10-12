const {body} = require("express-validator/check")
module.exports = {
    userValidator:[
        body("name").notEmpty()
    ]
}
