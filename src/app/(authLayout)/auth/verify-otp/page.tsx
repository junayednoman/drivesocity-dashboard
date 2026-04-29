"use client";
import dynamic from "next/dynamic";

const OtpVerificationForm = dynamic(() => import("./OtpVerificationForm"), {
  ssr: false,
});

const VerifyOtpPassword = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/banner.png)`,
        }}
      ></div>
      <div className="flex items-center justify-center">
        <OtpVerificationForm />
      </div>
    </main>
  );
};

export default VerifyOtpPassword;
