import type { Metadata } from "next";

// page.tsx in this segment is a client component, and Next ignores a metadata
// export from one. The canonical lives here instead — a segment layout is a
// server component. Only `alternates` is set; title, description and the rest
// still come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/quote" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
