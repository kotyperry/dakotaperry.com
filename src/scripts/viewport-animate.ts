const animatedElements = Array.from(
  document.querySelectorAll<HTMLElement>("[data-animate]")
);

if (animatedElements.length > 0) {
  const setDelay = (element: HTMLElement) => {
    const delay = element.dataset.animateDelay;
    if (delay) {
      element.style.transitionDelay = delay;
    }
  };

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => {
      setDelay(element);
      element.classList.add("in-view");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          setDelay(element);
          element.classList.add("in-view");

          if (element.dataset.animateOnce !== "false") {
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    animatedElements.forEach((element) => observer.observe(element));
  }
}
