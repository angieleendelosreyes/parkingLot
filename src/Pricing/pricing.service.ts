import { Pricing, PricingTotal } from "./pricing.interface";

const pricingDay = 5000; // Full 24hrs rate

const fixedPrice = 40; // 3hrs fixed rate


export const parkingSizePricing = async (rem: number, parkingSize: number): Promise<Pricing> => {
    switch(parkingSize) {
        case 0:
          // small size parking slot price
          return {
            name: 'small',
            price: rem * 20
          }
          break;
        case 1:
          //  medium size parking slot price
          return {
            name: 'medium',
            price: rem * 60
          }
          break;
        case 2:
          //  large size parking slot price
          return {
            name: 'large',
            price: rem * 100
          }
          break;
        default:
            throw new Error('Parking Size Pricing Not Found');
            break;
            
      }
};

export const pricing = async (hours: number, parkingSize: number): Promise<PricingTotal> => {
    let roundedHours = Math.round(hours);
    if (roundedHours <= 3){ // fixed rate 3hrs
        return {
            price : fixedPrice 
        };
    }
    else if(roundedHours >= 3 && roundedHours < 24){ // morethan 3hr but lessthan 24hrs

        return {
            price : (await parkingSizePricing(roundedHours - 3, parkingSize)).price + fixedPrice 
        };
    }
    else if(roundedHours >= 24){ // is equal or more than 24hrs
        let totalCharge = 0;
        for(let i=0; i<Math.round(roundedHours/24); i++){
            totalCharge += pricingDay;
        }

        return {
            price: totalCharge += (await parkingSizePricing(Math.round(roundedHours % 24), parkingSize)).price
        }

    }else{
        throw new Error('Pricing Not Found')
    }
};

