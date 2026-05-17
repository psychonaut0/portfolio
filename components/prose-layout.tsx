type ProseLayoutProps = {
  children: React.ReactNode;
};

export function ProseLayout({ children }: ProseLayoutProps) {
  return (
    <div className="space-y-4 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_code]:font-mono [&_code]:text-sm [&_a]:underline [&_a]:decoration-hairline [&_a]:underline-offset-4 hover:[&_a]:decoration-accent">
      {children}
    </div>
  );
}
