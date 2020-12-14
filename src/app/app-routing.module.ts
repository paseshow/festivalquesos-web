import { Routes } from '@angular/router';

// { //autentificacion './component/authentication/authentication.module'
//         path: '',
//         loadChildren: () => import('./component/pageInit/page-init.module').then(m => m.PageInitModule)
//       },


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
        loadChildren: () => import('./component/modal-form/modal-form.component').then(m => m.ModalFormComponent)
      },
      {
        path: 'stream/:quesos',
        loadChildren: () => import('./component/evento-stream/evento-stream.module').then(m => m.EventoStreamModule)
      }
    ]
  },
];
