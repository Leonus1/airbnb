// app/components/NavbarContainer.js
import Navbar from "../Navbar/Navbar";

type sessionType = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default async function NavbarContainer({ session }: { session: sessionType | null }) {
  const user = session?.user;

  return <Navbar user={user} />;
}
