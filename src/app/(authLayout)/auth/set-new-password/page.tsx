"use client";
import dynamic from "next/dynamic";

const NewPasswordForm = dynamic(() => import("./NewPasswordForm"), {
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
        <NewPasswordForm />
      </div>
    </main>
  );
};

export default VerifyOtpPassword;
