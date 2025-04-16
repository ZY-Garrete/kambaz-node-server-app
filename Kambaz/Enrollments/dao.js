// Kambaz/Enrollments/dao.js
//import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
export async function enrollUserInCourse(user, course) {
    // 先检查是否已经报名
    const existing = await model.findOne({ user, course });
    if (existing) {
        // 如果已经报名，返回现有记录
        return existing;
    }
    // 没有报名，创建新记录
    return model.create({ _id: uuidv4(), user, course });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
export async function findEnrollmentsByUser(userId) {
    return await model.find({ user: userId }).populate("course");
}