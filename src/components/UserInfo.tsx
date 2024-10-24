import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
export default function UserInfo() {
  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">
          Meet our soldier of our project
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Our team brings together expertise in logistics, technology, and
          innovation to build a seamless and efficient shipping management
          platform. We're dedicated to making global shipping routes easier and
          more accessible for businesses.
        </p>
      </div>
      <div className="flex justify-center space-x-8">
        <div className="flex max-w-lg items-center space-x-6">
          <div className="relative w-44 h-44">
            <Image
              src="/images/avatar2.jpg"
              alt="To Thanh Hien"
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">To Thanh Hien</h3>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Developer
            </a>
            <p className="text-gray-500 mt-2">
              Responsible for managing Auth service and UI Design of the
              project.
            </p>
            <div className="flex space-x-4 mt-4">
              <Box className="flex space-x-3">
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
        <div className="flex max-w-lg items-center space-x-6">
          <div className="relative w-44 h-44">
            <Image
              src="/images/avatar1.jpg"
              alt="Nguyen Duy Lap"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Nguyen Duy Lap</h3>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Developer
            </a>
            <p className="text-gray-500 mt-2">
              Responsible for managing route service and notification service of
              the project
            </p>
            <div className="flex space-x-4 mt-4">
              <Box className="flex space-x-3">
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
