import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { jwtDecode } from 'jwt-decode';
import { publicPaths } from './app/utils/publicRoutes';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const pathname = request.nextUrl.pathname;

  

  // Verificar si el token es válido
  let isTokenValid = false;
  if (token) {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // en segundos
      isTokenValid = decoded.exp > currentTime;
    } catch (error) {
      // El token no se pudo decodificar o está mal formado
      isTokenValid = false;
    }
  }

  // ✅ Si tiene un token válido e intenta entrar a login o register → redirigir a home
  if (isTokenValid && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ Si NO tiene token válido y está intentando entrar a una ruta que NO es pública → redirigir a login
  if (!isTokenValid && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ En todos los demás casos → seguir con intlMiddleware
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
