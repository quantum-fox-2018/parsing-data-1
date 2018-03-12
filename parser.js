"use strict"

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {
  constructor(file){
    this._file = file
    this._people = []
  }

  get file(){
    return this._file
  }

  get people(){
    return this._people
  }

  addPeople(){
    for(let i=1; i<this.file.length-1; i++){
      let person = this.file[i].split(',')
      let dataInput = new Person(Number(person[0]),person[1],person[2],person[3],
        person[4],person[5])
      this.people.push(dataInput)
    }
  }

  addPerson(input){
    this.people.push(input)
  }

  save(){
    let newArrayOfPerson = ['id,firstName,lastName,email,phone,createdAt'];
    for(let i=0; i<this.people.length; i++){
      let person = this.people[i]
      newArrayOfPerson.push(`${person.id},${person.firstName},${person.lastName},${person.email},${person.phone},${person.createdAt}`)
    }
    let newData = newArrayOfPerson.join('\n')
    fs.writeFile('people.csv',newData,(err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

}

const fs = require('fs')
var persons = fs.readFileSync('people.csv','utf8')
  .split('\n')
let parser = new PersonParser(persons)
parser.addPeople()
parser.addPerson(new Person('201','Fitrul','Islam','fitrul.islam@gmail.com','1-444-555-6666','2014-08-12T20:52:09-07:00'))
// parser.save();

console.log(`There are ${parser.people.length} people in the file people.csv.`)
