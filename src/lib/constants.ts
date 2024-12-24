export const BASE_URL =
  process.env.VERCEL_ENV === 'development' ||
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'preview'
      ? `https://dev.dulapahv.dev`
      : 'https://dulapahv.dev';

export const NAME = 'Kantinan Saengprachathanarak';
export const SHORT_NAME = 'Kantinan';
export const SITE_NAME = 'Kantinan Portfolio';
export const DESCRIPTION = `Hello, I'm ${NAME}.`;
// export const LINKEDIN_URL = 'https://linkedin.com/in/dulapahv';

export const THEME_COLOR = '#fb568a';
