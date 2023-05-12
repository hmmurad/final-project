import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { StudentService } from 'src/app/services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit{

  studentForm!: FormGroup;
  actionBtn: string = 'Save'
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [],
      email: [],
      mobile: []
    })
    if (this.editData) {
      this.actionBtn = 'Update'
      this.studentForm.controls['name'].setValue(this.editData.name)
      this.studentForm.controls['email'].setValue(this.editData.email)
      this.studentForm.controls['mobile'].setValue(this.editData.mobile)
    }


  }

  submit() {
    if(!this.editData) {
      if(this.studentForm.valid) {
        this.createStudent(this.studentForm.value)
      }
    } else {
      this.updateStudent(this.editData.id, this.studentForm.value)
    }
  }



  createStudent(data: any) {
    this.studentService.createStudent(data).subscribe(
      (res:any) => {
        this.studentForm.reset()
        this.dialogRef.close('save')
        console.log(res)
      },
      error => {
        alert(error.error.message)
        console.log(error)
      }
    )
  }
  //update data
  updateStudent(id: number, data: any) {
    this.studentService.updateStudent(id, data).subscribe({
      next: (res) => {
        this.studentForm.reset()
        this.dialogRef.close('update')

        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }


}
