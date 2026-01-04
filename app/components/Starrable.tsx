import Star from "./Star";

function Starrable({
  children,
  isStarred,
  onClick,
}: {
  children: React.ReactNode;
  isStarred: boolean;
  onClick: () => void;
}) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute top-2 right-2 hidden group-hover:block">
        <Star onClick={onClick} isStarred={isStarred} />
      </div>
    </div>
  );
}

export default Starrable;
