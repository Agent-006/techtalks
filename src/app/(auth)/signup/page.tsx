"use client";

import { useAuthStore } from "@/store/Auth";
import React from "react";

function SignupPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validate data
    if (!name || !email || !password) {
      setError("Please fill out all fields");
      return;
    }

    // call the store
    setIsLoading(true);
    setError("");

    const response = await createAccount(
      name,
      email?.toString(),
      password?.toString()
    );

    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    setIsLoading(() => false);
  };

  return (
    <div>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

      </form>
    </div>
  );
}

export default SignupPage;
