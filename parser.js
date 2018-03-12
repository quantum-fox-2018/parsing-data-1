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
    this._file = file
    this._people = [];

    var fs = require('fs');
    var data = fs.readFileSync(this._file, 'utf8');
    var baris = data.split('\n');
    console.log(baris)

    for(var i = 1; i < baris.length; i++) {
      var arrData = baris[i].split(',');

      var objData = new Person(arrData[0], arrData[1], arrData[2], arrData[3], arrData[4], arrData[5]);
      this._people.push(objData);
    }


  }

  getPeople() {
    return this._people;
  }



  addPerson() {}

}

var objParser = new PersonParser('people.csv')
console.log(objParser.getPeople())
// console.log(obj.readFile('people.csv'));

// let parser = new PersonParser('people.csv')
//
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
