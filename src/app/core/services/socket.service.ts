import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket!: Socket;

  connect(): void {
    this.socket = io(environment.baseUrl);
    this.socket.on('boards', (type: string, board: any) => {
      console.log(type, board);
    });
  }

  disconnet(): void {
    this.socket.disconnect();
  }
}
