"use strict"

var fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {
  constructor(namaFile) {
    this._file = namaFile
    this._people = null
  }

  readFile(){
    var data = fs.readFileSync('people.csv','utf8')
    return data
  }

  parseFiletoArray(){
    var stringPeople = this.readFile().split('\n')
    var peoples = []
    for(let i=0; i<stringPeople.length; i++){
      peoples.push(stringPeople[i].split(','))
    }
    // console.log(stringPeople.length)
    return peoples
  }

  convertArrayToObjects(){
    var arrPeople = this.parseFiletoArray()
    var peopleArrObj = []
    var key = arrPeople[0]
    // console.log(key)
    for(let i=0; i<arrPeople.length; i++){
      let peopleObj = {}
      for(let j=0; j<key.length; j++){
        peopleObj[key[j]]=arrPeople[i][j]
      }
      peopleArrObj.push(peopleObj)
    }
    return peopleArrObj
  }

  get people() {
    this._people = this.convertArrayToObjects()
    return this._people
  }

  addPerson() {
    var arrPeople = this.parseFiletoArray()
    // console.log(arrPeople)
    // id,first_name,last_name,email,phone,created_at
    arrPeople.push([201,'Muhammad','Maulana','yasir.maulana@gmail.com','0815-8624-5143','2012-04-21', new Date])
    return arrPeople
  }

  save(){
    var arrPeople = this.addPerson().join('\n')
    // console.log(arrPeople)
    fs.writeFileSync('people.csv',arrPeople,'utf8')
  }

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.log(parser.readFile())
// console.log(parser.parseFiletoArray())
console.log(parser.convertArrayToObjects())
// console.log(parser.people)
// console.log(parser.addPerson())
// console.log(parser.arraytoString())
// console.log(parser.save())
