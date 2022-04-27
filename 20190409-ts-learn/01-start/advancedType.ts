interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};


const getProperties = <T, K extends keyof T>(obj: T, names: K[]): T[K][] => {
    return names.map((name) => {
        return obj[name]
    })
}

let strings: string[] = getProperties(person, [name])