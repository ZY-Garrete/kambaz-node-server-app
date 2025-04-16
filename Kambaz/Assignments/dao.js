import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function createAssignment(assignment) {
    return await model.create({ _id: uuidv4(), ...assignment });
}

export async function findAllAssignments() {
    return await model.find();
}

export async function findAssignmentById(assignmentId) {
    return await model.findById(assignmentId);
}

export async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
    return await model.findByIdAndUpdate(
        assignmentId,
        assignmentUpdates,
        { new: true }
    );
}

export async function deleteAssignment(assignmentId) {
    const status = await model.findByIdAndDelete(assignmentId);
    return !!status;
}