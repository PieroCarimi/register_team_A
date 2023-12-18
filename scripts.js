"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registers = [];
const students = [];
const getRegisterList = () => {
    return registers;
};

const createRegister = (name) => {
    const newRegister = {
        id: generateUniqueId(),
        name,
        students: [],
        votes: [],
        attendances: [],
    };
    registers.push(newRegister);
};

const deleteRegister = (idRegister) => {
    const index = registers.findIndex((register) => register.id === idRegister);
    if (index !== -1) {
        registers.splice(index, 1);
    }
};

const updateRegister = ({ id, name }) => {
    const register = registers.find((r) => r.id === id);
    if (register) {
        register.name = name;
    }
};
const createStudent = (name, lastName, email) => {
    const newStudent = {
        id: generateUniqueId(),
        name,
        lastName,
        email,
        lectures: [] //registerIds,
    };
    students.push(newStudent);
    //connectStudentToRegister(newStudent.id, registerIds); // Ricordati di fornire l'ID del registro
};
const connectStudentToRegister = (studentId, registerId) => {
    const student = students.find((s) => s.id === studentId);
    const register = registers.find((r) => r.id === registerId);
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

const deleteStudent = (idStudent) => {
    const index = students.findIndex((student) => student.id === idStudent);
    if (index !== -1) {
        students.splice(index, 1);
    }
};

const updateStudent = (idStudent, name, lastName, email, updatedRegisterIds) => {
    const student = students.find((s) => s.id === idStudent);
    if (student) {
        // Rimuovi lo studente dai vecchi registerIds
        student.lectures.forEach((registerId) => {
            const register = registers.find((r) => r.id === registerId);
            if (register) {
                register.students = register.students.filter((studentId) => studentId !== idStudent);
            }
        });
        // Aggiorna i dati dello studente
        student.name = name;
        student.lastName = lastName;
        student.email = email;
        student.lectures = updatedRegisterIds;
        // Aggiungi lo studente ai nuovi registerIds
        updatedRegisterIds.forEach((registerId) => {
            const register = registers.find((r) => r.id === registerId);
            if (register) {
                student.lectures.push(register.id);
                register.students.push(student.id);
            }
        });
    }
};

const getStudentList = () => {
    return students;
};

const assignStudentVote = () => { };
//const generateUniqueId = (): number => {
//    return Math.max(...registers.map(register => register.id), 0);
//};
//Genera un unico id in formato stringa
const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 9);
};