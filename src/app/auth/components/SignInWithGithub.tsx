import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

function SignInWithGithub() {
  // Sign in with Github mutation
  const { mutate: signInWithGithub, isPending: signinInWithGithub } =
    useMutation({
      mutationKey: ["signInWithGithub"],
      mutationFn: async () => {
        const { data } = await authClient.signIn.social({
          provider: "github",
          callbackURL: "/dashboard",
        });

        return data;
      },
    });

  return (
    <Button
      disabled={signinInWithGithub}
      className="w-full"
      onClick={() => signInWithGithub()}
      variant="outline"
    >
      {signinInWithGithub ? <Loader2 className="animate-spin" /> : <FaGithub />}
      {signinInWithGithub ? "Signing you in..." : "Sign in with Github"}
    </Button>
  );
}

export default SignInWithGithub;
