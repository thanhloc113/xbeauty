"use client";

interface SectionProps {
  children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="py-12 lg:py-16 px-4 lg:px-8 w-full">
      {children}
    </section>
  );
}