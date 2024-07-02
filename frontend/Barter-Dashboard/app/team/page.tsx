'use client';

import React from "react";
import { Card, Image, Link } from "@nextui-org/react";
import { title } from "@/components/primitives";
import MainLayout from "../layouts/MainLayout";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Andres Malaga",
      position: "Backend Engineer & Solutions Architect",
      description: "Meet Andres Malaga, Backend Engineer & Solutions Architect for Group 4 @MCSBT 2024.",
      img: "/images/andreslinkedin.jpg",
      github: "https://github.com/Amalaga19",
      linkedin: "https://linkedin.com/in/Andres-Malaga",
    },
    {
      name: "Leana Barbion",
      position: "Database Engineer & Product Designer",
      description: "Meet Leana Barbion, Project Manager & Product Designer for Group 4 @MCSBT 2024.",
      img: "/images/leanalinkedin.jpg",
      github: "https://github.com/leanabarbion",
      linkedin: "https://www.linkedin.com/in/leanabarbion/",
    },
    {
      name: "Sandro Alvines",
      position: "Project & Sales Manager",
      description: "Meet Sandro Alvines, Backend Engineer & Sales Manager for Group 4 @MCSBT 2024.",
      img: "/images/sandrolinkedin.jpg",
      github: "https://github.com/sandroalv",
      linkedin: "https://www.linkedin.com/in/sandroalvines/",
    },
    {
      name: "Alexis Sanchez",
      position: "Product Designer & Frontend Engineer",
      description: "Meet Alexis Sanchez, Product Designer & Frontend Engineer for Group 4 @MCSBT 2024.",
      img: "/images/alexislinkedin.jpg",
      github: "https://github.com/caborojo",
      linkedin: "https://www.linkedin.com/in/alexis-sanchez/",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 px-4 md:py-16 md:px-8">
      <div className="w-full max-w-screen-md text-center" style={{ overflow: 'visible' }}>
        <h1 className={title({ color: "violet", class: "lg:text-7xl md:text-6xl mt-2 block" })} style={{ marginTop: 0, paddingTop: 0 }}>
          The Team
        </h1>
        <p className="text-xl mb-8 max-w-screen-md mx-auto mt-4">
          We're a cross-disciplinary team that loves to create great experiences and make meaningful connections between listeners and creators. Learn more about our design community below and browse the latest opportunities on our team.
        </p>
      </div>
      <section id="who-we-are" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {teamMembers.map((member, index) => (
          <Card key={index} className="max-w-sm bg-black text-white m-4">
            <div className="flex flex-col items-center p-3">
              <Image
                alt={`${member.name} photo`}
                className="rounded-full w-32 h-32 object-cover mb-4"
                src={member.img || "https://via.placeholder.com/300"}
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <h4 className="text-md font-semibold text-gray-400">{member.position}</h4>
              <p className="text-sm mt-4 text-center">{member.description}</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link href={member.github} target="_blank">GitHub</Link>
                <Link href={member.linkedin} target="_blank">LinkedIn</Link>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
}

TeamPage.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
