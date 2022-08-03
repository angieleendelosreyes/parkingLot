import { park } from "./parkingLot.service";

var assert = require('assert');



describe('ParkingLot', function () {
  describe('park()', function () {

    it('should return total hours in parking', async function () {
      let result = await park('C',1, new Date('2022-07-19T07:00:00'), 'ABO1234');
      let expected = {
        entrypoints: [
          {
            distance: 3,
            name: 'A'
          },
          {
            distance: 5,
            name: 'B'
          },
          {
            distance: 2,
            name: 'C'
          }
        ],
        lotNum: 3,
        size: 2,
        vacant: false
      }
      assert.equal(result.lotNum, expected.lotNum);
    });


  });
});