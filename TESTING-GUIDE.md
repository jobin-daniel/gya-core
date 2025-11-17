# MySQL Authentication Testing Guide

## Prerequisites

1. **MySQL Database Setup**
   - Database: `gya_db` should be running
   - Tables: `users`, `userroles`, `userrolemappings` should exist with data
   - User passwords should be bcrypt hashed

2. **Environment Configuration**
   - Update `.env` file with your MySQL password:
     ```
     DB_PASSWORD=your_actual_mysql_password
     ```

## Step-by-Step Testing

### Step 1: Configure Environment

```bash
# Open .env file and update the password
# Replace YOUR_PASSWORD_HERE with your actual MySQL password
nano .env
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Check Database Connection

Look for this message in the console:
```
✅ MySQL Database connected successfully
```

If you see an error, verify:
- MySQL is running
- Database credentials are correct
- Database `gya_db` exists

### Step 4: Test Admin Login

1. Open browser: `http://localhost:3000`
2. Click "Login" button
3. Enter Admin user credentials:
   - Email: (your admin user email from database)
   - Password: (your admin user password)
4. Click "Login"

**Expected Result**: 
- Login successful
- Redirected to admin home page
- Console shows: `✅ User found`, `✅ Password verified`, `✅ Role verified: Admin`

### Step 5: Test SuperAdmin Login

1. Logout (if logged in)
2. Click "Login" button
3. Enter SuperAdmin user credentials:
   - Email: (your superadmin user email from database)
   - Password: (your superadmin user password)
4. Click "Login"

**Expected Result**: 
- Login successful
- Console shows: `✅ Role verified: SuperAdmin`

### Step 6: Test Non-Admin User Rejection

1. Logout (if logged in)
2. Click "Login" button
3. Enter credentials for a user WITHOUT Admin/SuperAdmin role
4. Click "Login"

**Expected Result**: 
- Login fails with error message
- Error: "Access denied. Only Admin and SuperAdmin users can login."
- Console shows: `❌ Insufficient permissions. User role: [role_name]`

### Step 7: Test Invalid Credentials

1. Click "Login" button
2. Enter invalid email or wrong password
3. Click "Login"

**Expected Result**: 
- Login fails with error message
- Error: "Invalid credentials"
- Console shows: `❌ User not found` or `❌ Invalid password`

### Step 8: Test Middleware Protection

1. Logout (if logged in)
2. Try to access a protected route directly: `http://localhost:3000/admin-home`

**Expected Result**: 
- Redirected to `/unauthorized` page
- Console shows: `❌ No token found in cookies`

### Step 9: Test Role-Based Middleware

1. If you have a way to manually create a token with a non-admin role:
   - Set the token cookie
   - Try to access protected routes

**Expected Result**: 
- Redirected to `/unauthorized` page
- Console shows: `❌ Insufficient permissions for: [path] User role: [role]`

## Console Logs Reference

### Successful Login Flow
```
🔐 Login attempt: { email: 'admin@example.com', mobile: 'N/A' }
🔍 Looking up user by email: admin@example.com
✅ User found: { id: 1, email: 'admin@example.com', role: 'Admin' }
✅ Password verified
✅ Role verified: Admin
🔐 Token generated for user: admin@example.com
✅ Cookie set successfully for: admin@example.com
```

### Failed Login - Wrong Password
```
🔐 Login attempt: { email: 'admin@example.com', mobile: 'N/A' }
🔍 Looking up user by email: admin@example.com
✅ User found: { id: 1, email: 'admin@example.com', role: 'Admin' }
❌ Invalid password
```

### Failed Login - Insufficient Permissions
```
🔐 Login attempt: { email: 'user@example.com', mobile: 'N/A' }
🔍 Looking up user by email: user@example.com
✅ User found: { id: 2, email: 'user@example.com', role: 'User' }
✅ Password verified
❌ Insufficient permissions. User role: User
```

### Middleware Protection
```
❌ No token found in cookies for: /admin-home
```

```
✅ Access granted for: /admin-home User: admin@example.com Role: Admin
```

## Troubleshooting

### Database Connection Failed

**Error**: `❌ MySQL Database connection failed: Access denied for user`

**Solution**: 
- Check DB_PASSWORD in .env file
- Verify MySQL user has correct permissions
- Ensure MySQL is running

### User Not Found

**Error**: `❌ User not found`

**Solution**: 
- Verify user exists in `users` table
- Check email/mobile spelling
- Ensure database has data

### Password Verification Failed

**Error**: `❌ Invalid password`

**Solution**: 
- Verify password is correct
- Ensure passwords in database are bcrypt hashed
- Check if bcrypt hash format is correct

### Role Not Found

**Error**: `❌ Insufficient permissions. User role: null`

**Solution**: 
- Check `userrolemappings` table has entry for the user
- Verify `userroles` table has "Admin" or "SuperAdmin" roles
- Ensure JOIN query is working correctly

### Token Issues

**Error**: `❌ Invalid token`

**Solution**: 
- Clear browser cookies
- Check JWT_SECRET is consistent
- Verify token hasn't expired (24 hours)

## Database Query Testing

You can test the database queries directly in MySQL:

```sql
-- Test user lookup with role
SELECT 
  u.id,
  u.name,
  u.email,
  u.mobile,
  u.password,
  ur.role_name as role
FROM users u
LEFT JOIN userrolemappings urm ON u.id = urm.user_id
LEFT JOIN userroles ur ON urm.role_id = ur.id
WHERE u.email = 'admin@example.com';

-- Check all users with their roles
SELECT 
  u.email,
  ur.role_name
FROM users u
LEFT JOIN userrolemappings urm ON u.id = urm.user_id
LEFT JOIN userroles ur ON urm.role_id = ur.id;

-- Verify role names
SELECT * FROM userroles;
```

## Security Checklist

- [x] Passwords are bcrypt hashed in database
- [x] JWT tokens expire after 24 hours
- [x] Cookies are httpOnly (not accessible via JavaScript)
- [x] Only Admin and SuperAdmin can login
- [x] Middleware protects all routes
- [x] SQL injection prevented with parameterized queries
- [x] .env file is in .gitignore

## Next Steps After Testing

1. **Production Deployment**:
   - Generate strong JWT_SECRET
   - Use environment variables for all sensitive data
   - Enable HTTPS for secure cookies
   - Set up proper database backup

2. **Additional Features**:
   - Password reset functionality
   - Session management
   - Audit logging
   - Rate limiting for login attempts

3. **Monitoring**:
   - Set up error tracking
   - Monitor failed login attempts
   - Track database performance
