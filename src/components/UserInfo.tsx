import { Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";
export default function UserInfo() {
  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Meet our soldier of finance</h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Our team brings together expertise in logistics, technology, and
          innovation to build a seamless and efficient shipping management
          platform. We're dedicated to making global shipping routes easier and
          more accessible for businesses.
        </p>
      </div>

      <div className="flex justify-center space-x-8">
        <div className="flex max-w-lg items-center space-x-6">
          <Image
            src="/images/avatar1.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full"
          />
          <div>
            <h3 className="text-xl font-semibold">To Thanh Hien</h3>
            <a href="#" className="text-blue-600 hover:underline">
              Developer
            </a>
            <p className="text-gray-500 mt-2">
              Responsible for managing Auth service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-purple-600">
                <i className="fab fa-xing fa-lg"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-blue-600">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="flex max-w-lg items-center space-x-6">
          <Image
            src="/images/avatar1.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full"
          />
          <div>
            <h3 className="text-xl font-semibold">Nguyen Duy Lap</h3>
            <a href="#" className="text-blue-600 hover:underline">
              Developer
            </a>
            <p className="text-gray-500 mt-2">
              Responsible for managing route service and notification service of
              the project
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-purple-600">
                <i className="fab fa-xing fa-lg"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-blue-600">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
