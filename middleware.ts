import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh the session - IMPORTANT: do not remove this
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    if (isAdminRoute) {
        // If not logged in and trying to access admin (but not login page), redirect to login
        if (!user && !isLoginPage) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }

        // If logged in and on login page, redirect to admin dashboard
        if (user && isLoginPage) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/admin/:path*"],
};
