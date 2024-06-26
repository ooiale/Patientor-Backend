
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patients {
  "id": string
  "name": string
  "dateOfBirth": string
  "ssn": string
  "gender": Gender
  "occupation": string
  "entries": Entry[]
}

export type NonSensitivePatients = Omit<Patients, "ssn" | "entries">;
// REMOVED ENTRIES FROM THESE TWO FOR NOW
export type NoIdPatient = Omit<Patients, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

enum healthCheckRating {
  "Health" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: healthCheckRating
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

export interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id'>;
export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;
export type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, "id">;