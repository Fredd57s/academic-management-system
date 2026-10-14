import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find({
    relations: {
        student: true,
        course: true,
    },
    });
  }

  async create(studentId: number, courseId: number): Promise<Enrollment> {
    const student = await this.studentsRepository.findOneBy({ id: studentId });
    const course = await this.coursesRepository.findOneBy({ id: courseId });

    if (!student || !course) {
      throw new BadRequestException('Student or course not found.');
    }

    const existingEnrollment = await this.enrollmentsRepository.findOne({
      where: { student: { id: studentId }, course: { id: courseId } },
    });

    if (existingEnrollment) {
      throw new BadRequestException('Student is already enrolled in this course.');
    }

    const newEnrollment = this.enrollmentsRepository.create({ student, course });
    return this.enrollmentsRepository.save(newEnrollment);
  }
}