import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
