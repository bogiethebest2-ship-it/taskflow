type FeatureCardProps = {
  title: string;
  description: string;
  accent: string;
};

export function FeatureCard({ title, description, accent }: FeatureCardProps) {
  return (
    <article className="border-t-4 border-slate-900 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-5 h-1 w-16 ${accent}`} />
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
