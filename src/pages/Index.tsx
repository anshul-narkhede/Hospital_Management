import React from "react";
import BillingForm from "@/components/BillingForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { LogOut } from "lucide-react";

const Index = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Hospital Billing System
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-white">{user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              className="text-white hover:text-blue-700"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <BillingForm />
      </main>
    </div>
  );
};

export default Index;