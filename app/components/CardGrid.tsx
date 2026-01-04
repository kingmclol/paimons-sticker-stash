import ErrorImage from "./ErrorImage";

function CardGrid<T>({
  items,
  renderCard,
}: {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
}) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center text-lg font-bold tracking-wide">
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <ErrorImage />
          No items found
        </div>
      </div>
    );
  } else
    return (
      <div className="grid auto-rows-min grid-cols-1 items-start gap-8 sm:grid-cols-2">
        {items.map(renderCard)}
      </div>
    );
}

export default CardGrid;
