var gulp       = require('gulp'),
    $			     = require('gulp-load-plugins')(),
    webpack 	 = require('webpack-stream'),
    named		   = require('vinyl-named'),
    path		   = require('path'),
    semver		 = require('semver'),
    pkg			   = require('./package.json'),
    
    version = pkg.version,
    
    input  = {
      javascript: 'app/**/*.js',
      webpack: 'app/*.js'
    },
    output = {
      javascript: 'public/js'
    };

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(input.javascript)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('bump', function() {
	return gulp.src('package.json')
		.pipe($.bump({version: version}))
		.pipe(gulp.dest('.'));
});

gulp.task('build-js', ['jshint'], function() {
  var plugins = [];

	if( $.util.env.production ) {
		if( ! $.util.env.nobump ) {
			version = semver.inc(version, 'patch');
			gulp.start('bump');
		}
		plugins = [
			new webpack.webpack.optimize.UglifyJsPlugin({minimize: true})
		];
	}
	
	plugins.push(
		new webpack.webpack.DefinePlugin({
			VERSION: JSON.stringify(version)
		})
	);
  
  return gulp.src(input.webpack)
		.pipe($.plumber())
		.pipe(named())
		.pipe(webpack({
			watch: true,
			output: {
				filename: '[name].min.js'
			},
			externals: { 'jquery': 'jQuery' },
			resolve: { root: path.resolve('./app/js') },
			plugins: plugins,
			devtool: $.util.env.production ? '': '#source-map'
		}))
		.pipe(gulp.dest(output.javascript));
});

gulp.task('watch', ['build-js'], function() {
  gulp.watch(input.javascript, ['build-js']);
});
