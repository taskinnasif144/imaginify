import React from "react";

type props = {
    children: React.ReactNode
}

const Layput = ({ children }: props) => {
    return <main className="auth">{children}</main>;
};

export default Layput;
