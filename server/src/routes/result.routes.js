const { Router } = require("express");

const {authUser: authMiddleware,} = require("../middleware/auth.middleware");
const {submitResult, getLeaderboard, getMyResults} = require("../controller/result.controller");
const router = Router();


router.post("/submit",submitResult);

router.get("/leaderboard",getLeaderboard);
router.get("/my-results",authMiddleware,getMyResults);


module.exports = router;