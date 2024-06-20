"use client";

import React from "react";
import { Card, CardHeader, Image, Link } from "@nextui-org/react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Andres Malaga",
      position: "Backend Engineer & Solutions Architect",
      description: "Meet Andres Malaga, Backend Engineer & Solutions Architect for Group 4 @MCSBT 2024.",
      img: "https://via.placeholder.com/300",
      github: "https://github.com/Amalaga19",
      linkedin: "https://linkedin.com/in/Andres-Malaga",
    },
    {
      name: "Leana Barbion",
      position: "Project Manager & Product Designer",
      description: "Meet Leana Barbion, Project Manager & Product Designer for Group 4 @MCSBT 2024.",
      img: "https://via.placeholder.com/300",
      github: "https://github.com/leanabarbion",
      linkedin: "https://www.linkedin.com/in/leanabarbion/",
    },
    {
      name: "Sandro Alvines",
      position: "Backend Engineer & Sales Manager",
      description: "Meet Sandro Alvines, Backend Engineer & Sales Manager for Group 4 @MCSBT 2024.",
      img: "https://via.placeholder.com/300",
      github: "https://github.com/sandroalv",
      linkedin: "https://www.linkedin.com/in/sandroalvines/",
    },
    {
      name: "Alexis Sanchez",
      position: "Product Designer & Frontend Engineer",
      description: "Meet Alexis Sanchez, Product Designer & Frontend Engineer for Group 4 @MCSBT 2024.",
      img: "https://via.placeholder.com/300",
      github: "https://github.com/caborojo",
      linkedin: "https://www.linkedin.com/in/alexis-sanchez/",
    },
  ];

  const disciplines = [
    {
      title: "Product Design",
      description: "Product Designers focus on delivering the best experience possible for listeners, creators, and external partners across all of our products and markets.",
      img: "https://via.placeholder.com/400x300",
    },
    {
      title: "Editorial Design",
      description: "Editorial Design focuses on art direction and collaborates with our product, brand, marketing, and content practices to build audience-specific, culture-defining brands.",
      img: "https://via.placeholder.com/400x300",
    },
    {
      title: "Engineering",
      description: "Engineers work on all aspects of technology to deliver a seamless experience for users and creators.",
      img: "https://via.placeholder.com/400x300",
    },
    {
      title: "Research",
      description: "Researchers work to understand our users' needs and behaviors, ensuring we build products that resonate.",
      img: "https://via.placeholder.com/400x300",
    },
  ];

  return (
    <>
      <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-7xl md:text-6xl leading-tight mb-2">The Team</h1>
      <p className="text-xl mb-8 max-w-screen-md mx-auto">
        We're a cross-disciplinary team that loves to create great experiences and make meaningful connections between listeners and creators. Learn more about our design community below and browse the latest opportunities on our team.
      </p>
      <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover mb-16" type="button">↓</button>
      
      <section id="who-we-are" className="w-full flex flex-wrap justify-center gap-8 mt-16">
        {teamMembers.map((member, index) => (
          <Card key={index} className="max-w-sm bg-black text-white m-4 flex-1 min-w-[250px]">
            <CardHeader className="flex p-3 z-10 w-full justify-start items-center">
              <Image
                alt={`${member.name} photo`}
                className="relative z-10 w-full h-64 object-cover"
                src={member.img || "https://via.placeholder.com/300"}
              />
            </CardHeader>
            <div className="p-3 flex-auto flex-col">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <h4 className="text-md font-semibold text-gray-400">{member.position}</h4>
              <p className="text-sm mt-4">{member.description}</p>
            </div>
            <div className="p-3 flex justify-center gap-4 mt-4">
              <Link href={member.github} target="_blank">GitHub</Link>
              <Link href={member.linkedin} target="_blank">LinkedIn</Link>
            </div>
          </Card>
        ))}
      </section>

      <h1 className="tracking-tight inline lg:text-5xl text-4xl font-bold mb-4 mt-16">Our Disciplines</h1>
      <section id="disciplines" className="w-full flex flex-wrap justify-center gap-8 mt-8">
        {disciplines.map((discipline, index) => (
          <Card key={index} className="max-w-md bg-black text-white group hover:scale-105 transition-transform duration-300">
            <CardHeader className="relative">
              <Image
                alt={`${discipline.title} background`}
                className="w-full h-64 object-cover"
                src={discipline.img || "https://via.placeholder.com/400x300"}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h3 className="text-2xl font-bold">{discipline.title}</h3>
                  <p className="text-lg mt-2">{discipline.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  );
}
