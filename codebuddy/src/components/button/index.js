import { RiLoader3Line } from "react-icons/ri";

export const Button = ({
  children,
  type = "button",
  onClick = () => {},
  rounded = false,
  buttonType = "filled",
  href = "",
  prefix,
  suffix,
  isLoading = false,
  isDisabled = false,
  style = "",
}) => {
  const StyledButton = () => (
    <button
      className={`${
        buttonType === "filled"
          ? "bg-blue-100 hover:bg-blue-200 text-white"
          : buttonType === "filled-secondary"
          ? "bg-light-400 hover:bg-white dark:bg-dark-100 hover:dark:bg-dark-200 text-dark-300 dark:text-white border border-light-400 dark:border-dark-100"
          : buttonType === "outlined"
          ? "border border-blue-100 hover:border-blue-200 text-white"
          : buttonType === "outlined-dark"
          ? "border border-light-200 dark:border-dark-100 hover:border-dark-300 text-dark-300 dark:text-white hover:dark:border-light-300"
          : buttonType === "filled-dark"
          ? "bg-light-300 dark:bg-dark-100 text-white"
          : buttonType === "custom"
          ? "bg-light-300 dark:bg-dark-100 text-white"
          : buttonType === "custom-styling"
          ? style
          : "bg-dark-100 hover:bg-dark-200 text-white"
      } w-full ${
        rounded ? "rounded-full" : "rounded-lg"
      } font-semibold px-6 h-12 ${
        (isDisabled || isLoading) && "opacity-50 disabled:cursor-not-allowed"
      } `}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      <div className="flex justify-center items-center gap-4 bg-inherit text-inherit">
        {isLoading && <RiLoader3Line className="animate-spin text-2xl" />}
        {prefix}
        {children}
        {suffix}
      </div>
    </button>
  );

  if (href !== "")
    return (
      <a href={href} className="w-full">
        <StyledButton />
      </a>
    );
  return <StyledButton />;
}
