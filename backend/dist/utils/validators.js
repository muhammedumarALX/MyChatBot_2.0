import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        try {
            for (let validation of validations) {
                const result = await validation.run(req);
                if (!result.isEmpty()) {
                    const errors = validationResult(req);
                    return res.status(422).json({ errors: errors.array() });
                }
            }
            next(); // Move to the next middleware/route handler if no validation errors
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};
export const signupValidator = [
    body('name').notEmpty().withMessage("Name Is Required"),
    body('email').trim().isEmail().withMessage("Email Is Required"),
    body('password').trim().isLength({ min: 6 }).withMessage("Name Is Required"),
];
//# sourceMappingURL=validators.js.map