export interface loginBody {
    email: string;
    password: string;
}

export interface signupBody {
    username: string;
    email: string;
    password: string;
}

export interface updateUserByIdBody {
    updateUsername?: string;
    updateEmail?: string;
    updatePassword?: string;
}