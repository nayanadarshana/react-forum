import { useEffect, useRef } from "react";

export function usePrevious(value, initialValue = false) {
  const ref = useRef(initialValue ? value : undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
