
import { Bill, MedicalService, Patient } from "../types/billing";

export const generatePatientId = (): string => {
  return `P-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const calculateTotal = (services: MedicalService[]): number => {
  return services.reduce((total, service) => total + service.cost, 0);
};

export const generateBill = (patient: Patient, serviceDate: Date, services: MedicalService[]): Bill => {
  const totalAmount = calculateTotal(services);
  
  return {
    patient,
    serviceDate,
    services,
    totalAmount,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
