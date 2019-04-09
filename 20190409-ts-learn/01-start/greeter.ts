class Student {
    fullName: string;
    constructor (public firstName, public middleName, public lastName) {
        this.fullName = firstName + ' ' + middleName + ' ' + lastName
    }
}

interface Person {
    firstName: string,
    lastName: string,
    middleName: string,
    fullName: string,
}

function greeter (person: Person) {
    return 'Hello, ' + person.fullName
}

const user = new Student('jianfe', 'M.', 'huang')

document.body.innerHTML = greeter(user)