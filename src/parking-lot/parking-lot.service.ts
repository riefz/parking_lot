import { Injectable } from '@nestjs/common';
import { ParkingLot } from './interfaces/parking-lot.interface';

@Injectable()
export class ParkingLotService {
  private parking_lot: ParkingLot;

  create() {
    this.parking_lot = {capacity: 0, slots: []};
  }

  setCapacity(num){
    this.parking_lot['capacity'] = num;

    // Add To Array
    for (let idx = 0; idx < num; idx++) {
      this.parking_lot['slots'].push(null);
    }

    console.log('Created parking lot with ' + num + ' slots');
    return 'Created parking lot with ' + num + ' slots';
  }

  // PARK a car
  park(data){
    let maxCapacity = this.parking_lot['capacity'];

    for (let idx = 0; idx < maxCapacity; idx++) {
      if(this.parking_lot['slots'][idx]==null){
        this.parking_lot['slots'][idx] = data;

        console.log('Allocated slot number: ' + (idx+1));
        return 'Allocated slot number: ' + (idx+1);
        // break;
      }
      
    }

    console.log('Sorry, parking lot is full');
    return 'Sorry, parking lot is full';

    // if(this.parking_lot['slots'].length>=maxCapacity){
    //   console.log('Sorry, parking lot is full');
    //   return 'Sorry, parking lot is full';
    // }
    // else{
    //   this.parking_lot['slots'].push(data);
    //   console.log('Allocated slot number: ' + (this.parking_lot['slots'].length));
    //   return 'Allocated slot number: ' + (this.parking_lot['slots'].length);
    // }
  }

  // LEAVE PARK SLOTS
  leave(data, hours){
    let dataIdx = this.parking_lot['slots'].indexOf(data.toString());
    let charge = 10;

    if(dataIdx>=0){
      if(charge>2){
        charge = charge + ((hours-2) * 10);
      };

      this.parking_lot['slots'][dataIdx] = null;

      // this.parking_lot['slots'].splice(dataIdx, 1);
      console.log('Registration number ' + data + ' with Slot Number ' + (dataIdx+1) + ' is free with Charge ' + charge);
      return 'Registration number ' + data + ' with Slot Number ' + (dataIdx+1) + ' is free with Charge ' + charge;
    }
    else{
      console.log('Registration number ' + data + ' not found');
      return 'Registration number ' + data + ' not found';
    }
  }

  // GET STATUS OF SLOTS
  status(){
    console.log('Slot No. \tRegistration No.');
    for (let idx = 0; idx < this.parking_lot['slots'].length; idx++) {
      const element = this.parking_lot['slots'][idx];

      if(element!=null){
        console.log((idx+1) + '\t' + element);
      }
      
    }
  }

  // PARSING TEXT AND PROCEES
  parsing(text){
    let myArr = text.split(" ");
    // console.log(myArr);
    
    if(myArr.length>0){
      switch (myArr[0]) {
        case 'status':
          this.status();
          break;
        case 'create_parking_lot':
          if(myArr.length==2){
            this.create();
            this.setCapacity(parseInt(myArr[1]));
          };
          
          break;
        case 'park':
          if(myArr.length==2){
            this.park(myArr[1]);
          };
          
          break;
        case 'leave':
          if(myArr.length==3){
            this.leave(myArr[1], parseInt(myArr[2]));
          };
          
          break;
        default:
          break;
      }
    }
  }
}
