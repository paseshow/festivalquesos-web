import { Routes } from '@angular/router';


export const AppRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: '',
        loadChildren: () => import('./component/pageInit/page-init.module').then(m => m.PageInitModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./component/modal-form/modal-form.component').then(m => m.ModalFormComponent)
      }
    ]
  }
];
