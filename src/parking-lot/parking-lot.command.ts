import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

import { ParkingLotService } from './parking-lot.service';
 
@Injectable()
export class ParkingLotCommand {
  constructor(
    private readonly parkingLotService: ParkingLotService,
  ) { }
 
//   @Command({ command: 'create_parking_lot <num>', describe: 'Create parking lot of size n', autoExit: true })
//   async create(
//     @Positional({
//       name: 'num',
//       describe: 'Create parking lot of size n',
//       type: 'number',
//     }) num: number,
//   ) {
//     this.parkingLotService.create();
//     this.parkingLotService.setCapacity(num);
//   }

//   @Command({ command: 'park <name>', describe: 'Park a car', autoExit: true })
//   async park(
//     @Positional({
//       name: 'name',
//       describe: 'Park a car',
//       type: 'string',
//     }) name: string,
//   ) {
//     this.parkingLotService.park(name);
//   }

//   @Command({ command: 'leave <name> <num>', describe: 'Remove (Unpark) car from', autoExit: true })
//   async leave(
//     @Positional({
//       name: 'name',
//       describe: 'Name of a car',
//       type: 'string',
//     }) name: string,
//     @Positional({
//         name: 'num',
//         describe: 'Total Hours',
//         type: 'number',
//       }) num: number,
//   ) {
//     this.parkingLotService.leave(name, num);
//   }

  @Command({ command: 'parking_lot <file>', describe: 'Read parking lot source file', autoExit: true })
  async upload(
    @Positional({
        name: 'file',
        describe: 'File to check',
        type: 'string',
      }) file: string
  ) {
    // console.log(file);
    let dataFile = fs.readFileSync(file);

    if(dataFile){
        let dataBuffer = dataFile;

        if (!(dataBuffer instanceof Buffer)) {
          throw new Error('not a instanceof Buffer');
        }
    
        let currentData = dataBuffer.toString().split(/(?:\r\n|\r|\n)/g);
    
        if (currentData && currentData.length) {
          for (var line = 0; line < currentData.length; line++) {
              // console.log(currentData[line]);
              this.parkingLotService.parsing(currentData[line]);
          }
        }
    }
    else{
        console.log('Not valid file');
    }
  }
}
