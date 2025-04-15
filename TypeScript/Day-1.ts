// Interfaces
interface Address {
    street: string;
    city: string;
    pincode: number;
}

interface PersonInfo {
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    contactNumbers: string[];

    getFullName(): string;
    getFullAddress(): string;
}

// Class implementing the interface
class Person implements PersonInfo {
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    contactNumbers: string[];

    constructor(firstName: string, lastName: string, age: number, address: Address, contactNumbers: string[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.contactNumbers = contactNumbers;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getFullAddress(): string {
        return `${this.address.street}, ${this.address.city} - ${this.address.pincode}`;
    }
}

// Example usage
const person = new Person(
    "Hitarth",
    "Rami",
    22,
    {
        street: "Bhadranakannagr Society",
        city: "Patan",
        pincode: 384265
    },
    ["9876347689", "9123679432"]
);

console.log("Full Name:", person.getFullName());
console.log("Full Address:", person.getFullAddress());
console.log("Contact Numbers:", person.contactNumbers);