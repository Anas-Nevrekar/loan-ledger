import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loan } from './model/loan.model';
import { Model } from 'mongoose';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';

@Injectable()
export class LoanService {
    constructor(@InjectModel(Loan.name) private loanModel: Model<Loan>){}

    async create(input: CreateLoanInput): Promise<Loan> {
        const created = new this.loanModel(input);
        return created.save();
    }

    async findAll(): Promise<Loan[]> {
        return this.loanModel.find().exec();
    }

    async findOne(id: string): Promise<Loan> {
        const loan = await this.loanModel.findById(id).exec();
        if(!loan) throw new NotFoundException('Loan not Found!')
        return loan;
    }

    async update(input: UpdateLoanInput): Promise<Loan> {
        const existingLoan = await this.loanModel.findById(input.id);
        if(!existingLoan) throw new NotFoundException('Loan not Found!')
        Object.assign(existingLoan, input);
        return existingLoan.save();
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.loanModel.findByIdAndDelete(id);
        if(!result) throw new NotFoundException('Loan not Found!')
        return true;
    }
    async interestDuePerUser(): Promise<{ userId: string; totalInterestDue: number }[]> {
    const pipeline = [
        {
        $addFields: {
            years: {
            $divide: [
                { $subtract: ["$endDate", "$startDate"] },
                1000 * 60 * 60 * 24 * 365 // convert ms → years (approx)
            ]
            }
        }
        },
        {
        $project: {
            userId: 1,
            interestDue: {
            $multiply: [
                "$principal",
                { $divide: ["$interestRate", 100] },
                "$years"
            ]
            }
        }
        },
        {
        $group: {
            _id: "$userId",
            totalInterestDue: { $sum: "$interestDue" }
        }
        },
        {
        $project: {
            userId: "$_id",
            totalInterestDue: 1,
            _id: 0
        }
        }
    ];

    return this.loanModel.aggregate(pipeline).exec();
    }


}