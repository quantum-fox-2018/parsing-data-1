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

  get people() {
    return this;
  }

  get size() {
    return this._people.length;
  }

  get file() {
    return this._file;
  }

  readFile() {
    let fs = require('fs');
    let files = fs.readFileSync(this._file, 'utf8').split('\n');

    for (let i = 1; i < files.length; i++) {
      let item = files[i].split(',');
      let person = new Person(item[0], item[1], item[2], item[3], item[4], item[5]);
      this._people.push(person);
    }
  }

  addPerson(first_name, last_name, email, phone) {
    let newId = String(this._people.length + 1);
    let newDate = new Date();
    newDate = newDate.toISOString();
    let newPerson = new Person(newId, first_name, last_name, email, phone, newDate);
    this._people.push(newPerson);
  }

  save() {
    let fs = require('fs');
    let string = [];

    for (let i = 0; i < this._people.length; i++) {
      let temp = [];
      for (let j in this._people[i]) {
        temp.push(this._people[i][j]);
      }
      string.push(temp.join(','));
    }

    fs.writeFileSync(this._file, string.join('\n'));
  }

}

let parser = new PersonParser('people.csv')

parser.readFile();
parser.addPerson('Ihsan', 'Maulana', 'ihsanmaulana5@gmail.com', '08121506318');
parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);

