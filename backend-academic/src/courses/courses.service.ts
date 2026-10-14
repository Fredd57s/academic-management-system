import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
    ) {}

    findAll(): Promise<Course[]> {
        return this.coursesRepository.find();
    }

    create(name: string, instructor: string, capacity: number): Promise<Course> {
        const newCourse = this.coursesRepository.create({ name, instructor, capacity });
        return this.coursesRepository.save(newCourse);
    }
}
