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
const parkingLot_service_1 = require("./parkingLot.service");
const express = require('express');
const router = express.Router();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, parkingLot_service_1.parkingLotfindAll)());
}));
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds');
});
router.post('/park', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req. body', req.body);
    res.send(yield (0, parkingLot_service_1.park)(req.body.entryPoint, parseInt(req.body.carType), new Date(req.body.date), req.body.plateNumber));
}));
router.post('/unpark', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req. body', req.body);
    res.send(yield (0, parkingLot_service_1.unpark)(new Date(req.body.date), req.body.plateNumber));
}));
module.exports = router;
