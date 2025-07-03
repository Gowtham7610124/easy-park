export class User{
    constructor(){
        this.emailId = ''
        this.password = ''
    }

    emailId:string
    password:string
}

export interface IUserModel {
  userId: number
  emailId: string
  password: string
  createdDate: string
  projectName: string
  fullName: string
  mobileNo: string
  extraId: number
}

export interface ResponseModal {
  message: string
  result: boolean
  data: any
}

export interface Isite {
  siteId: number
  clientId: number
  siteName: string
  siteCity: string
  siteAddress: string
  sitePinCode: string
  totalBuildings: number
  createdDate: string
}

export interface Ibuilding {
  buildingId: number;
  siteId: number;
  buildingName: string;
  buildingManagerName: string;
  contactNo: string;
  siteName: string;
}

export interface Ifloor {
  floorId: number
  buildingId: number
  floorNo: string
  isOperational: boolean
  totalParkingSpots: number
}