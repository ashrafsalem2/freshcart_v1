export interface signUpData extends signInData{
    name:string;
    rePassword:string;
    phone:string;
}

export interface signInData extends emailData{
    password:string
}

export interface emailData{
    email:string
}

export interface codeData{
    resetCode:string
}

export interface resetPassword extends emailData{
    newPassword:string;
}