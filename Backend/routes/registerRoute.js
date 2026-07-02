const router = require("express").Router();

const {
    registerData,
    loginData,
    logoutData,
    getUserData
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerData);
router.post("/login", loginData);
router.post("/logout", authMiddleware, logoutData);
router.get("/me", authMiddleware, getUserData);


module.exports = router;