/**
 * Data Model Interfaces
 */


import { checkHistory, hoursUsed, parkingHistoryFindAll } from "../parkingHistory/parkingHistory.service";
import { pricing } from "../Pricing/pricing.service";
import { EntryPoints } from "./entryPoints.interface";
import { ParkingSlot, ParkingSlotPayment } from "./parkingSlot.interface";
// import {findAll} from '../parkingHistory/parkingHistory.service'

/**
 * In-Memory Store
 */
let parkingLot: ParkingSlot[] = [
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

export const parkingLotfindAll = async (): Promise<ParkingSlot[]> => Object.values(parkingLot);

export const find = async (lotNum: number): Promise<ParkingSlot> => parkingLot[lotNum];

export const park = async (entryPoint: string, carType: number, date: Date, plateNumber: string): Promise<ParkingSlot> => {
  console.log(entryPoint, carType, date, plateNumber)
  if(entryPoint && carType!=undefined && date && plateNumber){
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
            shortest = i
          }
        }
      }
  
    }
    let parkingHistory = await parkingHistoryFindAll();
    parkingHistory.push({ plateNumber: plateNumber, date: date, parkingLot: parkingLot[shortest||0] });
    parkingLot[shortest||0].vacant = false;
    console.log('Lot number', parkingLot[shortest||0].lotNum)
    return parkingLot[shortest||0];
  }else{
    throw  new Error('Body is not defined');
  }


};


export const unpark = async (date: Date, plateNumber: string): Promise<ParkingSlotPayment> => {
  let parkingHistory = await parkingHistoryFindAll();
  let history = await checkHistory(parkingHistory, plateNumber);
  let hours = await hoursUsed(history.date, date);
  let price = await pricing(hours.hours, history.parkingLot.size);
  let result = {
    plateNumber: history.plateNumber,
    date: history.date,
    parkingLot: history.parkingLot,
    total: price.price
  }

  return result;
};



