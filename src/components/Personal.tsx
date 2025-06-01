import React, { useRef, useState } from "react";
import { selectPersonal, useRouteStore, useStore } from "../store/store";
import { NavigateButton } from "./NavigateButton";
import { useNavigation } from "../hooks/useNavigation";
import { Route } from "../routes";
import { useShallow } from "zustand/shallow";
import { usePersist } from "../hooks/usePersist";

const PageA: React.FC = () => {
  const data = useStore(useShallow(selectPersonal));
  // TODO: the need of this ref needs to be revisited
  const originalData = useRef(data);
  const updateData = useStore((state) => state.updateData);
  const updateBranchData = useStore((state) => state.updateBranchData);
  const [formData, setFormData] = useState(data);
  const { goNext, goPage, goBack } = useNavigation({
    // onSequential: () => {
    //   persist(formData, originalData.current);
    // },
    // onBranching: () => {
    //   updateBranchData(formData);
    // },
    localData: formData,
    originalData: originalData.current,
  });
  // const { persist } = usePersist();
  const isEdit = useRouteStore((state) => state.isEdit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the store
    // Determine if the data is changed
    // Determine if go to branching mode
    // Perist the data to server
    updateData(formData);
    // persist(formData, data);
    goNext();
  };

  return (
    <div>
      <h1>Step 1: Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <NavigateButton
          primary={{
            label: "Next",
          }}
          secondary={
            isEdit
              ? {
                  label: "Cancel",
                  onClick: () => {
                    // goPage(Route.SUMMARY);
                    goBack();
                  },
                }
              : undefined
          }
        />
      </form>
    </div>
  );
};

export default PageA;
