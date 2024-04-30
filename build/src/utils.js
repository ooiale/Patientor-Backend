"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
//, HospitalEntryWithoutId, Discharge, OccupationalHealthcareEntry, HealthCheckEntry
const isString = (value) => {
    return typeof value === 'string';
};
const parseName = (value) => {
    if (!value || !isString(value)) {
        throw new Error('name is missing or is invalid');
    }
    return value;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (value) => {
    if (!value || !isString(value) || !isDate(value)) {
        throw new Error('date is missing or is invalid');
    }
    return value;
};
const isSsn = (str) => {
    const ssnPattern = /^\d{6}-\d{2}[A-Za-z0-9]{1,2}$/;
    //console.log(str, typeof str, ssnPattern.test(str));
    return ssnPattern.test(str);
};
const parseSsn = (value) => {
    if (!value || !isString(value) || !isSsn(value)) {
        throw new Error('ssn is missing or is invalid');
    }
    return value;
};
const isGender = (str) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(str);
};
const parseGender = (value) => {
    if (!value || !isString(value) || !isGender(value)) {
        throw new Error('gender is missing or is invalid');
    }
    return value;
};
const parseOccupation = (value) => {
    if (!value || !isString(value)) {
        throw new Error('occupation is missing or is invalid');
    }
    return value;
};
const toNewPatientType = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('missing data or is invalid');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newObject = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newObject;
    }
    throw new Error('missing information or is invalid');
};
// --------------------------------- //
const parseDescription = (value) => {
    if (!value || !isString(value)) {
        throw new Error('description is missing or is invalid' + value);
    }
    return value;
};
const parseSpecialist = (value) => {
    if (!value || !isString(value)) {
        throw new Error('specialist is missing or is invalid' + value);
    }
    return value;
};
const parseDiagnosisCodes = (value) => {
    if (!Array.isArray(value)) {
        throw new Error('Diagnosis code is invalid: ' + value);
    }
    value.forEach((e) => {
        if (typeof e !== 'string') {
            throw new Error('Invalid diagnosis code object: ' + JSON.stringify(e));
        }
    });
    return value;
};
/*
const isHospitalEntry = (entry: EntryWithoutId): entry is HospitalEntryWithoutId => {
  return entry.type === 'Hospital';
};

const isOccupationalHealthcareEntry = (entry: EntryWithoutId): entry is HospitalEntryWithoutId => {
  return entry.type === 'Hospital';
};

const isHospitalEntry = (entry: EntryWithoutId): entry is HospitalEntryWithoutId => {
  return entry.type === 'Hospital';
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  )  {
    throw new Error ('discharge is invalid' + JSON.stringify(object));}
  if (
  isString(object.date) &&
  isDate(object.date) &&
  isString(object.criteria)) {
    return object as Discharge;
  }
  throw new Error ('discharge is invalid' + JSON.stringify(object));
};*/
const toNewEntryType = (object) => {
    var _a, _b;
    if (!object || typeof object !== 'object') {
        throw new Error('missing data field' + object);
    }
    if (!('type' in object)) {
        throw new Error('missing type field');
    }
    if (!('date' in object) ||
        !('specialist' in object) ||
        !('description' in object)) {
        throw new Error('missing fields date or specialist or description');
    }
    const newObject = {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: 'diagnosisCodes' in object
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : undefined,
    };
    console.log('newObject: ', newObject);
    if ('sickLeave' in object &&
        typeof object.sickLeave === 'object' &&
        object.sickLeave &&
        'startDate' in object.sickLeave &&
        'endDate' in object.sickLeave &&
        (((_a = object.sickLeave) === null || _a === void 0 ? void 0 : _a.startDate) === '' ||
            ((_b = object.sickLeave) === null || _b === void 0 ? void 0 : _b.endDate) === '')) {
        console.log('LOOOOOOOOOOOOL');
        throw new Error('Sick leave does not contain a start or final date');
    }
    if ('type' in object &&
        ('employerName' in object || 'discharge' in object || 'healthCheckRating' in object)) {
        return object;
    }
    throw new Error('There are invalid or missing fields for the specific type related fields');
    /*
     switch (object.type) {
      case 'Hospital':
        newObject['type'] = "Hospital";
        if (isHospitalEntry(newObject) && 'discharge' in object)
        newObject['discharge'] = parseDischarge(object.discharge);
        break;
      case 'OccupationalHealthcare':
        newObject['type'] = "OccupationalHealthcare";
        if (isHospitalEntry(newObject) && 'discharge' in object)
        newObject['discharge'] = parseDischarge(object.discharge);
        break;
      case 'HealthCheck':
        parseHealthCheck(object);
        break;
      default:
        throw new Error ('invalid type' + object.type);
     }*/
};
exports.default = {
    toNewPatientType,
    toNewEntryType,
};
