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
        loadComponent: () => import('../Notes/notes.component').then(m => m.NotesComponent),
        data: {
          title: 'Notes List'
        }
      },
    ]
  }
];
