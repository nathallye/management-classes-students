import { Component, Input, OnInit } from '@angular/core';
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
    // console.log(`Objeto para salvar: ${JSON.stringify(this.student)}`);

    if (this.validateInfo()) {
      console.log(`Objeto para salvar: ${JSON.stringify(this.student)}`);

      if (this.student.key == 0) {

        this.http.post('https://localhost:7028/api/Students/Create', this.student)
          .subscribe((data) => {
            this.router.navigate(['list']);
          });

      } else {
        this.http.patch('https://localhost:7028/api/Students/Update', this.student)
          .subscribe((data) => {
            this.router.navigate(['list']);
          });
      }

    } else {
      console.log('Erro na validação');
      // TRATAMENTO DE ERRO
      // ALERTA
      // BORDA VERMELHA
    }
  }

  validateInfo(): boolean {
    if (this.student.name == '') {
      return false;
    }

    // VALIDAR COM REGEX

    return true;
  }

  close() {
    this.router.navigate([`list`]);
  }
}
