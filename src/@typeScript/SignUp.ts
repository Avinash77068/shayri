export interface SignUpFormData {
    bioMessage?: string;
    
    username: string;
    email: string;
    password: string;
    type?: string;
    message?: string;
    category?:string;
}

export interface SignUpErrors {
    username?: string;
    email?: string;
    password?: string;
    type?: string;
    message?: string;
    bioMessage?:string;
    category?:string;
}
