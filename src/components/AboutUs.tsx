"use client";
import { Container } from "@mui/material";
import { Stats_2 } from "./Stats";
const AboutUs = () => {
  const stats = [
    { id: 1, name: "Transactions every 24 hours", value: "44 million" },
    { id: 2, name: "Assets under holding", value: "$119 trillion" },
    { id: 3, name: "New users annually", value: "46,000" },
  ];
  return (
    <div className="bg-gradient-to-r from-[#010101] to-[#092A3D] py-10">
      <Container
        maxWidth="xl"
        // className="flex flex-row justify-between"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="flex flex-col w-4/12 gap-y-6">
          <button className="rounded-2xl border-2 text-lg max-w-28 text-white italic">
            About Us
          </button>
          <h1 className="text-4xl pr-12">
            <span className="text-white">UNLEASHING THE </span>
            <span className="text-slate-400 italic">POWER OF LOGISTICS</span>
          </h1>
          <Stats_2 />
        </div>
        <div className="flex flex-col w-4/12 mt-12 font-light gap-y-4 text-right">
          <p className="text-sm text-white">
            Welcome to Ocean Wave, where we embark on a relentless journey to
            unleash the true potential of logistics and revolutionize global
            trade. Our story is one of passion,innovation,and unwavering
            commitment to delivering excellence in every aspect of our
            operations.
          </p>
          <p className="text-sm">
            <span className="text-white">
              One of the pillars that underpin our success is our team of
              passionate and experienced professionals. One of the pillars that
              underpin our success is our team of passionate and experienced
              professionals.
            </span>
            <span className="text-slate-400">
              Their expertise in leveraging cutting-edge technology, combined
              with their understanding of the evolving logistics landscape,
              allows us to offer innovative solutions that meet the changing
              needs of our clients.
            </span>
          </p>
          <p className="text-sm text-slate-400">
            As a responsible corporate citizen, we are committed to
            sustainability and enviromental stewardship. Embracing eco-friendly
            practices and optimizing routes, we strive to minimize our carbon
            footprint and contribute positively to the communities in which we
            serve.
          </p>
        </div>
      </Container>
    </div>
  );
};
export default AboutUs;
