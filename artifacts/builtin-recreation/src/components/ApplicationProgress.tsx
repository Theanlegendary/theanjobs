import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface Step {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ApplicationProgressProps {
  steps: Step[];
}

export function ApplicationProgress({ steps }: ApplicationProgressProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{
              width: `${(steps.filter((s) => s.status === 'completed').length / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                step.status === 'completed'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110 shadow-lg'
                  : step.status === 'current'
                  ? 'bg-white border-4 border-blue-500 text-blue-500 scale-110 shadow-lg animate-pulse'
                  : 'bg-white border-2 border-gray-300 text-gray-400'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle className="w-5 h-5" />
              ) : step.status === 'current' ? (
                <Clock className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>

            {/* Step Label */}
            <span
              className={`mt-2 text-xs font-medium text-center max-w-20 transition-colors duration-300 ${
                step.status === 'completed' || step.status === 'current'
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>

            {/* Glow Effect for Current Step */}
            {step.status === 'current' && (
              <div className="absolute top-0 w-10 h-10 rounded-full bg-blue-400 blur-xl opacity-40 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Preset for job application flow
export function JobApplicationProgress({ currentStep }: { currentStep: number }) {
  const steps: Step[] = [
    { label: 'Applied', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'upcoming' },
    { label: 'Screening', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming' },
    { label: 'Interview', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming' },
    { label: 'Offer', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming' },
  ];

  return <ApplicationProgress steps={steps} />;
}
