import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private localStorageKey = 'students';

  getStudents(): Student[] {
    const students = localStorage.getItem(this.localStorageKey);
    return students ? JSON.parse(students) : [];
  }

  addStudent(student: Student) {
    const students = this.getStudents();
    students.push(student);
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }

  deleteStudent(index: number) {
    const students = this.getStudents();
    students.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }

  updateStudent(index: number, updatedStudent: Student) {
    const students = this.getStudents();
    students[index] = updatedStudent;
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }
}
