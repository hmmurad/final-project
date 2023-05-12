import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.css'],
})
export class EnrolledStudentsComponent implements OnInit {
  getEnrollments: any;
  studentsByClass!: any;
  classes: any[] = [];

  className: string = '';
  subjects: any;

  // for table
  columnNames: any = ['ser', 'studentName', 'roll', 'dateOfEnrollment', 'dob'];

  constructor(
    private enrollService: EnrollmentService,
    private classService: ClassService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    // this.getAllEnrollments();
    this.getClasses()

  }

  getAllEnrollments() {
    this.enrollService.getAllEnrollments().subscribe({
      next: (res) => {
        // console.log(res);
        this.getEnrollments = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getClasses() {
    this.classService.getAllClasses().subscribe({
      next: (res: any) => {
        this.classes = res;
        this.className = res[0].courseTitle;
        this.getByClass(this.className);
        console.log(this.className);
        this.getSubsByClass()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getByClass(title: string) {
    this.enrollService.getEnrolledStudentByClass(title, 'asc').subscribe({
      next: (res: any) => {
        this.studentsByClass = res;
        console.log(this.studentsByClass);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectedClass(value: any) {
    // console.log(value);
    this.className = value;
    this.getByClass(this.className);
    this.getSubsByClass();
  }

  getSubsByClass() {
    const params = `?course=${this.className}`;
    this.subjectService.getSubByClass(params).subscribe((res) => {
      this.subjects = this.getSubjectByTeacher(res);
      console.log(this.subjects);
    });
  }

  getSubjectByTeacher(data: any) {
    return data.filter((sub: any) => sub.teacherId === 3);
  }

  submitMarks() {}
}
