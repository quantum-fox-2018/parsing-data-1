"use strict"
const fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._id = id;
    this._firstName = first_name;
    this._lastName = last_name;
    this._email = email;
    this._phone = phone;
    this._createdAt = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._fs = fs.readFileSync(file, 'utf-8');
    this._file = file
    this._people = null
  }
  
  seedPeople() {
    let peopleArr = [];
    let data = this._fs.split('\n');
    for(let i=1; i<data.length; i++){
      let dataSplit = data[i].split(',');
      let id = dataSplit[0];
      let fname = dataSplit[1];
      let lname = dataSplit[2];
      let email = dataSplit[3];
      let phone = dataSplit[4];
      let creatAt = dataSplit[5];
      let person = new Person(id,fname,lname,email,phone,creatAt)
      peopleArr.push(person);
    }
    this._people = peopleArr;
  }

  get file(){
    return this._file;
  }

  get people() {
    this._people
    return this;
  }

  get size(){
    let size = this._people.length;
    return size;
  }

  addPerson(id,fname,lname,email,phone,creatAt) {
    let nextId = this._people.length+1;
    let person = new Person(nextId,fname,lname,email,phone,creatAt)
    this._people.push(person);
  }

  save(){
    let dataWrite = [];
    dataWrite.push(['id','first_name','last_name','email','phone','created_at']);
    for(let i=0; i<this._people.length; i++){
      let id = this._people[i]._id;
      let fname = this._people[i]._firstName;
      let lname = this._people[i]._lastName;
      let email = this._people[i]._email;
      let phone = this._people[i]._phone;
      let creatAt = this._people[i]._createdAt;
      dataWrite.push([id,fname,lname,email,phone,creatAt]);
    }
    fs.writeFileSync(this._file, dataWrite.join('\n'));
    // console.log(dataWrite)
  }

}

let parser = new PersonParser('people.csv');

parser.seedPeople()
parser.addPerson('777','Yohanes','Sahrul','yosa@gmail.com','021-1234','21 maret')
console.log(parser.people)
parser.save();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)


