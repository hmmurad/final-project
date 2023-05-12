import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClassService} from 'src/app/services/class.service';
import {EnrollmentService} from 'src/app/services/enrollment.service';
import {SubjectService} from 'src/app/services/subject.service';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddMarksComponent implements OnInit {
  selectedClasName: any;
  selectedClas:any
  students: any;
  subject: any;
  classes:any
  selectedClassId = 8
  teacherId = 3


  addMarksForm!: FormGroup;

  @ViewChild('markValue') markValue!: ElementRef

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private enrollService: EnrollmentService,
    private  fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.getClasses()
  }

  onChange(data:any){
    console.log(data)
  }


  onSelectClass() {
    this.getSubject(this.selectedClasName, this.teacherId)
    this.getStudents(this.selectedClasName);
    this.classes()
  }


  getClasses() {
    this.classService.getAllClasses().subscribe({
      next: (res: any) => {
        this.classes = res;
        this.selectedClasName= res[0].courseTitle
        this.getStudents(this.selectedClasName)
        this.getSubject(this.selectedClasName, this.teacherId)
        // console.log(this.selectedClasName)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getStudents(className: string) {
    this.enrollService.getEnrolledStudentByClassTitle(className).subscribe({
      next: (res: any) => {
        this.students = res;
        console.log(this.students)
        for ( let i =0; i< this.students.length; i++) {
          // console.log(this.students[i].id)
          this.marksObtained.push(this.fb.group({
            marksObtained: [this.addMarksForm.value.marks[i]],
            totalMarks: [100],
            studentId: [this.students ? this.students[i].id : null],
            subjectId: [ this.selectedClassId ? this.selectedClassId : null],
            teacherId: [this.teacherId]
          }))
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubject(className: any, teacherId:number) {
    this.subjectService.getSubByClassAndTeacherId(className, teacherId).subscribe((res) => {
      this.subject = res
      console.log(this.subject);
    }, err => {
      console.log(err.error.message)
    });
  }


  initForm() {
    this.addMarksForm = this.fb.group({
      marks: this.fb.array([])
    })
  }

  get marksObtained() {
    return this.addMarksForm.get('marks') as FormArray
  }



  onSubmit() {
    console.log(this.addMarksForm.value)
  }
}
