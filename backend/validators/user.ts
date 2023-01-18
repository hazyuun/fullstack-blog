import { body } from "express-validator";

export const userValidators = {
  register: [
    body("username")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Username is required"),
    body("username")
      .isLength({ max: 32, min: 3 })
      .withMessage("Username length must be between 3 and 32"),
    body("email")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must have at least 8 characters"),
  ],
  update: [
    body("username")
      .optional()
      .isLength({ max: 32, min: 3 })
      .withMessage("Username length must be between 3 and 32"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must have at least 8 characters"),
  ],
};
