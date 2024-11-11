import MobileNav from "@/Components/Shared/MobileNav";
import Sidebar from "@/Components/Shared/Sidebar";
import React from "react";

type props = {
  children: React.ReactNode;
};

const Layput = ({ children }: props) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper"> {children}</div>
      </div>
    </main>
  );
};

export default Layput;
