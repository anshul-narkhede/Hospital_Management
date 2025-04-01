
export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  dateAdded: Date;
}

export interface MedicalService {
  id: string;
  name: string;
  doctorName: string;
  cost: number;
}

export interface Bill {
  patient: Patient;
  serviceDate: Date;
  services: MedicalService[];
  totalAmount: number;
}

// Database related interfaces
export interface PatientDatabase {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, "id" | "dateAdded">) => Patient;
  getPatient: (id: string) => Patient | undefined;
  getAllPatients: () => Patient[];
  updatePatient: (id: string, patientData: Partial<Omit<Patient, "id" | "dateAdded">>) => Patient | undefined;
  deletePatient: (id: string) => boolean;
}
