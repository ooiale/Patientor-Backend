"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveData());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const patient = patientsService_1.default.patientById(id);
        res.send(patient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        }
    }
});
router.post('/', (req, res) => {
    try {
        const patientToAdd = utils_1.default.toNewPatientType(req.body);
        const newPatient = patientsService_1.default.addPatient(patientToAdd);
        res.status(201).json(newPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const entryToAdd = utils_1.default.toNewEntryType(req.body);
        const newEntry = patientsService_1.default.addPatientEntry(id, entryToAdd);
        res.status(201).json(newEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});
exports.default = router;
