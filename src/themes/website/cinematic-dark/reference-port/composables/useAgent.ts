// A simple shim to replace the Vue useAgent composable for the Three engine
export const isTouch = { value: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) };
export const useAgent = () => ({ isTouch });
