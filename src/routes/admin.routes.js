import { Router } from 'express';
import { adminRegisterValidator,validateHandler, adminLoginValidator } from "../lib/validator.js";
import { adminSignup, adminLogin, deleteAdmin,updateAdminDetails } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(adminRegisterValidator(),validateHandler,adminSignup)

router.route("/login").post(adminLoginValidator(), validateHandler, adminLogin);

router.route("/updatedetails").put(verifyJWT,updateAdminDetails)

router.route("/delete").delete(verifyJWT,deleteAdmin)


export default router;