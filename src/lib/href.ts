// The design system's NavBar/Footer render plain <a> anchors, which (unlike
// next/navigation) are not auto-prefixed with the Pages basePath. Use withBase
// for any raw href so it works under the GitHub Pages project base path.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (href: string) => `${BASE}${href}`;
