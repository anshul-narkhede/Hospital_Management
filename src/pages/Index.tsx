
import React from "react";
import BillingForm from "@/components/BillingForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            Hospital Billing System
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <BillingForm />
      </main>
    </div>
  );
};

export default Index;
