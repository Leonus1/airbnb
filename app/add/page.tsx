import ListingForm from "@/components/ListingForm/ListingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ContactForm from "@/components/ContactForm/ContactForm";

export default async function AddPropertyPage() {
  const session = await auth();
  const email = session?.user?.email ?? undefined;

  const userRole = await prisma.user?.findFirst({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      isAdmin: true,
      id: true,
    },
  });

  // Not Signed In
  if (!session?.user) redirect("/login");

  // Signed In & Admin ==> Listing Form
  if (userRole?.isAdmin === true) return <ListingForm ownerId={userRole?.id} />;

  // Signed In & Non-Admin ==> Contact Form
  if (userRole?.isAdmin === false) return <ContactForm email={email} />;
}
