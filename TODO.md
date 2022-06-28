# Tasks

## Initial Setup
1. Initialize project.
    * npm init --yes
    * install dependencies / nodemon, express, express-handlebars, bcrypt, jsonwebtoken, cookie-parser /
    * Modify package.json
2. Add resources. - html, css, views, images

3. Express config.
    * body parser.
    * static path
4. Configure express-handlebars.
5. Add router.
6. Add home controller.
7. Setup layouts.
8. Add home view/template.
9. Fix static/public assets and paths.

## Database setup
1. Install mongoose.
2. Configure mongoose.
3. Create User model.

## Authentication
1. Add auth controller.
2. Add login and register pages.
    * modify hrefs in navigation.
    * modify names in forms.
3. Add post login and register actions.
4. Create user with register.
5. Hash password.
6. Login functionality.
    * Login action.
    * Login service method. / find user, validate password /
    * generate JWT token. / payload, use secret, set expiration /
7. Logout functionality.

## Authorization
1. Auth middleware.
    * use http only cookie
2. Navigation show/hide.
3. Route guards.
4. Add 404 page.
5. User validation.
6. global error handling. 

## Notifications
1. Add notification element to layout.

## Error-handling
1. Add error mapper/handler.