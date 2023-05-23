const gulp = require("gulp"),
  clean = require("gulp-clean"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  purgecss = require("gulp-purgecss"),
  concat = require("gulp-concat"),
  minifyjs = require("gulp-js-minify"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create();


const paths = {
  src: {
    img: "./src/img/**/*.+(png|jpg|jpeg|gif|svg)",
    styles: "./src/scss/**/*.scss",
    js: "./src/js/*.js",
  },
  dist: {
    self: "./dist/",
    styles: "./dist/css",
    jsBuild: "./dist/js/",
    minImg: "./dist/img/",
    fix: "./dist/css/styles.min.css",
    minCss: "./dist/css/*.css"
  }
}

function cleanDist() {
  return gulp.src(paths.dist.self, { allowEmpty: true })
    .pipe(clean());
}

function buildStyles() {
  return gulp.src(paths.src.styles)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(purgecss({
      content: ["index.html"]
    }))
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest(paths.dist.styles));
}

function buildJs() {
  return gulp.src(paths.src.js)
    .pipe(minifyjs())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(paths.dist.jsBuild));
}

function imageMin() {
  return gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.minImg))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

function watch() {
  browsersync();
  gulp.watch(paths.src.js, buildJs).on("change", browserSync.reload)
  gulp.watch(paths.src.styles, buildStyles).on("change", browserSync.reload)
  gulp.watch(paths.src.img, buildStyles).on("change", browserSync.reload)
}



gulp.task("build", gulp.series(cleanDist, buildStyles, buildJs, imageMin));
gulp.task("dev", watch);
