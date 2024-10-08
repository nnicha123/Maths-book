export interface User {
    // before taking security measures relating to password
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    currentLevel: number;
    image: string;
}

export interface NewUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    image: string;
}