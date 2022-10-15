import { useEffect, useState } from "react";
import { FiDelete, FiX } from "react-icons/fi";
import { TextInput } from "../textInput/index";
// import { log } from "../../utils";

const defaultSuggestions = [
  { value: "Front End Developer" },
  { value: "Product Management" },
  { value: "Crypto Currency" },
  { value: "HTML" },
  { value: "CSS" },
  { value: "JavaScript" },
  { value: "Marketing" },
  { value: "UI Design" },
  { value: "Operations" },
  { value: "System Design" },
  { value: "Web3" },
  { value: "Full Stack Developer" },
  { value: "Arduino" },
  { value: "Talent" },
  { value: "Backend Developer" },
];

export const RolesInput = ({
  title = "Profile Tags",
  roles: stateRoles = [],
  setRoles: setStateRoles,
  suggestions = defaultSuggestions,
  isLoading = false,
  extendStyle,
}) => {
  const [value, setValue] = useState(""),
    [isFocused, setIsFocused] = useState(false),
    [roles, setRoles] = useState(stateRoles);

  useEffect(() => {
    setStateRoles(roles);
    // log(roles);
  }, [roles]);

  return (
    <div
      className="w-full relative h-fit"
      onFocus={(_) => setIsFocused(true)}
      onBlur={(_) => setTimeout(() => setIsFocused(false), 250)}
    >
      <TextInput
        pretext={title}
        placeholder="Enter your interests, skills, etc."
        value={value}
        onChange={(e) => setValue(e)}
        height="h-auto"
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     setRoles((prev) => [...prev, { value: e.target.value }]);
        //     setValue("");
        //   }
        // }}
      />
      {isFocused && (
        <div className="absolute h-fit w-48 bg-light-400 dark:bg-dark-200 flex flex-col gap-2 rounded-lg">
          {suggestions
            .filter(
              (suggestion) =>
                suggestion.value.toLowerCase().indexOf(value.toLowerCase()) !==
                -1
            )
            .filter((s, i) => {
              let c = 0;
              for (const role of roles) if (role.value === s.value) c++;
              return c === 0;
            })
            .filter((_, index) => index < 3)
            .map((suggestion, _) => (
              <div
                className="text-dark-300 dark:text-white px-4 py-2 hover:bg-light-100 hover:dark:bg-dark-100 rounded-lg cursor-pointer"
                key={`suggestion-${_}`}
                onClick={() => {
                  setRoles((prev) => [
                    ...prev.map((role) => ({ ...role, id: 0 })),
                    { value: suggestion.value, id: 0 },
                  ]);
                  setIsFocused(false);
                }}
              >
                {suggestion.value}
              </div>
            ))}
        </div>
      )}
      {roles.length !== 0 && (
        <div className={`mt-4 flex gap-2 flex-wrap h-auto ${extendStyle}`}>
          {roles.map((role, index) => (
            <span
              className="text-md border border-light-200 dark:border-dark-100 rounded-full px-4 py-1 text-dark-300 dark:text-white bg-light-100 dark:bg-dark-100 flex gap-2 items-center"
              key={`role-${index}`}
            >
              {role.value}
              {!isLoading && (
                <FiX
                  className="text-md text-dark-300 dark:text-white cursor-pointer"
                  onClick={() => {
                    setRoles((prev) => [
                      ...prev
                        .filter((_, i) => i !== index)
                        .map((role) => ({ ...role, id: 0 })),
                    ]);
                    setValue("");
                  }}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
