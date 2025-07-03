import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibuilding, ResponseModal } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  // inject: any;
  userSer = inject(UserService)

  constructor(private http: HttpClient) { }

  getSiteByClientId(): Observable<ResponseModal>{
    const deltaString = localStorage.getItem("parkUser")
      const delta = deltaString ? JSON.parse(deltaString) : null;
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetSitesByClientId?id='+delta.extraId)
  }

  getBuildingByClientId(siteId:any): Observable<ResponseModal>{
    // const deltaString = localStorage.getItem("parkUser")
      // const delta = deltaString ? JSON.parse(deltaString) : null;
      console.log(siteId)
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetBuildingBySiteId?id='+siteId)
  }

  getSiteByBuildingId(BuildingId:any): Observable<ResponseModal>{
    // const deltaString = localStorage.getItem("parkUser")
    //   const delta = deltaString ? JSON.parse(deltaString) : null;
      console.log(BuildingId)
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetFloorsByBuildingId?id='+BuildingId)
  }

  bookSpots(data:any): Observable<ResponseModal>{
    // const deltaString = localStorage.getItem("parkUser")
    //   const delta = deltaString ? JSON.parse(deltaString) : null;
      // console.log(BuildingId)
    return this.http.post<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/AddParking',data)
  }

  getAllParkingByFloor(data:any): Observable<ResponseModal>{
    // const deltaString = localStorage.getItem("parkUser")
    //   const delta = deltaString ? JSON.parse(deltaString) : null;
      // console.log(BuildingId)
    return this.http.get<ResponseModal>('https://api.freeprojectapi.com/api/SmartParking/GetAllParkingByFloor?id='+data)
  }
}
