module.exports = function(grunt){

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		bower : {
			install : {
				options: {
					targetDir : 'client/requires',
					layout: 'byComponent'
				}
			}
		},

		browserify: {
			vendor: {
				src: ['client/requires/**/*.js'],
				dest: 'public/js/vendor.js',
				options: {
					shim: {
						jquery: {
							path: 'client/requires/jquery/jquery.js',
							exports: '$'
						},
						underscore: {
							path: 'client/requires/underscore/underscore.js',
							exports: '_'
						},
						backbone: {
							path: 'client/requires/backbone/js/backbone.js',
							exports: 'Backbone',
							depends: {
								underscore: 'underscore'
							}
						}/*,
						'backbone': {
							path: 'client/requires/backbone/backbone.js',
							exports: 'Backbone',
							depends: {
								jquery: '$',
								underscore: '_'
							}
						}*/
					}
				}
			},
			app: {
				files: {
					'build/app.js': ['client/src/main.js']
				},
				options: {
					transform: ['hbsfy'],
					external: ['jquery', 'underscore', 'backbone']
				}
			},
			test: {
				files: {
					'build/tests.js': [
					'client/spec/**/*.test.js'
					]
				},
				options: {
					transform: ['hbsfy'],
					external: ['jquery', 'underscore', 'backbone']
				}
			}
		},
		concat: {
			'public/js/<%= pkg.name %>.js': ['public/js/vendor.js', 'public/js/app.js']
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					nodeArgs: ['--debug'],
					watchedFolders: ['app.js', 'views','routes','models','config'],
					env: {
						PORT: '9000'
					}
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('init:dev', ['bower', 'browserify:vendor']);

	grunt.registerTask('build:dev', ['browserify:app', 'browserify:test', 'concat']);

	grunt.registerTask('server', ['build:dev']);


};
