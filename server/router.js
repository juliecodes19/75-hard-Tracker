const router = require("express").Router();
const userController = require("./controllers/user");
const dietController = require("./controllers/diet");
const readingController = require("./controllers/reading");
const waterController = require("./controllers/water");
const workoutController = require("./controllers/workout");
const imageController = require("./controllers/progress-pic");
const authMiddleware = require("./middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);
router.post("/logout", authMiddleware, userController.logout);

router.post("/", authMiddleware, dietController.postDiet);
router.put("/:dietId", authMiddleware, dietController.updateDiet);

router.post("/reading", authMiddleware, readingController.postReading);
router.put(
  "/update/:readingId",
  authMiddleware,
  readingController.updateReading
);

router.post("/water", authMiddleware, waterController.postWater);
router.put("/update/:waterId", authMiddleware, waterController.updateWater);

router.post("/workout", authMiddleware, workoutController.postWorkout);
router.put(
  "/workout/:workoutId",
  authMiddleware,
  workoutController.updateWorkout
);

router.post("/image", authMiddleware, imageController.postImage);

module.exports = router;
