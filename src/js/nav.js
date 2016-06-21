    // ## Create navigation

    // When Pandoc is invoked with its `--section-divs` option, HTML
    // output includes the class 'level' + n (where n is an integer) added
    // to `<div>` elements enclosing document sections, plus 'id'
    // attributes generated from header text:
    //
    // ```html
    // <div id="foo" class="section level2">
    // <h2>Foo</h2>
    // ...
    // </div>
    // ```
    //
    // If `html5` is specified as Pandoc's output format, Pandoc creates
    // `<section>` elements instead:
    //
    // ```html
    // <section id="foo" class="level2">
    // <h2>Foo</h2>
    // ...
    // </div>
    // ```


    // ### Create a menu list item element

    function createMenuListItemElt() {
        var elt = document.createElement('li');
        addClass(elt, 'pure-menu-item');
        return elt;
    }


    // ### Create a menu list item anchor element

    function createMenuAElt(sectionId) {
        var elt = document.createElement('a');
        elt.id = 'menu-' + sectionId;
        elt.href = '#';
        elt.innerHTML = resolvePandocId(sectionId);
        addClass(elt, 'pure-menu-link');
        return elt;
    }


    // ### Create and add nav menu to the page

    function createNavigation(sectionElts) {
        var docFrag = document.createDocumentFragment(),
            navNav  = document.createElement('nav'),
            navDiv  = document.createElement('div'),
            navList = document.createElement('ul');

        docFrag.appendChild(navNav);
        navNav.appendChild(navDiv);
        navDiv.appendChild(navList);
        addClass(navDiv, 'pure-menu');
        addClass(navList,  'pure-menu-list');

        // Add 'All sections' as first menu item.
        var allSectionsId = 'All sections',
            allSections = createMenuListItemElt();

        addClass(allSections, 'pure-menu-selected')
        navList.appendChild(allSections);
        allSections.appendChild(createMenuAElt(allSectionsId));

        // Add menu list items and links, using 'id' attributes of
        // section elements.
        var sectionId, menuListElement;
        for (var i = 0, l = sectionElts.length; i < l; i++) {
            sectionId = sectionElts[i].getAttribute('id');
            menuListElement = createMenuListItemElt();
            navList.appendChild(menuListElement);
            menuListElement.appendChild(createMenuAElt(sectionId));
        }

        var pageContent = document.getElementById('page-content');
        document.querySelector('body').insertBefore(docFrag, pageContent);
    }

    // ### Toggle selected menu element

    // Toggle by removing a class from the currently selected element
    // and adding it to the element passed to this function.
    function toggleSelectedMenuElt(elt) {
        var selectedElement;
        if (!elt.hasAttribute('pure-menu-selected')) {
            selectedElement = document.querySelector('.pure-menu-selected');
            removeClass(selectedElement, 'pure-menu-selected');
            addClass(elt, 'pure-menu-selected');
        }
    }


    // ### Event listener to show and hide document sections

    // Toggle the selected menu item, then hide the document section
    // currently shown and show the section with the relevant id attribute.
    function showHideSectionElts(sectionElts, link) {
        var elt,
            clickedId = link.getAttribute('id'),
            resolvedClickedId = clickedId.replace(/menu-/, ''),
            clickedParent = document.getElementById(clickedId).parentNode;

        toggleSelectedMenuElt(clickedParent);

        for (var section in sectionElts) {
            elt = sectionElts[section];
            if (!hasClass(elt, 'hidden')) addClass(elt, 'hidden');
            if (elt.getAttribute('id') === resolvedClickedId &&
                hasClass(elt, 'hidden')) removeClass(elt, 'hidden');
        }
    }


    // ### Event listener to show all document sections

    function showAllSectionElts(sectionElts) {
        var elt;
        for (var section in sectionElts) {
            elt = sectionElts[section];
            if (hasClass(elt, 'hidden')) removeClass(elt, 'hidden');
        }
    }


    // ## Add event listeners to menu links

    function addMenuEventListeners(sectionElts) {
        var menuLinks = document.querySelectorAll('.pure-menu-link');
        for (var i = 0, l = menuLinks.length; i < l; i++) {
            if (i === 0) { // 'All sections' link
                menuLinks[i].addEventListener('click', function() {
                    showAllSectionElts(sectionElts);
                });
            } else { // Other section links
                menuLinks[i].addEventListener('click', function() {
                    showHideSectionElts(sectionElts, this);
                });
            }
        }
    }
