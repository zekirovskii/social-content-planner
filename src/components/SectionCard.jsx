export default function SectionCard({
  title,
  subtitle,
  children,
  backgroundClassName = "from-[#d9e8ff] via-[#e9f2ff] to-[#dceeff]",
}) {
  return (
    <section
      className={`rounded-2xl border border-white/14 bg-gradient-to-br text-slate-900 shadow-[0_18px_38px_rgba(0,0,0,0.35)] ${backgroundClassName}`}
    >
      <div className="flex items-start justify-between border-b border-white/14 px-6 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-700">
            {title}
          </p>
          {subtitle ? <p className="text-base font-semibold text-slate-800">{subtitle}</p> : null}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
