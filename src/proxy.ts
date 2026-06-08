import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Run next-intl middleware to handle localization routing
  const response = intlMiddleware(request);

  // 2. Initialize Supabase client to sync cookies and refresh auth session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Refresh user session dynamically
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Route protection for /admin
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/");
  const isLocale = segments[1] === "id" || segments[1] === "en";
  const baseSegment = isLocale ? segments[2] : segments[1];
  const restSegments = isLocale ? segments.slice(3) : segments.slice(2);

  const isAdminRoute = baseSegment === "admin";
  const isLoginRoute = isAdminRoute && restSegments[0] === "login";

  if (isAdminRoute) {
    const currentLocale = isLocale ? segments[1] : "id";
    if (!user && !isLoginRoute) {
      // Redirect unauthenticated user to login screen
      const loginUrl = new URL(`/${currentLocale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
    if (user && isLoginRoute) {
      // Redirect authenticated user to admin dashboard
      const adminUrl = new URL(`/${currentLocale}/admin`, request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return response;
}

export const config = {
  // Intercept all routes except internal files & common static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
