"use client";
import dynamic from "next/dynamic";

const ForgetPasswordForm = dynamic(() => import("./ForgetPasswordForm"), {
  ssr: false,
});

const ForgotPassword = () => {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      <div className="h-screen grid grid-cols-2 w-full">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/banner.png)`,
          }}
        ></div>
        <div className="flex items-center justify-center">
          <ForgetPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
