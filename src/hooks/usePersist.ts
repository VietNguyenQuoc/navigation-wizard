import cleanDeep from "clean-deep";
import { FormData } from "../store/store";
import isEqual from "lodash/isEqual";

interface SubmitPayload {
  personal?: {
    name?: string;
    email?: string;
    age?: string;
  };
  gender?: string;
  animal?: string;
  subject?: string;
  skill?: string;
}

const buildPayload = (payload: Partial<FormData>): SubmitPayload => {
  const submitPayload: SubmitPayload = {
    personal: {
      name: payload.name,
      email: payload.email,
      age: payload.age,
    },
    gender: payload.gender,
    animal: payload.animal,
    subject: payload.subject,
    skill: payload.skill,
  };

  return cleanDeep(submitPayload);
};

// Save data from each page to downstream server
// If the data is not changed, don't save

export const usePersist = () => {
  const persist = (payload: Partial<FormData>) => {
    const submitPayload = buildPayload(payload);

    console.log("Submit payload", submitPayload);
  };

  return { persist };
};

export const isDataChanged = (
  payload: Partial<FormData>,
  originalData: Partial<FormData>
) => {
  const submitPayload = buildPayload(payload);
  const originalPayload = buildPayload(originalData);
  return !isEqual(submitPayload, originalPayload);
};
