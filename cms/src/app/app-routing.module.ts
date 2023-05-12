import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SubjectComponent } from './pages/courses/subject.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ResultsComponent } from './pages/results/results.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { AddStudentsComponent } from './pages/add-students/add-students.component';
import { AddMarksComponent } from './pages/add-marks/add-marks.component';
import { EnrolledStudentsComponent } from './pages/enrolled-students/enrolled-students.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'subjects', component: SubjectComponent },
      { path: 'add-marks', component: AddMarksComponent },
      { path: 'get-students', component: EnrolledStudentsComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'add', component: AddStudentsComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
