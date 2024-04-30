import {v1 as uuid} from 'uuid';

import patientsData from '../../data/patients';
import { NonSensitivePatients, Patients, NoIdPatient, Entry, EntryWithoutId } from '../../types';

const getNonSensitiveData = (): NonSensitivePatients[] => {
  return (
    patientsData.map(({id, name, dateOfBirth, gender, occupation}) => {
      return({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      });
    })
  );
};

const addPatient = (info: NoIdPatient): Patients => {
  const  newPatient = {
    ...info,
    id: uuid(),
    entries: [] // HARDCODED ENTRY FOR NOW
  };
  patientsData.push(newPatient);
  return newPatient;
};

const patientById = (id: string): Patients => {
  const patient = patientsData.find(p => p.id === id);
  if (!patient) {
    throw new Error (`no patient found with id: ${id}`);
  }
  patient.entries = patient.entries ?? [];
  return patient;
};

const addPatientEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    ...entry,
    id: uuid()
  };
  const patient = patientsData.find(p => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};



export default {
  getNonSensitiveData,
  addPatient,
  patientById,
  addPatientEntry,
};