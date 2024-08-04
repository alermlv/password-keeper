const Router = require("express");
const router = new Router();
const recordController = require("../controllers/recordController");

router.post("/", recordController.create);
router.get("/", recordController.getAll);
router.put("/:id", recordController.update);
router.delete("/:id", recordController.delete);

module.exports = router;
