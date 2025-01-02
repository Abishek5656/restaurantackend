import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const adminRegisterValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("phoneNumber", "Please Enter Phone Number").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const adminLoginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const itemRegisterValidator = () => [
  body("name", "Please Enter name").notEmpty(),
  // body("image", "Please Upload Image").notEmpty(),
  body("price", "Please Enter Price").notEmpty()
]

const customerRegisterValidator = () => [
  body("name", "Please Enter name").notEmpty(),
  body("phonenumber", "Please Enter phonenumber").notEmpty(),
]


export { validateHandler, adminRegisterValidator,adminLoginValidator,itemRegisterValidator,customerRegisterValidator  };
