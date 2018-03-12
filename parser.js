"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, create_at) {

    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.create_at = create_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.convertStringToArray() 
  }

  convertFileToString(){
    return fs.readFileSync(this._file).toString()
  }

  convertStringToArray(){
    let listPerson = []
    let string = this.convertFileToString()
    let rows = string.split('\n')
    // let listPerson = []
    for(let i=1; i < rows.length; i++){

      let dataPerson = rows[i].split(",") // [1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00]
      let person = new Person(dataPerson[0], dataPerson[1], dataPerson[2], dataPerson[3], dataPerson[4], dataPerson[5])
      // listPerson.push(person)
      listPerson.push(person)
    }
    
    return listPerson
  }


  get people() {
    
    return this._people
  }

  addPerson(data) {
      // - bikin object user
      // - push ke listperson 
      return this._people.push(data)
  }

}

var fs = require('fs')
let parser = new PersonParser('people.csv')

// parser.convert()
// console.log(string)
parser.addPerson(new Person('255', 'John', 'Doe', 'blabla@bla.com', '08697897793', '1-711-759-7595,2013-09-30T14:02:02-07:00'))
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser.people)