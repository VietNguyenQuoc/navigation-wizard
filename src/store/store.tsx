import { create } from "zustand";
import { Route } from "../routes";

// Define the shape of the store
export interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  animal: string;
  subject: string;
  skill: string;
}
interface StoreState extends RouteStoreState {
  data: FormData;
  previousData?: FormData;
  snapshot?: FormData;
  updateData: (newData: Partial<FormData>) => void;
  updateBranchData: (newData: Partial<FormData>) => void;
  saveSnapshot: () => void;
  applySnapshot: () => void;
}

interface RouteStoreState {
  routes: { path: string; element: JSX.Element }[];
  branches: Route[];
  branchNode?: Route;
  isEdit: boolean;
  setRoutes: (routes: { path: string; element: JSX.Element }[]) => void;
  setBranches: (branches: any) => void;
  setIsEdit: (isEdit: boolean) => void;
  setBranchNode: (branchNode: Route) => void;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  age: "",
  gender: "",
  animal: "",
  subject: "",
  skill: "",
};

export const useStore = create<StoreState>((set) => ({
  data: { ...initialFormData },
  updateData: (newData) =>
    set((state) => ({
      previousData: state.data,
      data: { ...state.data, ...newData },
    })),
  updateBranchData(newData) {
    updateBranchData2(newData);
  },
  saveSnapshot: () => set((state) => ({ snapshot: state.previousData })),
  applySnapshot: () =>
    set((state) => ({ data: state.snapshot, snapshot: undefined })),
  // Route store
  routes: [],
  branches: [],
  isEdit: false,
  setRoutes: (routes) => set({ routes }),
  setBranches: (branches: any) => set({ branches }),
  setIsEdit: (isEdit: boolean) => set({ isEdit }),
  setBranchNode: (branchNode: Route) => set({ branchNode }),
}));

// export const useRouteStore = create<RouteStoreState>((set) => ({
//   routes: [],
//   branches: [],
//   isEdit: false,
//   setRoutes: (routes) => set({ routes }),
//   setBranches: (branches: any) => set({ branches }),
//   setIsEdit: (isEdit: boolean) => set({ isEdit }),
// }));

export const useRouteStore = useStore;

// Selectors

export const selectPersonal = (state: StoreState) => ({
  name: state.data.name,
  email: state.data.email,
  age: state.data.age,
});
export const selectGender = (state: StoreState) => state.data.gender;
export const selectAnimal = (state: StoreState) => state.data.animal;
export const selectSkill = (state: StoreState) => state.data.skill;
export const selectSubject = (state: StoreState) => state.data.subject;

// FIXME: branchData must be a sync state so it cannot be in the zustand store
// TODO: find a better way to handle this
export let branchData: Partial<FormData> = {};

export const updateBranchData2 = (newData: Partial<FormData>) => {
  Object.assign(branchData, newData);
};
