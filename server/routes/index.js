const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const passwordRouter = require("./passwordRouter");

router.use("/user", userRouter);
router.use("/password", passwordRouter);

module.exports = router;
