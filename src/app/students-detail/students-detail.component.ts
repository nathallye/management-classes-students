import { Component, Input } from '@angular/core';

import { IStudentDto } from '../interfaces/IStudentDto';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
  @Input() student!: IStudentDto;
  @Input() closeDetail!: () => void;

  constructor() { }

  ngOnInit(): void {
    console.log(`objeto recebido :${JSON.stringify(this.student)}`);
  }

  close() {
    this.closeDetail();
  }

}
