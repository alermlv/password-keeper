const Router = require("express");
const router = new Router();
const passwordController = require("../controllers/passwordController");

router.post("/", passwordController.create);
router.get("/", passwordController.getAll);
router.delete("/:id", passwordController.delete);

module.exports = router;
