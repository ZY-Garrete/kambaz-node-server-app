import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
}


export function createModule(module) {
    if (!module._id) {
        module._id = uuidv4();  // ✅ 添加这一行，分配唯一字符串 id
    }
    return model.create(module);
}

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}
export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}
