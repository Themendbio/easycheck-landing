'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children, translations }) {
    const [locale, setLocale] = useState('ko');

    // Load saved language preference from localStorage
    useEffect(() => {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
            setLocale(savedLocale);
        }
    }, []);

    // Save language preference to localStorage when it changes
    const changeLocale = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[locale];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // fallback to key if not found
            }
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
