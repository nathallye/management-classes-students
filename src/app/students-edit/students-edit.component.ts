import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IStudentDto } from '../interfaces/IStudentDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})

export class StudentsEditComponent {
  student!: IStudentDto;
  idReceived!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.idReceived = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this.student = {
      id: this.idReceived ?? 0,
      name: '',
      lastName: '',
      birthDate: '',
      matriculation: '',
      document: ''
    }
  }

  save() {
    console.log(`Objeto para salvar: ${JSON.stringify(this.student)}`);
  }
}
