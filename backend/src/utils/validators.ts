import { Request, Response, NextFunction } from "express";
import { body, ValidationChain} from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationPromises = validations.map((validation) =>
        validation.run(req)
      );
      const validationResults = await Promise.all(validationPromises);

      for (const result of validationResults) {
        if (!result.isEmpty()) {
          return res.status(422).json({ errors: result.array() });
        }
      }
      next(); // Move to the next middleware/route handler if no validation errors
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export const loginValidator: ValidationChain[] = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 characters"),
];

export const signupValidator: ValidationChain[] = [
  body('name').notEmpty().withMessage("Name Is Required"),
  ...loginValidator,
];

export const chatMessageValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];