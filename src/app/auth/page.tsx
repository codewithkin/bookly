"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import SignInWithGoogle from "./components/SignInWithGoogle";
import SignInWithGithub from "./components/SignInWithGithub";
import { toast } from "sonner";
import { motion } from "framer-motion";

function Auth() {
  // Track the value of the email input
  const [email, setEmail] = useState("");

  const { mutate: signInWithMagicLink, isPending: signingInWithMagicLink } =
    useMutation({
      mutationKey: ["signInWithMagicLink"],
      mutationFn: async () => {
        const { data } = await authClient.signIn.magicLink({
          email,
          callbackURL: "/dashboard",
        });

        toast.success(
          "Success ! Please check your email for a sign in link",
        );

        return data;
      },
    });

  return (
    <motion.main
      initial={{
        x: -400,
        opacity: 0,
      }}
      animate={{
        x: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="flex flex-col gap-4 px-4 justify-center items-center min-h-screen"
    >
      {/* Copy */}
      <article className="flex flex-col justify-center items-center text-center gap-2">
        <h1 className="font-semibold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800">
          Welcome to Bookly
        </h1>
        <p className="text-slate-500">Please login to continue</p>
      </article>

      {/* Magic link sign in form */}
      <form
        className="w-full md:max-w-[400px] flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          signInWithMagicLink();
        }}
      >
        {/* Email input */}
        <Input
          disabled={signingInWithMagicLink}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          name="email"
        />
        <Button
          disabled={signingInWithMagicLink}
          className="w-full disabled:bg-blue-80"
          type="submit"
        >
          {signingInWithMagicLink && <Loader2 className="animate-spin" />}
          {signingInWithMagicLink ? "Signing you in..." : "Continue"}
        </Button>
      </form>

      <h2 className="text-xl font-semibold">Or</h2>

      {/* Other sign in methods */}
      <article className="flex flex-col gap-4 items-center w-full md:max-w-[400px]">
        <SignInWithGoogle />
        <SignInWithGithub />
      </article>
    </motion.main>
  );
}

export default Auth;
