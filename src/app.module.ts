import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';

import {ParkingLotModule} from './parking-lot/parking-lot.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload_files',
    }),
    ParkingLotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
