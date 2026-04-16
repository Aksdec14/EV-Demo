import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/partner/register(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            const signInUrl = new URL("/partner/register", req.url);
            return NextResponse.redirect(signInUrl);
        }
    }
});

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};