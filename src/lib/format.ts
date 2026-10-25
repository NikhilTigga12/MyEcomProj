const LOCALE_MAP: Record<string, { locale: string; currency: string }> = {
  'pt-BR': { locale: 'pt-BR', currency: 'BRL' },
  en: { locale: 'en-US', currency: 'USD' },
  es: { locale: 'es-ES', currency: 'EUR' },
}

/** Format a price respecting the active i18n language. */
export function formatPrice(value: number, lang = 'pt-BR'): string {
  const cfg = LOCALE_MAP[lang] ?? LOCALE_MAP['pt-BR']
  return new Intl.NumberFormat(cfg.locale, {
    style: 'currency',
    currency: cfg.currency,
  }).format(value)
}

/** Percentage discount between an old and current price. */
export function discountPercent(price: number, priceOld?: number): number {
  if (!priceOld || priceOld <= price) return 0
  return Math.round(((priceOld - price) / priceOld) * 100)
}
