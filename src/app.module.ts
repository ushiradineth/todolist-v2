import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, MyResolver } from './app.service';
import { TodosModule } from './todos/todos.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TodosModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://ushira:ushira@cluster.9yj1wvz.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, MyResolver],
})
export class AppModule {}
