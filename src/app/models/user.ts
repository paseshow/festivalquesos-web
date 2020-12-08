export class CommonUser {
    id: number;
}

export class UserLogin {
    nameUser: string;
    password: string;
}

export class User extends CommonUser {
    name: string;
    nameUser: string;
    email: string;
    roles: Rol[];
}


export class Rol extends CommonUser {
    rolName: number;
}

export class JwtDTO {
    token: string;
    nameUser: string;
    authorities: Authority[];
}

export class Authority extends CommonUser {
    authority: string;
}

export class NewUser {
    name: string;
    nameUser: string;
    email: string;
    password: string;
    roles: string[];
}