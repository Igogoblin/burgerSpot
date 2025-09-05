import { useState } from 'react';

export function useForm<T extends Record<string, string>>(
  inputValue: T
): {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
} {
  const [values, setValues] = useState(inputValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return {
    values,
    setValues,
    handleChange,
  };
}
