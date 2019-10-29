import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
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
  employee: Employee;

  constructor(private task: TaskService) { }


  ngOnInit() {
  }

  onAdd() {
    this.task.employee.push({ name: this.name.toUpperCase(), avatar: ("E" + (Math.floor(100000 + Math.random() * 900000))), companyName: this.company.toUpperCase(), contactNo: this.contact, designation: this.designation.toUpperCase(), emailID: this.email.toUpperCase() });
    const employeeInfo = localStorage.getItem("employee");
    if (employeeInfo) {
      const employeeArray = JSON.parse(employeeInfo);
      const employeeFound = employeeArray.find((employee: Employee) => employee.name == this.name.toUpperCase() && employee.companyName == this.company.toUpperCase() && employee.contactNo == this.contact && employee.designation == this.designation.toUpperCase());
      if (employeeFound) {
        alert("Employee already Exists");
      }
      else {
        console.log("EmployeeList ", employeeArray);
        console.log("Employee", this.task.employee);
        this.task.employee.push(...employeeArray);

        localStorage.setItem("employee", JSON.stringify(this.task.employee));
      }
    }
    else {
      console.log("Going to else");
      localStorage.setItem("employee", JSON.stringify(this.task.employee));
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
