import { HiOutlineStar, HiStar } from "react-icons/hi2";

function Star({
  size = 32,
  isStarred,
  onClick,
}: {
  size?: number;
  isStarred: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-background flex items-center justify-center rounded-lg opacity-80 hover:cursor-pointer hover:opacity-100"
      onClick={onClick}
      aria-label={isStarred ? "Unstar" : "Star"}
    >
      {isStarred ? (
        <HiStar color="gold" size={size} />
      ) : (
        <HiOutlineStar size={size} />
      )}
    </button>
  );
}

export default Star;
