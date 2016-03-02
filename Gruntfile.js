module.exports = function (grunt) {

    grunt.initConfig({

        shell: {
            // запуск сервера через скрипт shell'a https://www.npmjs.com/package/grunt-shell
            dev: {
                command: 'node server.js'
            }
        },

        watch: {
            // запуск watcher'a, который следит за изенениями файлов  templates/*.xml
            // и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
            files: 'templates/*.xml',
            tasks: ['fest']
        },

        concurrent: {
            // одновременный запуска shell'a и watcher'a https://www.npmjs.com/package/grunt-concurrent
            target: {
                tasks: ['shell:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        }

    });

    // подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    // результат команды grunt
    grunt.registerTask('default', ['concurrent:target']);

};
