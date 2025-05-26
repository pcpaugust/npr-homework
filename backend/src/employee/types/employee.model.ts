import { ObjectType, Field, Float, Int, registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

registerEnumType(Gender, {
  name: 'Gender',
});

@ObjectType()
export class Employee {
  @Field(() => Int)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => Float)
  salary: number;

  @Field(() => Gender)
  gender: Gender;

  @Field({ nullable: true })
  description?: string;
}
