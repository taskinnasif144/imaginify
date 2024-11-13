import React from "react";

type TransformationHeaderProps = {
  title: string;
  subtitle?: string;
};

const Header = ({ title, subtitle }: TransformationHeaderProps) => {
  return (
    <div>
      <h2 className="h2-bold text-dark-600">{title}</h2>
      {subtitle && <p className="mt-4">{subtitle}</p>}
    </div>
  );
};

export default Header;
