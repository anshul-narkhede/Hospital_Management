
import React, { useState } from "react";
import { Patient } from "@/types/billing";
import { patientDatabase } from "@/services/patientDatabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, User, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface PatientSelectorProps {
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ selectedPatient, onSelectPatient }) => {
  const { toast } = useToast();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const patients = patientDatabase.getAllPatients();
  
  const filteredPatients = searchTerm 
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : patients;
  
  const handleAddNewPatient = () => {
    if (!newPatient.name.trim()) {
      toast({
        title: "Missing information",
        description: "Patient name is required",
        variant: "destructive"
      });
      return;
    }
    
    const patient = patientDatabase.addPatient(newPatient);
    onSelectPatient(patient);
    setNewPatient({ name: "", email: "", phone: "", address: "" });
    setIsAddingNew(false);
    
    toast({
      title: "Patient added",
      description: `${patient.name} has been added to the database`
    });
  };
  
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
                          {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                              <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      onSelectPatient(patient);
                                      setSearchTerm("");
                                    }}
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
                        onClick={() => setIsAddingNew(true)}
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
                              onClick={() => setIsAddingNew(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700" 
                              onClick={handleAddNewPatient}
                            >
                              Add Patient
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  onSelectPatient(patient);
                                  setSearchTerm("");
                                }}
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
                    onClick={() => setIsAddingNew(true)}
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
                          onClick={() => setIsAddingNew(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700" 
                          onClick={handleAddNewPatient}
                        >
                          Add Patient
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default PatientSelector;
