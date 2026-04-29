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
import { useUpdatePlanMutation } from "@/redux/api/subscriptionPlanApi";
import handleMutation from "@/utils/handleMutation";
import { useState } from "react";

interface Plan {
  _id: string;
  title: string;
  description: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EditPlanModalProps {
  children: React.ReactNode;
  plan: Plan;
}

const EditPlanModal = ({ children, plan }: EditPlanModalProps) => {
  const [updatePlan, { isLoading }] = useUpdatePlanMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (data: CreatePlanFormValues) => {
    const payload = {
      id: plan._id,
      title: data.title,
      description: data.description,
      price: Number(data.price),
    };
    handleMutation(payload, updatePlan, "Updating plan...", () =>
      setIsOpen(false)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <AForm<CreatePlanFormValues>
          schema={createPlanSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            title: plan.title,
            description: plan.description,
            price: String(plan.price),
          }}
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
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanModal;
