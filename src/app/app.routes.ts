import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StudentsComponent } from './component/students/students.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'students', component: StudentsComponent }, 
];
