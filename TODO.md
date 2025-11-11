# TODO: Add JWT Authentication

- [x] Create src/lib/auth.js: Utility for JWT sign, verify, decode, and getAuthHeader.
- [x] Create src/app/api/auth/login/route.js: Handle POST for login, simulate user check, return JWT, with CORS.
- [x] Create src/app/api/auth/me/route.js: Protected endpoint, verify JWT, return user.
- [x] Update src/app/components/LoginModal.tsx: Add state for error, handle submit to POST to /api/auth/login, store token in localStorage, show error.
- [x] Create src/middleware.js: Protect internal API routes by checking Bearer token.
