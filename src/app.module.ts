import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGateway } from './user/user.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      subscribers: [`${__dirname}/**/*.subscriber{.ts,.js}`],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  providers: [ChatGateway, UserGateway],
})
export class AppModule {}
