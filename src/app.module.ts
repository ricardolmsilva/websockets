import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGateway } from './user/user.gateway';
import { UserSubscriber } from './user/users.subscriber';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [UserSubscriber],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway, UserGateway],
})
export class AppModule {}
