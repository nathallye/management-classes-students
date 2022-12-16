import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsListComponent } from './students-list';
import { StudentsEditComponent } from './students-edit';

const routes: Routes = [
  { path: 'list',  component: StudentsListComponent},
  { path: 'edit/:id', component: StudentsEditComponent},
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
