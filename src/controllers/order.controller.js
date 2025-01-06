import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Order } from "../model/order.model.js";
import { Admin } from "../model/admin.model.js";
import { Customer } from "../model/customer.model.js";
import { Payment } from "../model/payment.model.js"
import { generateOrderSequence } from "../utils/helper.js";

export const createOrder = TryCatch(async (req, res, next) => {

  const { _id } = req.admin;

  const { orderDetails, customerId, amountPaid, paymentType } = req.body;

  const admin = await Admin.findById(_id);

  if (!admin) return next(new ErrorHandler("Admin details not found"));

  const findCustomer = await Customer.findById(customerId);

  if (!findCustomer) return next(new ErrorHandler("Customer not found", 404));

  const orderNumberSequence = await generateOrderSequence(10);

  const totalAmount = orderDetails.reduce((accumulator, item) => {
    return accumulator + item.itemPrice;
  }, 0);

  if (amountPaid > totalAmount) {
    return next(
      new ErrorHandler("Total Bill Amount cannot exceed the Total Amount.")
    );
  }

  let paymentStatus = 1;

  if(amountPaid < totalAmount) {
    let previousPendingAmount = findCustomer?.pendingBalance || 0;
    let remainingAmount = (totalAmount - amountPaid) + previousPendingAmount;
    await findCustomer.updateOne({ $set: { pendingBalance: remainingAmount } });
    paymentStatus = 2
  }

  const createOrder = await Order.create({
    orderNumber: orderNumberSequence,
    customerName: findCustomer?.name,
    customerId: findCustomer?._id,
    orderDetails,
    orderBillAmount: Number(totalAmount),
  });

  const createPayment = await Payment.create({
    paymentType : paymentType,
    paymentStatus: paymentStatus,
    orderId: createOrder?._id,
    orderNumber: createOrder?.orderNumber,
    customerId:createOrder?.customerId,
    amountPaid: amountPaid
  });

  return res
    .status(200)
    .json({ sucess: true, message: "Order Created Sucessfully" });
});


// export 


