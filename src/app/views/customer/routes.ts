import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer'
    },
    children: [
      {
        path: 'list',
        loadComponent: () => import('../customer/customer.component').then(m => m.CustomerComponent),
        data: {
          title: 'Customer List'
        }
      },
    ]
  }
];
