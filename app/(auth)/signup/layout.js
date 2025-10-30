import SignUpWrapper from "./_components/SignUpWrapper";

export const metadata = {
  title: "Better Auth App",
  description: "Full-stack authentication with Better Auth",
};

export default function SignUpLayout({ children }) {
  return <SignUpWrapper>{children}</SignUpWrapper>;
}
