"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.arrayData()
  }

  arrayData(){
    let peopleArr=[]
    const fs = require('fs');
    let buffer = fs.readFileSync(this._file, 'utf8');
    let data = buffer.split("\n")
    // console.log(fields)

    for(let i=1; i<data.length; i++){
      let field = data[i].split(",")
      let objPerson = new Person(field[0], field[1], field[2], field[3], field[4], field[5],)
      peopleArr.push(objPerson)
    }
    return peopleArr
  }

  get people() {
      return this._people
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
    // return this._people
  }


  save(){
    let data=this._people
    let arrData=[]
    for(let i=0; i<data.length; i++){
      let strField = `${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at}`
      arrData.push(strField)
    }
    let strData = arrData.join("\n")

    const fs=require('fs')
    let writeFile = fs.writeFileSync(this._file, strData, 'utf8')
  }

  get file(){
    return this._file
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person('201', 'annisa', 'ayu', 'annisaayu@email.com', '087808810278', '2018-03-14'))
console.log(parser.save());
console.log(parser.people);
