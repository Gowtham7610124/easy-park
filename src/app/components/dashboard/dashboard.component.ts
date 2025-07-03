import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Ibuilding, Ifloor, Isite, ResponseModal } from '../../model/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  masrerSer = inject(MasterService)
  siteList:Isite[] = []
  siteBuilding:Ibuilding[] = [];
  BuildingFloor:Ifloor[] = [];
  floorId:any;
  parkingSpotArray:number [] = [];
  bookedSpotList:any[] = [];
  @ViewChild("bookspot") bookModal!:ElementRef;
  bookSpot={
    
  "parkId": 0,
  "floorId": 0,
  "custName": "",
  "custMobileNo": "",
  "vehicleNo": "",
  "parkDate": new Date(),
  "parkSpotNo": 0,
  "inTime": new Date(),
  "outTime": null,
  "amount": 0,
  "extraCharge": 0,
  "parkingNo": ""

  }
   bookForm: FormGroup;
  constructor(){
    this.bookForm = new FormGroup({
      parkSpotNo: new FormControl(''),
      vehicleNo: new FormControl(''),
      amount: new FormControl(''),
      custName: new FormControl(''),
      inTime: new FormControl('')
    });
  }
  ngOnInit() :void {
    this.getSites();

  }

  getSites(){
    this.masrerSer.getSiteByClientId().subscribe((res:ResponseModal)=>{
      this.siteList = res.data
      console.log(this.siteList)
    })
  }

 getSiteList(event: Event) {
  this.parkingSpotArray = [];
  this.BuildingFloor = [];
  const siteId = (event.target as HTMLSelectElement).value;

  this.masrerSer.getBuildingByClientId(siteId).subscribe((res) => {
    this.siteBuilding = res.data;
    // console.log(this.siteBuilding);
  });

  
  }

  checkIfSpotBooked(spotNo: number){
    const isExist = this.bookedSpotList.find(m=>m.parkSpotNo == spotNo);
    if(isExist != undefined){
      return isExist
    }else{
      return undefined
    }
    
  }


  getFloorByBuildingId(event: Event){
    this.parkingSpotArray = [];
  this.BuildingFloor = [];
    const BuildingId = (event.target as HTMLSelectElement).value;
    this.masrerSer.getSiteByBuildingId(BuildingId).subscribe((res) => {
      this.BuildingFloor = res.data;
      console.log(this.BuildingFloor);
    });
  }

  getParkingSpots(event: Event){
    const floorId = (event.target as HTMLSelectElement).value;
    this.floorId = floorId
    console.log(floorId)
    const floor = this.BuildingFloor.find((m:any)=>m.floorId == floorId);
    if (!floor) return; // exit if not found

    this.parkingSpotArray = []; // clear previous data
      for (let index = 1; index <= floor?.totalParkingSpots; index++) {
        this.parkingSpotArray.push(index)
      }
    console.log(this.parkingSpotArray)
      this.getBooking();

    // getAllParkingByFloor
  }

  getBooking(){
    this.masrerSer.getAllParkingByFloor(this.floorId).subscribe((res) => {
      this.bookedSpotList = res.data;
      console.log(this.bookedSpotList);
    });
  }

  // MODAL OPEN
  openModal(spotNo:number){
    if(this.bookModal){
      this.bookModal.nativeElement.style.display='block'
      this.bookForm.patchValue({
        parkSpotNo: spotNo
      });
      // this.bookForm.value.parkSpotNo = 1
      // console.log(this.bookForm)
    }
  }

  closeModal(){
    if(this.bookModal){
      this.bookModal.nativeElement.style.display='none'
    }
  }

  onSubmitBooking() {
    this.bookSpot = {
      ...this.bookSpot,
      parkSpotNo: this.bookForm.value.parkSpotNo,
      vehicleNo: this.bookForm.value.vehicleNo,
      amount: this.bookForm.value.amount,
      custName: this.bookForm.value.custName,
      inTime: new Date(this.bookForm.value.inTime),
      parkDate: new Date(),
      outTime:null,
      parkingNo: '',
      extraCharge: 0,
      floorId: this.floorId,
      custMobileNo: '',
      parkId: 0
    };

    this.masrerSer.bookSpots(this.bookSpot).subscribe((res:any)=>{
      alert("booked")
    })
    console.log('Booking object:', this.bookSpot);
      this.getBooking();
  }
}
