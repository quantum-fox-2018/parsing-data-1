"use strict"

var str = ""
class Person {
  constructor(id, firstName, lastName, email, phone, createdAt){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

    var fs = require("fs");
    var buf = fs.readFileSync(this._file, 'utf8');
    var rows = buf.split("\n")

    for (var i = 1; i < rows.length; i++) {
      var temp = rows[i].split(",")
      var obj = new Person(temp[0], temp[1], temp[2], temp[3], temp[4], temp[5])
      this._people.push(obj)
    }
  }

  getPeople() {
    return this._people
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.getPeople());
