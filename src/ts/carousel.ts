type GameId = "number-guess" | "rps" | "clicker" | "memory" | "avoid";

interface GameInfo {
  id: GameId;
  tag: string;
  title: string;
  desc: string;
  meta: string;
  image: string;
  link: string;
}

const GAMES: GameInfo[] = [
  {
    id: "number-guess",
    tag: "Number Guessing",
    title: "Number Guessing Game",
    desc: "Tebak angka rahasia sebelum kesempatanmu habis.",
    meta: "Range angka, jumlah percobaan, dan hint “Too high / Too low”.",
    image: "/img/game1.jpeg",
    link: "/games/numberguessing/index.html",
  },
  {
    id: "rps",
    tag: "RPS Arena",
    title: "RPS Arena",
    desc: "Tantang komputer dalam permainan klasik suit.",
    meta: "Pilih batu, kertas, atau gunting dan lihat siapa pemenangnya.",
    image: "/img/game2.png",
    link: "/games/rps/index.html",
  },
  {
    id: "clicker",
    tag: "Clicker Speed",
    title: "Clicker Speed",
    desc: "Klik secepat mungkin sebelum waktu habis.",
    meta: "Hitung skor total dalam batas waktu tertentu.",
    image: "/img/game3.png",
    link: "/games/clicker/index.html",
  },
  {
    id: "memory",
    tag: "Memory Cards",
    title: "Memory Card Game",
    desc: "Cocokkan semua pasangan kartu dengan mengingat posisinya.",
    meta: "Balik dua kartu per giliran dan selesaikan secepat mungkin.",
    image: "/img/memory.jpg",
    link: "/games/memory.html",
  },
  {
    id: "avoid",
    tag: "Avoid Objects",
    title: "Avoid the Falling Objects",
    desc: "Gerakkan karakter dan hindari objek yang jatuh.",
    meta: "Semakin lama bertahan, semakin tinggi skor kamu.",
    image: "/img/avoid.jpg",
    link: "/games/avoid.html",
  },
];
export class GameSlider {
  private games = GAMES;
  private currentIndex = 0;

  private featuredImage: HTMLImageElement | null;
  private featuredTag: HTMLElement | null;
  private featuredTitle: HTMLElement | null;
  private featuredDesc: HTMLElement | null;
  private featuredMeta: HTMLElement | null;
  private featuredPlay: HTMLButtonElement | null;

  private thumbnailsContainer: HTMLElement | null;
  private autoSlideId: number | undefined;

  constructor() {
    this.featuredImage = document.getElementById(
      "featured-image"
    ) as HTMLImageElement | null;
    this.featuredTag = document.getElementById("featured-tag");
    this.featuredTitle = document.getElementById("featured-title");
    this.featuredDesc = document.getElementById("featured-desc");
    this.featuredMeta = document.getElementById("featured-meta");
    this.featuredPlay = document.getElementById(
      "featured-play"
    ) as HTMLButtonElement | null;

    this.thumbnailsContainer = document.getElementById("games-thumbnails");

    this.bindEvents();
    this.show(0);
    this.startAutoSlide();
  }

  private bindEvents() {
    // klik thumbnail
    this.thumbnailsContainer?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest(
        "button[data-game]"
      ) as HTMLButtonElement | null;
      if (!button) return;
      const id = button.dataset.game as GameId;
      const index = this.games.findIndex((g) => g.id === id);
      if (index >= 0) {
        this.show(index);
        this.restartAutoSlide();
      }
    });

    // klik tombol main di featured
    this.featuredPlay?.addEventListener("click", () => {
      const game = this.games[this.currentIndex];
      window.location.href = game.link;
    });
  }

  private show(index: number) {
    const total = this.games.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    this.currentIndex = index;

    const game = this.games[index];

    if (this.featuredImage) {
      this.featuredImage.src = game.image;
      this.featuredImage.alt = `Preview ${game.title}`;
    }
    if (this.featuredTag) this.featuredTag.textContent = game.tag;
    if (this.featuredTitle) this.featuredTitle.textContent = game.title;
    if (this.featuredDesc) this.featuredDesc.textContent = game.desc;
    if (this.featuredMeta) this.featuredMeta.textContent = game.meta;

    // highlight thumbnail aktif
    this.updateActiveThumbnail(game.id);
  }

  private updateActiveThumbnail(activeId: GameId) {
    if (!this.thumbnailsContainer) return;
    const buttons =
      this.thumbnailsContainer.querySelectorAll<HTMLButtonElement>(
        "button[data-game]"
      );
    buttons.forEach((btn) => {
      if (btn.dataset.game === activeId) {
        btn.classList.add("border-cyan-500");
      } else {
        btn.classList.remove("border-cyan-500");
      }
    });
  }

  private next() {
    this.show(this.currentIndex + 1);
  }

  private prev() {
    this.show(this.currentIndex - 1);
  }

  private startAutoSlide() {
    if (this.autoSlideId !== undefined) return;
    this.autoSlideId = window.setInterval(() => {
      this.next();
    }, 5000);
  }

  private stopAutoSlide() {
    if (this.autoSlideId !== undefined) {
      window.clearInterval(this.autoSlideId);
      this.autoSlideId = undefined;
    }
  }

  private restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
