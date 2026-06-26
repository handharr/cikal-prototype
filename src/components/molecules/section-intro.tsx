/**
 * Eyebrow + title + lead paragraph block used at the top of the public marketing
 * pages (about, contact). The public counterpart to the app/admin `T.PageHeader`.
 */
export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <span className="typo-label text-[var(--primary)]">{eyebrow}</span>
      <h1 className="typo-section-title font-bold">{title}</h1>
      <p className="typo-body text-[var(--muted-foreground)]">{description}</p>
    </section>
  );
}
