import "../styles/main.css";
import { GameSlider } from "./carousel";

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const scrollButton = document.getElementById("scroll-to-games");
const gamesSection = document.getElementById("games");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", String(!expanded));

    if (expanded) {
      mobileMenu.classList.remove("max-h-[500px]");
      mobileMenu.classList.add("max-h-0");
    } else {
      mobileMenu.classList.remove("max-h-0");
      mobileMenu.classList.add("max-h-[500px]");
    }
  });
}
// Menutup menu saat menekan diluar area

document.addEventListener("click", (e) => {
  if (
    !mobileMenu?.contains(e.target as Node) &&
    !mobileMenuButton?.contains(e.target as Node)
  ) {
    mobileMenu?.classList.remove("max-h-[500px]");
    mobileMenu?.classList.add("max-h-0");
    mobileMenuButton?.setAttribute("aria-expanded", "false");
  }
});

// Scroll to games section
if (scrollButton && gamesSection) {
  scrollButton.addEventListener("click", () => {
    gamesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  new GameSlider();
});
