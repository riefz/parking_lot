import { Test } from '@nestjs/testing';
import { ParkingLotController } from './parking-lot.controller';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLot } from './interfaces/parking-lot.interface';

describe('ParkingLotController', () => {
  let parkingLotController: ParkingLotController;
  let parkingLotService: ParkingLotService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ParkingLotController],
      providers: [ParkingLotService],
    }).compile();

    parkingLotService = module.get<ParkingLotService>(ParkingLotService);
    parkingLotController = module.get<ParkingLotController>(ParkingLotController);
  });

  describe('create function', () => {
    it('should return an initial of parking slot', async () => {
      const result = {capacity: 0, slots: []};
      jest.spyOn(parkingLotService, 'create').mockImplementation(() => result);

      expect(parkingLotService.create()).toBe(result);
    });
  });

  describe('Create parking lot of size n', () => {
    it('should return an n sized of parking slot', async () => {
      const result2 = 'Created parking lot with 6 slots';
    //   jest.spyOn(parkingLotService, 'setCapacity').mockImplementation(() => result2);
        parkingLotService.create();
      expect(parkingLotService.setCapacity(6)).toMatch(result2);
    });
  });

  describe('Park a car', () => {
    it('should return an Allocated slot number: 1', async () => {
      const result3 = 'Allocated slot number: 1';
    //   jest.spyOn(parkingLotService, 'park', ).mockImplementation(() => result3);
    parkingLotService.create();
    parkingLotService.setCapacity(6);

      expect(parkingLotService.park('KA-01-HH-1234')).toMatch(result3);
    });
  });

  describe('Leave a car', () => {
    it('should return an valid leave Information', async () => {
      const result4 = 'Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 40';
    //   jest.spyOn(parkingLotService, 'park', ).mockImplementation(() => result4);
    parkingLotService.create();
    parkingLotService.setCapacity(6);
    parkingLotService.park('KA-01-HH-1234');
    parkingLotService.park('KA-01-HH-ABCD');

      expect(parkingLotService.leave('KA-01-HH-1234', 5)).toMatch(result4);
    });
  });
});
