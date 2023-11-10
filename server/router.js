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
router.get("/me", userController.profile);
router.post("/logout", userController.logout);

router.post("/diet", dietController.postDiet);
router.put("/diet/:dietId", dietController.updateDiet);

router.post("/reading", readingController.postReading);
router.put(
  "/reading/:readingId",

  readingController.updateReading
);

router.post("/water", waterController.postWater);
router.put("/water/:waterId", waterController.updateWater);

router.post("/workout", workoutController.postWorkout);
router.put(
  "/workout/:workoutId",

  workoutController.updateWorkout
);

router.post("/image", imageController.postImage);

module.exports = router;
