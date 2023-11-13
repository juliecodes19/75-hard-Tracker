const router = require("express").Router();
const userController = require("./controllers/user");
const dietController = require("./controllers/diet");
const readingController = require("./controllers/reading");
const waterController = require("./controllers/water");
const workoutController = require("./controllers/workout");
const imageController = require("./controllers/progress-pic");
const recapController = require("./controllers/recap");

const multer = require("multer");

const authMiddleware = require("./middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);
router.post("/logout", authMiddleware, userController.logout);

router.post("/diet", authMiddleware, dietController.postDiet);
router.put("/diet/:dietId", authMiddleware, dietController.updateDiet);

router.post("/reading", authMiddleware, readingController.postReading);
router.put(
  "/reading/:readingId",
  authMiddleware,

  readingController.updateReading
);

router.post("/water", authMiddleware, waterController.postWater);
router.put("/water/:waterId", authMiddleware, waterController.updateWater);

router.post("/workout", authMiddleware, workoutController.postWorkout);
router.put(
  "/workout/:workoutId",
  authMiddleware,

  workoutController.updateWorkout
);

const storage = multer.memoryStorage();
const upload = multer();
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  imageController.postImage
);

router.get("/recap/", authMiddleware, recapController.getRecap);

module.exports = router;
