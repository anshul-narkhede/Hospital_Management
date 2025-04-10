import React, { useState, useEffect } from "react";
import { Patient } from "@/types/billing";
import { patientDatabase } from "@/services/patientDatabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, User, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PatientSelectorProps {
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ selectedPatient, onSelectPatient }) => {
  const { toast } = useToast();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await patientDatabase.getAllPatients();
      setPatients(data);
    } catch (error) {
      toast({
        title: "Error loading patients",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPatients = searchTerm 
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : patients;

  const handleAddNewPatient = async () => {
    if (!newPatient.name.trim()) {
      toast({
        title: "Missing information",
        description: "Patient name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const patient = await patientDatabase.addPatient(newPatient);
      setPatients([patient, ...patients]);
      onSelectPatient(patient);
      setNewPatient({ name: "", email: "", phone: "", address: "" });
      setIsAddingNew(false);
      
      toast({
        title: "Patient added",
        description: `${patient.name} has been added successfully`
      });
    } catch (error) {
      toast({
        title: "Error adding patient",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full border-2 border-blue-200">
        <CardContent className="pt-4 pb-2">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {selectedPatient ? (
          <Card className="w-full border-2 border-blue-200">
            <CardContent className="pt-4 pb-2 flex justify-between items-center">
              <div>
                <div className="font-medium text-blue-700">{selectedPatient.name}</div>
                <div className="text-sm text-gray-500">{selectedPatient.id}</div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Change</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Select Patient</DialogTitle>
                  </DialogHeader>
                  <PatientList 
                    patients={filteredPatients}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSelectPatient={(patient) => {
                      onSelectPatient(patient);
                      setSearchTerm("");
                    }}
                    onAddNew={() => setIsAddingNew(true)}
                    isAddingNew={isAddingNew}
                    newPatient={newPatient}
                    setNewPatient={setNewPatient}
                    onCancelAdd={() => setIsAddingNew(false)}
                    onSubmitAdd={handleAddNewPatient}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <User className="mr-2 h-4 w-4" />
                Select Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Select Patient</DialogTitle>
              </DialogHeader>
              <PatientList 
                patients={filteredPatients}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSelectPatient={(patient) => {
                  onSelectPatient(patient);
                  setSearchTerm("");
                }}
                onAddNew={() => setIsAddingNew(true)}
                isAddingNew={isAddingNew}
                newPatient={newPatient}
                setNewPatient={setNewPatient}
                onCancelAdd={() => setIsAddingNew(false)}
                onSubmitAdd={handleAddNewPatient}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

interface PatientListProps {
  patients: Patient[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectPatient: (patient: Patient) => void;
  onAddNew: () => void;
  isAddingNew: boolean;
  newPatient: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  setNewPatient: (patient: any) => void;
  onCancelAdd: () => void;
  onSubmitAdd: () => void;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  searchTerm,
  setSearchTerm,
  onSelectPatient,
  onAddNew,
  isAddingNew,
  newPatient,
  setNewPatient,
  onCancelAdd,
  onSubmitAdd
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or ID..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="h-64 overflow-y-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSelectPatient(patient)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {!isAddingNew ? (
        <Button 
          variant="outline" 
          onClick={onAddNew}
          className="w-full"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      ) : (
        <div className="border p-4 rounded-md space-y-3">
          <h4 className="font-medium">Add New Patient</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="new-name">Name</Label>
              <Input 
                id="new-name" 
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="new-email">Email (optional)</Label>
              <Input 
                id="new-email" 
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="new-phone">Phone (optional)</Label>
              <Input 
                id="new-phone" 
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <Label htmlFor="new-address">Address (optional)</Label>
              <Input 
                id="new-address" 
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                placeholder="123 Main St"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onCancelAdd}
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                onClick={onSubmitAdd}
              >
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSelector;