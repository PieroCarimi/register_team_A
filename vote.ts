import { TStudent, TRegister } from "./declarations";

const assignStudentVote = ({
    idStudent,
    vote,
    idRegister,
    date,
    note,
} : {
    idStudent: TStudent["id"];
    vote: TRegister["votes"][number]["value"];
    note?: TRegister["votes"][number]["note"];
    idRegister: TRegister["id"];
    date: TRegister["votes"][number]["date"];
}) => {};

const updateStudentVote = () => {};

const deleteStudentVote = () => {};