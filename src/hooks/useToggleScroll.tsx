import { useEffect } from "react";

function enableScroll() {
  document.documentElement.style.overflow = "auto";
  document.body.style.overflow = "auto";
}

function disableScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

export default function useToggleScroll(toggle: boolean) {
  useEffect(() => {
    if (toggle) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [toggle]);

  return useToggleScroll;
}
