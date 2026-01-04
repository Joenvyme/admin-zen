import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'de', 'en'],

  // Used when no locale matches
  defaultLocale: 'fr',

  // The `pathnames` object holds pairs of internal and
  // external pathnames. Based on the locale, the
  // internal pathnames are rewritten to the shared,
  // external pathnames in the URL.
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]'
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

