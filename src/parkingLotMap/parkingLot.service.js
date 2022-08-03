"use strict";
/**
 * Data Model Interfaces
 */
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
exports.unpark = exports.park = exports.find = exports.parkingLotfindAll = void 0;
const parkingHistory_service_1 = require("../parkingHistory/parkingHistory.service");
const pricing_service_1 = require("../Pricing/pricing.service");
// import {findAll} from '../parkingHistory/parkingHistory.service'
/**
 * In-Memory Store
 */
let parkingLot = [
    {
        lotNum: 1,
        entrypoints: [
            {
                name: "A",
                distance: 1,
            },
            {
                name: "B",
                distance: 3,
            },
            {
                name: "C",
                distance: 4,
            }
        ],
        size: 0,
        vacant: true,
    },
    {
        lotNum: 2,
        entrypoints: [
            {
                name: "A",
                distance: 2,
            },
            {
                name: "B",
                distance: 4,
            },
            {
                name: "C",
                distance: 3,
            }
        ],
        size: 1,
        vacant: true,
    },
    {
        lotNum: 3,
        entrypoints: [
            {
                name: "A",
                distance: 3,
            },
            {
                name: "B",
                distance: 5,
            },
            {
                name: "C",
                distance: 2,
            }
        ],
        size: 2,
        vacant: true,
    },
    {
        lotNum: 4,
        entrypoints: [
            {
                name: "A",
                distance: 4,
            },
            {
                name: "B",
                distance: 6,
            },
            {
                name: "C",
                distance: 1,
            }
        ],
        size: 0,
        vacant: true,
    },
    {
        lotNum: 5,
        entrypoints: [
            {
                name: "A",
                distance: 2,
            },
            {
                name: "B",
                distance: 2,
            },
            {
                name: "C",
                distance: 5,
            }
        ],
        size: 1,
        vacant: true,
    },
    {
        lotNum: 6,
        entrypoints: [
            {
                name: "A",
                distance: 3,
            },
            {
                name: "B",
                distance: 3,
            },
            {
                name: "C",
                distance: 4,
            }
        ],
        size: 2,
        vacant: true,
    },
    {
        lotNum: 7,
        entrypoints: [
            {
                name: "A",
                distance: 4,
            },
            {
                name: "B",
                distance: 4,
            },
            {
                name: "C",
                distance: 3,
            }
        ],
        size: 0,
        vacant: true,
    },
    {
        lotNum: 8,
        entrypoints: [
            {
                name: "A",
                distance: 5,
            },
            {
                name: "B",
                distance: 5,
            },
            {
                name: "C",
                distance: 2,
            }
        ],
        size: 1,
        vacant: true,
    },
    {
        lotNum: 9,
        entrypoints: [
            {
                name: "A",
                distance: 3,
            },
            {
                name: "B",
                distance: 1,
            },
            {
                name: "C",
                distance: 6,
            }
        ],
        size: 2,
        vacant: true,
    },
    {
        lotNum: 10,
        entrypoints: [
            {
                name: "A",
                distance: 4,
            },
            {
                name: "B",
                distance: 2,
            },
            {
                name: "C",
                distance: 5,
            }
        ],
        size: 0,
        vacant: true,
    },
    {
        lotNum: 11,
        entrypoints: [
            {
                name: "A",
                distance: 5,
            },
            {
                name: "B",
                distance: 3,
            },
            {
                name: "C",
                distance: 4,
            }
        ],
        size: 1,
        vacant: true,
    },
    {
        lotNum: 12,
        entrypoints: [
            {
                name: "A",
                distance: 6,
            },
            {
                name: "B",
                distance: 4,
            },
            {
                name: "C",
                distance: 3,
            }
        ],
        size: 2,
        vacant: true,
    },
];
/**
 * Service Methods
 */
//  export const update = async (
//   entrypoints: EntryPoints,
//   lotNum: number
// ): Promise<ParkingSlot | null> => {
//   const item = await find(lotNum);
//   if (!item) {
//     return null;
//   }
//   return ;
// };
const parkingLotfindAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(parkingLot); });
exports.parkingLotfindAll = parkingLotfindAll;
const find = (lotNum) => __awaiter(void 0, void 0, void 0, function* () { return parkingLot[lotNum]; });
exports.find = find;
const park = (entryPoint, carType, date, plateNumber) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(entryPoint, carType, date, plateNumber);
    if (entryPoint && carType != undefined && date && plateNumber) {
        let shortest;
        for (let i = 0; i < parkingLot.length; i++) {
            if (parkingLot[i].vacant) {
                if (parkingLot[i].size >= carType) {
                    if (shortest === undefined) {
                        shortest = i;
                    }
                    let curr = parkingLot[i].entrypoints.find(e => e.name === entryPoint);
                    let short = parkingLot[shortest].entrypoints.find(e => e.name === entryPoint);
                    if ((curr && short) && curr.distance < short.distance) {
                        shortest = i;
                    }
                }
            }
        }
        let parkingHistory = yield (0, parkingHistory_service_1.parkingHistoryFindAll)();
        parkingHistory.push({ plateNumber: plateNumber, date: date, parkingLot: parkingLot[shortest || 0] });
        parkingLot[shortest || 0].vacant = false;
        console.log('Lot number', parkingLot[shortest || 0].lotNum);
        return parkingLot[shortest || 0];
    }
    else {
        throw new Error('Body is not defined');
    }
});
exports.park = park;
const unpark = (date, plateNumber) => __awaiter(void 0, void 0, void 0, function* () {
    let parkingHistory = yield (0, parkingHistory_service_1.parkingHistoryFindAll)();
    let history = yield (0, parkingHistory_service_1.checkHistory)(parkingHistory, plateNumber);
    let hours = yield (0, parkingHistory_service_1.hoursUsed)(history.date, date);
    let price = yield (0, pricing_service_1.pricing)(hours.hours, history.parkingLot.size);
    let result = {
        plateNumber: history.plateNumber,
        date: history.date,
        parkingLot: history.parkingLot,
        total: price.price
    };
    return result;
});
exports.unpark = unpark;
