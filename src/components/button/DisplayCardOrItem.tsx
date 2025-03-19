import React, { FC, useContext, useState } from "react";
import { DisplayContext } from "../../context/DisplayContext";

const DisplayCardOrItem: FC = () => {
  const displayContext = useContext(DisplayContext);
  const [selected, setSelected] = useState(displayContext?.isItem);

  const toggleView = (newViewMode: boolean) => {
    setSelected(newViewMode);
    displayContext?.setIsItem(newViewMode);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <button onClick={() => toggleView(true)} disabled={selected === true}>
        liste
      </button>
      <button onClick={() => toggleView(false)} disabled={selected === false}>
        grille
      </button>
    </div>
  );
};

export default DisplayCardOrItem;
