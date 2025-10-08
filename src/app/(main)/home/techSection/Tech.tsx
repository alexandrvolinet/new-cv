"use client";

import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import TechSkills from "./TechSkills";

const TechSwiper: React.FC = () => {
  return (
    <SectionContainer className="">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={{ releaseOnEdges: false }}
        modules={[Mousewheel]}
        className="h-screen w-full"
      >
        <SwiperSlide className="flex flex-col justify-center items-center text-white">
          <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="text-left">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Specialization
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Front-End <br /> Development
              </h2>
            </div>

            <div className="flex flex-col items-center md:items-end mt-10">
              <div className=" grid w-full max-w-lg gap-4">
                <TechSkills>React</TechSkills>
                <TechSkills>Next.js</TechSkills>
                <TechSkills>TypeScript</TechSkills>
                <TechSkills>Tailwind</TechSkills>
                <TechSkills>SCSS</TechSkills>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex flex-col justify-center items-center text-white">
          <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="text-left">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Specialization
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Back-End <br /> Integration
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end mt-10">
              <div className="grid w-full max-w-lg gap-4">
                <TechSkills>RESTful APIs</TechSkills>
                <TechSkills>Node.js</TechSkills>
                <TechSkills>Nest.js</TechSkills>
                <TechSkills>PostgreSQL</TechSkills>
                <TechSkills>Laravel</TechSkills>
                <TechSkills>MongoDB</TechSkills>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex flex-col justify-center items-center text-white">
          <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="text-left">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Specialization
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Development <br /> Workflow
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end mt-10">
              <div className="grid w-full max-w-lg gap-4">
                <TechSkills>Scrum</TechSkills>
                <TechSkills>Kanban</TechSkills>
                <TechSkills>Git</TechSkills>
                <TechSkills>Docker</TechSkills>
                <TechSkills>CI/CD</TechSkills>
                <TechSkills>Figma</TechSkills>
              </div>
            </div> 
          </div>
        </SwiperSlide>
      </Swiper>
    </SectionContainer>
  );
};

export default TechSwiper;
