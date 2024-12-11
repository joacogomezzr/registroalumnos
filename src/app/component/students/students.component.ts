import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  
  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  
  deleteStudent(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(index);
        this.loadStudents();
        Swal.fire('Eliminado', 'El estudiante ha sido eliminado.', 'success');
      }
    });
  }

  
  updateStudent(index: number) {
    const student = this.students[index];
    Swal.fire({
      title: 'Actualizar Estudiante',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${student.name}">
        <input id="email" class="swal2-input" placeholder="Email" value="${student.email}">
        <input id="age" class="swal2-input" placeholder="Edad" type="number" value="${student.age}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const age = Number((document.getElementById('age') as HTMLInputElement).value);

        if (!name || !email || !age || age <= 0) {
          Swal.showValidationMessage('Todos los campos son obligatorios y válidos');
          return null;
        }
        return { name, email, age };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.studentService.updateStudent(index, result.value as Student);
        this.loadStudents();
        Swal.fire('Actualizado', 'La información del estudiante se ha actualizado.', 'success');
      }
    });
  }
}
