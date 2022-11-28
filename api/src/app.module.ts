import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

import { Topic } from './topic/topic.model';
import { TopicModule } from './topic/topic.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      // password: process.env.DATABASE_PASSWORD,
      password: '123123123',
      database: 'nest3',
      models: [User, Topic],
    }),
    UserModule,
    TopicModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
