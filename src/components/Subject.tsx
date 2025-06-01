import React, { useRef, useState } from "react";
import { selectSubject, useStore } from "../store/store"; // Adjust the path to your zustand store
import { NavigateButton } from "./NavigateButton";
import { useNavigation } from "../hooks/useNavigation";
import { usePersist } from "../hooks/usePersist";

const PageD: React.FC = () => {
  const initialData = useStore(selectSubject);
  const originalData = useRef(initialData);
  const updateData = useStore((state) => state.updateData); // Replace `updateData` with your zustand action
  const updateBranchData = useStore((state) => state.updateBranchData);
  const [localData, setLocalData] = useState<string>(initialData);
  const { persist } = usePersist();
  const { goBack, goNext } = useNavigation({
    localData: { subject: localData },
    originalData: { subject: originalData.current },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localData) {
      updateData({ subject: localData }); // Dispatch data to zustand store
      goNext();
    }
  };

  return (
    <div>
      <h1>Step 4: Tell us your favorite subject</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Favorite subject:</legend>
          <label>
            <input
              type="radio"
              name="subject"
              value="math"
              checked={localData === "math"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Math
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="subject"
              value="physics"
              checked={localData === "physics"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Physics
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="subject"
              value="chemistry"
              checked={localData === "chemistry"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Chemistry
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

export default PageD;
