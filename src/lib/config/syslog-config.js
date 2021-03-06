/*
 * syslog-config.js: Config that conform to syslog logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 *
 */

module.exports = {

    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
    },

    colors: {
        fatal: 'red',
        emerg: 'red',
        alert: 'yellow',
        crit: 'red',
        error: 'red',
        warning: 'red',
        notice: 'yellow',
        info: 'green',
        debug: 'blue',
        verbose: 'cyan'
    }
};

