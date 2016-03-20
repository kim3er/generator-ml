import del from 'del';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import merge from 'merge-stream';
import runSequence from 'run-sequence';

const SRC_PATH = './src',
	GENERATORS_PATH = './generators';

const GENERATORS_ARR = [ 'app' ];

gulp.task('del', function(cb) {
	del([ GENERATORS_PATH ])
		.then(() => cb());
});

gulp.task('indexes', function() {
	const stream = merge(),
		indexFile = 'index.js';

	for (const generator of GENERATORS_ARR) {
		const src = `${SRC_PATH}/${generator}/${indexFile}`,
			dest = `${GENERATORS_PATH}/${generator}`;

		stream.add(
			gulp.src(src)
				.pipe(plumber())
				.pipe(babel())
				.pipe(gulp.dest(dest))
		);
	}

	return merge;
});

gulp.task('default', [ 'del' ], function(cb) {
	runSequence(
		'indexes',
		cb
	);
});
