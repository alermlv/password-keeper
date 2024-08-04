const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const recordRouter = require("./recordRouter");

router.use("/user", userRouter);
router.use("/record", recordRouter);

module.exports = router;
