import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Plus } from "lucide-react";

import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useState } from "react";
import { fromTheme } from "tailwind-merge";

export function AddTaskModal({onAdd}) {

  //local form set up --- clean code k liye 
  const [form , setForm] = useState({
    title:"1",
    description:"2",
    priority: "2",
    dueDate:"2"
  })
  
  //to change- ip fields 
  const handleChange=(e)=>{
    setForm({...form, [e.target.value]: e.target.value})
  }


  // to change select - field

  const handleSelect = (e) =>{
      setForm({...form, priority:value})
  }

  const handleAddTask=() =>{

    const newTask = {
      id: crypto.randomUUID,
      title: form.title,
      priority: form.priority,
      dueDate: form.dueDate || null,
      status: "pending", // default
    };
    console.log(newTask)

    onAdd(newTask)

    //reset form
    setForm({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });

  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Short description..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <Label>Priority</Label>

            <Select
              value={form.priority}
              onValueChange={handleSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date (optional)</Label>
            <Input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                handleAddTask();
                toast.success("task created");
              }}
              type="submit"
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
