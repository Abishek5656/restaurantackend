import { Admin } from "../model/admin.model.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {
  generateHassedPassword,
  compareHassedPassword,
} from "../utils/helper.js";
import { JWT_KEY } from "../app.js";
import jwt from "jsonwebtoken";

export const adminSignup = TryCatch(async (req, res, next) => {
  const { username, password, name, phoneNumber, address } = req.body;

  const existingUser = await Admin.findOne({
    username: username?.toLowerCase(),
  });

  if (existingUser)
    return next(new ErrorHandler("username already exists", 309));

  const hasedPassword = await generateHassedPassword(password);

  const newUser = await Admin.create({
    username,
    password: hasedPassword,
    phoneNumber: Number(phoneNumber),
    address: address,
    name: name,
  });

  return res.status(200).json({
    success: true,
    message: "Admin Created Successfully",
  });
});

export const adminLogin = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ username: username?.toLowerCase() });

  if (!user) return next(new ErrorHandler("username not exsist", 404));

  const isValidPassword = await compareHassedPassword(password, user?.password);

  if (!isValidPassword) return next(new ErrorHandler("Invalid Password", 401));

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_KEY
  );

  return res.status(200).cookie("accessToken", token).json({
    success: true,
    message: "Admin Login Successfully",
  });
});

export const updateAdminDetails = TryCatch(async (req, res, next) => {
  const { _id } = req.admin;

  const { name, username, password, phoneNumber, address } = req.body;

  const existingUser = await Admin.findById(_id);

  if(!existingUser) return next(new ErrorHandler("user not found", 404))

    let hassedPassword;

  if (password) {
    const hassedPassword = await generateHassedPassword(password);
  }

  const adminDetails = await Admin.findByIdAndUpdate(
    _id,
    {
      $set: {
        name: name || existingUser.name,
        username: username || existingUser.username,
        phoneNumber: phoneNumber || existingUser.phoneNumber,
        address: address || existingUser.address,
        password:  password ? Number(hassedPassword) : existingUser?.password,
      },
    },
    {
      new: true,
    }
  );


  return res
    .status(200)
    .json({ success: true, message: "Admin details updated successfully", data:adminDetails  });
});

export const deleteAdmin = TryCatch(async (req, res, next) => {
  const { _id } = req.admin;

  const deleteAdmin = await Admin.deleteOne({ _id: _id });

  if (!deleteAdmin) return next(new ErrorHandler("User not found", 404));

  return res.status(200).cookie("accessToken", "").json({
    success: true,
    message: "Admin Deleted Successfully",
  });
});
