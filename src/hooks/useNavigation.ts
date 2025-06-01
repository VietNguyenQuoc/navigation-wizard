import { useNavigate } from "react-router-dom";
import { branchData, useRouteStore, useStore } from "../store/store";
import { Route } from "../routes";
import { resurfaceGender, resurfaceSkill } from "../navigationRules";
import { useEffect, useRef } from "react";
import { usePersist, isDataChanged } from "./usePersist";
import { FormData } from "../store/store";

type UseNavigationOptions = {
  localData?: Partial<FormData>;
  originalData?: Partial<FormData>;
};

type UseNavigationOutput = {
  goNext: () => void;
  goBack: () => void;
  goPage: (page: string, isEdit?: boolean) => void;
};

const navigationRules = [resurfaceGender, resurfaceSkill];

export const useNavigation = ({
  localData,
  originalData,
}: UseNavigationOptions = {}): UseNavigationOutput => {
  const navigate = useNavigate();
  const branches = useRouteStore((state) => state.branches);
  const routes = useRouteStore((state) => state.routes);
  const setIsEdit = useRouteStore((state) => state.setIsEdit);
  const isEdit = useRouteStore((state) => state.isEdit);
  const data = useStore((state) => state.data);
  const branchNode = useRouteStore((state) => state.branchNode);
  const setBranches = useRouteStore((state) => state.setBranches);
  const setBranchNode = useRouteStore((state) => state.setBranchNode);
  const saveSnapshot = useStore((state) => state.saveSnapshot);
  const applySnapshot = useStore((state) => state.applySnapshot);
  const updateBranchData = useStore((state) => state.updateBranchData);

  const { persist } = usePersist();

  const goNextRef = useRef(false);

  useEffect(() => {
    if (goNextRef.current) {
      goNextRef.current = false;
      handleNext();
    }
  }, [data]);

  const getCurrentRoute = () => window.location.pathname as Route;
  /**
   * 1. Check branches mode
   * 2. Commit data
   * 3. Check if there are any navigation rules
   * @returns
   */
  const handleNext = () => {
    const currentPath = getCurrentRoute();

    if (branches.length && isEdit) {
      const branchIndex = branches.findIndex(
        (branch) => branch === currentPath
      );

      onBranching();

      // Got to the end of the branch
      // Persist the branch data if any and flush it
      if (branchIndex === branches.length - 1) {
        setBranches([]);
        setIsEdit(false);

        persist(branchData);
        updateBranchData({});
        navigate(Route.SUMMARY);
        return;
      }

      const nextRoute =
        branches[branches.findIndex((branch) => branch === currentPath) + 1];

      navigate(nextRoute);
      return;
    }

    const resurfaceRoutes = navigationRules
      .map((rule) => rule(currentPath, data))
      .filter(Boolean) as Route[];

    if (resurfaceRoutes.length) {
      setBranchNode(currentPath);
      saveSnapshot();
      setBranches(resurfaceRoutes);
      onBranching();
      navigate(resurfaceRoutes[0]);
      return;
    }

    const nextRoute = isEdit
      ? Route.SUMMARY
      : routes[routes.findIndex((route) => route.path === currentPath) + 1]
          .path;

    if (nextRoute) {
      setIsEdit(false);

      onSequential();
      navigate(nextRoute);
    } else {
      console.error("No next route found");
    }
  };

  const goNext = () => {
    goNextRef.current = true;
  };

  const goBack = () => {
    // Reset branches if we are back to the branch node
    if (branches.length && branchNode === getCurrentRoute()) {
      setBranches([]);
      applySnapshot();
    }

    navigate(-1);
  };

  const goPage = (page: string, isEdit = false) => {
    const route = routes.find((route) => route.path === page);
    if (route) {
      navigate(route.path);
      setBranches([]);
      setIsEdit(isEdit);
    } else {
      console.error(`Route ${page} not found`);
    }
  };

  const onSequential = () => {
    if (localData && originalData && isDataChanged(localData, originalData)) {
      persist(localData);
    }
  };

  const onBranching = () => {
    if (localData && originalData && isDataChanged(localData, originalData)) {
      updateBranchData(localData);
    }
  };

  return { goNext, goBack, goPage };
};
