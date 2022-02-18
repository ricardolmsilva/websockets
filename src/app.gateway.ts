// import { Logger } from '@nestjs/common';
// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway()
// export class AppGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   wss: Server;

//   private logger: Logger = new Logger('AppGateway');

//   afterInit() {
//     this.logger.log('Initialized!');
//   }

//   handleConnection(client: Socket) {
//     this.logger.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('msgToServer')
//   handleMessage(client: Socket, text: string): void {
//     this.wss.emit('msgToClient', text);
//     //   WsResponse<string>,
//     // return { event: 'msgToClient', data: 'Hello World!' };
//   }
// }
