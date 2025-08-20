import React from 'react';
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

function CreateDashboardForm() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Dashboard</DialogTitle>
                <DialogDescription>
                    Create a new board to organize your tasks and ideas in one place
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                 <Label htmlFor="title">Title <i>(one unque letter)</i></Label>
                 <Input
                     id="title"
                     type="text"
                     placeholder='@title of your board...'
                     required
                 />
                </div>
                <div className="grid gap-3">
                 <div className="flex items-center">
                     <Label htmlFor="type">Type</Label>
                 </div>

                 <Select>
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
                <Button type="submit">Create</Button>
            </DialogFooter>
            </DialogContent>
    );
}

export default CreateDashboardForm;