import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Menu | Royal Sweets & Fast Food",
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return <PlaceholderPage title="Menu" />;
}
