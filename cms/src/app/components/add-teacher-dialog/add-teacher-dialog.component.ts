import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-add-teacher-dialog',
  templateUrl: './add-teacher-dialog.component.html',
  styleUrls: ['./add-teacher-dialog.component.css']
})
export class AddTeacherDialogComponent implements OnInit{

  form!: FormGroup;
  editMode: boolean = false;
  actionBtn: string = 'Save'

  constructor(private  fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private matDialogRef: MatDialogRef<any>,
              private teacherService: TeacherService
              ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    })

    if(this.editData) {
      this.actionBtn = 'Update'
      this.form.controls['name'].setValue(this.editData.name)
      this.form.controls['email'].setValue(this.editData.email)
    }
    console.log(this.editData)
  }


  submit() {
    if (this.editData) {
      if(!this.form.valid) return;
      this.update(this.editData.id, this.form.value)
    } else {

    this.create(this.form.value)
    }
  }


  create(data:any) {
    this.teacherService.addTeacher(data).subscribe((res:any) => {
      console.log(res)
      this.form.reset()
      this.matDialogRef.close('save')
    }),
      (err:Error) => {
        console.log(err)
      }
  }
  update(id:number, data:any) {
    this.teacherService.updateTeacher(id, data).subscribe((res:any) => {
      console.log(res)
      this.form.reset()
      this.matDialogRef.close('update')
    }),
      (err:Error) => {
        console.log(err)
      }
  }



}
