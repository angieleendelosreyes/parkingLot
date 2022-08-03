
import { HoursUsed, ParkingHistory } from "./parkingHistory.interface";


let parkingHistory: ParkingHistory[] = [];


export const parkingHistoryFindAll = async (): Promise<ParkingHistory[]> => {
    return parkingHistory
};

export const parkingHistoryFind = async (lotNum: number): Promise<ParkingHistory> => parkingHistory[lotNum];

export const hoursUsed = async (from: Date, to: Date): Promise<HoursUsed> => {
    let millseconds = to.getTime() - from.getTime();
    let perHour = millseconds/1000/60/60;
    return  {
        hours: perHour
    }
};


export const checkHistory = async (parkingHistory: ParkingHistory[],  plateNumber: string): Promise<ParkingHistory> => {
    let lastValidRecord = 0;
    for(let  i = parkingHistory.length-1; i >= 0; i--){
        if (parkingHistory[i].plateNumber == plateNumber){

            if(lastValidRecord === undefined){
                lastValidRecord = i;
            }
            let diffHoursUsed = await hoursUsed(parkingHistory[i].date, parkingHistory[lastValidRecord].date)
            if (diffHoursUsed.hours <= 1){
                 lastValidRecord = i
            }
            
        }
            
    }
    return parkingHistory[lastValidRecord]
};



