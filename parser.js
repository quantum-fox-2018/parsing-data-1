"use strict"


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, dateTime) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.dateTime = dateTime;
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
    var fs = require('fs');
    var data = fs.readFileSync(this._file, 'utf8');
    var baris = data.split('\n');

    for(var i = 1; i < baris.length; i++) {
      var arrData = baris[i].split(',');
      var objData = new Person(arrData[0], arrData[1], arrData[2], arrData[3], arrData[4], arrData[5]);
      this._people.push(objData);
    }
    return this._people;
  }

  addPerson(data) {
    return this._people.push(data);
  }

  save() {
    var data = [];
    for(var i = 0; i < this._people.length;i++) {
      data.push(this._people[i].id.toString());
      data.push(this._people[i].firstName.toString());
      data.push(this._people[i].lastName.toString());
      data.push(this._people[i].email.toString());
      data.push(this._people[i].phone.toString());
      data.push(this._people[i].dateTime.toString());
    }
    var newData = data.join('\n');
    var fs = require('fs');
    var writeData = fs.writeFileSync('people.csv', newData, 'utf8');
    return writeData;
  }
}

// var parsing = new PersonParser('people.csv')
// console.log(parsing.people())
// console.log(obj.readFile('people.csv'));

let parser = new PersonParser('people.csv')
console.log(parser.people);
parser.addPerson(new Person('201', 'Jono', 'Suparno', 'jonos@umail.com', '0-318-025-500-56', '2012-02-22T10:09:03-08:00'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();
