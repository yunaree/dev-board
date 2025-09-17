import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { roles } from './types/roles';
import DashboardCard from './DashboardCard';

function DashboardsList() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [dashboardsLength, setDashboardsLength] = React.useState(4);

    return (
        <div className='w-full flex flex-col py-10 gap-y-10'>
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
                Dashboards
            </h1>

            <div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                            ? roles.find((role) => role.value === value)?.label
                            : roles.find((role) => role.value === "all")?.label}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder="Search role..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                            {roles.map((role) => (
                                <CommandItem
                                key={role.value}
                                value={role.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                                >
                                {role.label}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    value === role.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-1">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />

            {dashboardsLength > 3 && (
                <Button className='w-2xs my-5' variant="secondary">Load more...</Button>
            )}
        </div>

        </div>
    );
}

export default DashboardsList;