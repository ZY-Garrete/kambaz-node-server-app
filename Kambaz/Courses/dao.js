//kambaz/Courses/dao.js
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
export function findAllCourses() {
    return model.find();
}
export async function findCoursesForEnrolledUser(userId) {
    // 从 enrollments 集合中查找该用户的所有报名
    const enrollments = await enrollmentModel.find({ user: userId });

    // 获取这些报名对应的课程 ID
    const courseIds = enrollments.map(enrollment => enrollment.course);

    // 查找这些 ID 对应的课程
    return await model.find({ _id: { $in: courseIds } });
}

export function createCourse(course) {
    console.log("🛠️ Creating course with data:", course);
    if (!course._id) {
        course._id = new Date().getTime().toString();
        console.log("✅ Assigned _id:", course._id);
    }
    return model.create(course);
}


export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}
export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
