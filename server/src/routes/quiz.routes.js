const { authUser } = require("../middleware/auth.middleware");
const {Router} = require("express")
const router = Router();


const quizController = require("../controller/quiz.controller");


router.post('/create', quizController.createQuiz)
router.get("/",quizController.getAllQuiz)
router.get("/:id",quizController.getQuizById);
router.delete("/:id",quizController.deleteQuiz);

module.exports = router;