"use client";

import AltButton from "@/Components/UI/Buttons/AltButton";
import PrimaryButton from "@/Components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/UI/Buttons/SecondaryButton";

const logHello = () => {
  console.log("we clicked");
};

const logGoodbye = () => {
  console.log("good by");
};

const HeroCTA = () => {
  return (
    <div className="flex gap-2">
      <PrimaryButton text={"primary"} onClick={logHello} />
      <SecondaryButton text="secondary" onClick={logGoodbye} />
      <AltButton text="alt button" />
    </div>
  );
};

export default HeroCTA;
