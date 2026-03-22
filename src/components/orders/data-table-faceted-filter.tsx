import * as React from "react"
import { Check, PlusCircle } from "lucide-react"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const filterValues = (column?.getFilterValue() as string[]) || [];
    const selectedValues = new Set(filterValues);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed rounded-xl" dir="rtl">
                    <PlusCircle className="ml-2 h-4 w-4" />
                    {title}
                    {selectedValues.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 space-x-reverse lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} مختارة
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 rounded-xl" align="start" dir="rtl">
                <Command>
                    <CommandInput placeholder={`بحث في ${title}...`} />
                    <CommandList>
                        <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        className="rounded-lg cursor-pointer"
                                        onSelect={() => {
                                            if (selectedValues.has(option.value)) {
                                                selectedValues.delete(option.value);
                                            } else {
                                                selectedValues.add(option.value);
                                            }
                                            const filterValuesArr = Array.from(selectedValues);
                                            column?.setFilterValue(
                                                filterValuesArr.length ? filterValuesArr : undefined
                                            );
                                        }}
                                    >
                                        <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border", selectedValues.has(option.value) ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {option.icon && <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => column?.setFilterValue(undefined)}
                                        className="justify-center text-center font-bold text-red-600 rounded-lg cursor-pointer"
                                    >
                                        مسح الفرز
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
