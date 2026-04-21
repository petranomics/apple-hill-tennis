export const metadata = {
  title: "Admin | Apple Hill Tennis Club",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-layout">{children}</div>;
}
