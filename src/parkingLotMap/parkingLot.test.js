"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parkingLot_service_1 = require("./parkingLot.service");
var assert = require('assert');
describe('ParkingLot', function () {
    describe('park()', function () {
        it('should return total hours in parking', function () {
            return __awaiter(this, void 0, void 0, function* () {
                let result = yield (0, parkingLot_service_1.park)('C', 1, new Date('2022-07-19T07:00:00'), 'ABO1234');
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
                };
                assert.equal(result.lotNum, expected.lotNum);
            });
        });
    });
});
