/**
 * DEFAULT TASKS
 * Default Gulp task, serve used during production, build and production tasks
 */

var gulp = require('gulp');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

/**
 * DEFAULT GULP TASK
 * Rebuild all assets, delete gz html and clean asset folder in .build folder
 * During production assets are found in .tmp folder, for production they get copied in
 */
gulp.task('default', gulp.series(
  gulp.parallel('scripts:rebuild', 'styles:rebuild', 'fonts:rebuild', 'images', 'html:clean', 'assets:clean'),
  gulp.series('jekyll:rebuild', 'serve')
));
