import { authClient } from "@/lib/auth-client";

const forgotPassword = async (email) => {
  try {
    const { data } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/reset-password`,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
const resetPassword = async (newPassword, token) => {
  try {
    const { data } = await authClient.resetPassword({ newPassword, token });
    return data;
  } catch (error) {
    throw error;
  }
};
const changePassword = async (payload) => {
  try {
    const { data } = await authClient.changePassword(payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const signin = async (payload) => {
  try {
    const { data, error } = await authClient.signIn.email({
      ...payload,
      callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/dashboard`,
    });
    if (error) {
      let errorMessage = "Failed to sign in";
      if (error.status === 403) {
        if (error.code === "BANNED_USER") {
          errorMessage = error.message || "Your account has been banned!";
        } else if (error.code === "EMAIL_NOT_VERIFIED") {
          errorMessage = "Please verify your email before signing in";
        } else {
          errorMessage = "Wrong credentials!";
        }
      } else {
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const signup = async (payload) => {
  try {
    const { data, error } = await authClient.signUp.email({
      ...payload,
      callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/signin`,
    });
    if (error) {
      let errorMessage = "Failed to sign up";
      if (
        error.status === 422 &&
        error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        errorMessage = "User already exists. Use another email.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export { forgotPassword, resetPassword, changePassword, signin, signup };
