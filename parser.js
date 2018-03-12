"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.createArr();
  }

  createArr(){
    let fs = require('fs')
    var data = fs.readFileSync(this._file, 'utf8').split('\n');
    let dataArr = [];

    for(let index =1; index < data.length; index++){ 
      let row = data[index].split(',');

      dataArr.push(new Person(row[0], row[1], row[2], row[3], row[4], row[5]))
    }
    return dataArr;
  }

  get people() {
    return this._people
  }

  get file(){
    return this._file;
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  save(){
    let fs = require('fs');
    let data = this._people;
    let arr = [];

    for(let index=0; index<data.length; index++){
      let string = '';
      string = `${data[index].id},${data[index].first_name},${data[index].last_name},${data[index].email},${data[index].phone},${data[index].created_at}`
      arr.push(string);
    }

    fs.writeFileSync(this._file, arr.join('\n') , 'utf8');
  }

  
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, 'Bobby', 'Tono', 'bob@apa.com', '12734123', '2012-05-10T03:53:40-07:00'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();

