import { useState } from "react";

type FormState = "Default" | "Error" | "Loading";
type FormError = {
  message: string;
} | null;

export const useFormState = () => {
  const [formState, _setFormState] = useState<FormState>("Default");
  const [error, _setError] = useState<FormError>(null);

  const setError = (e: FormError) => {
    _setFormState("Error");
    _setError(e);
  };

  const setLoading = () => {
    _setFormState("Loading");
    _setError(null);
  };

  const reset = () => {
    _setFormState("Default");
    _setError(null);
  };

  return { formState, error, setError, setLoading, reset };
};
