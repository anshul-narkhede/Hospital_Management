
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bill } from "@/types/billing";
import { formatCurrency, formatDate } from "@/utils/billingUtils";
import { FileDown, Printer } from "lucide-react";

interface BillPreviewProps {
  bill: Bill;
}

const BillPreview: React.FC<BillPreviewProps> = ({ bill }) => {
  const billRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = billRef.current?.innerHTML || "";
    const printWindow = window.open("", "_blank");
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Hospital Bill - ${bill.patient.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
              .total-row { font-weight: bold; border-top: 2px solid #000; }
              .bill-info { margin-bottom: 20px; }
              .bill-info div { margin-bottom: 5px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Hospital Bill</h1>
            </div>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div ref={billRef}>
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-700">Hospital Bill</h2>
                <p className="text-gray-500">Healthcare Services</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Bill Date</div>
                <div className="font-medium">{formatDate(new Date())}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Patient Information</h3>
                <div className="font-medium">{bill.patient.name}</div>
                <div className="text-gray-600">ID: {bill.patient.id}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Service Date</h3>
                <div className="font-medium">{formatDate(bill.serviceDate)}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-blue-700">Medical Services</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left">Service</th>
                      <th className="px-6 py-3 text-left">Doctor</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.services.map((service) => (
                      <tr key={service.id} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                        <td className="px-6 py-4">{service.doctorName}</td>
                        <td className="px-6 py-4 text-right">Rs.{(service.cost)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-bold" colSpan={2}>Total Amount Due</td>
                      <td className="px-6 py-4 font-bold text-right text-blue-700">
                        Rs.{(bill.totalAmount)} 
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Please make payment within 30 days of receipt.</p>
              <p>If you have any questions regarding this bill, please contact our billing department.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Bill
        </Button>
        <Button variant="outline">
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default BillPreview;
