
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};














/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = $('#cat');
        this.catNameElem = $('#cat-name');
        this.catImageElem = $('#cat-img');
        this.countElem = $('#cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.click(function() {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();

        this.countElem.text(currentCat.clickCount);
        this.catNameElem.text(currentCat.name);
        this.catImageElem.attr("src", currentCat.imgSrc);
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later (jQ)
        this.catListElem = $('#cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = $("<li>").text(cat.name);

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.click(function(catCopy) {
                // a callback function retuan a function for callback.
                var fn = function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    
                }
                return fn;
            }(cat));

            // finally, add the element to the list
            this.catListElem.append(elem);
        }
    }
};

var adminView = {
    init: function() {
        $("#admin-content-panel").css("display", "none");
        this.render();

    },

    render: function() {
        // current cat
        var currentCat = octopus.getCurrentCat();

        // current cat info
        var name = currentCat.name;
        var clicks = currentCat.clickCount;
        var url = currentCat.imgSrc;

        // buttons & panels
        var adminButton = $("#adminbutton");
        var cancelButton = $("#cancelbutton");
        var saveButton = $("#savebutton");

        var adminPanel = $("#admin-content-panel");

        // input fields
        var nameInputField = $("#catnameinput");
        var urlInputField = $("#caturlinput");
        var clicksInputField = $("#catclicksinput");

        // click event on admin button
        adminButton.click(function() {
            adminPanel.css("display", "block");
            nameInputField.val(name);
            urlInputField.val(url);
            clicksInputField.val(clicks);
        });

        // click event on cencel button
        cancelButton.click(function() {
            adminPanel.css("display", "none");
        });


        // click event on save button
        saveButton.click(function() {
            console.log("save btn clicked");

            // get updated values
            var nameValue = nameInputField.val();
            var urlValue = urlInputField.val();
            var clicksValue = clicksInputField.val();

            octopus.adminSaveCatInfo(currentCat, nameValue, clicksValue, urlValue);
        });
    }
}













/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    // Admin save cat info.
    adminSaveCatInfo: function(cat, name, clicks, url) {
        console.log("start saving");
        cat.name = name;
        cat.imgSrc = url;
        cat.clickCount = clicks;
        console.log("saved");

        console.log("start rendering cat view");
        catView.render();
        console.log("cat view rendered");
    }
};


// make it go!
octopus.init();
