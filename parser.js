"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._people =this.readFile()

  }


  readFile(){
    let fs = require('fs');
    let file = fs.readFileSync(this._file, 'utf8').split('\n');
    let dataFile =[]

     for (var i = 0; i < file.length; i++) {
       let data = file[i].split(',')
        let person = new Person (data[0],data[1],data[2],data[3],data[4],data[5])
      dataFile.push(person)
     }
     return dataFile
  }

  get people() {
    return this._people
  }

  get file(){
   return this._file;
 }



  addPerson(addNew) {
    this._people.push(addNew)
  }

  save(){
    let fs = require('fs');
    let data = this._people;
    let dataFile = [];

    for(let i=0; i<data.length; i++){
      let string = '';
      string = `${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at}`
      dataFile.push(string);
    }

    fs.writeFileSync(this._file, dataFile.join('\n') , 'utf8');
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, 'faldhi', 'sableng', 'akugila@apa.com', 'BH151TT', '2012-05-10T03:53:40-07:00'))



console.log("last registry:");
console.log(parser.people[203]);
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();
