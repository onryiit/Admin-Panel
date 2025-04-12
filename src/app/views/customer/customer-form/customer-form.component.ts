import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ButtonModule } from '@coreui/angular';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  imports:[CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
     MatTableModule,
     ButtonModule,
     MatDialogModule,
     MatSelectModule,
     MatInputModule,
     MatDatepickerModule,
     MatIconModule,
     ReactiveFormsModule
    ]
})
export class CustomerFormComponent implements OnInit {
  currentForm!: FormGroup;
  isEdit:boolean=false;
  formdata:any;
  items:any[]=[{id:1,name:"Active"},{id:2,name:"Passive"}]
  itemsRole:any[]=[{id:1,name:"Admin"},{id:2,name:"User"}]
  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    private customerService:CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && Object.keys(data).length > 0) {
      this.isEdit = true;
      this.formdata = data;
    } else {
      this.isEdit = false;
      this.formdata = {};
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.currentForm = this.formBuilder.group({
      name: [this.formdata.name],
      status: [this.formdata.status],
      role: [this.formdata.role],
    });
  }
  openedChange() {
    console.log('Selection opened or closed');
  }
  opened() {
    console.log('Selection opened');
  }
  closed() {
    console.log('Selection closed');
  }
  onChanged(event: any) {
    console.log(event.value);
  }
  sendDataToDatabase() {
    const data = this.currentForm.getRawValue();
    if(this.isEdit === true){
      this.customerService.UpdateCustomer(this.formdata.id ,data)
    }else{
      this.customerService.saveCustomer(data)
      this.dialogRef.close();
    }

  }
}
