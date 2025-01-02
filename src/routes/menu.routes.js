import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createItem, updateMenuItem, deleteMenuItem } from "../controllers/menu.controller.js";
import { validateHandler, itemRegisterValidator } from "../lib/validator.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Apply the verifyJWT middleware to all routes in this router
router.use(verifyJWT);

// Route to handle item creation
router.route("/create").post(itemRegisterValidator(),validateHandler,createItem);

router.route("/update/:id").put(updateMenuItem);

router.route("/delete/:id").delete(deleteMenuItem)

export default router;
