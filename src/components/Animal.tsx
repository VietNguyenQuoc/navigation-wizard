import React, { useRef, useState } from "react";
import { selectAnimal, useStore } from "../store/store"; // Adjust the path to your zustand store
import { NavigateButton } from "./NavigateButton";
import { useNavigation } from "../hooks/useNavigation";
import { usePersist } from "../hooks/usePersist";

const PageC: React.FC = () => {
  const initialData = useStore(selectAnimal);
  const originalData = useRef(initialData);
  const updateData = useStore((state) => state.updateData); // Replace `updateData` with your zustand action
  const updateBranchData = useStore((state) => state.updateBranchData);
  const [localData, setLocalData] = useState<string>(initialData);
  const { persist } = usePersist();
  const { goBack, goNext } = useNavigation({
    localData: { animal: localData },
    originalData: { animal: originalData.current },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localData) {
      updateData({ animal: localData }); // Dispatch data to zustand store
      goNext();
    }
  };

  return (
    <div>
      <h1>Step 3: Tell us your favorite animal</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Favorite animal:</legend>
          <label>
            <input
              type="radio"
              name="animal"
              value="cat"
              checked={localData === "cat"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Cat
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="animal"
              value="dog"
              checked={localData === "dog"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Dog
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="animal"
              value="snake"
              checked={localData === "snake"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Snake
          </label>
        </fieldset>
        <NavigateButton
          primary={{
            label: "Next",
          }}
          secondary={{
            label: "Back",
            onClick: () => {
              goBack();
            },
          }}
        />
      </form>
    </div>
  );
};

export default PageC;
