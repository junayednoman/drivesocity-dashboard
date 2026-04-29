"use client";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

const Login = () => {
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
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
