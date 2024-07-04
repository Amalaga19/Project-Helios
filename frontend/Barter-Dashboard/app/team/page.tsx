// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing React library to use React components.
import React from "react";

// Importing Card, Image, and Link components from the NextUI library.
import { Card, Image, Link } from "@nextui-org/react";

// Importing a custom title component.
import { title } from "@/components/primitives";

// Importing the MainLayout component to use as the layout for this page.
import MainLayout from "../layouts/MainLayout";

// Defining the TeamPage component which renders information about team members.
export default function TeamPage() {
  // Defining an array of team member objects, each containing details about the team member.
  const teamMembers = [
    {
      name: "Andres Malaga",
      position: "Backend Engineer & Solutions Architect",
      description:
        "Meet Andres Malaga, Backend Engineer & Solutions Architect for Group 4 @MCSBT 2024.",
      img: "/images/andreslinkedin.jpg",
      github: "https://github.com/Amalaga19",
      linkedin: "https://linkedin.com/in/Andres-Malaga",
    },
    {
      name: "Leana Barbion",
      position: "Database Engineer & Product Designer",
      description:
        "Meet Leana Barbion, Project Manager & Product Designer for Group 4 @MCSBT 2024.",
      img: "/images/leanalinkedin.jpg",
      github: "https://github.com/leanabarbion",
      linkedin: "https://www.linkedin.com/in/leanabarbion/",
    },
    {
      name: "Sandro Alvines",
      position: "Project & Sales Manager",
      description:
        "Meet Sandro Alvines, Backend Engineer & Sales Manager for Group 4 @MCSBT 2024.",
      img: "/images/sandrolinkedin.jpg",
      github: "https://github.com/sandroalv",
      linkedin: "https://www.linkedin.com/in/sandroalvines/",
    },
    {
      name: "Alexis Sanchez",
      position: "Product Designer & Frontend Engineer",
      description:
        "Meet Alexis Sanchez, Product Designer & Frontend Engineer for Group 4 @MCSBT 2024.",
      img: "/images/alexislinkedin.jpg",
      github: "https://github.com/caborojo",
      linkedin: "https://www.linkedin.com/in/alexis-sanchez/",
    },
  ];

  // Returning the JSX structure of the component.
  return (
    // Main section element with utility classes for styling and layout.
    <section className="flex flex-col items-center justify-center gap-4 py-12 px-4 md:py-16 md:px-8">
      {/* Container for the main heading and introductory text. */}
      <div
        className="w-full max-w-screen-md text-center"
        style={{ overflow: "visible" }}
      >
        {/* Main heading with custom styles. */}
        <h1
          className={title({
            color: "violet",
            class: "lg:text-7xl md:text-6xl mt-2 block",
          })}
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          The Team
        </h1>
        {/* Introductory text describing the team. */}
        <p className="text-xl mb-8 max-w-screen-md mx-auto mt-4">
          We&apos;re a cross-disciplinary team that loves to create great experiences
          and make meaningful connections between listeners and creators. Learn
          more about our design community below and browse the latest
          opportunities on our team.
        </p>
      </div>
      {/* Section element for displaying team member cards in a grid layout. */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        id="who-we-are"
      >
        {/* Mapping over the teamMembers array to render a Card for each member. */}
        {teamMembers.map((member, index) => (
          <Card key={index} className="max-w-sm bg-black text-white m-4">
            {/* Container for the card content with padding and centering. */}
            <div className="flex flex-col items-center p-3">
              {/* Image of the team member with custom styles for appearance. */}
              <Image
                alt={`${member.name} photo`}
                className="rounded-full w-32 h-32 object-cover mb-4"
                src={member.img || "https://via.placeholder.com/300"}
              />
              {/* Team member's name displayed prominently. */}
              <h3 className="text-xl font-bold">{member.name}</h3>
              {/* Team member's position with a lighter text color. */}
              <h4 className="text-md font-semibold text-gray-400">
                {member.position}
              </h4>
              {/* Description of the team member. */}
              <p className="text-sm mt-4 text-center">{member.description}</p>
              {/* Links to the team member's GitHub and LinkedIn profiles. */}
              <div className="flex justify-center gap-4 mt-4">
                <Link href={member.github} target="_blank">
                  GitHub
                </Link>
                <Link href={member.linkedin} target="_blank">
                  LinkedIn
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
}

// Custom layout for the TeamPage component, wrapping it with MainLayout.
TeamPage.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
