// Importing the NextPage type from the next package to define the type for the Home component.
import type { NextPage } from "next";

// Importing the Content component from the specified path.
import { Content } from "../dashboard/components/home/content";

// Defining the Home component as a Next.js page component.
const Home: NextPage = () => {
  // The Home component renders the Content component.
  return <Content />;
};

// Exporting the Home component as the default export.
export default Home;
