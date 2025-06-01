import Personal from "./components/Personal";
import Gender from "./components/Gender";
import Animal from "./components/Animal";
import Subject from "./components/Subject";
import Skill from "./components/Skill";
import Summary from "./components/Summary";

export enum Route {
  PERSONAL = "/",
  GENDER = "/gender",
  ANIMAL = "/animal",
  SUBJECT = "/subject",
  SKILL = "/skill",
  SUMMARY = "/summary",
}

export const ROUTES = [
  { path: Route.PERSONAL, element: <Personal /> },
  { path: Route.GENDER, element: <Gender /> },
  { path: Route.ANIMAL, element: <Animal /> },
  { path: Route.SUBJECT, element: <Subject /> },
  { path: Route.SKILL, element: <Skill /> },
  { path: Route.SUMMARY, element: <Summary /> },
];
