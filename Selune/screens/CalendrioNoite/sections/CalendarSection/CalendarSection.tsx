import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CalendarSection = (): JSX.Element => {
  // Days of the week
  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

  // Calendar data structure
  const calendarData = [
    { day: "31", isCurrentMonth: false },
    { day: "1", isCurrentMonth: true },
    { day: "2", isCurrentMonth: true },
    { day: "3", isCurrentMonth: true },
    { day: "4", isCurrentMonth: true },
    { day: "5", isCurrentMonth: true },
    { day: "6", isCurrentMonth: true },
    { day: "7", isCurrentMonth: true },
    { day: "8", isCurrentMonth: true },
    { day: "9", isCurrentMonth: true },
    { day: "10", isCurrentMonth: true },
    { day: "11", isCurrentMonth: true },
    { day: "12", isCurrentMonth: true },
    { day: "13", isCurrentMonth: true },
    { day: "14", isCurrentMonth: true },
    { day: "15", isCurrentMonth: true },
    { day: "16", isCurrentMonth: true },
    { day: "17", isCurrentMonth: true },
    { day: "18", isCurrentMonth: true },
    { day: "19", isCurrentMonth: true },
    { day: "20", isCurrentMonth: true },
    { day: "21", isCurrentMonth: true },
    { day: "22", isCurrentMonth: true },
    { day: "23", isCurrentMonth: true, isSelected: true },
    { day: "24", isCurrentMonth: true },
    { day: "25", isCurrentMonth: true },
    { day: "26", isCurrentMonth: true },
    { day: "27", isCurrentMonth: true },
    { day: "28", isCurrentMonth: true },
    { day: "29", isCurrentMonth: true },
    { day: "30", isCurrentMonth: true },
    { day: "31", isCurrentMonth: true },
    { day: "1", isCurrentMonth: false },
    { day: "2", isCurrentMonth: false },
    { day: "3", isCurrentMonth: false },
  ];

  return (
    <Card className="w-full bg-[#001863] rounded-[30px] border-none shadow-lg">
      <CardContent className="p-6">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div
              key={`weekday-${index}`}
              className="h-8 flex items-center justify-center opacity-70 font-['Lexend_Deca',Helvetica] font-normal text-white text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="w-full h-[2px] bg-white/20 mb-4" />

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((item, index) => (
            <button
              key={`day-${index}`}
              className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 ${
                !item.isCurrentMonth ? "opacity-30" : ""
              } ${item.isSelected ? "bg-[#9e86d1] shadow-lg" : ""}`}
            >
              <span className="font-['Lexend_Deca',Helvetica] font-semibold text-white text-sm">
                {item.day}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};