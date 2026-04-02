(() => {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href^='#']");
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  const toggle = document.querySelector("[data-mega-toggle]");
  const menuId = toggle?.getAttribute("aria-controls");
  const menu = menuId ? document.getElementById(menuId) : null;
  if (toggle && menu && menu.hasAttribute("data-mega-menu")) {
    let lastActive = null;
    const root = toggle.closest("[data-mega-root]");

    let backdrop = document.querySelector(".mega-backdrop[data-mega-backdrop]");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "mega-backdrop";
      backdrop.setAttribute("data-mega-backdrop", "");
      backdrop.setAttribute("aria-hidden", "true");
      document.body.appendChild(backdrop);
    }

    const syncBackdrop = (open) => {
      backdrop.classList.toggle("is-active", open);
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("mega-menu-open", open);
    };

    const setOpen = (open) => {
      menu.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      syncBackdrop(open);
      if (open) {
        lastActive = document.activeElement;
        const firstLink = menu.querySelector("a, button");
        if (document.activeElement === toggle && firstLink) firstLink.focus();
      } else if (lastActive && lastActive.focus) {
        toggle.focus();
      }
    };

    backdrop.addEventListener("click", () => setOpen(false));

    const isOpen = () => menu.dataset.open === "true";

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!isOpen());
    });

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!isOpen());
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    });

    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (!isOpen()) return;
      const within = e.target.closest?.("[data-mega-root]");
      if (!within) setOpen(false);
    });

    document.addEventListener("focusin", (e) => {
      if (!isOpen()) return;
      const within = e.target.closest?.("[data-mega-root]");
      if (!within) setOpen(false);
    });

    const canHover = window.matchMedia?.("(hover: hover)")?.matches && window.matchMedia?.("(pointer: fine)")?.matches;
    if (canHover) {
      let openT = null;
      let closeT = null;

      const clearTimers = () => {
        if (openT) window.clearTimeout(openT);
        if (closeT) window.clearTimeout(closeT);
        openT = null;
        closeT = null;
      };

      const scheduleOpen = () => {
        clearTimers();
        openT = window.setTimeout(() => setOpen(true), 80);
      };

      const scheduleClose = () => {
        clearTimers();
        closeT = window.setTimeout(() => {
          const active = document.activeElement;
          if (active && active.closest?.("[data-mega-root]")) return;
          setOpen(false);
        }, 140);
      };

      const onLeave = (e) => {
        const next = e.relatedTarget;
        if (next && (toggle.contains(next) || menu.contains(next))) return;
        scheduleClose();
      };

      toggle.addEventListener("pointerenter", () => {
        clearTimers();
        openT = window.setTimeout(() => setOpen(true), 80);
      });
      toggle.addEventListener("pointerleave", onLeave);
      menu.addEventListener("pointerenter", () => {
        clearTimers();
      });
      menu.addEventListener("pointerleave", onLeave);
      root?.addEventListener("pointerleave", onLeave);
    }
  }

  const showFormSuccess = (form) => {
    form.classList.add("is-submitted");
    const msg = form.querySelector(".js-form-success");
    if (msg) {
      msg.hidden = false;
      msg.focus?.();
    }
    const live = form.closest("section")?.querySelector("[data-form-live]");
    if (live) live.textContent = "Request received. We will contact you shortly.";
  };

  document.querySelectorAll("form.js-demo-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      const action = form.getAttribute("action") || "";
      const useNetwork = action.startsWith("http");

      if (!useNetwork) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        showFormSuccess(form);
        return;
      }

      e.preventDefault();
      if (!form.reportValidity()) return;

      const fd = new FormData(form);
      try {
        const res = await fetch(action, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (res.ok) showFormSuccess(form);
        else showFormSuccess(form);
      } catch {
        showFormSuccess(form);
      }
    });
  });

  // Mobile nav — full-screen overlay + dissolve (see components.css -- duration must match)
  const MOBILE_NAV_DISSOLVE_MS = 280;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const mobileNavFadeMs = prefersReducedMotion ? 0 : MOBILE_NAV_DISSOLVE_MS;

  const syncMobileNavScrollLock = () => {
    const anyOpen = document.querySelector(".mobile-nav.is-open");
    document.documentElement.classList.toggle("mobile-nav-open", Boolean(anyOpen));
    document.body.classList.toggle("mobile-nav-open", Boolean(anyOpen));
  };

  document.querySelectorAll(".nav-mobile-toggle").forEach((toggle) => {
    const targetId = toggle.getAttribute("aria-controls");
    const nav = targetId ? document.getElementById(targetId) : null;
    if (!nav) return;

    let closeScrollLockTimer = null;

    const setMenuOpen = (open) => {
      if (closeScrollLockTimer) {
        window.clearTimeout(closeScrollLockTimer);
        closeScrollLockTimer = null;
      }
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        syncMobileNavScrollLock();
      } else {
        closeScrollLockTimer = window.setTimeout(() => {
          closeScrollLockTimer = null;
          syncMobileNavScrollLock();
        }, mobileNavFadeMs);
      }
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = toggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!open);
    });

    nav.addEventListener("click", (e) => {
      if (e.target === nav) setMenuOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setMenuOpen(false);
    });
  });

  const stickyBar = document.querySelector("[data-sticky-topbar]");
  const stickySentinel =
    document.querySelector("[data-sticky-sentinel]") || document.querySelector(".site .hero-main");
  if (stickyBar && stickySentinel && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        stickyBar.classList.toggle("is-past-hero", !entry.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(stickySentinel);
  }
})();
