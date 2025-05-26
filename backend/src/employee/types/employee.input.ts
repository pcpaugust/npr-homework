import { InputType, Field, Float } from '@nestjs/graphql';
import { Gender } from './employee.model';

@InputType()
export class CreateEmployeeInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => Float, { defaultValue: 0 })
  salary?: number;

  @Field(() => Gender)
  gender: Gender;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field(() => Float, { nullable: true })
  salary: number;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field({ nullable: true })
  description?: string;
}

