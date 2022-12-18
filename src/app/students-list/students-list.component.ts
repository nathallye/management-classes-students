import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { IStudentDto } from "../interfaces/IStudentDto";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent {
  listStudents: IStudentDto[] = [];
  studentSelected!: IStudentDto;
  screenToDisplay = 'list';

  constructor(private http: HttpClient, private router: Router) {
    this.getAll();
  }

  getAll() {
    this.listStudents = [];

    this.http
      .get('https://localhost:7028/api/Students/GetAll')
      .pipe(
        map((response: any) => {
          return Object.values(response);
        })
      )
      .subscribe((data) => {
        for (let index = 0; index < data.length; index++) {
          let contentJson: any = data[index];
          this.listStudents.push(contentJson as IStudentDto);
        }
      });
  }

  detailStudent(key: number) {
    this.screenToDisplay = 'detail';

    for (let i = 0; i < this.listStudents.length; i++) {
      if (key == this.listStudents[i].key) {
        this.studentSelected = this.listStudents[i];
        break;
      }
    }
  }

  close = () => {
    this.screenToDisplay = 'list';
  }

  edit(key: number) {
    this.router.navigate([`edit/${key}`]);
  }

  removeStudent(key: number) {
    this.http.delete(`https://localhost:7028/api/Students/Delete/?id=${key}`)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${JSON.stringify(data)}`);
        this.getAll();
      });
  }
}
