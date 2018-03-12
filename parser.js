"use strict"
const fs = require('fs')
var content_csv = fs.readFileSync('people.csv','utf8')
  .toString()
  .split("\n")
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(objPerson){
    this.id=objPerson.id
    this.first_name=objPerson.first_name
    this.last_name=objPerson.last_name
    this.email=objPerson.email
    this.phone=objPerson.phone
    this.created_at=objPerson.created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.people
  }

  get people() {
    let arrPeople=[]
    let arrObj=[]

    for (let i = 0; i < this._file.length; i++) {
      arrPeople.push(this._file[i].split(','))
    }
    for (let i = 1; i < arrPeople.length; i++) {
      let obj={}
      for (let j = 0; j < arrPeople.length; j++) {
        obj[arrPeople[0][0]] =  arrPeople[i][0]
        obj[arrPeople[0][1]] =  arrPeople[i][1]
        obj[arrPeople[0][2]] =  arrPeople[i][2]
        obj[arrPeople[0][3]] =  arrPeople[i][3]
        obj[arrPeople[0][4]] =  arrPeople[i][4]
        obj[arrPeople[0][5]] =  arrPeople[i][5]
      }
      arrObj.push(new Person(obj))

    }

    return arrObj
  }

  addPerson(inputObj) {
    for (let i = 0; i < inputObj.length; i++) {
      this._people.push(new Person(inputObj[i]))
    }
  }

  save(){
    var dataPeople
    dataPeople='id,first_name,last_name,email,phone,created_at \n'
    for (let i = 0; i < this._people.length; i++) {
      dataPeople+=this._people[i].id+','+this._people[i].first_name+','+this._people[i].last_name+','+this._people[i].email+','+this._people[i].phone+','+this._people[i].created_at+'\n'
      console.log(dataPeople);
        fs.writeFileSync('people.csv',dataPeople);
    }
  }

}

let parser = new PersonParser(content_csv)
var newPerson=[
  {
    id: 201,
    first_name: 'Eki',
    last_name: 'Fakhrureza',
    email: 'eki@gmail.com',
    phone: '0877777777',
    created_at: new Date()
  },
  {
    id: 202,
    first_name: 'Wiz',
    last_name: 'Khalifa',
    email: 'wiz@gmail.com',
    phone: '08101010101',
    created_at: new Date()
  }
]

parser.addPerson(newPerson)

parser.save()
console.log(parser._people);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
