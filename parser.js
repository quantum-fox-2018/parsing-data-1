"use strict"
const fs = require('fs')

class Person {
  constructor(person) {
    this.id = person.id
    this.first_name = person.first_name
    this.last_name = person.last_name
    this.email = person.email
    this.phone = person.phone
    this.created_at = person.created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  convert() {
    let data = fs.readFileSync('./people.csv', 'utf8').split('\n')
    // return data[0].split(',')
    for(let i=1; i<data.length; i++) {
      let currentData = data[i].split(',') 
      let person = {
        id: currentData[0],
        first_name: currentData[1],
        last_name: currentData[2],
        email: currentData[3],
        phone: currentData[4],
        created_at: currentData[5],
      }
      this._people.push(new Person(person))
    }
    return this._people
  }

  get people() {
    return this
  }

  get size() {
    let size = this._people.length
    return size
  }

  get file() {
    return this._file
  }

  addPerson(obj) {
    this._people.push(obj)
    return this._people
  }

  save() {
    let people = this._people
    let data = []
    let keys = Object.keys(people[0]) 
    data.push(keys.join(','))
    for(let i=0; i<people.length; i++) {
      let arr = []
      arr.push(people[i].id)
      arr.push(people[i].first_name)
      arr.push(people[i].last_name)
      arr.push(people[i].email)
      arr.push(people[i].phone)
      arr.push(people[i].created_at)
      data.push(arr)
    }

    data = data.join('\n')
    fs.writeFileSync('./people.csv',data)

  }
  
}

let parser = new PersonParser('people.csv')
parser.convert()

let wika = {
  id: 201,
  first_name: 'Wika',
  last_name: 'Silo',
  email: 'wika.silo@polka.com',
  phone: '081208120812',
  created_at: new Date()
}

parser.addPerson(new Person(wika))
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
