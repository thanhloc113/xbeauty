"use client";

interface SectionProps {
  id?:string;
  children: React.ReactNode;
}

export default function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="py-4 lg:py-8 px-4 lg:px-4 w-full">
      {children}
    </section>
  );
}