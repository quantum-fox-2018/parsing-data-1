"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id, first_name, last_name, email,phone, created_at
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._people = [];

    let fs = require('fs');
    let peopleData = fs.readFileSync(file,'utf8').split('\n');

    this.insertObjToPeople(peopleData);
  }

  insertObjToPeople(data){
    let peopleData = data;

    //limit atasnya pake -1 satu karena waktu save file di editor (CTRL+S) malah nambah 1 baris whitespace di akhir
    //whitepace nya engggak bisa di delete
    for(let line = 1; line < peopleData.length-1; line++){
      let individu = peopleData[line].split(',');
      individu[5] = new Date(individu[5])
      let person = new Person(individu[0],individu[1],individu[2],individu[3],individu[4],individu[5]);
      this.people.push(person);
    }
  }

  addPerson(persons) {
    let bunchOfPersons = persons;

    for(let index = 0; index < bunchOfPersons.length; index++){
      bunchOfPersons[index][5] = new Date(bunchOfPersons[index][5])
      let person = new Person(bunchOfPersons[index][0],bunchOfPersons[index][1],bunchOfPersons[index][2],bunchOfPersons[index][3],bunchOfPersons[index][4],bunchOfPersons[index][5]);
      this.people.push(person);
    }
  }

  save(){
    let rawData = 'id,first_name,last_name,email,phone,created_at\n';
    for(var line = 0; line < this._people.length; line++){
      rawData = rawData + this._people[line].id + ',' + this._people[line].first_name + ',' + this._people[line].last_name + ',' +
                  this._people[line].email + ',' + this._people[line].phone + ',' + this._people[line].created_at + '\n';
    }

    let fs = require('fs');
    fs.writeFileSync(this._file,rawData,'utf8');
  }

  get people() {
    return this._people
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson([['201','Rafie','Gilang','gilang0293@gmail.com','0821-8484-7390','2018-03-12T10:09:03-08:00'],
                ['202','Joshua','Suhendra','dikobok2@gmail.com','0833-7678-0941','2018-03-12T10:09:45-08:00']]);
parser.save();


//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
