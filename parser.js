"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
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

  constructor(file) {
    this._file = file
    this._people = this.toArray()
  }
  toArray(){
    let persons = fs.readFileSync(this._file, 'UTF8').split('\r\n');
    //console.log(persons)
    //return persons
    var arrPerson = []
    //
    for(var i =0; i < persons.length; i++ ){
            var personsSplited = persons[i].split(',')
            var tempArr = new Person(personsSplited[0],personsSplited[1],personsSplited[2],personsSplited[3],personsSplited[4],personsSplited[5])
            arrPerson.push(tempArr)
    }
    console.log(arrPerson)
    return arrPerson
  }
  get people() {

    return this._people
  }

  addPerson(data) {
    return this._people.push(data)
  }
  save (){
    console.log(this._people)
    var fs = require('fs');
    //fs.writeFileSync(file, data[, options])
    //console.log('this people save'+this.people);
    //console.log(this.people)
    //console.log(this._people)
    var arrTotal = []

    for(var i=0; i<this._people.length;i++){
      var arr = []
      arr.push(this._people[i].id,this._people[i].first_name,this._people[i].last_name,this._people[i].email,this._people[i].phone,this._people[i].created_at)
      arrTotal.push(arr)
    }
    let writeCSV = arrTotal.join('\r\n')
    console.log(arrTotal.join('\r\n'))
    fs.writeFile('./people_new.csv', writeCSV);
   }
}

let parser = new PersonParser('people.csv')

//let parser = new PersonParser(data)

 console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// console.log(data[2])
//
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person('201','Johanson','Abraham','j.abraham@gmail.com','1-261-763-9904','2012-09-15T12:06:16-07:00'))
//console.log(parser.people)
parser.save()
