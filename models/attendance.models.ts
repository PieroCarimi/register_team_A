import { TRegister, TStudent } from "../declarations";

const createAttendance = ({
    date,
    idRegister,
}: {
    date: TRegister["attendances"][number]["date"];
    idRegister: TRegister["id"];
}) => {};

const deleteAttendance = ({
    idAttendance,
    idRegister,
    idStudent,
}: {
    idAttendance: TRegister["attendances"][number]["id"];
    idRegister: TRegister["id"];
    idStudent?: TStudent["id"];
}) => {};

const connectStudentToAttendance = ({
    idAttendance,
    idRegister,
    idStudent,
}: {
    idAttendance: TRegister["attendances"][number]["id"];
    idRegister: TRegister["id"];
    idStudent: TStudent["id"];
}) => {}
