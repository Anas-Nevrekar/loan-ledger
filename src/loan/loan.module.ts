import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanResolver } from './resolvers/loan.resolver';
import { LoanSchema } from './model/loan.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan } from './model/loan.model';

@Module({
   imports: [MongooseModule.forFeature([{
    name: Loan.name, schema: LoanSchema
  }])],
  providers: [LoanService, LoanResolver]
})
export class LoanModule {}
