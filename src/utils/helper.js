import bcrypt from "bcryptjs";

export const generateHassedPassword = async (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const compareHassedPassword = async (password, hassedPassword) => {
  const comparePassword = bcrypt.compare(password, hassedPassword);
  return comparePassword;
};
