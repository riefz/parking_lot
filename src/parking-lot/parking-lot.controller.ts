import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from  '@nestjs/common';
import { FileInterceptor } from  '@nestjs/platform-express';
import { ParkingLotService } from './parking-lot.service';

@Controller('parking-lot')
export class ParkingLotController {

  constructor(private service: ParkingLotService) { }

  @Get()
  findAll(): string {
    return 'You can do only POST Data with file as File';
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
