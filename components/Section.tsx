"use client";

interface SectionProps {
  children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="py-4 lg:py-8 px-4 lg:px-4 w-full">
      {children}
    </section>
  );
}