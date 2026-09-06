document.documentElement.classList.add("has-js");

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  const closeNavigation = ({ returnFocus = false } = {}) => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otevřít menu");

    if (returnFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Zavřít menu" : "Otevřít menu");

    if (isOpen) {
      mainNav.querySelector("a")?.focus();
    }
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeNavigation();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("nav-open") &&
      !mainNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("nav-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeNavigation({ returnFocus: true });
      return;
    }

    if (event.key === "Tab") {
      const focusableItems = [...mainNav.querySelectorAll("a[href], button:not([disabled])")];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNavigation();
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const bookingForm = document.querySelector("[data-booking-form]");

if (bookingForm) {
  const minimumStay = 2;
  const arrival = bookingForm.querySelector("#arrival");
  const departure = bookingForm.querySelector("#departure");
  const nights = bookingForm.querySelector("#nights");
  const nextUrl = bookingForm.querySelector("#nextUrl");
  const success = document.querySelector("[data-success-message]");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayValue = `${yyyy}-${mm}-${dd}`;

  const addDays = (dateValue, days) => {
    const date = new Date(`${dateValue}T12:00:00`);
    date.setDate(date.getDate() + days);
    const nextYear = date.getFullYear();
    const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
    const nextDay = String(date.getDate()).padStart(2, "0");
    return `${nextYear}-${nextMonth}-${nextDay}`;
  };

  const dateDifference = (startValue, endValue) => {
    const [startYear, startMonth, startDay] = startValue.split("-").map(Number);
    const [endYear, endMonth, endDay] = endValue.split("-").map(Number);
    return Math.round(
      (Date.UTC(endYear, endMonth - 1, endDay) - Date.UTC(startYear, startMonth - 1, startDay)) /
        86400000
    );
  };

  if (arrival) {
    arrival.min = todayValue;
  }

  if (departure) {
    departure.min = addDays(todayValue, minimumStay);
  }

  if (nextUrl && window.location.origin !== "null") {
    nextUrl.value = `${window.location.origin}${window.location.pathname}?odeslano=1`;
  }

  const updateStayLength = () => {
    if (!arrival.value || !departure.value || !nights) {
      departure?.setCustomValidity("");
      if (nights) nights.value = "";
      return;
    }

    const diff = dateDifference(arrival.value, departure.value);

    if (diff >= minimumStay) {
      nights.value = `${diff} ${diff === 1 ? "noc" : diff > 1 && diff < 5 ? "noci" : "nocí"}`;
      departure.setCustomValidity("");
    } else {
      nights.value = "";
      departure.setCustomValidity(`Minimální délka pobytu jsou ${minimumStay} noci.`);
    }
  };

  if (arrival && departure) {
    arrival.addEventListener("change", () => {
      departure.min = addDays(arrival.value || todayValue, minimumStay);

      if (departure.value && departure.value < departure.min) {
        departure.value = "";
        nights.value = "";
      }

      updateStayLength();
    });
    departure.addEventListener("change", updateStayLength);
  }

  if (arrival.value) departure.min = addDays(arrival.value, minimumStay);
  updateStayLength();

  bookingForm.addEventListener("submit", (event) => {
    updateStayLength();

    if (!bookingForm.checkValidity()) {
      event.preventDefault();
      bookingForm.reportValidity();
    }
  });

  if (success && new URLSearchParams(window.location.search).get("odeslano") === "1") {
    success.classList.add("is-visible");
    success.setAttribute("tabindex", "-1");
    success.focus();
    success.scrollIntoView({ block: "center" });
  }
}

// Seasonal stories keep all content local and update accessibly.
const seasonStories = {
  winter: {
    image: 'assets/img/sjezdovka.webp',
    alt: 'Zasněžené sjezdovky v Prkenném Dole',
    label: 'Krkonoše v zimě',
    title: 'Ráno na svah. Večer do tepla.',
    copy: 'Ski areál Bret je hned vedle, Arakis přibližně 300 metrů od chalupy. Vyrazte na lyže, běžky nebo jen na procházku zasněženou krajinou.',
    tags: ['Lyže a běžky', 'Pro rodiny s dětmi', 'Sauna po návratu']
  },
  summer: {
    image: 'assets/img/chalupa-editorial.webp',
    alt: 'Chalupa u Bedýnků uprostřed letní zeleně',
    label: 'Krkonoše v létě',
    title: 'Cestou necestou. A pak ke grilu.',
    copy: 'Vydejte se do Rýchorského pralesa, na rozhlednu Elišku nebo po cyklotrasách Žacléřska. Děti zabaví pohádková vesnička vedle chalupy a večer se všichni potkáte pod pergolou.',
    tags: ['Pěší výlety a kola', 'Pohádková vesnička', 'Večery u grilu']
  }
};
document.querySelectorAll('[data-season]').forEach(button => {
  button.addEventListener('click', () => {
    const story = seasonStories[button.dataset.season];
    if (!story) return;
    document.querySelectorAll('[data-season]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const photo = document.querySelector('.season-picture img');
    photo.src = story.image;
    photo.alt = story.alt;
    document.querySelector('[data-season-label]').textContent = story.label;
    document.querySelector('[data-season-title]').textContent = story.title;
    document.querySelector('[data-season-copy]').textContent = story.copy;
    document.querySelector('[data-season-tags]').replaceChildren(...story.tags.map(label => {
      const tag = document.createElement('span');
      tag.textContent = label;
      return tag;
    }));
  });
});

// Native dialog provides modal focus management, Escape and focus restoration.
if (typeof HTMLDialogElement !== 'undefined') {
  document.querySelectorAll('.room picture, .gallery-grid picture').forEach(picture => {
    const img = picture.querySelector('img');
    if (!img) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-trigger';
    button.dataset.lightbox = '';
    button.dataset.image = img.src.replace(/\.webp$/, '.jpg');
    button.setAttribute('aria-label', `Zvětšit fotografii: ${img.alt}`);
    picture.before(button);
    button.append(picture);
  });
  const galleryItems = [...document.querySelectorAll('[data-lightbox]')];
  if (galleryItems.length) {
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Fotogalerie chalupy');
    dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="Zavřít galerii" autofocus>×</button><img alt=""><p class="lightbox-caption" aria-live="polite"></p><div class="lightbox-controls"><button type="button" data-prev aria-label="Předchozí fotografie">←</button><button type="button" data-next aria-label="Další fotografie">→</button></div>';
    document.body.append(dialog);
    let activeIndex = 0;
    const showPhoto = index => {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeIndex];
      const img = item.querySelector('img');
      dialog.querySelector('img').src = item.dataset.image || item.href;
      dialog.querySelector('img').alt = img.alt;
      dialog.querySelector('.lightbox-caption').textContent = `${activeIndex + 1} / ${galleryItems.length} — ${img.alt}`;
    };
    galleryItems.forEach((item, index) => item.addEventListener('click', event => {
      event.preventDefault();
      showPhoto(index);
      dialog.showModal();
      document.body.classList.add('gallery-open');
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-prev]').addEventListener('click', () => showPhoto(activeIndex - 1));
    dialog.querySelector('[data-next]').addEventListener('click', () => showPhoto(activeIndex + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => document.body.classList.remove('gallery-open'));
  }
}

document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
