"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditPlanModal from "./EditPlanModal";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { useDeletePlanMutation } from "@/redux/api/subscriptionPlanApi";
import handleMutation from "@/utils/handleMutation";

interface Plan {
  _id: string;
  title: string;
  description: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PlanCardProps {
  plan: Plan;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const [deletePlan, { isLoading }] = useDeletePlanMutation();

  const handleDelete = () => {
    handleMutation(plan._id, deletePlan, "Deleting plan...");
  };

  return (
    <div className="w-full rounded-lg p-6 border border-gray-200 bg-white">
      <div>
        <h4 className="text-2xl font-semibold text-gray-900">{plan.title}</h4>
      </div>
      <div className="space-y-4 mt-8">
        <div className="text-4xl font-bold text-gray-900">${plan.price}</div>
        <div className="text-sm text-card-foreground">{plan.description}</div>
        <div className="grid grid-cols-2 gap-2 mt-8">
          <EditPlanModal plan={plan}>
            <Button className="bg-primary/10 hover:bg-primary/20 shadow-none text-primary h-[42px] w-full">
              <Pencil /> Edit Price
            </Button>
          </EditPlanModal>
          <AAlertDialog onAction={handleDelete}>
            <Button
              disabled={isLoading}
              className="bg-destructive/10 text-destructive shadow-none hover:bg-destructive/20 h-[42px] w-full"
            >
              <Trash2 /> {isLoading ? "Deleting..." : "Remove Plan"}
            </Button>
          </AAlertDialog>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
