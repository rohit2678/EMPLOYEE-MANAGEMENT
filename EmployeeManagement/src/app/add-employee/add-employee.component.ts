import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  name: string;
  company: string;
  email: string;
  contact: number;
  designation: string
  employee: Array<Employee> = [];

  constructor() { }


  ngOnInit() {
  }

  onAdd() {
    //this.task.employee.push({ name: this.name.toUpperCase(), avatar: ("E" + (Math.floor(100000 + Math.random() * 900000))), companyName: this.company.toUpperCase(), contactNo: this.contact, designation: this.designation.toUpperCase(), emailID: this.email.toUpperCase() });
    const employeeInfo = localStorage.getItem("employee");
    this.employee = [];
    if (employeeInfo) {
      const employeeArray = JSON.parse(employeeInfo);
      const employeeFound = employeeArray.find((employee: Employee) => employee.name == this.name.toUpperCase() && employee.companyName == this.company.toUpperCase() && employee.contactNo == this.contact && employee.designation == this.designation.toUpperCase());
      const employeeEmailFound = employeeArray.find((employee: Employee) => employee.emailID == this.email.toUpperCase());
      const employeeNumberFound = employeeArray.find((employee: Employee) => employee.contactNo == this.contact);
      if (employeeFound) {
        alert("Employee already Exists");
      }
      else if(employeeEmailFound){
        alert("Email Already exists");
      }
      else if(employeeNumberFound){
        alert("Mobile Number Already Exists");
      }
      else {
        console.log("EmployeeList ", employeeArray);
        console.log("Employee", this.employee);
        this.employee.push(...employeeArray);
        this.employee.push({ name: this.name.toUpperCase(), avatar: ("E" + (Math.floor(100000 + Math.random() * 900000))), companyName: this.company.toUpperCase(), contactNo: this.contact, designation: this.designation.toUpperCase(), emailID: this.email.toUpperCase() });
        localStorage.setItem("employee", JSON.stringify(this.employee));
      }
    }
    else {
      console.log("Going to else");
      this.employee.push({ name: this.name.toUpperCase(), avatar: ("E" + (Math.floor(100000 + Math.random() * 900000))), companyName: this.company.toUpperCase(), contactNo: this.contact, designation: this.designation.toUpperCase(), emailID: this.email.toUpperCase() });
      localStorage.setItem("employee", JSON.stringify(this.employee));
    }
    this.name = "";
    this.company = "";
    this.email = "";
    this.contact = null;
    this.designation = "";
  }

  onCancel() {
    this.name = "";
    this.company = "";
    this.email = "";
    this.contact = null;
    this.designation = "";
  }
}
