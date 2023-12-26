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
  readonly disabled?: boolean;
  readonly emoji?: string;
};

export default function TextField({
  value,
  onChange,
  label,
  type = "text",
  required = false,
  placeholder = "",
  pattern = undefined,
  disabled = false,

  name,
  emoji,
}: Props) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block my-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={label}
          onChange={onChange}
          className="bg-lemon-50 border border-lemon-200  text-gray-900 text-sm rounded-md block w-full p-2"
          placeholder={placeholder}
          type={type}
          value={value}
          required={required}
          pattern={pattern}
          name={name}
          disabled={disabled}
        />
        {emoji && <span>{emoji}</span>}
      </div>
    </div>
  );
}
