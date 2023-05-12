import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import {MatSortModule} from "@angular/material/sort";
import { SubjectComponent } from './pages/courses/subject.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ResultsComponent } from './pages/results/results.component';
import { AddClassDialogComponent } from './components/add-class-dialog/add-class-dialog.component';
import { AddSubjectDialogComponent } from './components/add-subject-dialog/add-subject-dialog.component';
import { AddTeacherDialogComponent } from './components/add-teacher-dialog/add-teacher-dialog.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { AddStudentsComponent } from './pages/add-students/add-students.component';
import { AddMarksComponent } from './pages/add-marks/add-marks.component';
import { EnrolledStudentsComponent } from './pages/enrolled-students/enrolled-students.component';
import { DialogAddMarksComponent } from './components/dialog-add-marks/dialog-add-marks.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    ContactComponent,
    PageNotFoundComponent,
    DialogFormComponent,
    SubjectComponent,
    ClassesComponent,
    ResultsComponent,
    AddClassDialogComponent,
    AddSubjectDialogComponent,
    AddTeacherDialogComponent,
    TeachersComponent,
    AddStudentsComponent,
    AddMarksComponent,
    EnrolledStudentsComponent,
    DialogAddMarksComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
