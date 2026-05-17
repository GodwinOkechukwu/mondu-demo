import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { Text } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <Text padding={"100px"}>solutions page</Text>
      <Footer />
    </>
  );
};

export default page;
