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
import moment from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { NoteService } from '../notes-form.service';

@Component({
  selector: 'app-notes-form',
  standalone: true,
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.scss',
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
export class NotesFormComponent implements OnInit {
  currentForm!: FormGroup;

  count: number = 1;
  isEdit:boolean=false;
  formdata:any;
  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<NotesFormComponent>,
    private noteService:NoteService,
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
      title: [this.formdata.title],
      desc: [this.formdata.content],
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
      this.noteService.UpdateNote(this.formdata.id ,data)
    }else{
      this.noteService.saveNote(data)
      this.dialogRef.close();
    }

  }
}
