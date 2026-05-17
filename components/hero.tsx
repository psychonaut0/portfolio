type HeroProps = {
  name: string;
  roleLabel: string;
  location: string;
  stackLine: string;
};

export function Hero({ name, roleLabel, location, stackLine }: HeroProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      <p className="text-lg text-foreground">{roleLabel}</p>
      <p className="text-sm text-muted">{location}</p>
      <p className="font-mono text-sm text-muted pt-2">{stackLine}</p>
    </header>
  );
}
