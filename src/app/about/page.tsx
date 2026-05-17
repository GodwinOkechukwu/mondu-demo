import { Navbar } from "@/components/ui/Navbar";
import React from "react";
import { Text } from "@chakra-ui/react";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Text padding={"100px"}>about page</Text>
      <Footer/>
      
    </>
  );
};

export default page;
