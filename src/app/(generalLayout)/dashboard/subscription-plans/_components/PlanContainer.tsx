"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreatePlanModal from "./CreatePlanModal";
import PlanCard from "./PlanCard";
import { useGetAllPlansQuery } from "@/redux/api/subscriptionPlanApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";

interface Plan {
  _id: string;
  title: string;
  description: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const PlanContainer = () => {
  const {
    data: plansResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllPlansQuery({ page: 1, limit: 10 });
  const plans: Plan[] = plansResponse?.data || [];

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Subscription Plans
        </h1>
        <CreatePlanModal>
          <Button size={"lg"}>
            <Plus className="!w-5 !h-5" />
            Create New Plan
          </Button>
        </CreatePlanModal>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center text-muted-foreground">
          <ASpinner size={150} className="py-44" />
        </div>
      ) : isError ? (
        <div className="mt-6 text-center text-muted-foreground">
          <AErrorMessage className="py-44" error={error} onRetry={refetch} />
        </div>
      ) : plans.length === 0 ? (
        <div className="mt-6 py-44 text-center text-xl text-muted-foreground">
          No plans found!
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PlanContainer;
