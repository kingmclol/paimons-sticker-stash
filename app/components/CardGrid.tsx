function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid auto-rows-min grid-cols-2 items-start gap-8">
      {children}
    </div>
  );
}

export default CardGrid;
