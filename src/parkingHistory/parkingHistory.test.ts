import { hoursUsed, checkHistory, parkingHistoryFindAll } from './parkingHistory.service'
var assert = require('assert');



describe('ParkingHistory', function () {
  describe('parkingHistoryFindAll()', function () {

    it('should return total hours in parking', async function () {
      let result = await hoursUsed(new Date('2022-07-19T08:00:00'), new Date('2022-07-19T16:00:00'));
      assert.equal(result.hours, 8);
    });

    it('should return 1st date used with in 1hr', async function () {
      // let result = await hoursUsed(new Date('2022-07-19T08:00:00'), new Date('2022-07-19T16:00:00'));
      //'2022-07-19T07:00:00')}, {plateNumber: 'ABO1234', date: new Date('2022-07-19T08:00:01'
       assert.equal( (await checkHistory([
         {
           plateNumber: 'ABO1234',
           date: new Date('2022-07-19T07:00:00'),
           parkingLot: {
             lotNum: 1,
             entrypoints: [
               {
                 name: "A",
                 distance: 1,
               },
               {
                 name: "B",
                 distance: 1,
               },
               {
                 name: "C",
                 distance: 1,
               }
             ],
             size: 0,
             vacant: true,
           }
         },
         {
          plateNumber: 'ABO1234',
          date: new Date('2022-07-19T07:30:00'),
          parkingLot: {
            lotNum: 1,
            entrypoints: [
              {
                name: "A",
                distance: 1,
              },
              {
                name: "B",
                distance: 1,
              },
              {
                name: "D",
                distance: 1,
              }
            ],
            size: 0,
            vacant: true,
          }
        }
       ], 'ABO1234')).date.toISOString(),
        new Date('2022-07-19T07:00:00').toISOString());
    });

    
    

  });
});