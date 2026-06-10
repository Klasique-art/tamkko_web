export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
          Dashboard Layout
        </p>
        <h2 className="mt-3 text-3xl text-stone-900">Dashboard scaffold</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          This route group is preserved, but its UI is now a plain starter shell.
        </p>
      </div>
      {children}
    </section>
  );
}
