import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibuilding, ResponseModal } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userSer = inject(UserService)

  constructor(private http: HttpClient) { }

  getSiteByClientId(): Observable<ResponseModal>{
    const deltaString = localStorage.getItem("parkUser")
      const delta = deltaString ? JSON.parse(deltaString) : null;
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetSitesByClientId?id='+delta.extraId)
  }

  getBuildingByClientId(siteId:any): Observable<ResponseModal>{
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetBuildingBySiteId?id='+siteId)
  }

  getSiteByBuildingId(BuildingId:any): Observable<ResponseModal>{
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetFloorsByBuildingId?id='+BuildingId)
  }

  bookSpots(data:any): Observable<ResponseModal>{
    return this.http.post<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/AddParking',data)
  }

  getAllParkingByFloor(data:any): Observable<ResponseModal>{
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetAllParkingByFloor?id='+data)
  }
}
