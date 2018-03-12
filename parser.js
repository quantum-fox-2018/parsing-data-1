"use strict"
var fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id           = id;
    this.firstName    = first_name;
    this.lastName     = last_name;
    this.email        = email;
    this.phone        = phone;
    this.timeCreated  = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let newPerson = new Person(id, first_name, last_name, email, phone, created_at);
    return this._people.push(newPerson);
  }

  generateData(){
    let data    = fs.readFileSync('people.csv','utf8')
    let arrData = data.split('\n')

    for(var i = 0; i < arrData.length; i++){
      let arrRow = arrData[i].split(',')
      let obj = new Person(arrRow[0], arrRow[1], arrRow[2], arrRow[3], arrRow[4], arrRow[5]);

      this._people.push(obj);
    }
    return this._people;
  }

  save(){

    let arrResult = [];
    for(var i = 0; i < this._people.length; i++){
      var arrTmp = []
      arrTmp.push(this._people[i].id);
      arrTmp.push(this._people[i].firstName);
      arrTmp.push(this._people[i].lastName);
      arrTmp.push(this._people[i].email);
      arrTmp.push(this._people[i].phone);
      arrTmp.push(this._people[i].timeCreated);
      arrResult.push(arrTmp+'\n');
    }
    let strResult = arrResult.join('');
    let saveFile = fs.writeFileSync('people.csv', strResult);
    return saveFile;
  }
}

let parser = new PersonParser('people.csv');
parser.generateData()
parser.addPerson('201', 'Oky', 'Wiliarso', 'okywiliarso@gmail.com', '1-645-511-7768', new Date())
parser.save()

console.log(`There are ${parser.people.length-1} people in the file '${parser._file}'.`)
