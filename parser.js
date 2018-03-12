"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}


class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null;
    this._newString = null;
  }

  get people() {
    this.arrayToObject()
    return this._people;
  }

  readFileCSV(){
    let fileCSV = fs.readFileSync(this._file,'utf8');
    return fileCSV;
  }

  stringToArray(){
    let stringFile = this.readFileCSV().split('\n');
    let databaseCSV = []
    for(let i=0;i<stringFile.length-1;i++){
      let arrayFile = (stringFile[i].split(","));
      databaseCSV.push(arrayFile);
    }
    console.log(databaseCSV);
    //ubah format Date
    for(let i=0;i<databaseCSV.length;i++){
      databaseCSV[i][5] = new Date(databaseCSV[i][5]);
    }
    console.log(databaseCSV);
    return databaseCSV;
  }

  arrayToObject(){

    let databaseArray = this.stringToArray();
    let databaseObject = []

    for(let i=1;i<databaseArray.length;i++){
      let person = new Person(databaseArray[i][0],databaseArray[i][1],databaseArray[i][2],databaseArray[i][3],databaseArray[i][4],databaseArray[i][5]);
      databaseObject.push(person)
    }

    for(let i=0;i<databaseObject.length;i++){
      databaseObject[i].created_at = new Date(databaseObject[i].created_at);
    }
    this._people = databaseObject;
    return this._people;
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {

    let getData = this.arrayToObject();
    let getKeyName = this.stringToArray()[0];
    let person = new Person(id,first_name,last_name,email,phone,created_at);
    getData.push(person);
    let newDataString = '';
    for(let i=0;i<getKeyName.length-1;i++){
      newDataString = newDataString + getKeyName[i] +','
    }
    newDataString = newDataString + getKeyName[getKeyName.length-1] + '\n'
    for(let i=0;i<getData.length;i++){
      newDataString=newDataString + getData[i].id + ',';
      newDataString=newDataString + getData[i].first_name + ',';
      newDataString=newDataString + getData[i].last_name + ',';
      newDataString=newDataString + getData[i].email + ',';
      newDataString=newDataString + getData[i].phone + ',';
      newDataString=newDataString + getData[i].created_at + '\n';
    }

    this._newString = newDataString
    return newDataString;
  }

  save(){
    fs.writeFileSync(this._file,this._newString + '\n','utf8');
  }

}


let parser = new PersonParser('people.csv');
//console.log(parser.addPerson('201','Muhammad','Ramadiansyah','tes@gmail.com','1234','1995-02-02'));

//parser.addPerson('201','Muhammad','Rama','tes@gmail.com','1234', new Date());
//parser.save();
console.log(parser.people[200]);
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
