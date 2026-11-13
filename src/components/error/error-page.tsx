interface ErrorPageProps {
  message?: string;
}

export function ErrorPage({ message = "Došlo je do neočekivane greške." }: ErrorPageProps) {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Greška</h1>
      <p className="mt-2 text-muted-foreground">{message}</p>
    </main>
  );
}
