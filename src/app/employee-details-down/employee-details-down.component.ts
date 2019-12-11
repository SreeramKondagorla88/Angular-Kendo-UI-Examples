

import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.interface';
import { State } from '@progress/kendo-data-query';
import { ApirequestService } from '../apirequest.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-details-down',
  templateUrl: './employee-details-down.component.html',
  styleUrls: ['./employee-details-down.component.scss']
})
export class EmployeeDetailsDownComponent implements OnInit {
 employeeData :Employee;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
};
private editedRowIndex: number; 
public formGroup: FormGroup;
public editForm : FormGroup;


  constructor(private employee:ApirequestService,private formBuilder: FormBuilder) {
    this.editForm = new FormGroup({
      id : new FormControl(null),
      units : new FormControl("dummy",Validators.required), 
      // employee_salary : new FormControl("dummy",Validators.required),
      // employee_age : new FormControl("dummy",[Validators.required]),
     
      // lastName: new FormControl(''),
    });
   }
  loading :boolean = true;
  ngOnInit() {
    
    this.loading = true
    this.employee.getEmployees().subscribe((data:Employee)=>{
      console.log(JSON.stringify(data));
      
      this.employeeData = data;
      this.loading = false;
    })
    
  }
  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  } 
  public editHandler({sender, rowIndex, dataItem}) {
    
}
public createFormGroup(dataItem: any){
  console.log(JSON.stringify(dataItem));

  // this.editForm = new FormGroup({
  //   empID : dataItem.id,
  //   employee_name : dataItem.employee_name, 
  //   employee_salary : dataItem.employee_salary,
  //   employee_age :dataItem.employee_salary,
   
    
  // });
}
public saveHandler() {
  
  console.log(this.editForm.value)
  // console.log(JSON.stringify(employee))
  // this.employee.updateEmployee(employee).subscribe((data:Employee)=>{
  //   var dtaa = JSON.stringify(data)
  
  //   console.log(dtaa);
  //   this.ngOnInit();
  // })

  // sender.closeRow(rowIndex);
}
private isReadOnly(field: string): boolean {
  const readOnlyColumns = ['employee_salary', 'employee_age','id'];
  return readOnlyColumns.indexOf(field) > -1;
}
public removeHandler({ sender, dataItem }) {
  // alert(JSON.stringify(dataItem))
  this.employee.removeEmployee(dataItem).subscribe((data)=>{
    alert(JSON.stringify(data));
  })
 // alert(sender.cancelCell())
}
public onStateChange(state: State) {
  this.gridState = state;

  // this.editService.read();
}
private closeEditor(grid, rowIndex = this.editedRowIndex) {
  grid.closeRow(rowIndex);
  this.editedRowIndex = undefined;
  this.formGroup = undefined;
}
}


