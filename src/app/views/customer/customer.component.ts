import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ButtonModule } from '@coreui/angular';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuard } from '../../layout/auth/auth.guard';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerService } from './customer.service';
@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  imports:[CommonModule, MatFormFieldModule, MatTableModule,ButtonModule,MatDialogModule,MatIconModule,MatMenuModule],
  providers:[AuthGuard]
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status','role','manage'];
  dataSource: any;
  errorMessage: string | null = null;
  constructor( private dialog: MatDialog,private customerService:CustomerService) {

   }

  ngOnInit(): void {
    this.customerService.getCustomerList().then(res=>{
    this.dataSource = res
  })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CustomerFormComponent ,{
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.customerService.getCustomerList().then(res=>{
        this.dataSource = res
      })
    });
  }
  EditRow(event:any,row:any) {
    const dialogRef = this.dialog.open(CustomerFormComponent ,{
      width: '700px',
      data: {
        id:row.id,
        name:row.name,
        status:row.status,
        role:row.role
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.customerService.getCustomerList().then(res=>{
        this.dataSource = res
      })
    });
  }
  DeleteItem(event:any,row:any) {
    this.customerService.deleteCustomer(row.id).then(()=>{
      this.customerService.getCustomerList().then(res=>{
        this.dataSource = res
      })
    })

  }
}
