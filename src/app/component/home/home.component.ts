import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {}

  registerStudent() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      this.studentService.addStudent(student);
      this.studentForm.reset();


      Swal.fire({
        title: 'Registro exitoso',
        text: 'El alumno ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } else {
      
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa correctamente todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
  navigateToStudents() {
    this.router.navigate(['/students']);
  }
  
}
