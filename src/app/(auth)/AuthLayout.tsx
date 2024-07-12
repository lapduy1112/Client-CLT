import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 relative">
        <Image
          src={"/images/shipping.png"}
          alt={"Shipping"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        {children}
      </div>
    </div>
  );
}
