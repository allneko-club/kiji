// Auth.jsのmiddleware https://authjs.dev/getting-started/session-management/protecting#nextjs-middleware
export { auth as middleware } from '@/auth';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
