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
    if (window.innerWidth > 1040) {
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
