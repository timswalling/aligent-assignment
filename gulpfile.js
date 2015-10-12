'use strict';

var argv = require('yargs').argv,   // Pass agruments using the command line
    autoprefixer = require('gulp-autoprefixer'),    // Add vendor prefixes to CSS
    autoprefixerOptions,
    browserSync = require('browser-sync').create(),     // Automatically refresh the browser
    concat = require('gulp-concat'),    // Combine simple JavaScript files
    del = require('del'),   // Delete unwanted files and folders (eg public before production build)
    gulp = require('gulp'),
    gulpif = require('gulp-if'),  // Conditionally apply transformations based on command line argument. Used in conjuction with yargs and multipipe
    htmlmin = require('gulp-html-minifier'),
    htmlminOptions,
    imagemin = require('gulp-imagemin'),    // Optimise images
    imageminOptions,
    jsList,   // List of JavaScripts to combine
    minifyCss = require('gulp-minify-css'),     // Minify CSS
    minifyCssOptions,
    mustache = require('gulp-mustache-plus'),
    mustacheData,
    mustachePartials,
    paths,  // Frequently used file paths
    pipe = require('multipipe'),    // Used in conjuction with gulp-if to perform multiple conditional transformations
    rev = require('gulp-rev'),      // Add a hash-based fingerprint to the output filename
    sass = require('gulp-sass'),    // Compile CSS from Sass/sass
    sassOptions,
    uglify = require('gulp-uglify');    // Mangle and compress JavaScript


// Set the commonly used folder paths

(function () {

    // Set the variables for the root folders

    var dest = argv.production ? "./public/" : "./temp/",    // Use the public folder for a "production" build or the temp folder for all other builds
        src = "./";


    // Set paths as an object

    paths = {};


    // Create the dest object

    paths.dest = {};

    paths.dest.root = dest;

    paths.dest.images = dest + "images/";

    paths.dest.js = dest + "js/";

    paths.dest.css = dest + "css/"


    // Create the source object

    paths.src = {};

    paths.src.root = src;

    paths.src.html = src + "html/";

    paths.src.images = src + "images/";

    paths.src.includes = src + "includes/";

    paths.src.js = src + "js/";

    paths.src.sass = src + "sass/"

}());


// Set options

autoprefixerOptions = {
    browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ]
};


htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true
};


imageminOptions = {
    multipass: true,
    progressive: true,
    svgoPlugins: [
        {removeViewBox: false}
    ]
};


minifyCssOptions = {
    compatibility: 'ie7,' +
        '-units.ch,' +
        '-units.in,' +
        '-units.pc,' +
        '-units.pt,' +
        '-units.rem,' +
        '-units.vh,' +
        '-units.vm,' +
        '-units.vmax,' +
        '-units.vmin'
};


mustacheData = {
    categories: [
        {title: 'Category 1', url: '/category-1'},
        {title: 'Category 2', url: '/category-2'},
        {title: 'Category 3', url: '/category-3'},
        {title: 'Category 4', url: '/category-4'}
    ],
    menuItems: [
        {title: 'Menu Item 1', url: '/menu-item-1'},
        {title: 'Menu Item 2', url: '/menu-item-2'},
        {title: 'Menu Item 3', url: '/menu-item-3'},
        {title: 'Menu Item 4', url: '/menu-item-4'},
        {title: 'Menu Item 5', url: '/menu-item-5'}
    ]
};

mustachePartials = {
    categoryList: paths.src.html + 'mustache/category-list.mustache',
    menuItemList: paths.src.html + 'mustache/menu-item-list.mustache'
};


sassOptions = {
    includePaths: ['./node_modules']
};





// Define JavaScript bundles

/**
 * Use an array of objects with the following properties:
 *
 *      source - an array of source files
 *      destination - the output folder
 *      filename - the output filename
 *
 * For example:
 *
 *  jsList = [
 *      {
 *          source: [
 *              paths.src.includes + "fancybox/source/jquery.fancybox.js",
 *              paths.src.includes + "fancybox/source/helpers/jquery.fancybox-thumbs.js"
 *          ],
 *          destination: paths.dest.js,
 *          filename: "fancybox.custom.js"
 *      }
 *  ];
 **/

jsList = [
    {
        source: [
            paths.src.js + "ui-toggle.js",
            paths.src.js + "sticky-navigation.js"
        ],
        destination: paths.dest.js,
        filename: "main.js"
    }
];





// Remove destination folder in production mode

gulp.task('clean', function () {

    if (argv.production) {

        del.sync([paths.dest.root]);

    }

});





// Copy and minify HTML

gulp.task('html', function () {
    gulp.src(paths.src.html + '**/*.html')
        .pipe(mustache(mustacheData, {}, mustachePartials))
        .pipe(gulpif(argv.production, htmlmin(htmlminOptions)))
        .pipe(gulp.dest(paths.dest.root))
});

gulp.task('html:watch', function () {
    gulp.watch(paths.src.html + '**/*.{html,mustache}', ['html']);   // TODO consider changing to gulp-watch so only changed files are processed
});





// Optimise images

gulp.task('imagemin', function () {

    return gulp.src(paths.src.images + '*')
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(paths.dest.images))
        .pipe(browserSync.stream());
});

gulp.task('imagemin:watch', function () {
    gulp.watch(paths.src.images + '*', ['imagemin']);   // TODO consider changing to gulp-watch so only changed files are processed
});





// Concatenate JavaScript

/**
 * Note: this method is deprecated. User Browserify for all new script bundles.
 **/

gulp.task('js-concat', function () {

    // Loop through each bundle.

    jsList.forEach(function (bundle) {

        return gulp.src(bundle.source)
            .pipe(concat(bundle.filename))
            .pipe(gulpif(argv.production, pipe(uglify(), rev())))    // Uglify and fingerprint if in production mode
            .pipe(gulp.dest(bundle.destination))
            .pipe(browserSync.stream());

    });

});

gulp.task('js-concat:watch', function () {
    gulp.watch(paths.src.js + '**/*.js', ['js-concat']);
});





// Compile CSS from Sass/sass

gulp.task('sass', function () {

    gulp.src(paths.src.sass + '**/*.scss')
        .pipe(sass(sassOptions)
            .on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulpif(argv.production, pipe(minifyCss(minifyCssOptions), rev())))  // Minify and fingerprint if in production mode
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream());

});

gulp.task('sass:watch', function () {
    gulp.watch(paths.src.sass + '**/*.scss', ['sass']);     // TODO consider changing to gulp-watch so new files are detected
});





// Serve local files using browserSync

gulp.task('serve', function() {

    browserSync.init({
        server: paths.dest.root
    });

    gulp.watch(paths.dest.root + './*.html').on('change', browserSync.reload);
});


// Run all build tasks (once)

gulp.task('build', ['clean','html','imagemin','js-concat','sass']);


// Run all watch tasks

gulp.task('build:watch', ['html:watch','imagemin:watch','js-concat:watch','sass:watch']);


// Build, serve and watch

gulp.task('default', ['build','serve','build:watch']);
