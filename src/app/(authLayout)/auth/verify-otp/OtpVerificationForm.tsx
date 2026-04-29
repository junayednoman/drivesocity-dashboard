"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { otpSchema } from "@/validations/auth.validation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useForgetPasswordMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import handleMutation from "@/utils/handleMutation";
import Cookies from "js-cookie";

// Infer the form data type from the schema
type TOtpVerificationFormValues = z.infer<typeof otpSchema>;

const OtpVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = Cookies.get("grandSportsVerifyToken") || "";
  console.log("email", email);
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgetPasswordMutation();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<TOtpVerificationFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: TOtpVerificationFormValues) => {
    if (!email || !token) {
      console.error("Email or token missing");
      return;
    }

    const payload = { otp: data.otp, email };

    // Log payload for debugging
    console.log("Verify OTP Payload:", payload);

    const onSuccess = () => {
      router.push(`/auth/set-new-password?email=${encodeURIComponent(email)}`);
    };

    handleMutation(
      { token, credentials: payload },
      verifyOtp,
      "Verifying OTP...",
      onSuccess
    );
  };

  // Handle resend code
  const handleResendCode = () => {
    if (!email) {
      console.error("Email missing for resend");
      return;
    }

    const payload = { email };

    const onSuccess = (response: any) => {
      const verifyToken = response?.data?.verifyToken;
      if (verifyToken) {
        Cookies.set("grandSportsVerifyToken", verifyToken, {
          expires: 1 / 24, // Expires in 1 hour
          secure: true,
          sameSite: "strict",
        });
      }
    };

    handleMutation(payload, forgotPassword, "Resending OTP...", onSuccess);
  };

  return (
    <div className="w-[450px]">
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
        <h1 className="text-3xl font-bold mb-2">Verify your OTP</h1>
        <p className="text-card-foreground text-sm">
          Please enter your 6-digit OTP to continue
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    className="flex !justify-center"
                  >
                    <InputOTPGroup className="space-x-2 -ml-4">
                      <InputOTPSlot
                        index={0}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={1}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={2}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-muted-foreground" />
                    <InputOTPGroup className="space-x-2">
                      <InputOTPSlot
                        index={3}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={4}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={5}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resend Code */}
          <div>
            <p className="text-muted-foreground text-sm mb-2">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline"
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OtpVerificationForm;
