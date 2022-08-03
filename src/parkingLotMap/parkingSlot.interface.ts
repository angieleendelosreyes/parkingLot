
 import { EntryPoints } from "./entryPoints.interface";

  export interface ParkingSlot {
      lotNum: number, 
      entrypoints: EntryPoints[]
      size: number,
      vacant: boolean
  }


  export interface ParkingSlotPayment {
    plateNumber: string, 
    date: Date, 
    parkingLot: ParkingSlot
    total: number
}
