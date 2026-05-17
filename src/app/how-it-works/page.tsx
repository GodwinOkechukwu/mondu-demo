import { Navbar } from "@/components/ui/Navbar";
import React from "react";
import { Text } from "@chakra-ui/react";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Text padding={"100px"}>how it works page</Text>
      <Footer/>
    </>
  );
};

export default page;
