import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment.entity';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Query(() => [Enrollment], { name: 'getEnrollments' })
  getEnrollments() {
    return this.enrollmentsService.findAll();
  }

  @Mutation(() => Enrollment)
  createEnrollment(
    @Args('studentId', { type: () => Int }) studentId: number,
    @Args('courseId', { type: () => Int }) courseId: number,
  ) {
    return this.enrollmentsService.create(studentId, courseId);
  }
}