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
      //2012-05-10T03:53:40-07:00
      //new Date(year, month, day)
      // var rawDate = temp[5].toString()
      // var year =
      // var month =
      // var day =
      // var d = new Date(year, month, day)
      var obj = new Person(temp[0], temp[1], temp[2], temp[3], temp[4],  temp[5])
      this._people.push(obj)
    }

  }

  get file(){
    return this._file
  }

  set file(file){
    this._file = file
  }

  get people(){
    return this._people
  }

  set people(people){
    this._people = people
  }


  get people() {
    return this._people
  }

  getPeopleatIndex(index){
    return this._people[index]
  }

  addPerson(id, firstName, lastName, email, phone, created_at) {
    var tmpPerson = new Person(id, firstName, lastName, email, phone, created_at)
    this._people.unshift(tmpPerson)
  }

  save(){
    var fs = require("fs");
    var str = ""

    for (var i = 0; i < this._people.length; i++) {
      if (this._people[i].id) {
        str += this._people[i].id + "," +
        this._people[i].firstName + "," +
        this._people[i].lastName + "," +
        this._people[i].email + "," +
        this._people[i].phone + "," +
        this._people[i].createdAt + '\n'
      }
    }
    fs.writeFileSync(this._file, str, "utf8")
  }
}

let parser = new PersonParser('people.csv')

//tambah orang
parser.addPerson(188, "abc", "def", "abc@def", "12345", "today")
parser.addPerson(1112, "abc", "def", "abc@def", "12345", "today")
parser.save()
