"use strict"

const fs = require('fs')

class Person {

  constructor(id, first_name, last_name, email, phone, date){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = date
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.listPeople()
  }

  listPeople(){
    let arrPeople = []
    let listPeople = []
    let read_data = fs.readFileSync(this._file).toString().trim().split("\n")
    
    for(let i=1; i<read_data.length; i++){
      arrPeople.push(read_data[i].split(','))
    }

    for(let j=0; j<arrPeople.length; j++){
      let id = arrPeople[j][0]
      let first_name = arrPeople[j][1]
      let last_name = arrPeople[j][2]
      let email = arrPeople[j][3]
      let phone = arrPeople[j][4]
      let date = arrPeople[j][5]

      let dataPerson = new Person(id, first_name, last_name, email, phone, date)
      listPeople.push(dataPerson)
    }
    return listPeople
  }

  get people() {
    return {size: this._people.length}
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
  }

  save(){
    let listPeople = "id,first_name,last_name,email,phone,created_at"+'\n'

    for(let i=0; i<this._people.length; i++){
      listPeople += this._people[i]._id+','+this._people[i]._first_name+','+this._people[i]._last_name+','+this._people[i]._email+','+this._people[i]._phone+','+this._people[i]._created_at+'\n'
    }
    fs.writeFileSync(this._file, listPeople)
    console.log(listPeople);
    
  }

}

let parser = new PersonParser('./people.csv')

parser.addPerson(new Person(parser.people.size+1, 'Edi', 'Kartono', 'edi.kartono@gmail.com', '0812345678', new Date().toString()))

// console.log(parser);
// console.log(parser.listPeople());

parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)


