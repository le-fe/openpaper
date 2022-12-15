import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
//
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

import { Topic } from './topic/topic.model';
import { TopicModule } from './topic/topic.module';
//
import { Media } from './media/media.model';
import { MediaModule } from './media/media.module';
//
import { Type } from './type/type.model';
import { TypeModule } from './type/type.module';
//
import { Country } from './country/country.model';
import { CountryModule } from './country/country.module';
//
import { TopicRequestItem } from './topic-request-item/topic-request-item.model';
import { TopicRequestItemModule } from './topic-request-item/topic-request-item.module';

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
      models: [User, Topic, Media, Type, Country, TopicRequestItem],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    TopicModule,
    MediaModule,
    TypeModule,
    CountryModule,
    TopicRequestItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
