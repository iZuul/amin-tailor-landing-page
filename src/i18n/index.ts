// i18n - Internationalization System for Amin Tailor

import idTranslations from "./id.json";
import enTranslations from "./en.json";

const TRANSLATION_MAP: Record<string, Record<string, any>> = {
  id: idTranslations,
  en: enTranslations,
};

export type Locale = "id" | "en";

const SUPPORTED_LOCALES: Locale[] = ["id", "en"];
const DEFAULT_LOCALE: Locale = "id";
const STORAGE_KEY = "amin-tailor-locale";

let currentLocale: Locale = DEFAULT_LOCALE;
let translations: Record<string, any> = {};

export function getCurrentLocale(): Locale {
  return currentLocale;
}

export function getSupportedLocales(): Locale[] {
  return SUPPORTED_LOCALES;
}

export function getDefaultLocale(): Locale {
  return DEFAULT_LOCALE;
}

export function t(key: string): string {
  const keys = key.split(".");
  let value: any = translations;
  for (const k of keys) {
    if (value === undefined || value === null) return key;
    value = value[k];
  }
  return value ?? key;
}

async function loadTranslations(locale: Locale): Promise<Record<string, any>> {
  return TRANSLATION_MAP[locale] || TRANSLATION_MAP[DEFAULT_LOCALE];
}

function applyTranslations() {
  document.documentElement.lang = currentLocale;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n")!;
    const value = t(key);
    if (value !== key) {
      el.innerHTML = value;
    }
  });

  // Fix GSAP-animated elements whose innerHTML was replaced
  // New child elements need inline visible styles to override CSS defaults
  document.querySelectorAll("[data-i18n] .str-line").forEach((el) => {
    (el as HTMLElement).style.transform = "translateY(0)";
    (el as HTMLElement).style.opacity = "1";
  });

  document.querySelectorAll("[data-i18n] .hero-word").forEach((el) => {
    (el as HTMLElement).style.transform = "translateY(0)";
    (el as HTMLElement).style.opacity = "1";
  });

  updateWhatsAppLinks();
  updatePageMeta();
}

function updateWhatsAppLinks() {
  const waText = encodeURIComponent(t("wa.text"));
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const suffix = el.getAttribute("data-wa") || "";
    (el as HTMLAnchorElement).href =
      `https://wa.me/6281548619166?text=${waText}${encodeURIComponent(suffix)}`;
  });
}

function updatePageMeta() {
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", t("meta.description"));
  document.title = t("meta.title");
}

export async function setLocale(locale: Locale): Promise<void> {
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  currentLocale = locale;
  translations = await loadTranslations(locale);
  localStorage.setItem(STORAGE_KEY, locale);
  applyTranslations();
  window.dispatchEvent(new CustomEvent("locale-changed", { detail: { locale } }));
}

export async function initI18n(): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  const browserLocale = navigator.language.split("-")[0] as Locale;

  const locale: Locale =
    stored && SUPPORTED_LOCALES.includes(stored)
      ? stored
      : SUPPORTED_LOCALES.includes(browserLocale)
        ? browserLocale
        : DEFAULT_LOCALE;

  await setLocale(locale);
}

export function getTranslations(): Record<string, any> {
  return translations;
}
