import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Catering | Royal Sweets & Fast Food",
  robots: { index: false, follow: false },
};

export default function CateringPage() {
  return <PlaceholderPage title="Catering" />;
}
