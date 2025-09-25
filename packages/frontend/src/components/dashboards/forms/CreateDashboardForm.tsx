"use client"

import React, { useEffect, useState } from "react"
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
import { ChevronLeft, ChevronRight, Loader2, LockOpen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { icons } from "@/temporary/icons"
import Image from "next/image"
import { DashboardType } from "@/services/dashboard/enums/type.enum"
import { createDashboard } from "@/services/dashboard/dashboard.service"
import { useAlertStore } from "@/store/alert.store"
import { validateTitle } from "@/helpers/validateTitle"

function CreateDashboardForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [type, setType] = useState(DashboardType.PUBLIC)
  const [description, setDescription] = useState("")
  const [isStepTwoAvailable, setIsStepTwoAvailable] = useState(false)
  const [isCreateAvailable, setIsCreateAvailable] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(title && type){
      setIsStepTwoAvailable(true)
    }else{
      setIsStepTwoAvailable(false)
    }
  }, [title, type])


  useEffect(()=>{
    if(description && selectedIcon){
      setIsCreateAvailable(true)
    }else{
      setIsCreateAvailable(false)
    }
  }, [description, selectedIcon])

  const handleNext = () => {
    const isTitleValid = validateTitle(title);
    if(isTitleValid){
      useAlertStore.getState().showAlert("error", "Error!", isTitleValid);
      setTitle("")
    }else{
    setStep(2)}
  }

  const handleCreate = async (e: React.FormEvent) => {
    setLoading(true)
    const validTitle = title.toLowerCase()
    try{
      await createDashboard({
        title: validTitle,
        type,
        description,
        iconId: selectedIcon!
      })
      router.refresh()
      router.push(`/dashboard/${validTitle}`)
    }catch(err: any){
      if (err?.response?.data?.message === "Dashboard with this title already exists") {
        useAlertStore.getState().showAlert(
          "error",
          "Error!",
          err.response.data.message
        );
      } else {
        useAlertStore.getState().showAlert(
          "error",
          "Error!",
          err.response.data.message
        );
        console.error("Unexpected error:", err);
      }
    }finally{
      setLoading(false)
    }
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
          <Input id="title" type="text" placeholder="@title of your board..." value={title} onChange={(e)=>setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="type">Type</Label>
          </div>
          <Select defaultValue={DashboardType.PUBLIC}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value={DashboardType.PUBLIC} onChange={()=>setType(DashboardType.PUBLIC)}>Public</SelectItem>
                <SelectItem value={DashboardType.PRIVATE} onChange={()=>setType(DashboardType.PRIVATE)}>Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleNext} disabled={!isStepTwoAvailable}>Next <ChevronRight/></Button>
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
              <Textarea id="description" placeholder="@description of your board..." value={description} onChange={(e)=>setDescription(e.target.value)} required />
              </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={()=>setStep(1)}><ChevronLeft/> Previous</Button>
            <Button onClick={handleCreate} disabled={!isCreateAvailable || loading}>{loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}Create</Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  )
}

export default CreateDashboardForm
