import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodosModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'schema.gql',
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://ushira:ushira@cluster.9yj1wvz.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
