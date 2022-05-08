import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBoardModel } from '@shared/models/board.model';


@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) { }

  public getBoards() {
    return this.http.get('boards').pipe((resp) => {
      return resp;
    });
  }

  public createBoard(body: NewBoardModel) {
    return this.http.post('boards', body).pipe((resp) => {
      return resp;
    });
  }

  public deleteBoard(id: string) {
    return this.http.delete(`boards/${id}`).pipe((resp) => {
      return resp;
    });
  }
}
