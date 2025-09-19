"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, LockOpen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { icons } from "@/temporary/icons"
import Image from "next/image"

function CreateDashboardForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleNext = () => {
    // 👉 тут можна зібрати дані з інпутів, відправити на бекенд
    // і тільки потім перейти
    // router.push("/dashboard/details") 
    setStep(2)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      {step === 1 && (
        <>
      <DialogHeader>
        <DialogTitle>Create Dashboard</DialogTitle>
        <DialogDescription>
          Create a new board to organize your tasks and ideas in one place
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">
            Title <i>(one unique letter)</i>
          </Label>
          <Input id="title" type="text" placeholder="@title of your board..." required />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="type">Type</Label>
          </div>
          <Select defaultValue="public">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleNext}>Next <ChevronRight/></Button>
      </DialogFooter>
      </>)}

      {step === 2 && (
        <>
          <DialogHeader>
            <DialogTitle>Create Dashboard</DialogTitle>
            <DialogDescription>
              Create a new board to organize your tasks and ideas in one place
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">
                Icon
              </Label>
              <div className="flex gap-2 justify-between w-full">
                {icons.map((icon) => (
                  <button
                    type="button"
                    key={icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`relative flex-1 aspect-square rounded overflow-hidden 
                      ${selectedIcon === icon.id ? "ring-2" : "border"}`}
                  >
                    <Image
                      src={icon.iconURL}
                      alt="icon"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="description">Descriptoin</Label>
              </div>
              <Textarea id="description" placeholder="@description of your board..." required />
              </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={()=>setStep(1)}><ChevronLeft/> Previous</Button>
            <Button onClick={handleNext}>Create</Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  )
}

export default CreateDashboardForm
