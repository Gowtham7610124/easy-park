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
  @ViewChild("releaseSpot") releaseModal!:ElementRef;
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
   releaseForm:FormGroup;
   availabelParking:string [] = [];
   occupiedParking:string[]=[]
  constructor(){
    this.bookForm = new FormGroup({
      parkSpotNo: new FormControl(''),
      vehicleNo: new FormControl(''),
      amount: new FormControl(''),
      custName: new FormControl(''),
      inTime: new FormControl('')
    });

    this.releaseForm = new FormGroup({
      parkId: new FormControl(0),
      outTime: new FormControl (new Date()), // datetime-local default
      extraCharge: new FormControl(0)
    });

  }
  ngOnInit() :void {
    this.getSites();

  }

  getSites(){
    this.masrerSer.getSiteByClientId().subscribe((res:ResponseModal)=>{
      this.siteList = res.data
    })
  }

 getSiteList(event: Event) {
  this.parkingSpotArray = [];
  this.BuildingFloor = [];
  const siteId = (event.target as HTMLSelectElement).value;

  this.masrerSer.getBuildingByClientId(siteId).subscribe((res) => {
    this.siteBuilding = res.data;
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


calculateAvailableAndOccupied() {
  this.occupiedParking = [];
  this.availabelParking = [];

  this.parkingSpotArray.forEach((spot:any) => {
    console.log(spot)
    const isOccupied = this.bookedSpotList.some(
      booking => String(booking.parkSpotNo) === String(spot) && booking.outTime == null
    );

    if (isOccupied) {
      this.occupiedParking.push(spot);
    } else {
      this.availabelParking.push(spot);
    }
  });

  // console.log('Available:', this.availabelParking);
  // console.log('Occupied:', this.occupiedParking);
}



  getFloorByBuildingId(event: Event){
    this.parkingSpotArray = [];
  this.BuildingFloor = [];
    const BuildingId = (event.target as HTMLSelectElement).value;
    this.masrerSer.getSiteByBuildingId(BuildingId).subscribe((res) => {
      this.BuildingFloor = res.data;
    });
  }

  getParkingSpots(event: Event){
    const floorId = (event.target as HTMLSelectElement).value;
    this.floorId = floorId
    const floor = this.BuildingFloor.find((m:any)=>m.floorId == floorId);
    if (!floor) return; // exit if not found

    this.parkingSpotArray = []; // clear previous data
      for (let index = 1; index <= floor?.totalParkingSpots; index++) {
        this.parkingSpotArray.push(index)
      }
      this.getBooking();
  }

  getBooking(){
    this.masrerSer.getAllParkingByFloor(this.floorId).subscribe((res) => {
      this.bookedSpotList = res.data;
    this.calculateAvailableAndOccupied();

    });

  }

  // MODAL OPEN
  openModal(spotNo:number){
    if(this.bookModal){
      this.bookModal.nativeElement.style.display='block'
      this.bookForm.patchValue({
        parkSpotNo: spotNo
      });
    }
  }

  closeModal(){
    if(this.bookModal){
      this.bookModal.nativeElement.style.display='none'
    }
  }

  // RELEASE MODAL
  openReleaseModal(parkId:number){
    console.log(parkId)
    this.releaseForm.patchValue({
      parkId: parkId,
      outTime: new Date(),
      extraCharge: 0
    });

    this.releaseModal.nativeElement.style.display = 'block';
  }

  closeReleaseModal(){
    if(this.releaseModal){
      this.releaseModal.nativeElement.style.display='none'
    }
  }

  onSubmitRelease(){

    const releaseData = this.releaseForm.value;
    console.log(releaseData)


    this.masrerSer.exitSpot(releaseData).subscribe((res:any)=>{
      // alert("booked")
      this.closeReleaseModal()
    })
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
      this.closeModal();
    })
      this.getBooking();
  }
}


// {
//   "parkId": 0,
//   "outTime": "2025-07-04T03:17:42.595Z",
//   "extraCharge": 0
// }