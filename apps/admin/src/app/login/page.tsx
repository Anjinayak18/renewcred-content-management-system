"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import axios from "@/lib/axios";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/store/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      dispatch(loginStart());

      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE", response.data);

      dispatch(
        loginSuccess({
          user: response.data.user,
          accessToken: response.data.token, // ✅ Correct
        })
      );

      toast.success("Login successful.");

      router.replace("/dashboard");
    } catch (error: any) {
      dispatch(loginFailure());

      toast.error(
        error?.response?.data?.message ??
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">
          RenewCred CMS
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}