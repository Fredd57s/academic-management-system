import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course], { name: 'getCourses' })
  getCourses() {
    return this.coursesService.findAll();
  }

  @Mutation(() => Course)
  createCourse(
    @Args('name') name: string,
    @Args('instructor') instructor: string,
    @Args('capacity', { type: () => Int }) capacity: number,
  ) {
    return this.coursesService.create(name, instructor, capacity);
  }
}
