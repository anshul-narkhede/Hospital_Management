
import { Patient, PatientDatabase } from "@/types/billing";
import { generatePatientId } from "@/utils/billingUtils";

// Initialize the database from localStorage or with empty array
const initializePatientDatabase = (): Patient[] => {
  const storedPatients = localStorage.getItem('patients');
  if (storedPatients) {
    try {
      // Parse stored patients and convert date strings back to Date objects
      const patients = JSON.parse(storedPatients);
      return patients.map((patient: any) => ({
        ...patient,
        dateAdded: new Date(patient.dateAdded)
      }));
    } catch (e) {
      console.error('Error parsing patients from localStorage:', e);
      return [];
    }
  }
  return [];
};

// Save patients to localStorage
const savePatients = (patients: Patient[]): void => {
  try {
    localStorage.setItem('patients', JSON.stringify(patients));
  } catch (e) {
    console.error('Error saving patients to localStorage:', e);
  }
};

// Create a singleton database instance
const createPatientDatabase = (): PatientDatabase => {
  let patients = initializePatientDatabase();
  
  return {
    patients,
    
    addPatient: (patientData) => {
      const newPatient: Patient = {
        ...patientData,
        id: generatePatientId(),
        dateAdded: new Date()
      };
      
      patients = [...patients, newPatient];
      savePatients(patients);
      return newPatient;
    },
    
    getPatient: (id) => {
      return patients.find(patient => patient.id === id);
    },
    
    getAllPatients: () => {
      return [...patients];
    },
    
    updatePatient: (id, patientData) => {
      const index = patients.findIndex(patient => patient.id === id);
      if (index === -1) return undefined;
      
      const updatedPatient = {
        ...patients[index],
        ...patientData
      };
      
      patients = [
        ...patients.slice(0, index),
        updatedPatient,
        ...patients.slice(index + 1)
      ];
      
      savePatients(patients);
      return updatedPatient;
    },
    
    deletePatient: (id) => {
      const initialLength = patients.length;
      patients = patients.filter(patient => patient.id !== id);
      
      if (patients.length !== initialLength) {
        savePatients(patients);
        return true;
      }
      return false;
    }
  };
};

// Export a singleton instance
export const patientDatabase = createPatientDatabase();
