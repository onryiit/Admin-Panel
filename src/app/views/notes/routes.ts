import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notes'
    },
    children: [
      {
        path: 'list',
        loadComponent: () => import('../notes/notes.component').then(m => m.NotesComponent),
        data: {
          title: 'Notes List'
        }
      },
    ]
  }
];
