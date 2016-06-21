    // ## Main function

    return {

        main: function() {

            // ### Add selected Pure.css classes
            addPureClasses();

            // ### Collect document section elements

            // Test to see if Pandoc was invoked with `--section-divs`.
            if (document.getElementsByClassName('level2').length > 0) {
                var elts, sectionElts = [];

                ['abstract', 'level2', 'footnotes'].forEach(function(cls) {
                    elts = document.getElementsByClassName(cls);
                    for (var i = 0, l = elts.length; i < l; i++) {
                        sectionElts.push(elts[i]);
                    }
                });
            } else {
                // If Pandoc wasn't invoked with `--section-divs`, we're done here.
                return;
            }

            // ### Create navigation menu

            var elt;

            // Pandoc 1.17.1 gives all sections the class 'level2' except for the
            // footnotes section. We want the footnotes section to appear in the
            // navigation menu, so we add it here. Pandoc 1.17.1 does not give the
            // footnotes section an 'id' attribute, so we add that here too.
            for (var section in sectionElts) {
                elt = sectionElts[section];

                // Add class 'level2' to any element that does not have it, so that
                // it appears in the navigation menu.
                if (!hasClass(elt, 'level2')) addClass(elt, 'level2');

                // Add an 'id' attribute to the footnotes section.
                if (hasClass(elt, 'footnotes')) elt.setAttribute('id', 'footnotes');
            }

            // Now create the navigation menu.
            createNavigation(sectionElts);

            // Add click handlers to menu items.
            addMenuEventListeners(sectionElts);

            // ### Add event listeners to other elements

            // Add click handlers to reference links.
            var citeElts = document.getElementsByClassName('citation'),
                refsElt  = document.getElementById('references');

            addRefLinkEventListeners(citeElts, refsElt);

            // Add click handlers to footnote links.
            var fnElts = document.getElementsByClassName('footnoteRef'),
                notesElt = document.getElementById('footnotes');

            addFnLinkEventListeners(fnElts, notesElt);

        }
    }
