// app/team/layout.tsx

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 px-4 md:py-32 md:px-8 bg-black text-white text-center">
      <div className="inline-block max-w-screen-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}

  