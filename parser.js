"use strict"
var fs = require("fs");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(arr) {
    this.id = arr[0];
    this.first_name = arr[1];
    this.last_name = arr[2];
    this.email = arr[3];
    this.phone = arr[4];
    this.created_at = arr[5];
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
    this._title;
  }

  generatePeople() {
    let stringFile = fs.readFileSync(this._file).toString();
    let rows = stringFile.split('\n');
    let arrPersonValues;
    let tmpObj;
    this._title = rows[0].split(",");
    for(let i = 1; i < rows.length; i++) {
      arrPersonValues = rows[i].split(",");
      tmpObj = new Person(arrPersonValues);
      this._people.push(tmpObj);
    }
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    let arr = [];
    let personValues;
    arr.push(this._title);
    for(let i in this._people) {
      personValues = Object.values(this._people[i]);
      arr.push(personValues);
    }
    let listPerson = arr.join("\n");
    fs.writeFileSync('people.csv', listPerson, 'utf-8');
  }
}

let parser = new PersonParser('people.csv');
parser.generatePeople();
let id = parser.people.length;
let date = new Date();
let person = [id, "Amethyst", "Morgan", "dui@magnis.ca", "1-548-366-6273", date];
parser.addPerson(new Person(person));
console.log(parser.people);
parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
