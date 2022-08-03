
 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 
 dotenv.config();


 /**
 * Required External Modules
 */

 const parkingHistory = require('../src/parkingHistory/parkingHistory.route');
 const parkingLot = require('../src/parkingLotMap/parkingLot.route');
 const bodyParser = require('body-parser');

/**
 * App Variables
 */

 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();


/**
 *  App Configuration
 */
 app.use(helmet());
 app.use(cors());
 app.use(express.json());

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



/**
 * Server Activation
 */

 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });



app.use('/parkingHistory', parkingHistory)
app.use('/parkingLot', parkingLot)