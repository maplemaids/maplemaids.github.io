module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				style: 'compressed'
			},
			build: {
				src: 'js/main.js',
				dest: 'js/main.min.js'
			}
		},

		autoprefixer: {
			global: {
				src: "css/main-unprefixed.css",
				dest: "css/main.css"
			}
		},


		shell: {
			jekyllServe: {
				command: "jekyll serve --baseurl"
			},
			jekyllBuild: {
				command: "jekyll build"
			}
		},

		sass: {
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed'
				},
				files: {                         // Dictionary of files
					'css/main-unprefixed.css': 'sass/main.scss',       // 'destination': 'source'

				}
			}
		},

		imagemin: {
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'images',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
					dest: 'images'                  // Destination path prefix
				}]
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			site: {
				files: ["index.html", "_layouts/*.html", "_posts/*.md", "_includes/*.html"],
				tasks: ["shell:jekyllBuild"]
			},

			css: {
				files: ['sass/*.scss'],
				tasks: ["sass", "autoprefixer", "shell:jekyllBuild"],
				options: {
					spawn: false,
				}
			},
			javascript: {
				files: ['js/main.js'],
				tasks: ['uglify']
			}

		}


	});

	// // Load the plugin that provides the "uglify" task.
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-imagemin');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-autoprefixer');

	require("load-grunt-tasks")(grunt);


	// Default task(s).
	grunt.registerTask("serve", ["shell:jekyllServe"])
	grunt.registerTask("default", ["sass","autoprefixer", "shell:jekyllBuild", "watch"]);

};
