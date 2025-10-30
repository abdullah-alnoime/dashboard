import { cookies } from "next/headers";
import DashboardClient from "./_components/DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("__Secure-better-auth.session_token");
  console.log(myCookie);

  return (
    <>
      {myCookie && <p>My Cookie Value: {myCookie.value}</p>}
      <DashboardClient />;
    </>
  );
}
