import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBoardModel } from 'src/app/tasks/models/newBoardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public createBoard(body: NewBoardModel) {
    return this.http.post('boards', body).pipe((resp) => {
      console.log(resp);
      return resp;
    });
  }
}
