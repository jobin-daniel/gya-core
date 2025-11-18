# TODO: Add "Manage Employees" Page for Super Admins

## Tasks
- [x] Create `src/app/manage-employees/page.tsx` - Basic page with title only
- [x] Update `src/middleware.js` - Add route protection for `/manage-employees` (SuperAdmin only)
- [x] Update `src/app/admin-home/page.tsx` - Add conditional "Manage Employees" button in My Links section

## Testing
- [ ] Test access to `/manage-employees` as SuperAdmin
- [ ] Test access denied for Admin role
- [ ] Verify button appears only for SuperAdmin in Admin Home
