import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'JPY';

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.53,
  CAD: 1.36,
  JPY: 149.5,
};

const symbols: Record<Currency, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '\u00A5',
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (priceUsd: number) => string;
  convertRaw: (priceUsd: number) => number;
  getRate: () => number;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convert = useCallback((priceUsd: number) => {
    const converted = priceUsd * rates[currency];
    if (currency === 'JPY') {
      return `${symbols[currency]}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbols[currency]}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [currency]);

  const convertRaw = useCallback((priceUsd: number) => {
    return priceUsd * rates[currency];
  }, [currency]);

  const getRate = useCallback(() => rates[currency], [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, convertRaw, getRate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
