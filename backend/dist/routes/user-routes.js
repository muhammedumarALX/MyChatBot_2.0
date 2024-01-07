import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controller.js";
import { verifyToken } from "../utils/token-manager.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map