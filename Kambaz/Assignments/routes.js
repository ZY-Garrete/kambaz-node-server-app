import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    // 获取所有作业
    app.get("/api/assignments", async (req, res) => {
        const assignments = await dao.findAllAssignments();
        res.json(assignments);
    });

    // 获取特定课程的所有作业
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // 获取特定作业
    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });

    // 创建新作业
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const newAssignment = {
            ...req.body,
            course: courseId,
        };
        const createdAssignment = await dao.createAssignment(newAssignment);
        res.json(createdAssignment);
    });

    // 更新作业
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.updateAssignment(assignmentId, req.body);
        if (status) {
            res.json(status);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });

    // 删除作业
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        if (status) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });
}