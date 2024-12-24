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

export interface updateUserBody {
    currentPassword: string;
    updateUsername?: string;
    updateEmail?: string;
    updatePassword?: string;
}

export interface projectBody {
    projectName: string;
    description: string;
}