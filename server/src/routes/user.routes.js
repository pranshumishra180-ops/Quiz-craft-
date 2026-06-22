const router = require("express").Router();

const {
  getAllUsers,
  deleteUser,
  updateRole,
} = require("../controller/user.controller");

const {
  authUser,
} = require("../middleware/auth.middleware");

const adminMiddleware = require(
  "../middleware/admin.middleware"
);

router.get(
  "/",
  authUser,
  adminMiddleware,
  getAllUsers
);

router.delete(
  "/:id",
  authUser,
  adminMiddleware,
  deleteUser
);

// CHANGE THIS
router.put(
  "/:id/role",
  authUser,
  adminMiddleware,
  updateRole
);

module.exports = router;