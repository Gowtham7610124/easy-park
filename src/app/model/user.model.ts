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