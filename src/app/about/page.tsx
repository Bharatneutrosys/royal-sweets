import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "About Us | Royal Sweets & Fast Food",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return <PlaceholderPage title="About Us" />;
}
