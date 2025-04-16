// Kambaz/Enrollments/routes.js
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // 报名课程
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = await dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    });

    // 取消报名
    app.delete("/api/enrollments/user/:userId/course/:courseId", async (req, res) => {
        const { userId, courseId } = req.params;
        await dao.unenrollUserFromCourse(userId, courseId);
        res.sendStatus(204);
    });

    // 查询某个用户的所有报名
    app.get("/api/enrollments/user/:userId", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findEnrollmentsByUser(userId);
        res.json(enrollments);
    });
    app.delete("/api/enrollments/cleanup", async (req, res) => {
        // 获取所有报名
        const allEnrollments = await dao.model.find({});
        const seen = new Map();
        const duplicates = [];

        // 找出重复的报名
        allEnrollments.forEach(enrollment => {
            const key = `${enrollment.user}-${enrollment.course}`;
            if (seen.has(key)) {
                duplicates.push(enrollment._id);
            } else {
                seen.set(key, enrollment._id);
            }
        });

        // 删除重复的报名
        if (duplicates.length > 0) {
            await dao.model.deleteMany({ _id: { $in: duplicates } });
        }

        res.json({
            message: `已清理 ${duplicates.length} 条重复报名记录`,
            remaining: await dao.model.find({})
        });
    });
}
