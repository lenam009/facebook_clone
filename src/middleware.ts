// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/home')) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
// }
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ['/home'],
// };

import { withAuth } from 'next-auth/middleware';

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/login',
    },
});

export const config = { matcher: ['/profile', '/profile/:slug', '/'] };
