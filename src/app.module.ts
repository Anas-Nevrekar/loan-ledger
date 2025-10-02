import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoanModule } from './loan/loan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoanModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:  join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
