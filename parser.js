"use strict"
var fs = require("fs");

// console.log(csvPerson);

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(nextArray){
    this.id = nextArray[0];
    this.first_name = nextArray[1];
    this.last_name = nextArray[2];
    this.email = nextArray[3];
    this.phone = nextArray[4];
    // this.created_at = nextArray[5];
    this.created_at = new Date(nextArray[5]);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];//this.generateCSV(); //null
    this.generateCSV();
    // this.columnHeader = [];
  }

  get people() {
    // this._people = this.generateCSV();
    return this._people;
  }
  //convert cvs file to String
  convertCVStoString(){
    return fs.readFileSync(this._file, 'UTF8');
  }

  //convert String to array
  convertStringToArray(str){
    return str.split('\n'); //convert string to array dengan \n / spasi enter sebagai pemisahny
  }

  // Convert svc file into multidimention Array
  generateCSV(){
    let cvsString = this.convertCVStoString();
    let strToArr = this.convertStringToArray(cvsString);
    // this.columnHeader = strToArr[0];
    let PersonsData = [];

    // dimulai dari 1 karena index 0 dipake untuk header
    for(let i = 1; i < strToArr.length; i++){
        //convert tiap baris menjadi array dengan ',' sebagai pemisahny
        let arrBaris = strToArr[i].split(',');

        //Convert array dalam satu baris menjadi object
        let objBaris = new Person(arrBaris);
        this._people.push(objBaris);
    }
    // return PersonsData;
  }

  incrementId(){
    let arrayPersons = this._people;
    return parseInt(arrayPersons[arrayPersons.length-1].id) + 1
  }

  personToArray(first_name, last_name, email, phone, created_at){
    let PersonArray = [];
    let idAuto = this.incrementId();

    PersonArray.push(idAuto.toString());
    PersonArray.push(first_name);
    PersonArray.push(last_name);
    PersonArray.push(email);
    PersonArray.push(phone);
    PersonArray.push(created_at);

    return PersonArray;
  }

  //menambahkan person baru dalam bentuk array
  addPerson(first_name, last_name, email, phone, created_at) {
    //memasukan data person baru
    let newPerson = this.personToArray(first_name, last_name, email, phone, created_at);
    // console.log(newPerson);

    //Convert data person menjadi object
    let objPerson = new Person(newPerson);
    // console.log(objPerson);
    this._people.push(objPerson);

    return this;
  }

  save(){
    let convertBackResult = this.convertBackToCvs();
    let save = fs.writeFile(this._file,convertBackResult);
    return save;
  }

  convertBackToCvs(){
    let PersonsData = this._people;
    let ConvertResult = [];

    for(let i = 0; i < PersonsData.length; i++){
        let string = '';
        string = `${PersonsData[i].id},${PersonsData[i].first_name},${PersonsData[i].last_name},${PersonsData[i].email},${PersonsData[i].phone},${PersonsData[i].created_at}`
        ConvertResult.push(string);

    }

    return ConvertResult.join('\n');
  }

}
let parser = new PersonParser('people.csv')
// console.log(parser._people[_people.length]);
console.log(parser);
// parser.generateCSV();
// console.log(parser.incrementId());

// parser.addPerson('dani', 'damara', 'danny12march@gmail.com', '082-120-858-592', 'Hacktiv8-16:18');
parser.addPerson('dani', 'damara', 'danny12march@gmail.com', '082-120-858-592', new Date());
// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
console.log(parser._people[parser._people.length-1]);
console.log(parser.convertBackToCvs());
parser.save();
