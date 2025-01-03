import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import {
  SITE_NAME,
  DESCRIPTION,
  NAME,
  SHORT_NAME,
  BASE_URL,
  THEME_COLOR,
} from '@/lib/constants';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: SHORT_NAME,
  referrer: 'origin-when-cross-origin',
  keywords: 'Kantinan, Kantinan Saengprachathanarak, Portfolio',
  authors: [
    {
      name: NAME,
      url: BASE_URL,
    },
  ],
  creator: NAME,
  publisher: NAME,
  openGraph: {
    title: SITE_NAME,
    url: BASE_URL,
    siteName: SITE_NAME,
    // images: [
    //   {
    //     url: `${ASSETS_URL}/ogp.png`,
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@kantinan',
  //   creator: '@kantinan',
  // },
  metadataBase: new URL(BASE_URL),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  // icons: {
  //   icon: [
  //     {
  //       url: '/images/favicon.ico',
  //       type: 'image/x-icon',
  //       sizes: 'any',
  //     },
  //     {
  //       url: '/images/favicon-16x16.png',
  //       type: 'image/png',
  //       sizes: '16x16',
  //     },
  //     {
  //       url: '/images/favicon-32x32.png',
  //       type: 'image/png',
  //       sizes: '32x32',
  //     },
  //     {
  //       url: '/images/favicon-96x96.png',
  //       type: 'image/png',
  //       sizes: '96x96',
  //     },
  //     {
  //       url: '/images/favicon-128x128.png',
  //       type: 'image/png',
  //       sizes: '128x128',
  //     },
  //     {
  //       url: '/images/favicon-196x196.png',
  //       type: 'image/png',
  //       sizes: '196x196',
  //     },
  //   ],
  //   apple: [
  //     { url: '/images/favicon-57x57.png', sizes: '57x57', type: 'image/png' },
  //     { url: '/images/favicon-60x60.png', sizes: '60x60', type: 'image/png' },
  //     { url: '/images/favicon-72x72.png', sizes: '72x72', type: 'image/png' },
  //     { url: '/images/favicon-76x76.png', sizes: '76x76', type: 'image/png' },
  //     {
  //       url: '/images/favicon-114x114.png',
  //       sizes: '114x114',
  //       type: 'image/png',
  //     },
  //     {
  //       url: '/images/favicon-120x120.png',
  //       sizes: '120x120',
  //       type: 'image/png',
  //     },
  //     {
  //       url: '/images/favicon-144x144.png',
  //       sizes: '144x144',
  //       type: 'image/png',
  //     },
  //     {
  //       url: '/images/favicon-152x152.png',
  //       sizes: '152x152',
  //       type: 'image/png',
  //     },
  //     {
  //       url: '/images/favicon-180x180.png',
  //       sizes: '180x180',
  //       type: 'image/png',
  //     },
  //   ],
  // },
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${BASE_URL}/feed.xml`,
  //   },
  // },
  other: {
    'msapplication-TileColor': THEME_COLOR,
    // 'msapplication-TileImage': '/images/mstile-144x144.png',
    // 'msapplication-square70x70logo': '/images/mstile-70x70.png',
    // 'msapplication-square150x150logo': '/images/mstile-150x150.png',
    // 'msapplication-wide310x150logo': '/images/mstile-310x150.png',
    // 'msapplication-square310x310logo': '/images/mstile-310x310.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  initialScale: 1,
  userScalable: true,
  minimumScale: 1,
  maximumScale: 5,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <main className="container max-w-4xl mx-auto py-12 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
