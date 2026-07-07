const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
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

  if (arrival) {
    arrival.min = todayValue;
  }

  if (departure) {
    departure.min = todayValue;
  }

  if (nextUrl && window.location.origin !== "null") {
    nextUrl.value = `${window.location.origin}${window.location.pathname}?odeslano=1`;
  }

  const updateStayLength = () => {
    if (!arrival.value || !departure.value || !nights) {
      return;
    }

    const start = new Date(arrival.value);
    const end = new Date(departure.value);
    const diff = Math.round((end - start) / 86400000);

    if (diff > 0) {
      nights.value = `${diff} ${diff === 1 ? "noc" : diff > 1 && diff < 5 ? "noci" : "nocí"}`;
    } else {
      nights.value = "";
    }
  };

  if (arrival && departure) {
    arrival.addEventListener("change", () => {
      departure.min = arrival.value || todayValue;
      updateStayLength();
    });
    departure.addEventListener("change", updateStayLength);
  }

  if (success && new URLSearchParams(window.location.search).get("odeslano") === "1") {
    success.classList.add("is-visible");
    success.scrollIntoView({ block: "center" });
  }
}

document.querySelectorAll("[data-history-back]").forEach((button) => {
  button.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
});
