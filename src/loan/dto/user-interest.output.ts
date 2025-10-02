import { ObjectType, Field, Float } from "@nestjs/graphql";

@ObjectType()
export class UserInterest {
  @Field()
  userId: string;

  @Field(() => Float)
  totalInterestDue: number;
}
