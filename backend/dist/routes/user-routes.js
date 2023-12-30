import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import { signupValidator, validate } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map