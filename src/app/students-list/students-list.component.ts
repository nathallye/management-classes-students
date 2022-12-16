import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IStudentDto } from "../interfaces/IStudentDto";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent {
  listStudents: IStudentDto[] = [];

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http
      .get('http://localhost/api/Students/GetAll')
      .subscribe((data) => {
        console.log(`A chamada para a API retornou o ${JSON.stringify(data)}`);
      });
  }
}
