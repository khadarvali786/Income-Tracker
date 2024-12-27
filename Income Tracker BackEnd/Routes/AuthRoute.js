const { Signup,Login, logout } = require("../controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification)
router.get('/logout',logout)

module.exports = router;