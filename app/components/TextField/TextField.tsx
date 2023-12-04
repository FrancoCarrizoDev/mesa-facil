import React, { ChangeEvent } from "react";

type Props = {
  readonly value: string;
  readonly label: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly pattern?: string;
  readonly name?: string;
};

export default function TextField({
  value,
  onChange,
  label,
  type = "text",
  required = false,
  placeholder = "",
  pattern = undefined,
  name,
}: Props) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block my-2 text-sm font-medium text-gray-900 dark:"
      >
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        className="bg-blue-chill-50 border border-blue-chill-200  text-blue-chill-950 text-sm rounded-md block w-full p-2"
        placeholder={placeholder}
        type={type}
        value={value}
        required={required}
        pattern={pattern}
        name={name}
      />
    </div>
  );
}
