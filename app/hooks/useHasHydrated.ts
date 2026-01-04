import { useEffect, useState } from "react";

function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export default useHasHydrated;
