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
exports.pricing = exports.parkingSizePricing = void 0;
const pricingDay = 5000; // Full 24hrs rate
const fixedPrice = 40; // 3hrs fixed rate
const parkingSizePricing = (rem, parkingSize) => __awaiter(void 0, void 0, void 0, function* () {
    switch (parkingSize) {
        case 0:
            // small size parking slot price
            return {
                name: 'small',
                price: rem * 20
            };
            break;
        case 1:
            //  medium size parking slot price
            return {
                name: 'medium',
                price: rem * 60
            };
            break;
        case 2:
            //  large size parking slot price
            return {
                name: 'large',
                price: rem * 100
            };
            break;
        default:
            throw new Error('Parking Size Pricing Not Found');
            break;
    }
});
exports.parkingSizePricing = parkingSizePricing;
const pricing = (hours, parkingSize) => __awaiter(void 0, void 0, void 0, function* () {
    let roundedHours = Math.round(hours);
    if (roundedHours <= 3) { // fixed rate 3hrs
        return {
            price: fixedPrice
        };
    }
    else if (roundedHours >= 3 && roundedHours < 24) { // morethan 3hr but lessthan 24hrs
        return {
            price: (yield (0, exports.parkingSizePricing)(roundedHours - 3, parkingSize)).price + fixedPrice
        };
    }
    else if (roundedHours >= 24) { // is equal or more than 24hrs
        let totalCharge = 0;
        for (let i = 0; i < Math.round(roundedHours / 24); i++) {
            totalCharge += pricingDay;
        }
        return {
            price: totalCharge += (yield (0, exports.parkingSizePricing)(Math.round(roundedHours % 24), parkingSize)).price
        };
    }
    else {
        throw new Error('Pricing Not Found');
    }
});
exports.pricing = pricing;
