/*  This file includes all our config for gulp
*/

// Initialize modules, importing all npm packages that we just installed so we can access them.
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Use dart-sass for @use - setting the sass compiler to use dart-sass
// sass.compiler = require('dart-sass');

// Sass Task - compile sass and js files. It runs multiple things using the "pipe" function to run them one after the other.
function scssTask() {
    // takes the main style.scss file. Sourcemaps generate an extra file, and when you inspect the styles on the browser it will tell you the original sass file and location where it came from. Makes it easier to debug and see where some style rule is coming from.
    return src('app/scss/style.scss', { sourcemaps : true})
    .pipe(sass()) // compile the sass to css
    .pipe(postcss([autoprefixer(), cssnano()])) // run the plugins
    .pipe(dest('dist', {sourcemaps: '.'})); // set the destination of the final compiled CSS file.
}

// JavaScript Task
function jsTask() {
    // takes the main script.js file, setting sourcemaps to generate the extra file.
    return src('app/js/script.js', { sourcemaps: true })
    // run Babel to make modern code like ES6 have support with older browsers
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser()) // minify JS file
    .pipe(dest('dist', { sourcemaps: '.'})); // setting the destination of the compiled files
}

// Browsersync
// spins up a local server and syncs it to the files so every time we make a change it automatically refreshes the site.
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
  }

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
      ['app/scss/**/*.scss', 'app/**/*.js'],
      series(scssTask, jsTask, browserSyncReload)
    );
  }

// Default Gulp Task
// this is what Gulp runs when you type "gulp" on the command line
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);