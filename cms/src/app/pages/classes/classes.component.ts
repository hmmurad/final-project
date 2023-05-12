import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AddClassDialogComponent} from "../../components/add-class-dialog/add-class-dialog.component";
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ClassesComponent implements OnInit{

  displayedColumn = ['id', 'name', 'actions']
  dataSource: any[] = [ ]

  constructor(private matDialog: MatDialog, private classService: ClassService) {
  }

  ngOnInit() {
    this.getClasses()
  }

  editClass(data: any) {
    this.matDialog.open(AddClassDialogComponent, {
      data: data
    }).afterClosed().subscribe(res => {
      if(res === 'update') {
        this.getClasses()
      }
    })
  }


  addClass( ) {
    this.matDialog.open(AddClassDialogComponent).afterClosed().subscribe(
      res => {
        if(res === 'save') {
          this.getClasses()
        }
      }
    )
  }

  getClasses() {
    this.classService.getAllClasses().subscribe(
      (res:any) => {
        console.log(res)
        this.dataSource = res
      }
    )
  }


  delete(data:any) {
    this.classService.delete(data.id).subscribe(
      res => {
        console.log(res)
        this.getClasses()
      }
    )
  }




}
