import { TRegister, TStudent } from "./declarations";

const registers: Array<TRegister> = [];
const students: Array<TStudent> = [];

const getRegisterList = (): typeof registers => {
    return registers;
}

const createRegister = (name: TRegister["name"]): void => {
    const newRegister: TRegister = {
        id: generateUniqueId() + 1,
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

const createStudent = (): void => {
    connectStudentToRegister();
};

const connectStudentToRegister = (): void => {};

const deleteStudent = (): void => {};

const updateStudent = (): void => {};

const getStudentList = (): typeof students => {
    return students;
};

const assignStudentVote = () => {};

const generateUniqueId = (): number => {
    return Math.max(...registers.map(register => register.id), 0);
};

//Genera un unico id in formato stringa
/*const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};*/