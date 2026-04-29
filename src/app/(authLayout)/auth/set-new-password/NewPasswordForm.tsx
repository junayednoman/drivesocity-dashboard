"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import handleMutation from "@/utils/handleMutation";
import Cookies from "js-cookie";

// Validation Schema
const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't exceed 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TNewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const email = searchParams.get("email") || "";
  const token = Cookies.get("grandSportsVerifyToken") || "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: TNewPasswordFormValues) => {
    if (!email || !token) {
      console.error("Email or token missing");
      return;
    }

    const payload = {
      email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    // Log payload for debugging
    console.log("Reset Password Payload:", payload);

    const onSuccess = () => {
      Cookies.remove("grandSportsVerifyToken"); // Clear token after use
      router.push(redirectUrl);
    };

    handleMutation(
      { token, credentials: payload },
      resetPassword,
      "Resetting password...",
      onSuccess
    );
  };

  return (
    <div className="w-[600px] bg-card rounded-2xl">
      <div className="my-8">
        <Button
          type="button"
          variant="link"
          className="text-card-foreground p-0 h-auto text-lg font-medium"
        >
          <Link href="/auth/login" className="flex items-center gap-3">
            <ArrowLeft className="!w-5 !h-5" />
            <span>Back to login</span>
          </Link>
        </Button>
      </div>

      <div className="my-8">
        <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
        <p className="text-card-foreground text-sm">
          Please enter your new password
        </p>
      </div>

      <AForm
        schema={newPasswordSchema}
        defaultValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
      >
        <AInput
          placeholder="Enter password"
          name="newPassword"
          label="New Password"
          type="password"
          required
        />
        <AInput
          placeholder="Enter password"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        />

        <Button
          disabled={isLoading || !email || !token}
          type="submit"
          className="h-12 w-full"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </AForm>
    </div>
  );
};

export default NewPasswordForm;
