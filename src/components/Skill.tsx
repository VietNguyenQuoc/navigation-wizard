import React, { useRef, useState } from "react";
import { selectSkill, useStore } from "../store/store";
import { NavigateButton } from "./NavigateButton";
import { useNavigation } from "../hooks/useNavigation";

const PageE: React.FC = () => {
  const initialData = useStore(selectSkill);
  const originalData = useRef(initialData);
  const updateData = useStore((state) => state.updateData);
  const [localData, setLocalData] = useState<string>(initialData);
  const { goBack, goNext } = useNavigation({
    localData: { skill: localData },
    originalData: { skill: originalData.current },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localData) {
      updateData({ skill: localData });
      goNext();
    }
  };

  return (
    <div>
      <h1>Step 5: Tell us your favorite skill</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Favorite skill:</legend>
          <label>
            <input
              type="radio"
              name="skill"
              value="invisible"
              checked={localData === "invisible"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Invisible
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="skill"
              value="smash"
              checked={localData === "smash"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Smash
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="skill"
              value="windstorm"
              checked={localData === "windstorm"}
              onChange={(e) => setLocalData(e.target.value)}
            />
            Windstorm
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

export default PageE;
