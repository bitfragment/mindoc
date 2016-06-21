    // ## Handling Pandoc output


    // ### Return a capitalized string

    function capitalize(str) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.substr(1);
    }


    // ### Dehyphenate a string of hyphenated words

    // Replace hyphens with spaces.
    function deHyphenateWords(str) {
        var re = new RegExp(/^\b[a-z]\S+\b-\b\S+\b/);
        if (re.test(str)) str = str.replace(/-+/g, ' ');
        return str;
    }


    // ### Resolve Pandoc section 'id' attributes

    // Replace hyphens with spaces and capitalize the first
    // (or only) word.
    function resolvePandocId(id) {
        id = deHyphenateWords(id);
        return capitalize(id);
    }
