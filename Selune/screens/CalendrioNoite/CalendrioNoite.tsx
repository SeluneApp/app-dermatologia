import React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CalendarSection } from "./sections/CalendarSection/CalendarSection";
import { SymptomsSection } from "./sections/SymptomsSection";

export const CalendrioNoite = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex flex-row justify-center w-full">
      <div className="relative overflow-hidden w-full max-w-[390px] h-[844px] flex items-center justify-center">
        <Card className="relative w-full max-w-[350px] mx-auto rounded-[40px] bg-[#020b24] bg-opacity-80 backdrop-blur-sm overflow-hidden border-none shadow-2xl">
          <div className="flex flex-col items-center w-full p-6">
            {/* Month Title */}
            <h2 className="font-['Lexend',Helvetica] font-semibold text-white text-[25px] text-center tracking-[0] leading-normal mb-6">
              Março
            </h2>

            {/* X Button */}
            <div className="absolute top-4 right-4">
              <Button
                className="w-[40px] h-[40px] p-0 rounded-full bg-[#00186366] hover:bg-[#001863] border-none"
                variant="ghost"
              >
                <span className="font-['Lexend_Mega',Helvetica] font-semibold text-[#6500e8e6] text-[20px]">
                  ×
                </span>
              </Button>
            </div>

            {/* Calendar Section */}
            <div className="w-full mb-6">
              <CalendarSection />
            </div>

            {/* Symptoms Section */}
            <div className="w-full">
              <SymptomsSection />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};