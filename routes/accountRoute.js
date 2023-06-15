// Needed Resources
const express = require("express")
const router = new express.Router()
const accController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


//Route to build account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accController.buildLoginManagement))

//Route to build account view
router.get("/login", utilities.handleErrors(accController.buildLogin))

//Route to build registration view
router.get("/register", utilities.handleErrors(accController.buildRegister))

//Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
)

//Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accController.accountLogin)
    )


module.exports = router;
