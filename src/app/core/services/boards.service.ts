import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public createBoard() {
    return this.http.post('boards', {}).pipe((resp) => {
      console.log(resp);
      return resp;
    });
  }
}
