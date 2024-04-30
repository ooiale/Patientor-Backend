"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getNonSensitiveData = () => {
    return (patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        });
    }));
};
const addPatient = (info) => {
    const newPatient = Object.assign(Object.assign({}, info), { id: (0, uuid_1.v1)(), entries: [] // HARDCODED ENTRY FOR NOW
     });
    patients_1.default.push(newPatient);
    return newPatient;
};
const patientById = (id) => {
    var _a;
    const patient = patients_1.default.find(p => p.id === id);
    if (!patient) {
        throw new Error(`no patient found with id: ${id}`);
    }
    patient.entries = (_a = patient.entries) !== null && _a !== void 0 ? _a : [];
    return patient;
};
const addPatientEntry = (id, entry) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    const patient = patients_1.default.find(p => p.id === id);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getNonSensitiveData,
    addPatient,
    patientById,
    addPatientEntry,
};
