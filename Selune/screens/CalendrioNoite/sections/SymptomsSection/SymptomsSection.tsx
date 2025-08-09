import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const SymptomsSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-[#a982bfb2] rounded-[20px] border-none shadow-lg">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="font-['Lexend',Helvetica] font-semibold text-white text-base">
            Registre sua pele:
          </h3>
          <p className="font-['Lexend',Helvetica] font-light text-white text-sm mt-1 opacity-90">
            Sintomas e aparência
          </p>
        </div>

        <Button
          className="h-[30px] w-[30px] rounded-full bg-[#08e6ff] hover:bg-[#08e6ff]/90 p-0 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Adicionar sintoma"
        >
          <PlusIcon className="h-4 w-4 text-white" />
        </Button>
      </CardContent>
    </Card>
  );
};