export class Userpassword {
    id: string;
    email: string;
    password1: string;
    password2: string;

    constructor(id: string, email: string, password1: string, password2: string) {
        this.id = (id == '') ? new Date().getTime().toString() : id;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
    };
}