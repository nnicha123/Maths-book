import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../models/Login.model';
import { User } from '../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  loginUser(login: Login): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/auth/login`, login)
  }

  getUserById(userId:number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/user/userSingle/${userId}`)
  }
}
