import { Request, Response, NextFunction } from "express"
import {body, ValidationChain, validationResult} from "express-validator"

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        for (let validation of validations) {
          const result = await validation.run(req);
          if (!result.isEmpty()) {
            const errors = validationResult(req);
            return res.status(422).json({ errors: errors.array() });
          }
        }
        next(); // Move to the next middleware/route handler if no validation errors
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
  };

  export const loginValidator = [
    body('email').trim().isEmail().withMessage("Email Is Required"),
    body('password').trim().isLength({min: 6}).withMessage("Name Is Required"),
]

export const signupValidator = [
    body('name').notEmpty().withMessage("Name Is Required"),
    ...loginValidator,
];


