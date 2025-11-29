export default function SectionCard({
  title,
  subtitle,
  children,
  backgroundClassName = "from-[#0d1326]/92 via-[#0c1228]/90 to-[#0a0f21]/92 backdrop-blur-xl text-slate-50",
}) {
  return (
    <section
      className={`rounded-2xl border border-white/8 bg-gradient-to-br shadow-[0_22px_48px_rgba(0,0,0,0.45)] ${backgroundClassName}`}
    >
      <div className="flex items-start justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
            {title}
          </p>
          {subtitle ? <p className="text-sm text-slate-200">{subtitle}</p> : null}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
