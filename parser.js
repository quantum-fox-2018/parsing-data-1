"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get file() {
    return this._file;
  }

  get people() {
    return this;
  }

  get size() {
    let people = this.people;
    return people._people.length;
  }

  addPerson(first_name, last_name, email, phone) {
    let id = this._people.length+1;
    let created_at = new Date();
    created_at = created_at.toISOString();
    let newPerson = new Person(id, first_name, last_name, email, phone, created_at)

    this._people.push(newPerson);
  }

  save() {
    let fs = require('fs');
    let stringPerson = '';

    for (let i in this._people) {
      for (let j in this._people[i]) {
        stringPerson += `${this._people[i][j]},`;
      }
      stringPerson = stringPerson.slice(0,stringPerson.length-1);
      stringPerson += '\n';
    }

    fs.writeFileSync(this._file, stringPerson);
  }

  parser() {
    let fs = require('fs');
    let arrPeople = [];
    let parseToStrings = fs.readFileSync(this._file).toString().split('\n');
    let property = parseToStrings[0].split(',');

    for (let i = 1; i < parseToStrings.length-1; i++) {
      let person = parseToStrings[i].split(',');
      arrPeople.push(person);
    }

    for (let i = 0; i < arrPeople.length; i++) {
      let id = arrPeople[i][0];
      let first_name = arrPeople[i][1];
      let last_name = arrPeople[i][2];
      let email = arrPeople[i][3];
      let phone = arrPeople[i][4];
      let created_at = arrPeople[i][5];

      let objPerson = new Person(id, first_name, last_name, email, phone, created_at);
      this._people.push(objPerson);
    }

    return this;
  }
}

let parser = new PersonParser('people.csv')


parser.parser();

parser.addPerson('Fandy', 'Barestu', 'barestu.fandy@gmail.com', '0818-0432-3001');

console.log(`There are ${parser.people.size } people in the file '${parser.file}'.`)

parser.save();
