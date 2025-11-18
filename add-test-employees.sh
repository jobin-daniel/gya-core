#!/bin/bash

# Script to add 15 test employees
# Replace eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc with the actual JWT token from cookies.txt

echo "Adding 15 test employees..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=John" \
  -F "middleName=Robert" \
  -F "lastName=Smith" \
  -F "houseNumber=123" \
  -F "addressLine1=Main Street" \
  -F "addressLine2=Downtown" \
  -F "district=Central District" \
  -F "state=California" \
  -F "postalCode=90210" \
  -F "email=john.smith@example.com" \
  -F "phoneNumber=919876543210" \
  -F "emergencyContact=919876543211" \
  -F "yearsOfExp=5" \
  -F "password=Test@123" \
  -F "dob=15/05/1985" \
  -F "joiningDate=01/01/2024" \
  -F 'roles=["Admin"]'

echo "Employee 1 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Sarah" \
  -F "middleName=Jane" \
  -F "lastName=Johnson" \
  -F "houseNumber=456" \
  -F "addressLine1=Oak Avenue" \
  -F "addressLine2=Suburb" \
  -F "district=North District" \
  -F "state=New York" \
  -F "postalCode=10001" \
  -F "email=sarah.johnson@example.com" \
  -F "phoneNumber=919876543212" \
  -F "emergencyContact=919876543213" \
  -F "yearsOfExp=3" \
  -F "password=Test@123" \
  -F "dob=20/08/1990" \
  -F "joiningDate=15/02/2024" \
  -F 'roles=["Institute RM"]'

echo "Employee 2 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Michael" \
  -F "middleName=David" \
  -F "lastName=Brown" \
  -F "houseNumber=789" \
  -F "addressLine1=Pine Road" \
  -F "addressLine2=Residential Area" \
  -F "district=South District" \
  -F "state=Texas" \
  -F "postalCode=75001" \
  -F "email=michael.brown@example.com" \
  -F "phoneNumber=919876543214" \
  -F "emergencyContact=919876543215" \
  -F "yearsOfExp=7" \
  -F "password=Test@123" \
  -F "dob=10/12/1982" \
  -F "joiningDate=01/03/2024" \
  -F 'roles=["Student RM"]'

echo "Employee 3 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Emily" \
  -F "middleName=Grace" \
  -F "lastName=Davis" \
  -F "houseNumber=321" \
  -F "addressLine1=Elm Street" \
  -F "addressLine2=Business District" \
  -F "district=East District" \
  -F "state=Florida" \
  -F "postalCode=33101" \
  -F "email=emily.davis@example.com" \
  -F "phoneNumber=919876543216" \
  -F "emergencyContact=919876543217" \
  -F "yearsOfExp=4" \
  -F "password=Test@123" \
  -F "dob=25/03/1988" \
  -F "joiningDate=15/03/2024" \
  -F 'roles=["Admin","Institute RM"]'

echo "Employee 4 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=David" \
  -F "middleName=William" \
  -F "lastName=Wilson" \
  -F "houseNumber=654" \
  -F "addressLine1=Cedar Lane" \
  -F "addressLine2=Industrial Area" \
  -F "district=West District" \
  -F "state=Illinois" \
  -F "postalCode=60601" \
  -F "email=david.wilson@example.com" \
  -F "phoneNumber=919876543218" \
  -F "emergencyContact=919876543219" \
  -F "yearsOfExp=6" \
  -F "password=Test@123" \
  -F "dob=05/07/1983" \
  -F "joiningDate=01/04/2024" \
  -F 'roles=["Student RM","Institute RM"]'

echo "Employee 5 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Jessica" \
  -F "middleName=Marie" \
  -F "lastName=Garcia" \
  -F "houseNumber=987" \
  -F "addressLine1=Maple Drive" \
  -F "addressLine2=Shopping Center" \
  -F "district=Central District" \
  -F "state=Arizona" \
  -F "postalCode=85001" \
  -F "email=jessica.garcia@example.com" \
  -F "phoneNumber=919876543220" \
  -F "emergencyContact=919876543221" \
  -F "yearsOfExp=2" \
  -F "password=Test@123" \
  -F "dob=12/11/1992" \
  -F "joiningDate=15/04/2024" \
  -F 'roles=["Admin"]'

echo "Employee 6 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Christopher" \
  -F "middleName=James" \
  -F "lastName=Martinez" \
  -F "houseNumber=147" \
  -F "addressLine1=Birch Street" \
  -F "addressLine2=Residential" \
  -F "district=North District" \
  -F "state=Washington" \
  -F "postalCode=98101" \
  -F "email=christopher.martinez@example.com" \
  -F "phoneNumber=919876543222" \
  -F "emergencyContact=919876543223" \
  -F "yearsOfExp=8" \
  -F "password=Test@123" \
  -F "dob=30/01/1980" \
  -F "joiningDate=01/05/2024" \
  -F 'roles=["Institute RM"]'

echo "Employee 7 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Amanda" \
  -F "middleName=Rose" \
  -F "lastName=Anderson" \
  -F "houseNumber=258" \
  -F "addressLine1=Spruce Avenue" \
  -F "addressLine2=Commercial Area" \
  -F "district=South District" \
  -F "state=Colorado" \
  -F "postalCode=80201" \
  -F "email=amanda.anderson@example.com" \
  -F "phoneNumber=919876543224" \
  -F "emergencyContact=919876543225" \
  -F "yearsOfExp=5" \
  -F "password=Test@123" \
  -F "dob=18/09/1987" \
  -F "joiningDate=15/05/2024" \
  -F 'roles=["Student RM"]'

echo "Employee 8 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Daniel" \
  -F "middleName=Thomas" \
  -F "lastName=Taylor" \
  -F "houseNumber=369" \
  -F "addressLine1=Willow Road" \
  -F "addressLine2=Tech Park" \
  -F "district=East District" \
  -F "state=Georgia" \
  -F "postalCode=30301" \
  -F "email=daniel.taylor@example.com" \
  -F "phoneNumber=919876543226" \
  -F "emergencyContact=919876543227" \
  -F "yearsOfExp=9" \
  -F "password=Test@123" \
  -F "dob=22/04/1978" \
  -F "joiningDate=01/06/2024" \
  -F 'roles=["Admin","Student RM"]'

echo "Employee 9 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Rachel" \
  -F "middleName=Elizabeth" \
  -F "lastName=Thomas" \
  -F "houseNumber=741" \
  -F "addressLine1=Oak Lane" \
  -F "addressLine2=University Area" \
  -F "district=West District" \
  -F "state=Michigan" \
  -F "postalCode=48101" \
  -F "email=rachel.thomas@example.com" \
  -F "phoneNumber=919876543228" \
  -F "emergencyContact=919876543229" \
  -F "yearsOfExp=3" \
  -F "password=Test@123" \
  -F "dob=14/06/1991" \
  -F "joiningDate=15/06/2024" \
  -F 'roles=["Institute RM","Student RM"]'

echo "Employee 10 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Kevin" \
  -F "middleName=Patrick" \
  -F "lastName=Hernandez" \
  -F "houseNumber=852" \
  -F "addressLine1=Pine Street" \
  -F "addressLine2=Medical District" \
  -F "district=Central District" \
  -F "state=Ohio" \
  -F "postalCode=44101" \
  -F "email=kevin.hernandez@example.com" \
  -F "phoneNumber=919876543230" \
  -F "emergencyContact=919876543231" \
  -F "yearsOfExp=6" \
  -F "password=Test@123" \
  -F "dob=08/02/1984" \
  -F "joiningDate=01/07/2024" \
  -F 'roles=["Admin"]'

echo "Employee 11 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Lauren" \
  -F "middleName=Nicole" \
  -F "lastName=Moore" \
  -F "houseNumber=963" \
  -F "addressLine1=Cedar Drive" \
  -F "addressLine2=Entertainment District" \
  -F "district=North District" \
  -F "state=Nevada" \
  -F "postalCode=89101" \
  -F "email=lauren.moore@example.com" \
  -F "phoneNumber=919876543232" \
  -F "emergencyContact=919876543233" \
  -F "yearsOfExp=4" \
  -F "password=Test@123" \
  -F "dob=27/10/1989" \
  -F "joiningDate=15/07/2024" \
  -F 'roles=["Student RM"]'

echo "Employee 12 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Brian" \
  -F "middleName=Joseph" \
  -F "lastName=Jackson" \
  -F "houseNumber=159" \
  -F "addressLine1=Elm Avenue" \
  -F "addressLine2=Financial District" \
  -F "district=South District" \
  -F "state=Massachusetts" \
  -F "postalCode=02101" \
  -F "email=brian.jackson@example.com" \
  -F "phoneNumber=919876543234" \
  -F "emergencyContact=919876543235" \
  -F "yearsOfExp=10" \
  -F "password=Test@123" \
  -F "dob=03/12/1975" \
  -F "joiningDate=01/08/2024" \
  -F 'roles=["Institute RM"]'

echo "Employee 13 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Stephanie" \
  -F "middleName=Ann" \
  -F "lastName=White" \
  -F "houseNumber=357" \
  -F "addressLine1=Birch Lane" \
  -F "addressLine2=Arts District" \
  -F "district=East District" \
  -F "state=Oregon" \
  -F "postalCode=97201" \
  -F "email=stephanie.white@example.com" \
  -F "phoneNumber=919876543236" \
  -F "emergencyContact=919876543237" \
  -F "yearsOfExp=7" \
  -F "password=Test@123" \
  -F "dob=16/08/1981" \
  -F "joiningDate=15/08/2024" \
  -F 'roles=["Admin","Institute RM"]'

echo "Employee 14 added..."

curl -X POST http://localhost:3000/api/employees \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGd5YS5jb20iLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTc2MzQ3NjQ1MSwiZXhwIjoxNzYzNTYyODUxfQ.0aDCyChGt_FkCj1_90gL5EQA8ppE0kNyIgsnHn-SDkc" \
  -F "firstName=Matthew" \
  -F "middleName=Ryan" \
  -F "lastName=Harris" \
  -F "houseNumber=468" \
  -F "addressLine1=Spruce Road" \
  -F "addressLine2=Sports Complex" \
  -F "district=West District" \
  -F "state=Pennsylvania" \
  -F "postalCode=19101" \
  -F "email=matthew.harris@example.com" \
  -F "phoneNumber=919876543238" \
  -F "emergencyContact=919876543239" \
  -F "yearsOfExp=5" \
  -F "password=Test@123" \
  -F "dob=09/04/1986" \
  -F "joiningDate=01/09/2024" \
  -F 'roles=["Student RM","Institute RM"]'

echo "Employee 15 added..."

echo "All 15 test employees added successfully!"
