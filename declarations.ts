export interface TRegister {
    id: number;
    name: string;
    students: Array<TStudent["id"]>;
    votes: Array<{
        id: string;
        date: Date;
        value: number;
        idStudent: TStudent["id"];
        note: string;
    }>;
    attendances: Array<{
        id: string;
        date: Date;
        students: Array<TStudent["id"]>;
    }>;
}

export interface TStudent {
    id: string;
    name: string;
    lastName: string;
    email: string;
    lectures: Array<TRegister["id"]>;
}