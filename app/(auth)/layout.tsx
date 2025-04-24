import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-red-100">
      {children}
    </div>
  );
}

export default AuthLayout;
