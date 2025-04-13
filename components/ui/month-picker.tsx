"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface MonthPickerProps {
  month?: Date
  onSelect?: (date?: Date) => void
  placeholder?: string
}

export function MonthPicker({ month, onSelect, placeholder = "Select month" }: MonthPickerProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(month || new Date())
  const [year, setYear] = useState(new Date().getFullYear())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (month) {
      setSelectedMonth(month)
      setYear(month.getFullYear())
    }
  }, [month])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(year, monthIndex, 1)
    setSelectedMonth(newDate)
    setIsOpen(false)
    if (onSelect) {
      onSelect(newDate)
    }
  }

  const handlePreviousYear = () => {
    setYear(year - 1)
  }

  const handleNextYear = () => {
    setYear(year + 1)
  }

  const handleClear = () => {
    setSelectedMonth(undefined)
    setIsOpen(false)
    if (onSelect) {
      onSelect(undefined)
    }
  }

  // Get current month for default highlighting
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal",
            !selectedMonth && "text-muted-foreground",
            selectedMonth && "text-blue-600 border-blue-200",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedMonth ? format(selectedMonth, "MMMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={handlePreviousYear}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{year}</div>
            <Button variant="ghost" size="sm" onClick={handleNextYear}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((monthName, index) => {
              const isSelected =
                selectedMonth && selectedMonth.getMonth() === index && selectedMonth.getFullYear() === year
              const isCurrent = index === currentMonth && year === currentYear

              return (
                <Button
                  key={monthName}
                  variant={isSelected ? "default" : isCurrent && !isSelected ? "outline" : "outline"}
                  className={cn(
                    "h-9",
                    isSelected && "bg-blue-600 text-white hover:bg-blue-700",
                    isCurrent && !isSelected && "border-blue-200 text-blue-600",
                  )}
                  onClick={() => handleMonthSelect(index)}
                >
                  {monthName.substring(0, 3)}
                </Button>
              )
            })}
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-gray-500 hover:text-gray-700">
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
