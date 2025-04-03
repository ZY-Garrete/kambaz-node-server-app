import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentById(assignmentId) {
    return Database.assignments.find(
        (assignment) => assignment._id === assignmentId
    );
}

export function findAssignmentsForCourse(courseId) {
    return Database.assignments.filter(
        (assignment) => assignment.course === courseId
    );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const index = Database.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
    );
    if (index !== -1) {
        Database.assignments[index] = {
            ...Database.assignments[index],
            ...assignmentUpdates,
        };
        return Database.assignments[index];
    }
    return null;
}

export function deleteAssignment(assignmentId) {
    const index = Database.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
    );
    if (index !== -1) {
        Database.assignments.splice(index, 1);
        return true;
    }
    return false;
}