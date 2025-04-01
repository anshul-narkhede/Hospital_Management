
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalService } from "@/types/billing";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/billingUtils";

interface ServiceEntryProps {
  service: MedicalService;
  onChange: (updatedService: MedicalService) => void;
  onRemove: () => void;
  index: number;
}

const ServiceEntry: React.FC<ServiceEntryProps> = ({ service, onChange, onRemove, index }) => {
  const handleChange = (field: keyof MedicalService, value: string) => {
    const updatedService = { ...service };
    
    if (field === "cost") {
      const numericValue = parseFloat(value);
      updatedService[field] = isNaN(numericValue) ? 0 : numericValue;
    } else {
      updatedService[field as "name" | "doctorName"] = value;
    }
    
    onChange(updatedService);
  };

  return (
    <Card className="mb-3">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Service #{index + 1}</h4>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
            <Input
              id={`service-name-${service.id}`}
              value={service.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Consultation"
              className="w-full"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor={`doctor-name-${service.id}`}>Doctor Name</Label>
            <Input
              id={`doctor-name-${service.id}`}
              value={service.doctorName}
              onChange={(e) => handleChange("doctorName", e.target.value)}
              placeholder="e.g. Dr. Smith"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mt-3">
          <Label htmlFor={`cost-${service.id}`}>Cost</Label>
          <Input
            id={`cost-${service.id}`}
            type="number"
            value={service.cost === 0 ? "" : service.cost}
            onChange={(e) => handleChange("cost", e.target.value)}
            placeholder="0.00"
            className="w-full"
          />
          <div className="text-right text-sm text-muted-foreground mt-1">
            Rs.{(service.cost)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceEntry;
