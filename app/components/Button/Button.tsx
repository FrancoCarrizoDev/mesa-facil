type ButtonProps = {
  readonly onClick?: () => void;
  readonly text: string;
  readonly type?: "button" | "submit" | "reset";
  readonly color?: "primary" | "secondary" | "tertiary" | "error" | "warning";
  readonly size?: "small" | "medium" | "large" | "xs";
  readonly disabled?: boolean;
  readonly variant?: "contained" | "outlined" | "text";
  readonly fullWidth?: "true" | "false";
};

export default function Button({
  onClick,
  text,
  type,
  color = "primary",
  size = "small",
  disabled = false,
  variant = "contained",
  fullWidth = "false",
}: ButtonProps) {
  const colorClasses = {
    primary: "bg-blue-chill-400",
    secondary: "bg-blue-chill-100",
    tertiary: "bg-white",
    error: "bg-red-500",
    warning: "bg-yellow-300",
  };

  const sizeClasses = {
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
    xs: "text-xs",
  };

  const variantClasses = {
    contained: "border rounded-md",
    outlined: "border border-blue-chill-300 rounded-md",
    text: "",
  };

  const hoverClasses = {
    primary: "hover:bg-blue-chill-500",
    secondary: "hover:bg-blue-chill-200",
    tertiary: "hover:bg-gray-200",
    error: "hover:bg-red-600",
    warning: "hover:bg-yellow-400",
  };

  const fullWidthClasses = {
    true: "w-full",
    false: "",
  };

  const paddingClasses = {
    small: "px-4 py-2",
    medium: "px-5 py-3",
    large: "px-6 py-4",
    xs: "px-3 py-1",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${variant === "outlined" ? "text-gray-900" : "text-white"}  ${
        paddingClasses[size]
      } ${colorClasses[color]} ${sizeClasses[size]} ${
        variantClasses[variant]
      } ${hoverClasses[color]}  ${fullWidthClasses[fullWidth]} `}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
