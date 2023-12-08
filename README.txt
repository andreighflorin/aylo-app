For installing the project dependencies, first need to run npm install.

For updating the tracker steps, you can:

1. add in the URL parameter ?step=${number-for-step}:

Example: ?step=1, ?step=2, ?step=3, ?step=4, ?step=5, ?step=6

2. in devtools run the function init() with step number:

Example: init(1), init(2), init(3), init(4), init(5), init(6)

With npm run build you can create the minified js and css files, ready for production.

On purpose, the code is loading the unminify version of app.js at the beginning because after minify JS is changing function names as well and you can't run init(number) in devtools.

Since this was part of the requirements I decided to keep it this way.