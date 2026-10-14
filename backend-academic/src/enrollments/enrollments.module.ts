import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment.entity';
import { Student } from '../students/student.entity'; 
import { Course } from '../courses/course.entity';
import { EnrollmentsResolver } from './enrollments.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Course])],
  providers: [EnrollmentsService, EnrollmentsResolver],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
