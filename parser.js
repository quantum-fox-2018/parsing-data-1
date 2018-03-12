"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.olah()
  }

  olah() {
    var arrObjFile = []
    var fs = require('fs')
    var file = fs.readFileSync('people.csv').toString().split("\n")

    for (var i = 1; i < file.length; i++) {
      var arrComma = file[i].split(',')
      arrObjFile.push(new Person(arrComma[0], arrComma[1], arrComma[2], arrComma[3], arrComma[4], arrComma[5]))
    }

    return arrObjFile;
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(data) {
    return this._people.push(data)
  }

  save() {


    var arr = this._people

    var arrOfStr = []
    for (var i = 0; i < arr.length; i++) {
      arrOfStr.push(`${arr[i].id},${arr[i].first_name},${arr[i].last_name},${arr[i].email},${arr[i].phone},${arr[i].created_at}`);
    }

    let string = arrOfStr.join('\n')

    var fs = require('fs')
    var file = fs.writeFileSync('people.csv', string, 'utf8')

  }

}

let parser = new PersonParser('people.csv')



parser.addPerson(new Person(201, 'Andrew', 'Santiago', 'cutechicksmagnet69@harem.com', '1-420-420-6969', '2019-01-20T20:32:30-08:00'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// console.log(parser.people);
parser.save()
