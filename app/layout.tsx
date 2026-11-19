import type { Metadata } from "next";
import { profile } from "../content/portfolio";
import "./globals.css";

const title = `${profile.name} | Computer Science Portfolio`;
const description = "Selected projects, experience, and quantitative finance research by Vansh Trivedi, a first-year Computer Science student at the University of Toronto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: profile.site },
  openGraph: { title, description, url: profile.site, type: "website", siteName: profile.name },
  twitter: { card: "summary", title, description },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top">{children}</body></html>;
}
