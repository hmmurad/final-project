import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith } from 'rxjs/operators';
import { ClassService } from '../../services/class.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { SubjectService } from '../../services/subject.service';
import { StudentService } from './../../services/student.service';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddStudentsComponent implements OnInit, AfterViewInit {
  students!: any[];
  filteredStudents!: any;
  form!: FormGroup;

  courses!: any[];
  filteredCourses!: any;

  actionBtn: string = 'Save';
  editedData: any;

  enrolledStudents = new MatTableDataSource<any[]>();
  displayedColumns: any[] = [
    'name',
    'class',
    'enrolled_date',
    'enrollement_status',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // for sorting
  sortvalue: string = '';
  sortMode: boolean = true;
  classParamName: string = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private enrollService: EnrollmentService // @Inject(MAT_DIALOG_DATA) public editData: any,
  ) {}

  ngOnInit() {
    this.enrollService.getAllEnrollments().subscribe((res: any) => {
      console.log(res);

      this.enrolledStudents = new MatTableDataSource<any>(res);
      this.enrolledStudents.paginator = this.paginator;
    });

    this.getEnrolledData();
    this.initForm();
  }

  ngAfterViewInit() {
    this.enrolledStudents.sort = this.sort;
  }

  sorting() {
    this.sortMode = !this.sortMode;
    console.log(this.sortMode);
  }

  getEnrolledData() {
    this.getClasses();
    this.getStudents();
  }

  initForm() {
    this.form = this.fb.group({
      studentId: [''],
      courseId: [''],
      enrollment_status: ['Inactive'],
    });
    this.form.controls['studentId'].valueChanges
      .pipe(
        startWith(''),
        map((value: any) =>
          value ? this._FILTER_STUDENTS(value || '') : this.students
        )
      )
      .subscribe((res) => (this.filteredStudents = res));

    this.form.controls['courseId'].valueChanges
      .pipe(
        startWith(''),
        map((value: any) =>
          value ? this._FILTER_COURSES(value || '') : this.courses
        )
      )
      .subscribe((res) => (this.filteredCourses = res));
  }

  getStudents() {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res;
      this.filteredStudents = res;
    });
  }
  getClasses() {
    this.classService.getAllClasses().subscribe((res: any) => {
      this.courses = res;
      this.filteredCourses = res;
    });
  }

  private _FILTER_STUDENTS(enteredData: string): any[] {
    // const searchValue = value.toLowerCase()
    return this.students.filter((value: any) =>
      value.name.toLowerCase().includes(enteredData)
    );
  }

  private _FILTER_COURSES(searchValue: string): any[] {
    // const searchValue = value.toLowerCase()
    return this.courses.filter((value: any) =>
      value.courseTitle.toLowerCase().includes(searchValue)
    );
  }

  submit() {
    if (!this.form.valid) return;
    if (this.editedData) {
      // console.log(this.form.value)
      this.updateEnrollment(this.editedData.id, this.form.value);
    } else {
      this.createEnrollment(this.form.value);
    }
    // console.log(this.form.value)
  }

  createEnrollment(data: any) {
    this.enrollService.create(data).subscribe(
      (res) => {
        this.form.reset();
        this.getEnrolledData();
        console.log('successfully created' + res);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  updateEnrollment(id: number, data: any) {
    this.enrollService.update(id, data).subscribe(
      (res) => {
        this.form.reset();
        this.getEnrolledData();
        console.log('successfully updated' + res);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  update(data: any) {
    this.editedData = data;
    this.actionBtn = 'Update';
    this.form.controls['studentId'].setValue(this.editedData.student.id);
    this.form.controls['courseId'].setValue(this.editedData.course.id);
    console.log(this.editedData);
  }

  delete(data: any) {
    this.enrollService.delete(data.id).subscribe(
      (res) => {
        console.log('success');
        this.getEnrolledData();
      },
      (err) => {
        this.getEnrolledData();
        alert(err);
      }
    );
  }

  clearForm() {
    this.form.reset();
  }
}
