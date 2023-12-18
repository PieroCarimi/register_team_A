import { TRegister, TStudent } from "./declarations";

const registers: Array<TRegister> = [];
const students: Array<TStudent> = [];

const getRegisterList = (): typeof registers => {
    return registers;
}

const createRegister = (name: TRegister["name"]): void => {
    const newRegister: TRegister = {
        id: generateUniqueId(),
        name,
        students: [],
        votes: [],
        attendances: [],
    };
    registers.push(newRegister);
};

const deleteRegister = (idRegister: TRegister["id"]): void => {
    const index = registers.findIndex((register) => register.id === idRegister);
    if(index !== -1){
        registers.splice(index, 1);
    }
};

const updateRegister = ({
    id, 
    name
}: {
    id:TRegister["id"], 
    name:TRegister["name"]
}): void => {
    const register = registers.find((r) => r.id === id);
    if(register){
        register.name = name;
    }
};

const createStudent = (
    name: TStudent["name"],
    lastName: TStudent["lastName"],
    email: TStudent["email"],
    //registerIds: Array<TRegister["id"]>
): void => {
    const newStudent: TStudent = {
        id: generateUniqueId(),
        name,
        lastName,
        email,
        lectures: [] //registerIds,
    };
    students.push(newStudent);
    //connectStudentToRegister(newStudent.id, registerIds); // Ricordati di fornire l'ID del registro
};

const connectStudentToRegister = (
    studentId: TStudent["id"],
    registerId: TRegister["id"]
): void => {
    const student = students.find((s) => s.id === studentId);
    const register = registers.find((r) => r.id === registerId);

    if (student && register) {
    // Controlla se lo studente non è già registrato
    if (!register.students.includes(studentId)) {
        register.students.push(studentId);
    } else {
        console.log("Lo studente è già registrato a questo registro.");
    }
    } else {
    console.log("Studente o registro non trovato.");
    }
};

const deleteStudent = (idStudent: TStudent["id"]): void => {
    const index = students.findIndex((student) => student.id === idStudent);
    if (index !== -1) {
        students.splice(index, 1);
    }
};

const updateStudent = (
    idStudent: TStudent["id"],
    name: TStudent["name"],
    lastName: TStudent["lastName"],
    email: TStudent["email"],
    updatedRegisterIds: Array<TRegister["id"]>
): void => {
    const student = students.find((s) => s.id === idStudent);

    if (student) {
        // Rimuovi lo studente dai vecchi registerIds
        student.lectures.forEach((registerId) => {
            const register = registers.find((r) => r.id === registerId);

            if (register) {
                register.students = register.students.filter(
                    (studentId) => studentId !== idStudent
                );
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

const getStudentList = (): typeof students => {
    return students;
};

const assignStudentVote = () => {};

//const generateUniqueId = (): number => {
//    return Math.max(...registers.map(register => register.id), 0);
//};

//Genera un unico id in formato stringa
const generateUniqueId = (): string => {
    return Math.random().toString(36).slice(2, 9);
};