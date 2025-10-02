import { CreateLoanInput} from "./create-loan.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateLoanInput extends PartialType(CreateLoanInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string
}