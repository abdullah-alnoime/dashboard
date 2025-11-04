import { authClient } from "@/lib/auth-client";

export const forgotPassword = async (email) => {
  const { data, error } = await authClient.requestPasswordReset({
    email,
    redirectTo: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/reset-password`,
  });
  if (error)
    throw new Error(error.message || "Failed to send password reset email");
  return data;
};

export const resetPassword = async ({ password, token }) => {
  const { data, error } = await authClient.resetPassword({
    newPassword: password,
    token,
  });
  if (error) throw new Error(error.message || "Failed to reset password");
  return data;
};

export const signin = async (payload) => {
  const { data, error } = await authClient.signIn.email({
    ...payload,
    callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/dashboard`,
  });
  if (error) {
    let errorMessage = "Failed to sign in";
    if (error.status === 403) {
      if (error.code === "BANNED_USER") {
        errorMessage = error.message || "Your account has been banned";
      } else if (error.code === "EMAIL_NOT_VERIFIED") {
        errorMessage = "Please verify your email before signing in";
      } else {
        errorMessage = "Invalid email or password";
      }
    } else {
      errorMessage = error.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return data;
};

export const signup = async (payload) => {
  const { data, error } = await authClient.signUp.email({
    ...payload,
    callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/signin`,
  });
  if (error) {
    let errorMessage = "Failed to create account";
    if (
      error.status === 422 &&
      error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
    ) {
      errorMessage = "An account with this email already exists";
    } else {
      errorMessage = error.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return data;
};
