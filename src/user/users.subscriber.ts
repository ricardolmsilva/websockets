import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from './entities/user.entity';
import { UserGateway } from './user.gateway';

@Injectable()
// @EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  // constructor(private userGateway: UserGateway) {}
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly userGateway: UserGateway,
  ) {
    connection.subscribers.push(this);
  }
  listenTo(): any {
    return User;
  }

  afterInsert(event: InsertEvent<User>): void | Promise<any> {
    this.userGateway.sendToAll(`${event.entity.name} added!!!`);
  }
}
