import Link from "next/link";

import { useAuthAPI } from "@/hooks/useAuthAPI";
import { useFormState } from "@/hooks/useFormState";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiAtLine, RiKeyFill, RiLoader5Fill } from "react-icons/ri";
import { FormInput } from "./FormInput";

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onLoginSuccess: () => void;
}

export default function LoginForm(props: LoginFormProps) {
  /* Form inputs */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Form state */
  const form = useFormState();

  /* API */
  const authAPI = useAuthAPI();

  /* Client-side form validation */
  const validate = (): boolean => {
    if (username.length < 3) {
      form.setError({
        message: "Username length must be at least 3 characters",
      });
      return false;
    }

    if (password.length < 8) {
      form.setError({
        message: "Password length must be at least 8 characters",
      });
      return false;
    }

    form.setLoading();
    return true;
  };

  /* Login form onSubmit event handler */
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    authAPI
      .Login({ username, password })
      .then((r) => {
        form.reset();
        props.onLoginSuccess();
      })
      .catch((e) => {
        form.setError({
          message: e.response ? e.response.data.err : e.message,
        });
      });
  };

  return (
    <form
      {...props}
      onSubmit={submitForm}
      action="#"
      method="POST"
      className={`flex flex-col gap-8 p-4 ${props.className}`}
    >
      <h1 className="self-start text-4xl">Login</h1>
      <label>
        <span className="text-gray-500">Username</span>
        <FormInput
          icon={<RiAtLine />}
          type="text"
          placeholder="pizza_lover"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
          required
        />
      </label>
      <label>
        <span className="flex justify-between text-gray-500">
          Password{" "}
          <Link className="text-slate-700" href="#">
            Forgot password?
          </Link>
        </span>
        <FormInput
          icon={<RiKeyFill />}
          type="password"
          placeholder="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          required
        />
      </label>
      <div className="flex flex-col">
        <span>
          No account ?
          <Link className="text-slate-700 underline" href="register">
            {" "}
            Register
          </Link>
        </span>
      </div>

      <span className="text-red-700">{form.error?.message}</span>

      <button
        disabled={form.formState === "Loading"}
        className="rounded-md bg-teal-500 p-2 pr-4 pl-4 text-white hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-teal-900"
      >
        {form.formState === "Loading" ? (
          <span className="flex items-center justify-center gap-4">
            <RiLoader5Fill className="animate-spin fill-white" />
            <span className="">Please wait</span>
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
