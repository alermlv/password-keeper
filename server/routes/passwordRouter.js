const Router = require("express");
const router = new Router();
const passwordController = require("../controllers/passwordController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", passwordController.create);
router.get("/", passwordController.getAll);
router.put("/:id", passwordController.update);
router.delete("/:id", passwordController.delete);

module.exports = router;
