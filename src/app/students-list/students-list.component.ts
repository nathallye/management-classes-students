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

  detailStudent(id: number) {
    this.screenToDisplay = 'detail';

    for (let i = 0; i < this.listStudents.length; i++) {
      if (id == this.listStudents[i].id) {
        this.studentSelected = this.listStudents[i];
        break;
      }
    }
  }

  closeDetail = () => {
    this.screenToDisplay = 'list';
  }

  editStudent(id: number) {
    this.router.navigate([`edit/${id}`]);
  }

  removeStudent(id: number) {
    this.http.delete(`https://localhost:7028/api/Students/Delete/?id=${id}`)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${JSON.stringify(data)}`);
        this.getAll();
      });
  }
}
