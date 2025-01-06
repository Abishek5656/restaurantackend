import { Router } from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { customerRegisterValidator,validateHandler } from "../lib/validator.js";
import { createCustomer, updateCustomerDetails, deleteCustomerDetails, getAllCustomers, customerOrderDetails } from "../controllers/customer.controller.js"

const router = Router();

router.use(verifyJWT)

router.route("/createCustomer").post(customerRegisterValidator(),validateHandler,createCustomer);

router.route("/updateCustomer/:id").put(updateCustomerDetails);

router.route("/deletedCustomer/:id").delete(deleteCustomerDetails);

router.route("/customerdetails").get(getAllCustomers);

router.route("/cutomerOrderDetails/:id").get(customerOrderDetails);

export default router;