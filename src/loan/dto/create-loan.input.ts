import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Float } from "@nestjs/graphql";


@InputType()
export class CreateLoanInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    loanName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Field(() => Float)
    @IsNotEmpty()
    principal: number;

    @Field(() => Float)
    @IsNotEmpty()
    interestRate: number;

    @Field()
    @IsNotEmpty()
    startDate: Date;

    @Field()
    @IsNotEmpty()
    endDate: Date;

    @Field()
    @IsString()
    @IsNotEmpty()
    status: string;
}   

