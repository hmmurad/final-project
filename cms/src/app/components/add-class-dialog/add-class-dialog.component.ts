import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.css']
})
export class AddClassDialogComponent  implements OnInit{
  editMode: boolean = false;
  actionBtn: string = 'save'
  form!: FormGroup;


  constructor(private fb: FormBuilder, private matData: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private classService: ClassService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      courseTitle: []
    })

    if(this.editData) {
      this.actionBtn = 'Update'
      this.form.controls['courseTitle'].setValue(this.editData.courseTitle)
    }

    console.log(this.editData)

  }




  submit() {
    if(this.editData) {
      if(this.form.valid) {
        this.update(this.editData.id, this.form.value)
      }
    } else {
      this.create(this.form.value)
    }
    console.log(this.form.value)
  }

  create(data:any) {
    this.classService.create(data).subscribe(
      res => {
        this.form.reset()
        this.matData.close('save')
      }
    )
  }


  update(id:number, data:any) {
    this.classService.update(id, data).subscribe(
      res => {
        this.form.reset()
        this.matData.close('update')
      }
    )
  }

}
