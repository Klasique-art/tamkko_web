export default function HomePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
          Homepage
        </p>
        <h2 className="mt-4 text-4xl text-stone-900 sm:text-5xl">
          A clean baseline for the next build.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          This project has been reset to simple scaffold pages so you can rebuild without the previous product logic driving the UI.
        </p>
      </div>

      <div className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
          Starter Notes
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
          <li>Home and dashboard routes are now placeholder pages.</li>
          <li>Legal pages are available at `/terms-and-conditions` and `/privacy-policy`.</li>
          <li>Layout uses a minimal shared shell for future expansion.</li>
          <li>Folder structure remains in place for the next phase of work.</li>
        </ul>
      </div>
    </section>
  );
}
