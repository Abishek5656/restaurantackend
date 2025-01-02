import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Customer } from "../model/customer.model.js";

export const createCustomer = TryCatch(async (req, res, next) => {
    
  const { name, phonenumber, phonenumber2, address } = req.body;

  const { _id } = req.admin;

  const existingCustomer = await Customer.findOne({ phonenumber: phonenumber });

  if (existingCustomer)
    return next(new ErrorHandler("Customer already exists", 409));

  const newCustomer = await Customer.create({
    name: name,
    phonenumber: phonenumber,
    phonenumber2: phonenumber2,
    address: address,
    createdBy: _id,
  });

  return res
    .status(200)
    .json({ success: true, message: "Customer created successfully" });
});

export const updateCustomerDetails = TryCatch(async (req, res, next) => {

  const { id } = req.params;

  const { name, phonenumber, phonenumber2, address, pendingBalance } = req.body;

  const { _id } = req.admin;

  const customer = await Customer.findById(id);

  if (!customer) return next(new ErrorHandler("Customer not found", 404));

  const updatedCustomer = await Customer.updateOne({
    name,
    address,
    phonenumber,
    phonenumber2,
    updatedBy: _id,
  });

  return res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: updatedCustomer,
  });
});

export const deleteCustomerDetails = TryCatch(async (req, res, next) => {

  const { id } = req.params;

  const deleteCusotmerDetails = await Customer.findByIdAndDelete(id);

  if (!deleteCusotmerDetails)
    return next(new ErrorHandler("Customer not found", 404));

  return res
    .status(200)
    .json({ success: true, message: "Customer deleted successfully" });
});
