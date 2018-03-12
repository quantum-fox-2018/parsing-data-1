"use strict"

const fs = require('fs');
// var arrCsv = fs.readFileSync('./people.csv','utf8');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this._id = id;
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._create_at = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
  }

  convert() {
    let arrFile = fs.readFileSync(this._file,'utf8').split('\n');
    for (let i = 1; i < arrFile.length; i++) {
      this._people.push(arrFile[i].split(','));
    }
  }

  get people() {
    return this._people;
  }

  get size() {
    return this._people.length;
  }

  addPerson(obj) {
    let newArr = [];
    newArr.push(obj._id);
    newArr.push(obj._first_name);
    newArr.push(obj._last_name);
    newArr.push(obj._email);
    newArr.push(obj._phone);
    newArr.push(obj._create_at);
    this._people.push(newArr);
    return this._people;
  }

  save() {
    let arrWrite = [['id','first_name','last_name','email','phone','created_at']];

    for (let i = 0; i < this._people.length; i++) {
      arrWrite.push(this._people[i].join(','));
    }

    fs.writeFileSync('people.csv', arrWrite.join('\n'), 'utf8');
  }

}

// console.log(new Person());
let parser = new PersonParser('people.csv');
parser.convert();
// console.log('before',parser.people.length);

parser.addPerson(new Person(parser.size+1,'marco','sumali','marco@com','08111777802',new Date()));
// console.log('after',parser.people.length);

parser.save();

console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
