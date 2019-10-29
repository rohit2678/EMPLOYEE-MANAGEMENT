import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Employee } from '../employee.model';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private task: TaskService) { }

  employee: Employee;
  allEmployees: Array<Employee> = [];
  isEmployee: boolean;
  isSelected = false;
  selectedEmployee: number;
  name: string;
  company: string;
  email: string;
  contact: number;
  designation: string;

  isEditable = false;

  ngOnInit() {
    const employeeInfo = localStorage.getItem("employee");
    this.isSelected = false;
    this.selectedEmployee = null;
    //this.isEditable = false;
    if (employeeInfo) {
      this.isEmployee = true;
      const employeeArray = JSON.parse(employeeInfo);
      this.allEmployees.push(...employeeArray);
      console.log(this.allEmployees, "boolean", this.isEmployee);
    }
    else {
      this.isEmployee = false;
    }
  }

  onSelect(index: number) {
    console.log("Index ", index);
    this.isSelected = true;
    this.employee = this.allEmployees[index];
    this.selectedEmployee = index;
    this.name = this.employee.name.toUpperCase();
    this.company = this.employee.companyName.toUpperCase();
    this.email = this.employee.emailID.toUpperCase();
    this.contact = this.employee.contactNo;
    this.designation = this.employee.designation.toUpperCase();
  }

  onEdit() {
    this.isEditable = true;
  }

  onSaveChanges() {
    if (this.employee.name === this.name.toUpperCase() || this.employee.companyName == this.company.toUpperCase() || this.employee.contactNo == this.contact || this.employee.emailID == this.email.toUpperCase() || this.employee.designation == this.designation.toUpperCase()) {
      const employee = JSON.parse(localStorage.getItem("employee"));
      employee[this.selectedEmployee].name = this.name.toUpperCase();
      employee[this.selectedEmployee].companyName = this.company.toUpperCase();
      employee[this.selectedEmployee].emailID = this.email.toUpperCase();
      employee[this.selectedEmployee].contactNo = this.contact;
      employee[this.selectedEmployee].designation = this.designation.toUpperCase();
      //console.log("Changes Done ", employee, "Changes ", employee[this.selectedEmployee].emailID);
      localStorage.setItem("employee", JSON.stringify(employee));
    }
    //localStorage.setItem("employee", JSON.stringify(this.allEmployees));
    this.isEditable = false;
  }

  onCancel() {
    const employee = JSON.parse(localStorage.getItem("employee"));
    this.name = employee[this.selectedEmployee].name.toUpperCase();
    this.company = employee[this.selectedEmployee].companyName.toUpperCase();
    this.email = employee[this.selectedEmployee].emailID.toUpperCase();
    this.contact = employee[this.selectedEmployee].contactNo;
    this.designation = employee[this.selectedEmployee].designation.toUpperCase();
    this.isEditable = false;
  }

  onDeleteEmployee() {
    if (confirm("Do you want to delete the employee...")) {
      const employee = JSON.parse(localStorage.getItem("employee"));
      this.allEmployees = employee;
      this.allEmployees.splice(this.selectedEmployee, 1);
      //console.log("this.allEmployees.length ", this.allEmployees.length);
      localStorage.setItem("employee", JSON.stringify(this.allEmployees));
      this.isSelected = false;
      if(this.allEmployees.length == 0){
        this.isEmployee = false;
      }
    }

  }
}
