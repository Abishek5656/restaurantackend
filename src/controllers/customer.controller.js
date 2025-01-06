import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Customer } from "../model/customer.model.js";
import { Admin } from "../model/admin.model.js";
import { Order } from "../model/order.model.js";
import { Menu } from "../model/menu.model.js";

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

export const getAllCustomers = TryCatch(async (req, res, next) => {
  const { _id } = req.admin;

  const admin = await Admin.findById(_id);

  if (!admin) return next(new ErrorHandler("Admin is not found", 404));

  const allCustomer = await Customer.find(
    { pendingBalance: { $gt: 0 } },
    { name: 1, phonenumber: 1, address: 1, pendingBalance: 1 }
  );

  return res
    .status(200)
    .json({
      success: true,
      message: "All Customer details",
      data: allCustomer,
    });
});

export const customerOrderDetails = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const { _id } = req.admin;

  const admin = await Admin.findById(_id);

  if (!admin) return next(new ErrorHandler("Admin is not found", 404));

  const customer = await Customer.findById(id);

  if (!customer) return next(new ErrorHandler("Customer is not found", 404));

  const orderDetails = await Customer.aggregate([
    { $match: { _id: customer?._id, pendingBalance: { $gt: 0 } } },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customerId",
        as: "order_details",
      },
    },
    { $unwind: "$order_details" },
    { $unwind: "$order_details.orderDetails" },
    {
      $lookup: {
        from: "menus",
        localField: "order_details.orderDetails.itemId",
        foreignField: "_id",
        as: "item_details",
      },
    },
    { $unwind: "$item_details" },
    {
      $group: {
        _id: "$order_details.orderNumber",
        orderitemsDetails: { $push: "$item_details" },
        name: { $first: "$name" },
        order_details: { $first: "$order_details" },
        orderBillAmount: { $first: "$order_details.orderBillAmount" },
        orderDate: { $first: "$order_details.orderDate" },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        orderitemsDetails: {_id:1, name:1, price:1, categoryName:1},
        orderBillAmount: 1,
        orderDate: 1,
      },
    },
  ]);

  return res.status(200).json({ success: true, data: orderDetails});
});




