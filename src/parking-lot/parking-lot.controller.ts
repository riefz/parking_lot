import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from  '@nestjs/common';
import { FileInterceptor } from  '@nestjs/platform-express';
import { ParkingLotService } from './parking-lot.service';

@Controller('parking-lot')
export class ParkingLotController {

  constructor(private service: ParkingLotService) { }

  @Get()
  findAll(): string {
    return 'This action returns all data';
  }

  @Get(':type')
  get(@Param() params) {
    if(params.type == 'test'){
      this.service.create();
      this.service.setCapacity(6);
      this.service.park('AXCscd2');
      this.service.park('AXCscd3');
      this.service.park('AXCscd4');
      this.service.park('AXCscd5');
      this.service.park('AXCscd6');
      this.service.park('AXCscd7');
      this.service.status();
      this.service.park('AXCscd8');
      this.service.park('AXCscd9');
      this.service.park('AXCscd10');
      this.service.leave('AXCscd2', 3);
      this.service.leave('AXCscd2Z', 4);
      this.service.status();
      this.service.leave('AXCscd6',8);
      this.service.park('AXCscd9');
      this.service.status();
      return 'Hello ' + params.type;
    }
    return false;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    let dataBuffer = file.buffer;

    if (!(dataBuffer instanceof Buffer)) {
      throw new Error('not a instanceof Buffer');
    }

    let currentData = dataBuffer.toString().split(/(?:\r\n|\r|\n)/g);

    if (currentData && currentData.length) {
      for (var line = 0; line < currentData.length; line++) {
          // console.log(currentData[line]);
          this.service.parsing(currentData[line]);
      }
    }
  }
}
