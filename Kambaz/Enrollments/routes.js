// Kambaz/Enrollments/routes.js
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // 报名课程
    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    });

    // 取消报名
    app.delete("/api/enrollments/user/:userId/course/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        dao.unenrollUserInCourse(userId, courseId);
        res.sendStatus(204);
    });

    // 查询某个用户的所有报名
    app.get("/api/enrollments/user/:userId", (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findEnrollmentsByUser(userId);
        res.json(enrollments);
    });
}
