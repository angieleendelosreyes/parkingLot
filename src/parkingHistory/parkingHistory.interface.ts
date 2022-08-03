import { ParkingSlot } from "../parkingLotMap/parkingSlot.interface"

export interface ParkingHistory {
    plateNumber: string, 
    date: Date, 
    parkingLot: ParkingSlot
}


export interface HoursUsed {
    hours: number
}
