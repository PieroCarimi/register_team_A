"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = exports.assignStudentVote = exports.students = exports.registers = void 0;
exports.registers = [];
exports.students = [];
const assignStudentVote = () => { };
exports.assignStudentVote = assignStudentVote;
//const generateUniqueId = (): number => {
//    return Math.max(...registers.map(register => register.id), 0);
//};
//Genera un unico id in formato stringa
const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 9);
};
exports.generateUniqueId = generateUniqueId;
