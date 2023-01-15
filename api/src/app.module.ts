import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
//
import { AuthModule } from './auth/auth.module';
//
import { AppConfig } from './app-config/app-config.model';
import { AppConfigModule } from './app-config/app-config.module';
//
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

import { Topic } from './topic/topic.model';
import { TopicModule } from './topic/topic.module';
//
import { TopicItem } from './topic-item/topic-item.model';
import { TopicItemModule } from './topic-item/topic-item.module';
//
import { Type } from './type/type.model';
import { TypeModule } from './type/type.module';
//
import { Country } from './country/country.model';
import { CountryModule } from './country/country.module';
//
import { TopicRequestItem } from './topic-request-item/topic-request-item.model';
import { TopicRequestItemModule } from './topic-request-item/topic-request-item.module';
//
import { FileModule } from './file/file.module';
//
import { Discussion } from './discussion/discussion.model';
import { DiscussionModule } from './discussion/discussion.module';
//
import { Message } from './message/message.model';
import { MessageModule } from './message/message.module';

ConfigModule.forRoot(); // Load ENV file

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PWD,
      models: [
        AppConfig,
        User,
        Topic,
        TopicItem,
        Type,
        Country,
        TopicRequestItem,
        Discussion,
        Message,
      ],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UserModule,
    TopicModule,
    TopicItemModule,
    TypeModule,
    CountryModule,
    TopicRequestItemModule,
    FileModule,
    AppConfigModule,
    DiscussionModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
