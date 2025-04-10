import { AuthForm } from '@/components/auth/AuthForm';

export default function Auth() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            Hospital Billing System
          </h1>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-4">
        <AuthForm />
      </main>
    </div>
  );
}