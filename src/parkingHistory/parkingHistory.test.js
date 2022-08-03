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
const parkingHistory_service_1 = require("./parkingHistory.service");
var assert = require('assert');
describe('ParkingHistory', function () {
    describe('parkingHistoryFindAll()', function () {
        it('should return total hours in parking', function () {
            return __awaiter(this, void 0, void 0, function* () {
                let result = yield (0, parkingHistory_service_1.hoursUsed)(new Date('2022-07-19T08:00:00'), new Date('2022-07-19T16:00:00'));
                assert.equal(result.hours, 8);
            });
        });
        it('should return 1st date used with in 1hr', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // let result = await hoursUsed(new Date('2022-07-19T08:00:00'), new Date('2022-07-19T16:00:00'));
                //'2022-07-19T07:00:00')}, {plateNumber: 'ABO1234', date: new Date('2022-07-19T08:00:01'
                assert.equal((yield (0, parkingHistory_service_1.checkHistory)([
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
                ], 'ABO1234')).date.toISOString(), new Date('2022-07-19T07:00:00').toISOString());
            });
        });
    });
});
