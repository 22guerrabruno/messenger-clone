import { withAuth } from 'next-auth/middleware';

// You can use this middleware for pages that need authentication and protec them from unauthenticated users

export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: ['/users/:path*', '/conversations/:path*'],
};
