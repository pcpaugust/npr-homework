import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from './employee.model'; // Adjust the import path as necessary

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

@ObjectType()
export class PaginatedEmployee {
  @Field(() => [Employee]) // or your GraphQL Employee class
  items: Employee[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}