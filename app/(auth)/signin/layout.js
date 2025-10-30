import SignInWrapper from "./_components/SignInWrapper";

export const metadata = {
  title: "Better Auth App",
  description: "Full-stack authentication with Better Auth",
};

export default function SignInLayout({ children }) {
  return <SignInWrapper>{children}</SignInWrapper>;
}
