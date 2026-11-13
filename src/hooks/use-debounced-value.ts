import * as React from "react";

export function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delay);

    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
