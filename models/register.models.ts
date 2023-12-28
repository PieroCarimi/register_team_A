import {TRegister} from "../declarations";
import {TStudent} from "../declarations";
import {generateUniqueId, registers, students} from "../scripts";

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