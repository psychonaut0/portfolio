type ProfileStatementProps = {
  children: React.ReactNode;
};

export function ProfileStatement({ children }: ProfileStatementProps) {
  return <p className="text-base leading-relaxed">{children}</p>;
}
