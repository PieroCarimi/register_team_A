"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../scripts");
const createStudent = (name, lastName, email) => {
    const newStudent = {
        id: (0, scripts_1.generateUniqueId)(),
        name,
        lastName,
        email,
        lectures: [] //registerIds,
    };
    scripts_1.students.push(newStudent);
    //connectStudentToRegister(newStudent.id, registerIds); // Ricordati di fornire l'ID del registro
};
const deleteStudent = (idStudent) => {
    const index = scripts_1.students.findIndex((student) => student.id === idStudent);
    if (index !== -1) {
        scripts_1.students.splice(index, 1);
    }
};
const updateStudent = (idStudent, name, lastName, email) => {
    const studentIndex = scripts_1.students.findIndex((s) => s.id === idStudent);
    if (studentIndex !== -1) {
        scripts_1.students[studentIndex].name = name;
        scripts_1.students[studentIndex].lastName = lastName;
        scripts_1.students[studentIndex].email = email;
    }
    else {
        console.log("Studente non trovato.");
    }
};
const getStudentList = () => {
    return scripts_1.students;
};

module.exports = {createStudent, getStudentList, deleteStudent, updateStudent};