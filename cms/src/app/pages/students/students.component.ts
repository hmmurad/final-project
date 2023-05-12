import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import { DialogFormComponent } from '../../components/dialog-form/dialog-form.component';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class StudentsComponent implements OnInit, AfterViewInit {
  students = new MatTableDataSource<any>();
  editMode: boolean = false;
  displayedColumns: string[] = [
    'ID',
    'name',
    'fatherName',
    'dob',
    'email',
    'mobile',
    'address',
    'actions',
  ];
  id!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getStudents().subscribe(
      (res: any) => {
        this.students = new MatTableDataSource<any>(res);
        this.students.paginator = this.paginator;
        this.students.sort = this.sort;
      },
      (error) => alert('error fetching data')
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.students.filter = filterValue.trim().toLowerCase();
    if (this.students.paginator) {
      this.students.paginator.firstPage();
    }
  }

  addstudent() {
    this.dialog
      .open(DialogFormComponent)
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllStudents();
        }
      });
  }

  editStudent(element: any) {
    this.dialog
      .open(DialogFormComponent, {
        data: element,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllStudents();
        }
      });
  }

  deleteStudent(id: number) {
    if (id) {
      this.studentService.deleteStudent(id).subscribe({
        next: (res) => {
          this.getAllStudents();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.error);
        },
      });
    }
  }

  ngAfterViewInit() {
    // this.students.paginator = this.paginator
    this.students.sort = this.sort;
  }
}
