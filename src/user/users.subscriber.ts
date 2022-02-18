import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './entities/user.entity';
import { UserGateway } from './user.gateway';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private eventEmitter: EventEmitter2,
    private userGateway: UserGateway,
  ) {}

  listenTo(): any {
    return User;
  }

  afterInsert(event: InsertEvent<User>): void | Promise<any> {
    console.log(event.entity);
    // this.eventEmitter.emit('userCreated');
    // this.userGateway.sendToAll(`${event.entity.name} added!!!`);
  }
}
