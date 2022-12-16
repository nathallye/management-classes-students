import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { IStudentDto } from '../interfaces/IStudentDto';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})

export class StudentsEditComponent implements OnInit {
  student!: IStudentDto;
  idReceived!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.idReceived = Number(params.get('key'));
    });
  }

  ngOnInit(): void {
    this.student = {
      key: this.idReceived ?? 0,
      name: '',
      lastName: '',
      birthDate: '',
      matriculation: '',
      document: ''
    }

     // BUSCAR NA API OS DADOS DO ALUNO QUE RECEBEMOS O ID NA URL
    if (this.idReceived) {
      this.http
        .get(`https://localhost:7028/api/Students/GetOne/?id=${this.idReceived}`)
        .subscribe((data) => {
          this.student = data as IStudentDto;
        });
    }
  }

  save() {
    console.log(`Objeto para salvar: ${JSON.stringify(this.student)}`);
  }
}
