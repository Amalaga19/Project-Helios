import SimpleLayout from "../layouts/SimpleLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SimpleLayout>{children}</SimpleLayout>;
}
