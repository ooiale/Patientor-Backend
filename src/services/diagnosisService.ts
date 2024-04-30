import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../../types';

const getData = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getData,
};