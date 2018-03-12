/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

'use strict';

const fs = require('fs'); 

class Person { 
  // Look at the above CSV file
  // What attributes should a Person object have?
    
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.firstName = first_name; 
    this.lastName = last_name; 
    this.email = email;
    this.phone = phone;
    this.createdAt = created_at;
  }

  get convert() {
    return `${this.id},${this.firstName},${this.lastName},${this.email},${this.phone},${this.createdAt}`;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    let list = fs.readFileSync(this._file, 'utf8').split('\n');
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(',');
    }
    for (let i = 1; i < list.length; i++) {
      let date = new Date(list[i][5]);
      let persons = new Person(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4], date);
      this._people.push(persons);
    }
    console.log(this._people);
    return this._people;
  }

  addPerson(objPeople) {
    this._people.push(objPeople.convert);
    return this._people;
  }

  save() {
    fs.appendFileSync(this._file, this._people + '\n', 'utf8');
  }
}

let parser = new PersonParser('people.csv');
let david = new Person('201', 'David', 'Joshua', 'davidjoshua_87@yahoo.com', '0812-9559-7000', new Date());
parser.addPerson(david);
parser.save();
console.log(`There are ${parser.people.length-2} people in the file '${parser._file}'.`);
