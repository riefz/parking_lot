import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingLotService} from './parking-lot/parking-lot.service';

import { MulterModule } from '@nestjs/platform-express';
import { CommandModule } from 'nestjs-command';

import {ParkingLotModule} from './parking-lot/parking-lot.module';
import { ParkingLotCommand } from "./parking-lot/parking-lot.command";

@Module({
  imports: [
    MulterModule.register({
      dest: './upload_files',
    }),
    CommandModule,
    // ParkingLotModule
  ],
  controllers: [AppController],
  providers: [AppService, ParkingLotCommand, ParkingLotService],
})
export class AppModule {}
