// import { Route } from "../routes";
import { useNavigation } from "../hooks/useNavigation";
import { useStore } from "../store/store";

const fieldToPage: Record<string, string> = {
  name: "/",
  email: "/",
  age: "/",
  gender: "/gender",
  animal: "/animal",
  subject: "/subject",
  skill: "/skill",
};
// const fieldToPage: Record<string, Route> = {
//   name: Route.PERSONAL,
//   email: Route.PERSONAL,
//   age: Route.PERSONAL,
//   gender: Route.GENDER,
//   animal: Route.ANIMAL,
//   subject: Route.SUBJECT,
//   skill: Route.SKILL,
// };

const Summary = () => {
  const data = useStore((state) => state.data);
  const { goPage } = useNavigation();

  return (
    <div>
      <h1>Summary</h1>

      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <span style={{ marginRight: "24px" }}>
              <strong>{key}:</strong> {value}
            </span>
            <button onClick={() => goPage(fieldToPage[key], true)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
