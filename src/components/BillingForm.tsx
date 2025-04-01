
// import React, { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MedicalService, Patient, Bill } from "@/types/billing";
// import { generateBill, calculateTotal } from "@/utils/billingUtils";
// import ServiceEntry from "./ServiceEntry";
// import BillPreview from "./BillPreview";
// import { PlusCircle } from "lucide-react";
// import PatientSelector from "./PatientSelector";

// const BillingForm = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("form");
  
//   // Replace the old patient state with a null initial state
//   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
//   const [serviceDate, setServiceDate] = useState<Date>(new Date());
  
//   const [services, setServices] = useState<MedicalService[]>([
//     {
//       id: `service-${Date.now()}`,
//       name: "",
//       doctorName: "",
//       cost: 0,
//     },
//   ]);
  
//   const [generatedBill, setGeneratedBill] = useState<Bill | null>(null);
  
//   const handleServiceChange = (index: number, updatedService: MedicalService) => {
//     const updatedServices = [...services];
//     updatedServices[index] = updatedService;
//     setServices(updatedServices);
//   };
  
//   const handleAddService = () => {
//     setServices([
//       ...services,
//       {
//         id: `service-${Date.now()}`,
//         name: "",
//         doctorName: "",
//         cost: 0,
//       },
//     ]);
//   };
  
//   const handleRemoveService = (index: number) => {
//     if (services.length <= 1) {
//       toast({
//         title: "Cannot remove",
//         description: "At least one service is required",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     const updatedServices = services.filter((_, i) => i !== index);
//     setServices(updatedServices);
//   };
  
//   const handleServiceDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const date = new Date(e.target.value);
//     if (!isNaN(date.getTime())) {
//       setServiceDate(date);
//     }
//   };
  
//   const handleGenerateBill = () => {
//     // Validate inputs
//     if (!selectedPatient) {
//       toast({
//         title: "Missing information",
//         description: "Please select a patient",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     const invalidServices = services.filter(
//       (service) => !service.name.trim() || !service.doctorName.trim() || service.cost <= 0
//     );
    
//     if (invalidServices.length > 0) {
//       toast({
//         title: "Incomplete service entries",
//         description: "Please complete all service entries with name, doctor and cost",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     const bill = generateBill(selectedPatient, serviceDate, services);
//     setGeneratedBill(bill);
//     setActiveTab("preview");
    
//     toast({
//       title: "Bill generated",
//       description: "Bill has been successfully generated",
//     });
//   };
  
//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-2 mb-6">
//           <TabsTrigger value="form">Billing Form</TabsTrigger>
//           <TabsTrigger value="preview" disabled={!generatedBill}>Bill Preview</TabsTrigger>
//         </TabsList>
        
//         <TabsContent value="form" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-blue-700">Patient Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <PatientSelector 
//                 selectedPatient={selectedPatient}
//                 onSelectPatient={setSelectedPatient}
//               />
              
//               <div>
//                 <Label htmlFor="service-date">Service Date</Label>
//                 <Input
//                   id="service-date"
//                   type="date"
//                   value={serviceDate.toISOString().split('T')[0]}
//                   onChange={handleServiceDateChange}
//                 />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-blue-700">Medical Services</CardTitle>
//               <Button 
//                 variant="outline" 
//                 size="sm" 
//                 onClick={handleAddService}
//                 className="text-blue-600"
//               >
//                 <PlusCircle className="h-4 w-4 mr-2" />
//                 Add Service
//               </Button>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {services.map((service, index) => (
//                 <ServiceEntry
//                   key={service.id}
//                   service={service}
//                   onChange={(updatedService) => handleServiceChange(index, updatedService)}
//                   onRemove={() => handleRemoveService(index)}
//                   index={index}
//                 />
//               ))}
//             </CardContent>
            
//             <CardFooter className="flex justify-between border-t pt-4">
//               <div className="text-lg font-semibold">
//                 Total: Rs.{calculateTotal(services).toFixed(2)}
//               </div>
//               <Button 
//                 onClick={handleGenerateBill}
//                 className="bg-blue-600 hover:bg-blue-700"
//                 disabled={!selectedPatient}
//               >
//                 Generate Bill
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
        
//         <TabsContent value="preview">
//           {generatedBill && <BillPreview bill={generatedBill} />}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default BillingForm;





// import React, { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MedicalService, Patient, Bill } from "@/types/billing";
// import { generateBill, calculateTotal } from "@/utils/billingUtils";
// import ServiceEntry from "./ServiceEntry";
// import BillPreview from "./BillPreview";
// import { PlusCircle } from "lucide-react";
// import PatientSelector from "./PatientSelector";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";

// // Predefined medical services
// const availableServices: MedicalService[] = [
//   { id: "service-1", name: "General Consultation", doctorName: "", cost: 500 },
//   { id: "service-2", name: "Blood Test", doctorName: "", cost: 300 },
//   { id: "service-3", name: "X-Ray", doctorName: "", cost: 1000 },
//   { id: "service-4", name: "MRI Scan", doctorName: "", cost: 5000 },
// ];

// const BillingForm = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("form");
//   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
//   const [serviceDate, setServiceDate] = useState<Date>(new Date());
//   const [services, setServices] = useState<MedicalService[]>([]);
//   const [generatedBill, setGeneratedBill] = useState<Bill | null>(null);

//   // Handle selecting/deselecting a medical service
//   const handleServiceToggle = (service: MedicalService) => {
//     const isSelected = services.some(s => s.id === service.id);
//     if (isSelected) {
//       setServices(services.filter(s => s.id !== service.id));
//     } else {
//       setServices([...services, { ...service, doctorName: "" }]); // Add service with empty doctor name
//     }
//   };

//   // Update the selected service details
//   const handleServiceChange = (index: number, updatedService: MedicalService) => {
//     const updatedServices = [...services];
//     updatedServices[index] = updatedService;
//     setServices(updatedServices);
//   };

//   // Remove a service
//   const handleRemoveService = (index: number) => {
//     setServices(services.filter((_, i) => i !== index));
//   };

//   // Handle service date change
//   const handleServiceDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const date = new Date(e.target.value);
//     if (!isNaN(date.getTime())) {
//       setServiceDate(date);
//     }
//   };

//   // Generate the bill
//   const handleGenerateBill = () => {
//     if (!selectedPatient) {
//       toast({ title: "Missing information", description: "Please select a patient", variant: "destructive" });
//       return;
//     }

//     const invalidServices = services.filter(s => !s.name.trim() || s.cost <= 0);
//     if (invalidServices.length > 0) {
//       toast({ title: "Incomplete service entries", description: "Ensure all services have a name and cost", variant: "destructive" });
//       return;
//     }

//     const bill = generateBill(selectedPatient, serviceDate, services);
//     setGeneratedBill(bill);
//     setActiveTab("preview");

//     toast({ title: "Bill generated", description: "Bill has been successfully created" });
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-2 mb-6">
//           <TabsTrigger value="form">Billing Form</TabsTrigger>
//           <TabsTrigger value="preview" disabled={!generatedBill}>Bill Preview</TabsTrigger>
//         </TabsList>

//         {/* Patient & Date Section */}
//         <TabsContent value="form" className="space-y-6">
//           <Card>
//             <CardHeader><CardTitle className="text-blue-700">Patient Information</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <PatientSelector selectedPatient={selectedPatient} onSelectPatient={setSelectedPatient} />
//               <div>
//                 <label htmlFor="service-date" className="block font-medium">Service Date</label>
//                 <input 
//                   id="service-date" 
//                   type="date" 
//                   value={serviceDate.toISOString().split('T')[0]} 
//                   onChange={handleServiceDateChange} 
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Medical Services Section */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-blue-700">Medical Services</CardTitle>
//               {/* Service Selection Dropdown */}
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className="text-blue-600">Select Services</Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-64">
//                   <ScrollArea className="h-48">
//                     {availableServices.map(service => (
//                       <div key={service.id} className="flex items-center space-x-2">
//                         <Checkbox 
//                           checked={services.some(s => s.id === service.id)}
//                           onCheckedChange={() => handleServiceToggle(service)}
//                         />
//                         <label className="text-sm">{service.name} (Rs.{service.cost})</label>
//                       </div>
//                     ))}
//                   </ScrollArea>
//                 </PopoverContent>
//               </Popover>
//             </CardHeader>

//             {/* Display Selected Services */}
//             <CardContent className="space-y-2">
//               {services.length === 0 ? (
//                 <p className="text-gray-500">No services selected</p>
//               ) : (
//                 services.map((service, index) => (
//                   <ServiceEntry
//                     key={service.id}
//                     service={service}
//                     onChange={(updatedService) => handleServiceChange(index, updatedService)}
//                     onRemove={() => handleRemoveService(index)}
//                     index={index}
//                   />
//                 ))
//               )}
//             </CardContent>

//             {/* Total & Generate Bill Button */}
//             <CardFooter className="flex justify-between border-t pt-4">
//               <div className="text-lg font-semibold">Total: Rs.{calculateTotal(services).toFixed(2)}</div>
//               <Button onClick={handleGenerateBill} className="bg-blue-600 hover:bg-blue-700" disabled={!selectedPatient}>
//                 Generate Bill
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Bill Preview */}
//         <TabsContent value="preview">
//           {generatedBill && <BillPreview bill={generatedBill} />}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default BillingForm;




import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicalService, Patient, Bill } from "@/types/billing";
import { generateBill, calculateTotal } from "@/utils/billingUtils";
import ServiceEntry from "./ServiceEntry";
import BillPreview from "./BillPreview";
import PatientSelector from "./PatientSelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const availableServices: MedicalService[] = [
  { id: "service-1", name: "General Consultation", doctorName: "", cost: 500 },
  { id: "service-2", name: "Blood Test", doctorName: "", cost: 300 },
  { id: "service-3", name: "X-Ray", doctorName: "", cost: 1000 },
  { id: "service-4", name: "MRI Scan", doctorName: "", cost: 5000 },
];

const BillingForm = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [services, setServices] = useState<MedicalService[]>([]);
  const [generatedBill, setGeneratedBill] = useState<Bill | null>(null);

  const handleServiceToggle = (service: MedicalService) => {
    const isSelected = services.some(s => s.id === service.id);
    if (isSelected) {
      setServices(services.filter(s => s.id !== service.id));
    } else {
      setServices([...services, { ...service, doctorName: "" }]);
    }
  };

  const handleServiceChange = (index: number, updatedService: MedicalService) => {
    const updatedServices = [...services];
    updatedServices[index] = updatedService;
    setServices(updatedServices);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setServiceDate(date);
    }
  };

  const handleGenerateBill = () => {
    if (!selectedPatient) {
      return;
    }

    const invalidServices = services.filter(s => !s.name.trim() || s.cost <= 0);
    if (invalidServices.length > 0) {
      return;
    }

    const bill = generateBill(selectedPatient, serviceDate, services);
    setGeneratedBill(bill);
    setActiveTab("preview");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="form">Billing Form</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedBill}>Bill Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-blue-700">Patient Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <PatientSelector selectedPatient={selectedPatient} onSelectPatient={setSelectedPatient} />
              <div>
                <label htmlFor="service-date" className="block font-medium">Service Date</label>
                <input 
                  id="service-date" 
                  type="date" 
                  value={serviceDate.toISOString().split('T')[0]} 
                  onChange={handleServiceDateChange} 
                  className="w-full p-2 border rounded"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-blue-700">Medical Services</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="text-blue-600">Select Services</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <ScrollArea className="h-48">
                    {availableServices.map(service => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={services.some(s => s.id === service.id)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <label className="text-sm">{service.name} (Rs.{service.cost})</label>
                      </div>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </CardHeader>

            <CardContent className="space-y-2">
              {services.length === 0 ? (
                <p className="text-gray-500">No services selected</p>
              ) : (
                services.map((service, index) => (
                  <ServiceEntry
                    key={service.id}
                    service={service}
                    onChange={(updatedService) => handleServiceChange(index, updatedService)}
                    onRemove={() => handleRemoveService(index)}
                    index={index}
                  />
                ))
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-lg font-semibold">Total: Rs.{calculateTotal(services).toFixed(2)}</div>
              <Button onClick={handleGenerateBill} className="bg-blue-600 hover:bg-blue-700" disabled={!selectedPatient}>
                Generate Bill
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          {generatedBill && <BillPreview bill={generatedBill} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingForm;