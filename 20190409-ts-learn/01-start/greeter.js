var Student = /** @class */ (function () {
    function Student(firstName, middleName, lastName) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleName + ' ' + lastName;
    }
    return Student;
}());
function greeter(person) {
    return 'Hello, ' + person.fullName;
}
var user = new Student('jianfe', 'M.', 'huang');
document.body.innerHTML = greeter(user);
