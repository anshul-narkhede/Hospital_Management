import { supabase } from '@/lib/supabase';
import { Patient } from '@/types/billing';

export const patientDatabase = {
  async addPatient(patientData: Omit<Patient, "id" | "dateAdded">) {
    const { data, error } = await supabase
      .from('patients')
      .insert({
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        address: patientData.address,
        user_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      dateAdded: new Date(data.date_added)
    } as Patient;
  },

  async getPatient(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select()
      .eq('id', id)
      .single();

    if (error) return undefined;

    return {
      ...data,
      dateAdded: new Date(data.date_added)
    } as Patient;
  },

  async getAllPatients() {
    const { data, error } = await supabase
      .from('patients')
      .select()
      .order('date_added', { ascending: false });

    if (error) throw error;

    return data.map(patient => ({
      ...patient,
      dateAdded: new Date(patient.date_added)
    })) as Patient[];
  },

  async updatePatient(id: string, patientData: Partial<Omit<Patient, "id" | "dateAdded">>) {
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select()
      .single();

    if (error) return undefined;

    return {
      ...data,
      dateAdded: new Date(data.date_added)
    } as Patient;
  },

  async deletePatient(id: string) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    return !error;
  }
};