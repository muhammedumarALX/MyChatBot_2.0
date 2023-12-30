import User from "../db/models/User.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Confirm", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error found", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map