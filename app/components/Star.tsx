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
    <button onClick={onClick}>
      {isStarred ? (
        <HiStar className="hover:cursor-pointer" color="gold" size={size} />
      ) : (
        <HiOutlineStar className="hover:cursor-pointer" size={size} />
      )}
    </button>
  );
}

export default Star;
