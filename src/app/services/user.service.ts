import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel, User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private baseUrl = 'https://api.freeprojectapi.com/api/SmartParking';

  constructor(private http: HttpClient) {}

  loginUser(obj: User): Observable<IUserModel> {
    return this.http.post<IUserModel>(`${this.baseUrl}/login`, obj);
  }
}
