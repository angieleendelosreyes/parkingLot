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
exports.checkHistory = exports.hoursUsed = exports.parkingHistoryFind = exports.parkingHistoryFindAll = void 0;
let parkingHistory = [];
const parkingHistoryFindAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return parkingHistory;
});
exports.parkingHistoryFindAll = parkingHistoryFindAll;
const parkingHistoryFind = (lotNum) => __awaiter(void 0, void 0, void 0, function* () { return parkingHistory[lotNum]; });
exports.parkingHistoryFind = parkingHistoryFind;
const hoursUsed = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    let millseconds = to.getTime() - from.getTime();
    let perHour = millseconds / 1000 / 60 / 60;
    return {
        hours: perHour
    };
});
exports.hoursUsed = hoursUsed;
const checkHistory = (parkingHistory, plateNumber) => __awaiter(void 0, void 0, void 0, function* () {
    let lastValidRecord = 0;
    for (let i = parkingHistory.length - 1; i >= 0; i--) {
        if (parkingHistory[i].plateNumber == plateNumber) {
            if (lastValidRecord === undefined) {
                lastValidRecord = i;
            }
            let diffHoursUsed = yield (0, exports.hoursUsed)(parkingHistory[i].date, parkingHistory[lastValidRecord].date);
            if (diffHoursUsed.hours <= 1) {
                lastValidRecord = i;
            }
        }
    }
    return parkingHistory[lastValidRecord];
});
exports.checkHistory = checkHistory;
