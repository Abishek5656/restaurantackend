import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Menu } from "../model/menu.model.js";
import { Category } from "../model/category.model.js";

export const createItem = TryCatch(async (req, res, next) => {
  const { name, description, price, image, categoryName } = req.body;

  // Check if the category exists and if the item exists
  const [existingCategory, existingItem] = await Promise.all([
    Category.findOne({ categoryName: categoryName?.toLowerCase() }),
    Menu.findOne({ name: name }),
  ]);

  let category;
  if (!existingCategory) {
    category = await Category.create({
      categoryName: categoryName,
    });
  }

  if (existingItem) return next(new ErrorHandler("Item already exist", 404));

  const createMenu = await Menu.create({
    name: name,
    description: description,
    price: Number(price),
    categoryName: existingCategory?.categoryName || categoryName,
    categoryId: existingCategory?._id || category?._id,
  });

  return res
    .status(200)
    .json({ sucess: true, message: "Menu Item Created Successfully" });
});

export const updateMenuItem = TryCatch(async (req, res, next) => {
  const { name, description, price, image, categoryName } = req.body;

  const { id } = req.params;

  const [existingCategory, existingMenu] = await Promise.all([
    Category.findOne({ categoryName: categoryName?.toLowerCase() }),
    Menu.findById(id),
  ]);

  let newCategory;
  if (!existingCategory) {
    newCategory = await Category.create({
      categoryName: categoryName?.toLowerCase(),
    });
  }

  if (!existingMenu) return next(new ErrorHandler("Menu Item Not Found"));

  const updateMenu = await Menu.findByIdAndUpdate(
    id, 
    {
      $set: {
        name: name,
        description: description,
        price: price,
        categoryName: newCategory?.categoryName || existingCategory?.categoryName,
        categoryId: newCategory?._id || existingCategory?._id,
      }
    },
    {
      new: true 
    }
  );;

  return res
    .status(200)
    .json({ sucess: true, message: "Menu item updated Sucessfully", data:updateMenu });
});

export const deleteMenuItem = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const existMenuItem = await Menu.findById(id);

  if (!existMenuItem) {
    return next(new ErrorHandler("Menu Item Not Found", 404));
  }

  await Menu.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Menu Item deleted successfully",
  });
});
