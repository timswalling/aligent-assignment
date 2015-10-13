# Front-end web development assignment from Aligent Consulting #

A simple responsive page with sticky navigation menu.

- Passes [W3 validation](https://validator.w3.org/nu/?doc=http%3A%2F%2Fwww.timswalling.com%2Fdev%2Faligent%2Fassignment)
- Scores highly in Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fwww.timswalling.com%2Fdev%2Faligent%2Fassignment), even without server-side optimisation

[View the live demo](http://www.timswalling.com/dev/aligent/assignment).

## Quick start ##

1. Put the contents of the `public` folder on a web server.
2. Enjoy.

## Customisation

This project uses [Mustache](http://mustache.github.io/) templating, CSS compiled from [Sass](http://sass-lang.com/), along with numerous optimisation techniques. If you want to customise any of the code, you should:

1. Install [Node.js](https://nodejs.org/en/)
2. Run `npm install --global gulp` to install [Gulp](http://gulpjs.com/) globally
3. Run `npm install` to install all the necessary dependencies, including a local version of Gulp
4. Run `gulp` to test your changes
5. Run `gulp build --production` to recompile the `public` folder
