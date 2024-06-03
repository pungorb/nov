export class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    language: string;

    constructor(id: number, username: string, email: string, firstName: string, lastName: string, dateOfBirth: Date, language: string) {
        this.id = (id == null) ? new Date().getTime() : id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.language = language;
    };
}