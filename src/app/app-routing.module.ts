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
        path: 'autentificacion',
        loadChildren: () => import('./component/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'configuracionEvento',
        loadChildren: () => import('./component/administracion/administracion.module').then(m => m.AdministracionModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./component/pageInit/modal-form/modal-form.component').then(m => m.ModalFormComponent)
      }
    ]
  },
];
