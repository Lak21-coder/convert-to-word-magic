const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const API_BASE =
  window.RYKLO_API_BASE ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : "");

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn || btn.dataset.busy === "1") return;

    const originalText = btn.textContent;
    btn.dataset.busy = "1";
    btn.disabled = true;
    btn.textContent = "Sending…";

    const payload = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      company: contactForm.company.value.trim(),
      message: contactForm.message.value.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }
      btn.textContent = "Message Sent!";
      contactForm.reset();
    } catch (err) {
      console.error(err);
      btn.textContent = "Try again";
      alert(err.message || "Could not send message. Please try again.");
    } finally {
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.dataset.busy = "0";
      }, 2500);
    }
  });
}

const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    header.style.boxShadow =
      window.scrollY > 10 ? "0 2px 8px rgba(0,0,0,0.3)" : "none";
  });
}
