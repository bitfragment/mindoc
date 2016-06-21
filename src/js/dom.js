    // ## DOM manipulation


    // ### Test, add, and remove DOM element class attributes

    // Adapted from
    // <http://jaketrent.com/post/addremove-classes-raw-javascript/>

    // Pandoc interprets `$` in a template as the start of a template
    // variable, so we have to avoid the regexp metacharacter `$` here.
    // Instead, we match space or nothing: `(\s|)`
    function hasClass(element, cls) {
        return !!element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|)'));
    }

    function addClass(element, cls) {
        if (!hasClass(element, cls)) element.className += ' ' + cls;
    }

    function removeClass(element, cls) {
        if (hasClass(element, cls)) {
            var re = new RegExp('(\\s|^)' + cls + '(\\s|)');
            element.className = element.className.replace(re, ' ');
        }
    }


    // ### Add Pure.css classes

    function addPureClasses() {

        var elts, eltslen,
            pureClasses = {
                'table': 'pure-table pure-table-bordered'
            };

        Object.keys(pureClasses).forEach(function(key) {
            elts = document.getElementsByTagName(key);
            eltslen = elts.length;
            if (eltslen > 1) {
                for (var i = 0; i < eltslen; i++) {
                    addClass(elts[i], pureClasses[key]);
                }
            }
        });

    }


    // ### Add event listeners to reference links

    function addRefLinkEventListeners(citeElts, refsElt) {
        for (var i = 0, l = citeElts.length; i < l; i++) {
            var citeLinks = citeElts[i].getElementsByTagName('a');
            for (var j = 0, ll = citeLinks.length; j < ll; j++) {
                citeLinks[j].addEventListener('click', function() {
                    removeClass(refsElt, 'hidden');
                });
            }
        }
    }


    // ### Add event listeners to footnote links

    function addFnLinkEventListeners(fnElts, notesElt) {
        for (var i = 0, l = fnElts.length; i < l; i++) {
            fnElts[i].addEventListener('click', function() {
                removeClass(notesElt, 'hidden');
            });
        }
    }
