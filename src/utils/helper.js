import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';

export const generateHassedPassword = async (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const compareHassedPassword = async (password, hassedPassword) => {
  const comparePassword = bcrypt.compare(password, hassedPassword);
  return comparePassword;
};

export const uploadImageToCloudinary = () => {

}

export const generateOrderSequence = async(size = 12) => {
  
  const customAlphaets = "QWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

  let orderSequnece = "OD";
  for(let i =0; i < size; i++) {
    let random = Math.floor(Math.random() *  customAlphaets.length);
    orderSequnece += random;
  }

  return orderSequnece;
}
