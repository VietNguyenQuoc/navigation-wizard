import React, { useRef, useState } from "react";
import { selectGender, useStore } from "../store/store";
import { NavigateButton } from "./NavigateButton";
import { useNavigation } from "../hooks/useNavigation";

const PageB: React.FC = () => {
  const initialData = useStore(selectGender);
  const originalData = useRef(initialData);
  const updateData = useStore((state) => state.updateData);
  const [localData, setLocalData] = useState<string>(initialData);
  const { goBack, goNext } = useNavigation({
    localData: { gender: localData },
    originalData: { gender: originalData.current },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localData) {
      updateData({ gender: localData });
      goNext();
    }
  };

  return (
    <div>
      <h1>Step 2: Gender</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Select your gender:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={localData === "male"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Male
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={localData === "female"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Female
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={localData === "other"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Other
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

export default PageB;
