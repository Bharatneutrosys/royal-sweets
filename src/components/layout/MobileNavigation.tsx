"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { orderingUrl } from "@/lib/business";
import { classNames } from "@/lib/classNames";
import {
  isNavigationActive,
  menuCategories,
  siteLinks,
} from "@/lib/siteNavigation";

const drawerId = "mobile-navigation-dialog";
const categoryListId = "mobile-menu-categories";

export function MobileNavigation() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(true);
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => {
      if (desktopQuery.matches && dialogRef.current?.open) {
        restoreFocusRef.current = false;
        dialogRef.current.close();
      }
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  function openDrawer() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    restoreFocusRef.current = true;
    setCategoriesOpen(isNavigationActive(pathname, "/menu"));
    dialog.showModal();
    setIsOpen(true);
    closeButtonRef.current?.focus();
  }

  function closeDrawer(restoreFocus = true) {
    if (!dialogRef.current?.open) return;

    restoreFocusRef.current = restoreFocus;
    dialogRef.current.close();
  }

  function handleDialogClose() {
    setIsOpen(false);

    if (restoreFocusRef.current && triggerRef.current?.isConnected) {
      triggerRef.current.focus();
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById("site-brand-link")?.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== dialogRef.current) return;

    const bounds = dialogRef.current.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) closeDrawer();
  }

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={openDrawer}
        className="flex size-11 items-center justify-center rounded-control text-primary transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
      >
        <Menu aria-hidden="true" size={24} strokeWidth={1.75} />
      </button>

      <dialog
        ref={dialogRef}
        id={drawerId}
        aria-labelledby="mobile-navigation-title"
        onClose={handleDialogClose}
        onClick={handleBackdropClick}
        className="mobile-drawer"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
            <h2
              id="mobile-navigation-title"
              className="font-display text-2xl text-primary"
            >
              Navigation
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => closeDrawer()}
              className="flex size-11 items-center justify-center rounded-control text-primary transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
            >
              <X aria-hidden="true" size={24} strokeWidth={1.75} />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
          >
            <ul>
              {siteLinks.map(({ href, label }) => {
                const active = isNavigationActive(pathname, href);
                const linkClasses = classNames(
                  "flex min-h-12 items-center rounded-control px-3 font-body text-base font-semibold no-underline transition-colors duration-[var(--duration-fast)] hover:bg-secondary",
                  active ? "bg-secondary text-primary" : "text-foreground",
                );

                if (href === "/menu") {
                  return (
                    <li key={href} className="border-b border-border py-1">
                      <div className="flex items-center gap-1">
                        <Link
                          href={href}
                          aria-current={
                            pathname === href && !categoriesOpen
                              ? "page"
                              : undefined
                          }
                          onClick={() => closeDrawer(false)}
                          className={classNames(linkClasses, "min-w-0 flex-1")}
                        >
                          {label}
                        </Link>
                        <button
                          type="button"
                          aria-label={
                            categoriesOpen
                              ? "Hide menu categories"
                              : "Show menu categories"
                          }
                          aria-expanded={categoriesOpen}
                          aria-controls={categoryListId}
                          onClick={() => setCategoriesOpen(!categoriesOpen)}
                          className="flex size-11 shrink-0 items-center justify-center rounded-control text-primary transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            size={20}
                            strokeWidth={1.75}
                            className={classNames(
                              "transition-transform duration-[var(--duration-fast)]",
                              categoriesOpen && "rotate-180",
                            )}
                          />
                        </button>
                      </div>
                      <ul
                        id={categoryListId}
                        hidden={!categoriesOpen}
                        className="mb-2 ml-3 border-l border-border pl-3"
                      >
                        {menuCategories.map(
                          ({ href: categoryHref, label: categoryLabel }) => (
                            <li key={categoryHref}>
                              <Link
                                href={categoryHref}
                                aria-current={
                                  pathname === categoryHref ? "page" : undefined
                                }
                                onClick={() => closeDrawer(false)}
                                className={classNames(
                                  "flex min-h-11 items-center rounded-control px-3 py-2 font-body text-sm leading-snug no-underline transition-colors duration-[var(--duration-fast)] hover:bg-secondary",
                                  pathname === categoryHref
                                    ? "bg-secondary font-semibold text-primary"
                                    : "text-foreground",
                                )}
                              >
                                {categoryLabel}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={href} className="border-b border-border py-1">
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      onClick={() => closeDrawer(false)}
                      className={linkClasses}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-border bg-background px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <ButtonLink
              href={orderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order Online (opens in a new tab)"
              prefetch={false}
              fullWidth
              onClick={() => closeDrawer(false)}
            >
              Order Online
            </ButtonLink>
          </div>
        </div>
      </dialog>
    </div>
  );
}
