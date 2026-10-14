import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [Student], { name: 'getStudents' })
  getStudents() {
    return this.studentsService.findAll();
  }

  @Mutation(() => Student)
  createStudent(
    @Args('name') name: string,
    @Args('major') major: string,
    @Args('semester', { type: () => Int }) semester: number,
  ) {
    return this.studentsService.create(name, major, semester);
  }
}