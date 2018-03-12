"use strict"

var fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this._id = this.id;
    this._firstName = this.first_name;
    this._lastName = this.last_name;
    this._email = this.email;
    this._phone = this.phone;
    this.createdAt = this.created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    var people = fs.readFileSync(this._file, 'utf8').split('\n');
    var obj = {}
    for (var i = 1; i < people.length; i++) {

      var splitSekarang = people[i].split(',');
      obj.ID = splitSekarang[0];
      obj.first_name = splitSekarang[1];
      obj.last_name = splitSekarang[2];
      obj.email = splitSekarang[3];
      obj.phone = splitSekarang[4]
      obj.createdAt = new Date(splitSekarang[5]).toDateString()
      this._people.push(obj);
      obj = {};
    }

    return this._people;
    // return this._people
  }
  //
  addPerson(object) {
    var object = this.people
    object.push('a')

    return object
  }

}

let parser = new PersonParser('people.csv')
// parser.addPerson(new Person('adasdasda'))

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// parser.people
console.log(parser.addPerson())
