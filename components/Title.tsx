import React from "react";
import { Label } from "./ui/label";

function Title({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <Label>{title}</Label>
      <p className="">{subtitle}</p>
    </div>
  );
}

export default Title;
