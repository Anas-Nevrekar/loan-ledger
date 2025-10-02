import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType, Field, ID, Float } from "@nestjs/graphql";

@Schema({ timestamps: true })
@ObjectType()
export class Loan extends Document {
  @Field(() => ID)
  declare readonly _id: string;

  @Prop({ required: true })
  @Field()
  loanName: string;   // e.g. Car Loan, Home Loan

  @Prop({ required: true })
  @Field()
  userId: string;     // e.g. anas01

  @Prop({ required: true })
  @Field(() => Float)
  principal: number;  // Loan amount

  @Prop({ required: true })
  @Field(() => Float)
  interestRate: number; // Annual interest %

  @Prop({ required: true })
  @Field()
  startDate: Date;

  @Prop({ required: true })
  @Field()
  endDate: Date;

  @Prop({ default: "active" })
  @Field()
  status: string; // active | closed
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
