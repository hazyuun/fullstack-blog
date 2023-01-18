import Link from "next/link";

import { useFormState } from "@/hooks/useFormState";
import { useUserAPI } from "@/hooks/useUserAPI";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiAtLine, RiKeyFill, RiLoader5Fill, RiMailLine } from "react-icons/ri";
import { FormInput } from "./FormInput";

interface RegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onRegisterSuccess: () => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  /* Form inputs */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [agree, setAgree] = useState(false);

  /* Form state */
  const form = useFormState();

  /* Other */
  const userAPI = useUserAPI();
  const router = useRouter();

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

    if (password != passwordC) {
      form.setError({
        message: "Password confirmation doesn't match password",
      });
      return false;
    }

    if (!agree) {
      form.setError({
        message:
          "You can't continue if you don't agree with the terms of use and privacy policy",
      });
      return false;
    }

    form.setLoading();
    return true;
  };
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    userAPI
      .Register({
        username,
        email,
        password,
      })
      .then(() => {
        form.reset();
        props.onRegisterSuccess();
      })
      .catch((e) => {
        form.setError({
          message: e.message,
        });
      });
  };

  return (
    <form
      action="#"
      method="POST"
      className="flex flex-col gap-8 p-4 md:w-2/3 lg:w-2/3"
      onSubmit={submitForm}
    >
      <h1 className="self-start text-4xl">Create an account</h1>
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
        <span className="flex justify-between text-gray-500">Email </span>
        <FormInput
          icon={<RiMailLine />}
          type="email"
          placeholder="email@example.com"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          required
        />
      </label>

      <label>
        <span className="flex justify-between text-gray-500">Password </span>
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

      <label>
        <span className="flex justify-between text-gray-500">
          Confirm password
        </span>
        <FormInput
          icon={<RiKeyFill />}
          type="password"
          placeholder="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPasswordC(e.target.value);
          }}
          required
        />
      </label>

      <label className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAgree(e.target.checked);
          }}
          required
        />
        <span className="flex justify-between text-gray-500">
          I have read and I accept the Terms of use and the Privacy policy
        </span>
      </label>

      <div className="flex flex-col">
        <span>
          Already have an account ?
          <Link className="text-slate-700 underline" href="login">
            {" "}
            Login
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
          "Register"
        )}
      </button>
    </form>
  );
}
