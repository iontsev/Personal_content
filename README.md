# Personal content

## The simple script for changing page content dynamically
The “_personal-content.js_” script changes the specified elements of the page in the “_element_” field of the “_mission_” option if the page address has the GET parameters specified in the “_content_” field of the “_mission_” option value equal to “1”.

The GET parameter values is encoded using the Caesar cipher version. The phrase specified in the “_pattern_” option of the config is used as the encryption key. Protection is not strong, but sufficient.

The script has the following parameters at startup:
+ __limiter__ — the GET parameter for activating the page content change. The current value is “_code_”.
+ __pattern__ — the text for encoding the GET parameter values. The current value is “// Replace header on this page!”.
+ __mission__ — the set of tasks for dynamically changing page content, depending on the parameters in the URL. Each task is an object with the “_content_” list (an array of GET parameters whose values ​​will be used) and the “_element_” list (an array of page element selectors that will be changed during this task), as well as the “_display_” function (modifies specified elements).

The example configuration for this script:

    {
        'limiter': 'code',  // the GET parameter name for activating the page content change
        'pattern': '// Replace header on this page!',  // the text for encoding the GET parameter values.
        'mission': [
            {
                'content': ['swap_text'],  // the list of the GET parameters whose values ​​will be used
                'element': ['title', 'h1', '.header'],  // the list of the page element selectors that will be changed during this task
                'display': function (content, element) {  // the function, which modifies specified elements
                    var mistake = [];

                    if (content['swap_text']) {

                        mistake = element
                            .map(function (data) {

                                if (document.querySelectorAll(data).length > 0) {

                                    document
                                        .querySelectorAll(data)
                                        .forEach(function (data) {
                                            data.textContent = content['swap_text'];
                                        });

                                } else {
                                    return false;
                                };

                                return true;
                            })
                            .filter(function (data) {

                                if (data === true) return false;

                                return true;
                            });

                    };

                    if (mistake.length > 0) return false;

                    return true;  // “true” is signal that the function worked without errors
                }
            },
            {
                'content': ['swap_name'],  // the list of the GET parameters whose values ​​will be used
                'element': ['.person'],  // the list of the page element selectors that will be changed during this task
                'display': function (content, element) {  // the function, which modifies specified items
                    var mistake = [];

                    if (content['swap_name']) {

                        mistake = element
                            .map(function (data) {

                                if (document.querySelectorAll(data).length > 0) {

                                    document
                                        .querySelectorAll(data)
                                        .forEach(function (data) {
                                            data.textContent = content['swap_name'];
                                        });

                                } else {
                                    return false;
                                };

                                return true;
                            })
                            .filter(function (data) {

                                if (data === true) return false;

                                return true;
                            });

                    };

                    if (mistake.length > 0) return false;

                    return true;  // “true” is signal that the function worked without errors
                }
            }
        ]
    }

## The example
+ __create-hyperlink.html__ — the utility for the convenience of adding to the hyperlink GET parameters containing encrypted text and activating the substitution. This is an HTML page with a form, without code dependencies.
+ __update-content.html__ — the utility for checking work the script.
