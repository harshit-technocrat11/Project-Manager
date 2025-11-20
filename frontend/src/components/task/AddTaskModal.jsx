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

  const [title, setTitle] = useState("")
  const [taskDesc, setTaskDesc] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState(new Date())
  const [status, setStatus] = useState("pending")

  //to change- ip fields 
  // const handleChange=(e)=>{
  //   setForm({...form, [e.target.value]: e.target.value})
  // }

  const handleTitleChange=(e)=>{
    setTitle(e.target.value)
  }
  const handleTaskDescChange=(e)=>{
    setTaskDesc(e.target.value)
  }
  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  // to change select - field

  const handleSelectPriority = (value) =>{
      setPriority(value);
  }

  const handleAddTask=() =>{
    // validations
    if ( title.trim() < 3){ 
      toast.error("title must be atleast 3 characters long!")
      return;
    }

    //desc size limit 
    if( taskDesc.length> 40){
      toast.error("description too long !")
    }

    // prevent past date submits 
    if (dueDate && new Date(dueDate)< new Date()){
      toast.error("date cannot be in the past!! ")
      return;
    }
    
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      priority: priority,
      description: taskDesc,
      dueDate: dueDate || null,
      status: status, // default
    };
    console.log(newTask)

    toast.success("task created");
    onAdd(newTask)

    //reset form


  setTitle("");
  setTaskDesc("");
  setPriority("medium");
  setDueDate("today");
  setStatus("pending");

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
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Short description..."
              value={taskDesc}
              onChange={handleTaskDescChange}
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <Label>Priority</Label>

            <Select value={priority} onValueChange={handleSelectPriority}>
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
              value={dueDate}
              onChange={handleDateChange}
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
