import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  create(name: string, major: string, semester: number): Promise<Student> {
    const newStudent = this.studentsRepository.create({ name, major, semester });
    return this.studentsRepository.save(newStudent);
  }
}