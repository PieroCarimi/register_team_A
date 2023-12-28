"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../scripts");
const getRegisterList = () => {
    return scripts_1.registers;
};
const createRegister = (name) => {
    const newRegister = {
        id: (0, scripts_1.generateUniqueId)(),
        name,
        students: [],
        votes: [],
        attendances: [],
    };
    scripts_1.registers.push(newRegister);
};
const deleteRegister = (idRegister) => {
    const index = scripts_1.registers.findIndex((register) => register.id === idRegister);
    if (index !== -1) {
        scripts_1.registers.splice(index, 1);
    }
};
const updateRegister = ({ id, name }) => {
    const register = scripts_1.registers.find((r) => r.id === id);
    if (register) {
        register.name = name;
    }
};
const connectStudentToRegister = (studentId, registerId) => {
    const student = scripts_1.students.find((s) => s.id === studentId);
    const register = scripts_1.registers.find((r) => r.id === registerId);
    if (student && register) {
        // Controlla se lo studente non è già registrato
        if (!register.students.includes(studentId)) {
            register.students.push(studentId);
        }
        else {
            console.log("Lo studente è già registrato a questo registro.");
        }
    }
    else {
        console.log("Studente o registro non trovato.");
    }
};

module.exports = {createRegister, getRegisterList, updateRegister, deleteRegister, connectStudentToRegister};