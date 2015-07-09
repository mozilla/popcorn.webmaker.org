# Webmaker Login UX

Webmaker Login UX enables developers to implement a consitent login/logout and signup
flow for webmaker across different websites and apps. This is acheived through the use
of an adapter that handles implementation specific details (modal dialog handling,
angular JS style directive implementation), while the common parts of theimplementation
(state, request handling, analytics, etc) are handled by a core library.

The adapter and all of the dependencies (JS, HTML templates) are built using Browserify
into one package that can be included into the target application's build system. Custom CSS to
override Makerstrap styles are also included and should be imported into the target application.

## Installation

```
bower install mozilla/webmaker-login-ux
```

## Angular Adapter Usage
1. Add makerstap in your head `<link rel="stylesheet" href="bower_components/makerstrap/dist/makerstrap.complete.min.css">`. There are other ways to do this -- see the makerstrap docs.
2. Add webmaker-login-ux css: `<link rel="stylesheet" href="bower_components/webmaker-login-ux/dist/css/webmakerLogin.css">`.
3. The app must define `window.angularConfig` as an object, and specify a `csrfToken` attribute.
4. Make sure `angular.js`, `ui-bootstrap`, `ngWebmakerLogin.js` and `ngWebmakerLogin.templates.js` are all added to your document.
5. Add the `ngWebmakerLogin` module to your angular app.

### ngWebmakerLogin Directives

#### wm-join-webmaker

Configures the join webmaker modal to display when the element it is used on is clicked:

```html
<button wm-join-webmaker showcta="true">
</button>
```

Use the `showcta` attribute to define whether or not the welcome to webmaker CTA's should display after an account is created.

#### wm-signin

Configures the signin modal to display when the element it is used on is clicked
```html
<button wm-signin disablepersona="true">
</button>
```

Use the `disablepersona` attribute to disable login via Persona. (Defaults to `false`).

#### wm-password-reset

Configures the password reset modal to display when the page is loaded with the `resetCode` and `uid`
search parameters in the url:

```html
<div wm-password-reset></div>
```

#### wm-logout

Confugures the element it is applied to to trigger a logout when it is clicked.

```html
<button wm-logout></button>
```

## Plain JS Adapter Usage
1. Add makerstrap to your app: `<link rel="stylesheet" href="bower_components/makerstrap/dist/makerstrap.complete.min.css"`. There are other ways to do this -- see the makerstrap docs.
2. Add webmaker-login-ux css: `<link rel="stylesheet" href="bower_components/webmaker-login-ux/dist/css/webmakerLogin.css">`.
3. Add webmaker-login-ux js: `<script src="bower_components/webmaker-login-ux/dist/min/webmakerLogin.min.js">`.

### API

#### Constructor

First you need to create an instance of the WebmakerLogin client:

```javascript
var auth = new window.WebmakerLogin({
  csrfToken: 'csrf', // optional csrf token
  showCTA: true // Show a random CTA after signing up for a new account. true/false,
  disablePersona: false // Disable login with persona? true/false
});
```

#### `verified` Event

After you initialize the client, the `verified` event will be emitted after checking the webmaker-login cookie for user data.
If the user is signed-in, then the callback will return an object representing the user.
If the user is signed-out, then the callback will return nothing.

```javascript
auth.on('verified', function(user) {
  if (user) {
    console.log('%s is signed-in', user.username);
  } else {
    console.log('signed-out');
  }
});
```

#### Create Account

Initiates the account creation process.

```javascript
auth.create(email_hint, username_hint);
```

* email_hint is an optional parameter to pre-fill the email address for account creation
* username_hint is an optional parameter to pre-fill the username for account creation

#### Login

Initiates the account sign-in process.

```javascript
auth.login(userid_hint);
```

* userid_hint is an optional parameter to pre-fill the user id for account login

#### `login` Event

After you call `create()` or `login()` and the user finishes either process, the client will emit a `login` event with the signed-in users data.

```javascript
auth.on('login', function(user) {
  console.log('%s is signed-in', user.username);
});
```

#### Logout

Initiates the account sign-out process.

```javascript
auth.logout();
```

#### `logout` Event

After you call `logout()` and the client has successfully cleared the webmaker-login cookie, the client will emit a `logout` event.

```javascript
auth.on('logout', function() {
  console.log('signed-out');
});
```

## Development

If you run `grunt dev`, all files and folders will be watched and automatically compiled.
A test server will also be launched at http://localhost:4321 where you can test out the modal dialogs
with fake data.

Angular adapter test page: [http://localhost:4321/](http://localhost:4321/)

Plain JavaScript adapter test page: [http://localhost:4321/plain](http://localhost:4321/plain)

### Sign In Options:

|uid|token/password|result|
|-----|-----|------|
|user OR user@webmaker.org|"token"|successfully logged in (modal closes, ui won't update, too much work)|
|user OR user@webmaker.org|Anything not token|401 reponse from server|
|error@webmaker.org|{Anything}|Server returns a 500 response|
|ratelimit OR ratelimit@webmaker.org|Anything|Server returns a 429 response|
|{any valid email or username}|N/A|User not found, asks if you want to create an account|
|{anything that's not a valid email or username}|N/A|"that doesn't look like an email or username"|
|pass OR pass@webmaker.org|topsecret|successfully logged in (modal closes, ui won't update, too much work)|
|pass OR pass@webmaker.org|{anything else}|401 response from server|
|passfail OR passfail@webmaker.org|{anything}|500 response from server|

### Join Webmaker Options:

|uid|username|result|
|-----|-----|------|
|Any|Any|Welcome to Webmaker modal view|
|Any|"taken"|Username already taken error|
|Any|"failCreate"|500 response from server|

### Password reset

Add `?uid=user&resetCode=topsecretcode` to the url to trigger the password reset flow.
Change the values of uid and resetCode to cause a failed reset request.
