import { Router } from 'express';
import { validateHandler, } from "../lib/validator.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { customerRegisterValidator,validateHandler } from "../lib/validator.js";
import { createCustomer, updateCustomerDetails, deleteCustomerDetails } from "../controllers/customer.controller.js"

const router = Router();

router.use(verifyJWT)

router.route("/createCustomer").post(customerRegisterValidator(),validateHandler,createCustomer);

router.route("/updateCustomer/:id").put(updateCustomerDetails);

router.route("/deletedCustomer/:id").delete(deleteCustomerDetails);

export default router;