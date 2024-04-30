import express from 'express';

import patientsService from '../services/patientsService';

import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientsService.patientById(id);
    res.send(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({error: error.message});
    }
  }
});

router.post('/', (req, res) => {
  try {
    const patientToAdd = utils.toNewPatientType(req.body);
    const newPatient = patientsService.addPatient(patientToAdd);
    res.status(201).json(newPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const entryToAdd = utils.toNewEntryType(req.body);
    const newEntry = patientsService.addPatientEntry(id, entryToAdd);
    res.status(201).json(newEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;