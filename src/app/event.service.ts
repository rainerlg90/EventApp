import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public getEventsScrapper():  Observable<Object[]>{
    return this.http.get<Object[]>('https://eventapp.rainerledesma1.repl.co/events')
  }

}
