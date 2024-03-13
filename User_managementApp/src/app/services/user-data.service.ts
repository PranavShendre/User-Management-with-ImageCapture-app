import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url = "http://localhost:3000/api/users";
  
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users');
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/users/${id}`);
  }
}
