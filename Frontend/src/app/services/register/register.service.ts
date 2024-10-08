import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewUser, User } from "../../models/User.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private baseUrl = "http://localhost:3000";

    constructor(private httpClient: HttpClient) { }

    registerUser(newUser: NewUser): Observable<User> {
        return this.httpClient.post<User>(`${this.baseUrl}/auth/register`, newUser)
    }

}