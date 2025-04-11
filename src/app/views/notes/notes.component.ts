import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ButtonModule } from '@coreui/angular';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NoteService } from './notes-form.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuard } from '../../layout/auth/auth.guard';
@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  imports:[CommonModule, MatFormFieldModule, MatTableModule,ButtonModule,MatDialogModule,MatIconModule,MatMenuModule],
  providers:[AuthGuard]
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'desc','manage'];
  dataSource: any;
  errorMessage: string | null = null;
  constructor( private dialog: MatDialog,private noteService:NoteService) {

   }

  ngOnInit(): void {
    this.noteService.getNotesList().then(res=>{
    this.dataSource = res
  })

    // this.bookService.getBookList()
    //   .then((res: any) => {
    //     this.dataSource = res || [];
    //     this.errorMessage = null;
    //   })
    //   .catch((error: any) => {
    //     console.error('Error fetching book list', error);
    //     this.errorMessage = 'Failed to load books. Please try again later.';
    //   });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NotesFormComponent ,{
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.getNotesList().then(res=>{
        this.dataSource = res
      })
    });
  }
  EditRow(event:any,row:any) {
    const dialogRef = this.dialog.open(NotesFormComponent ,{
      width: '700px',
      data: {
        id:row.id,
        title:row.title,
        content:row.content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.getNotesList().then(res=>{
        this.dataSource = res
      })
    });
  }
  DeleteItem(event:any,row:any) {
    // const dialogRef = this.dialog.open(NotesFormComponent ,{
    //   width: '700px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.noteService.getNotesList().then(res=>{
    //     this.dataSource = res
    //   })
    // });
    this.noteService.deleteNote(row.id).then(()=>{
      this.noteService.getNotesList().then(res=>{
        this.dataSource = res
      })
    })

  }
}
