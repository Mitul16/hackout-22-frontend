export const TextInput = ({
  pretext,
  prefix,
  suffix,
  inputType = "input",
  type,
  placeholder = "Type something...",
  spellCheck = false,
  value,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  required = false,
  height,
  resize = true,
  rounded = false,
  autoFill = true,
  noGutter = false,
  id = "",
}) => {
  return (
    <div className={`dark:text-white text-black font-normal  w-full`}>
      {pretext && (
        <span className="block text-dark-300 dark:text-white font-medium text-md mb-2">
          {pretext}
        </span>
      )}
      <div
        className={`border-light-300 dark:border-dark-100 border ${
          inputType !== "checkbox" && "p-3 pl-5"
        } flex ${noGutter ? "" : "gap-4"} w-full ${
          rounded ? "rounded-3xl" : "rounded-lg"
        } h-auto`}
      >
        {prefix && <div className="py-1">{prefix}</div>}
        <div className="flex items-center justify-center w-full">
          {inputType === "input" && (
            <input
              type={type}
              spellCheck={spellCheck}
              placeholder={placeholder}
              className="outline-none bg-transparent w-full"
              value={value}
              autoComplete=""
              required={required}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={(e) => onKeyDown(e.target.value, e.key)}
            />
          )}
          {inputType === "textarea" && (
            <textarea
              type={type}
              placeholder={placeholder}
              spellCheck={spellCheck}
              className={`outline-none bg-transparent w-full ${height} ${
                !resize && "resize-none"
              }`}
              value={value}
              required={required}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
            />
          )}
          {inputType === "checkbox" && (
            <div className="relative w-full flex flex-row cursor-pointer">
              <input
                id={id}
                type={inputType}
                placeholder={placeholder}
                spellCheck={spellCheck}
                checked={value}
                required={required}
                onChange={(e) => onChange(e.target.checked)}
                className="peer opacity-0 absolute mx-auto bottom-0 right-0 left-0"
              />
              <label
                className="text-center p-4 w-full bg-transparent peer-checked:bg-blue-100 rounded-lg cursor-pointer peer-checked:text-white"
                htmlFor={id}
              >
                Yes
              </label>
              <label
                className="text-center p-4 w-full bg-orange-200 peer-checked:bg-transparent rounded-lg cursor-pointer text-white peer-checked:text-dark-300 dark:peer-checked:text-white"
                htmlFor={id}
              >
                No
              </label>
            </div>
          )}
        </div>
        {suffix && <div className="py-1">{suffix}</div>}
      </div>
    </div>
  );
}
