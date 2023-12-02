import { useState } from "react";

export default function useForm<T>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);

  const onChange = (fields: Partial<T>) => {
    setValues((prev) => {
      return { ...prev, ...fields };
    });
  };

  return {
    values,
    onChange,
  };
}
