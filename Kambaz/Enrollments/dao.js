// Kambaz/Enrollments/dao.js
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const enrollUserInCourse = (userId, courseId) => {
    const exists = Database.enrollments.find(
        (e) => e.user === userId && e.course === courseId
    );
    if (exists) return exists;

    const enrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
        date: new Date().toISOString(),
    };
    Database.enrollments.push(enrollment);
    return enrollment;
};

export const unenrollUserInCourse = (userId, courseId) => {
    Database.enrollments = Database.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
    );
};

export const findEnrollmentsByUser = (userId) => {
    return Database.enrollments.filter((e) => e.user === userId);
};
