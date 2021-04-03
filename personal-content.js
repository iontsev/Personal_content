/*  Personal content  */;
(function (environ, options) {
    'use strict';

    var limiter = options.limiter;
    var pattern = options.pattern;
    var mission = options.mission;
    var request = {};

    function packing(data, meta, code) {
        var text = '';
        var span = '';
        var spin = code ? 1 : -1;

        data = data || '';
        meta = meta || '';

        for (var step = 0, size = ((data.length - data.length % meta.length) / meta.length) + 1; step < size; step = step + 1) {
            span = span + meta;
        };

        for (var step = 0, size = data.length; step < size; step = step + 1) {
            text = text + String.fromCharCode(data.charCodeAt(step) + spin * span.charCodeAt(step));
        };

        return text;
    };

    function waiting(work, time, step) {
        var result = false;

        try {

            if (work() === true) {
                result = true;
            } else {
                step = (step > 0) ? step : 0;

                if (step > 1) setTimeout(function () {waiting(work, time, step - 1)}, time);

            };

        } catch (error) {
            result = false;
        };

        return result;
    };

    (function (environ) {
        var window = environ;
        var document = window.document;
        var navigator = window.navigator;

        waiting(
            function () {
                var result = false;

                if (window.location.search) {
                    request = window.location.search
                        .split('?', 2)[1]
                        .split('#', 1)[0]
                        .split('&')
                        .reduce(
                            function (data, meta) {
                                var meta = meta.split('=');
                                var name = decodeURIComponent(meta[0]);
                                var item = decodeURIComponent(meta[1]);

                                data[name] = item;

                                return data;
                            },
                            {}
                        );

                    if (request[limiter] === '1') {
                        mission
                            .forEach(
                                function (data) {
                                    var content = data.content;
                                    var element = data.element;
                                    var display = data.display;

                                    content = content
                                        .reduce(
                                            function (data, meta) {

                                                if (request[meta]) data[meta] = packing(request[meta], pattern);

                                                return data;
                                            },
                                            {}
                                        );
                                    waiting(function () {return display(content, element)}, 22, 222);
                                }
                            );
                    };

                    result = true;
                };

                return result;
            },
            11,
            111
        );
    })(environ);
})(
    window,
    {
        'limiter': 'code',
        'pattern': '// Replace header on this page!',
        'mission': [
            {
                'content': ['swap_text'],
                'element': ['title', 'h1', '.header'],
                'display': function (content, element) {
                    var mistake = [];
                    var result = false;

                    if (content['swap_text']) {
                        mistake = element
                            .map(
                                function (data) {
                                    var result = false;

                                    if (document.querySelectorAll(data).length > 0) {
                                        document
                                            .querySelectorAll(data)
                                            .forEach(function (data) {data.textContent = content['swap_text']});
                                        
                                        result = true;
                                    };

                                    return result;
                                }
                            )
                            .filter(
                                function (data) {
                                    var result = false;

                                    if (data === false) return result = true;

                                    return result;
                                }
                            );
                    };

                    if (mistake.length === 0) result = true;

                    return result;
                }
            },
            {
                'content': ['swap_name'],
                'element': ['.person'],
                'display': function (content, element) {
                    var mistake = [];
                    var result = false;

                    if (content['swap_name']) {
                        mistake = element
                            .map(
                                function (data) {
                                    var result = false;

                                    if (document.querySelectorAll(data).length > 0) {
                                        document
                                            .querySelectorAll(data)
                                            .forEach(function (data) {data.textContent = content['swap_name']});
                                    
                                        result = true;
                                    };

                                    return result;
                                }
                            )
                            .filter(
                                function (data) {
                                    var result = false;

                                    if (data === false) return result = true;

                                    return result;
                                }
                            );
                    };

                    if (mistake.length === 0) result = true;

                    return result;
                }
            }
        ]
    }
);
