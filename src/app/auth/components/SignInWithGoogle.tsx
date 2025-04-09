import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function SignInWithGoogle() {
  // Sign in with google mutation
  const { mutate: signInWithGoogle, isPending: signinInWithGoogle } =
    useMutation({
      mutationKey: ["signInWithGoogle"],
      mutationFn: async () => {
        const { data } = await authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });

        return data;
      },
    });

  return (
    <Button
      disabled={signinInWithGoogle}
      className="w-full"
      onClick={() => signInWithGoogle()}
      variant="secondary"
    >
      {signinInWithGoogle ? <Loader2 className="animate-spin" /> : <FcGoogle />}
      {signinInWithGoogle ? "Signing you in..." : "Sign in with Google"}
    </Button>
  );
}

export default SignInWithGoogle;
