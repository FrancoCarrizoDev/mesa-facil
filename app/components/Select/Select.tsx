import { ChangeEventHandler } from "react";

type Props = {
  readonly value: string | number;
  readonly label: string;
  readonly required?: boolean;
  readonly onChange: ChangeEventHandler<HTMLSelectElement>;
  readonly size?: "small" | "medium" | "large";
  readonly options: {
    readonly value: string | number;
    readonly label: string;
  }[];
};

export default function Select({
  value,
  onChange,
  label,
  required = false,
  options,
  size = "small",
}: Props) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="block py-2 text-sm font-medium text-gray-900 dark:"
      >
        {label}
      </label>
      <select
        id={label}
        className={`bg-blue-chill-50 border border-blue-chill-200 p-2   text-blue-chill-950 rounded-md block w-full ${sizeClasses[size]}`}
        required={required}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
