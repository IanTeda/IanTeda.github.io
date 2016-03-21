"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage scripts in project
 */
module.exports = (gulp, config, argv, $) => {
  return callback => {
    gulp
      // JavaScript source files
      .src(config.scripts.src)
      // Initate sourcemaps when not in production mode
      .pipe($.if(!argv.p, $.sourcemaps.init()))
      // Always concatinate files, order is important
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Concatinated:'}))
      // Write source maps when not in production mode for easier debugging in browser
      .pipe($.if(!argv.p, $.sourcemaps.write('./')))
      .pipe($.if(!argv.p, $.size({title: 'Source mapped:'})))
      // Unglify JavaScript (remove unneeded characters)
      .pipe($.if(argv.p, $.uglify(config.uglify.options)))
      // Add min prefix to output
      .pipe($.if(argv.p, $.rename({suffix: '.min'})))
      .pipe($.if(argv.p, $.size({title: 'Uglified:'})))
      // Appending content hash to filenames, to force browser cache update
      .pipe($.if(argv.prod, $.rev()))
      .pipe($.if(argv.p, $.size({title: 'Appended content hash:'})))
      // Write stream to destination folder -- make a copy -- before compressing
      .pipe($.if(argv.p, gulp.dest(config.scripts.dest)))
       // Compress stream
      .pipe($.if(argv.p, $.gzip(config.gzip.options)))
      .pipe($.if(argv.p, $.size({
        title: 'Ziped:',
        gzip: true
      })))
      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.size({title: 'Scripts copied:'}));

    // Let async know things have finished
    callback();
  };
};
