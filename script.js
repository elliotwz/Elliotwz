const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});

const setupTheme = () => {
  document.body.dataset.theme = "forest";
  window.localStorage.setItem("elliot-theme", "forest");
};

const runBrandIntro = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const brand = document.querySelector(".brand");
  if (!brand) {
    return;
  }

  const referrer = document.referrer;
  let isInternalNavigation = false;

  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);
      isInternalNavigation = referrerUrl.origin === window.location.origin;
    } catch (_error) {
      isInternalNavigation = false;
    }
  }

  const className = isInternalNavigation ? "brand-intro" : "brand-intro-strong";

  brand.classList.add(className);
  window.setTimeout(() => {
    brand.classList.remove("brand-intro", "brand-intro-strong");
  }, isInternalNavigation ? 1150 : 1300);
};

window.addEventListener("load", runBrandIntro, { once: true });
window.addEventListener("load", setupTheme, { once: true });
