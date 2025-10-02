import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan.model';
import { CreateLoanInput } from '../dto/create-loan.input';
import { UpdateLoanInput } from '../dto/update-loan.input';

@Resolver(() => Loan)
export class LoanResolver {
    constructor(private readonly loanService: LoanService){}

    @Query(() => [Loan], { name: 'getAllLoans' })
    async findAll(){
        return this.loanService.findAll();
    }

    @Query(() => Loan, { name: 'getLoan' })
    async findOne(@Args('id', { type: () => String }) id:string ){
        return this.loanService.findOne(id);
    }

    @Mutation(() => Loan)
    async createLoan(@Args('input') input: CreateLoanInput) {
        return this.loanService.create(input);
    }

    @Mutation(() => Loan)
    async updateLoan(@Args('input') input: UpdateLoanInput) {
        return this.loanService.update(input);
    }

    @Mutation(() => Boolean)
    async deleteLoan(@Args('id', { type: () => String }) id: string ) {
        return this.loanService.remove(id);
    }
    @Query(() => [Object], { name: 'interestDuePerUser' })
    async interestDuePerUser() {
        return this.loanService.interestDuePerUser();
    }



}