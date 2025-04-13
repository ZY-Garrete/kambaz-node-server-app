import model from "./model.js"; // Mongoose model
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user) => {
    // 如果没有传 _id，就自动生成一个
    if (!user._id) {
        user._id = uuidv4();
    } else {
        // 检查 _id 是否已存在，防止冲突
        const exists = await model.exists({ _id: user._id });
        if (exists) {
            throw new Error(`User with _id ${user._id} already exists`);
        }
    }

    return model.create(user);
};

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};
