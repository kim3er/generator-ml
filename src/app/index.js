import { Base } from 'yeoman-generator';
import mkdirp from 'mkdirp';

// http://stackoverflow.com/a/196991
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

export default class AppGenerator extends Base {

	constructor( ...args ) {
		super(...args);

		this.argument('appName');
	}

	// Your initialization methods (checking current project state, getting configs, etc)
	get initializing() {
		return {}
	}

	// Where you prompt users for options (where you'd call this.prompt())
	prompting() {
		return {}
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files)
	get configuring() {
		return {}
	}

	// Where you write the generator specific files (routes, controllers, etc)
	get writing() {
		return {

			npm() {
				const pkgFile = {
					name: this.appName,
					version: '0.0.1',
					devDependencies: {
						'babel-core': '^6.5.0',
						'babel-plugin-transform-decorators-legacy': '^1.3.1',
						'babel-plugin-transform-flow-strip-types': '^6.5.0',
						'babel-polyfill': '^6.5.0',
						'babel-preset-es2015': '^6.5.0',
						'babel-preset-react': '^6.5.0',
						'babel-preset-stage-0': '^6.5.0',
						'babelify': '^7.2.0',
						'cordova-lib': '^4.3.1',
						'del': '^1.1.1',
						'gulp': '^3.9.0',
						'gulp-concat': '^2.5.2',
						'gulp-connect': '^2.2.0',
						'gulp-data': '^1.2.0',
						'gulp-nunjucks': '^1.0.3',
						'gulp-nunjucks-render': '^0.2.1',
						'gulp-plumber': '^1.0.0',
						'gulp-rename': '^1.2.2',
						'gulp-sass': '^2.0.4',
						'gulp-sourcemaps': '^1.5.0',
						'gulp-uglify': '^1.1.0',
						'gulp-watch': '^4.1.1',
						'gulp-wrap': '^0.11.0',
						'main-bower-files': '^2.6.2',
						'middle-layer': '1.0.0',
						'nunjucks': '1.2.0',
						'run-sequence': '^1.0.2',
						'vinyl-buffer': '^1.0.0',
						'vinyl-source-stream': '^1.1.0'
					}
				};

				this.fs.writeJSON('package.json', pkgFile);
			},

			bower() {
				const pkgFile = {
					'name': this.appName,
					'version': '0.0.1',
					'ignore': [
						'**/.*',
						'node_modules',
						'bower_components',
						'test',
						'tests'
					],
					'dependencies': {
						'bootstrap': '3.3.5',
						'fetch': '~0.9.0',
						'jquery': '~2.1.3',
						'localforage': '~1.3.0',
						'fastclick': '~1.0.6'
					},
					'overrides': {
						'bootstrap': {
							'main': './dist/js/bootstrap.js'
						}
					}
				};

				this.fs.writeJSON('bower.json', pkgFile);
			},

			babel() {
				const rc = {
					'presets': [ 'es2015', 'stage-0', 'react' ],
					'plugins': [ 'transform-decorators-legacy', 'transform-flow-strip-types' ]
				};

				this.fs.writeJSON('.babelrc', rc);
			},

			files() {
				const files = [
					[ '_gulpfile.babel.js', 'gulpfile.babel.js' ],
					[ 'gitignore.txt', '.gitignore' ],
					[ 'app/javascripts/_app.js', 'app/javascripts/app.js' ]
				];

				let titleCaseName = toTitleCase(this.appName);
				if (titleCaseName === 'Ml') {
					titleCaseName += '2';
				}

				for (const filePaths of files) {
					this.fs.copyTpl(
						this.templatePath(filePaths[0]),
						this.destinationPath(filePaths[1]),
						{
							appName: this.appName,
							titleCaseName: titleCaseName
						}
					);
				}
			},

			directories() {
				const directories = [
					'app/images',
					'app/javascripts/components',
					'app/javascripts/controllers',
					'app/javascripts/models',
					'app/javascripts/services',
					'app/javascripts/stores'
				];

				for (const directory of directories) {
					mkdirp.sync(directory);
				}
			}

		}
	}

	// Where installation are run (npm, bower)
	get install() {
		return {
			all() {
				this.installDependencies();
			}
		}
	}

	// Called last, cleanup, say good bye, etc
	get end() {
		return {}
	}

}
