"use client";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CreatePlanFormValues,
  createPlanSchema,
} from "@/validations/plan.validation";
import { useAddPlanMutation } from "@/redux/api/subscriptionPlanApi";
import handleMutation from "@/utils/handleMutation";
import { useState } from "react";

interface CreatePlanModalProps {
  children: React.ReactNode;
}

const CreatePlanModal = ({ children }: CreatePlanModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addPlan, { isLoading }] = useAddPlanMutation();

  const handleSubmit = (data: CreatePlanFormValues) => {
    const payload = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
    };
    handleMutation(payload, addPlan, "Creating plan...", () =>
      setIsOpen(false)
    );
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
        </DialogHeader>
        <AForm<CreatePlanFormValues>
          schema={createPlanSchema}
          onSubmit={handleSubmit}
          className="mt-5"
        >
          <AInput
            name="title"
            label="Subscription Name"
            placeholder="Subscription Name"
            required
          />
          <AInput
            name="description"
            label="Description"
            placeholder="Write Description"
            required
          />
          <AInput
            name="price"
            label="Price"
            placeholder="0"
            type="number"
            required
          />
          <Button disabled={isLoading} type="submit" className="h-12 w-full">
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlanModal;
