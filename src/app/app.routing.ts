import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubsListComponent } from './clubs-list/clubs-list.component'
import { ClubDetailComponent } from "./club-detail/club-detail.component";
import { CreateClubComponent } from "./create-club/create-club.component";

const appRoutes: Routes = <Routes>[
  {
    path: '',
    component: ClubsListComponent
  },
  {
    path: 'detail/:club',
    component: ClubDetailComponent
  },
  {
    path: 'create',
    component: CreateClubComponent
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found'
  // }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
