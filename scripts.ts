import { TRegister, TStudent } from "./declarations";

export const registers: Array<TRegister> = [];
export const students: Array<TStudent> = [];

export const assignStudentVote = () => {};

//const generateUniqueId = (): number => {
//    return Math.max(...registers.map(register => register.id), 0);
//};

//Genera un unico id in formato stringa
export const generateUniqueId = (): string => {
    return Math.random().toString(36).slice(2, 9);
};