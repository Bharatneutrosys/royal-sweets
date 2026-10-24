import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Contact | Royal Sweets & Fast Food",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return <PlaceholderPage title="Contact" />;
}
