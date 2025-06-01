import { Route } from "./routes";
import { FormData } from "./store/store";

type NavigationRule = (
  currentPath: Route,
  appData: FormData
) => Route | undefined;

export const resurfaceGender: NavigationRule = (
  currentPath,
  appData: FormData
) => {
  if (currentPath !== Route.PERSONAL) return;

  if (Number(appData.age) < 18) {
    return;
  }

  return Route.GENDER;
};

export const resurfaceSkill: NavigationRule = (
  currentPath,
  appData: FormData
) => {
  if (currentPath !== Route.PERSONAL) return;

  if (Number(appData.age) < 30) {
    return;
  }

  return Route.SKILL;
};
