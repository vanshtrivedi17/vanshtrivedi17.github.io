import type { Metadata } from "next";
import { profile } from "../content/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-CA"><body id="top">{children}</body></html>;
}
