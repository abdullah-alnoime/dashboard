import { forgotPassword, resetPassword, signin, signup } from "@/requests/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignIn() {
  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      toast.success("You gain access to dashboard!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign in");
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent! Check your email.");
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send reset link");
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! Please sign in.");
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset password");
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created!", {
        description:
          "Please check your email to verify your account before signing in.",
      });
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign up");
    },
  });
}
