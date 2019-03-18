/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty.
         * When allFeeds in app.js change to undefined or empty, specs fail.
         * When allFeeds has at least 1 element, specs pass.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function() {
            for (let elem of allFeeds) {
                expect(elem.url).toBeDefined();
                expect(elem.url).not.toBe('');
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            for (let elem of allFeeds) {
                expect(elem.name).toBeDefined();
                expect(elem.name).not.toBe('');
            }
        });
    });

    /* Test suite to test menu behaviour */
    describe('The menu', function() {
        /* Test that ensures the menu element is hidden by default.
         */
        it('menu hidden by default', function() {
            let elBody = document.querySelector('body');
            expect(elBody).toHaveClass('menu-hidden');
        });

         /* Test that ensures the menu changes visibility when the menu icon is clicked.
          * This test has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when menu icon is clicked', function() {
            let elBody = document.querySelector('body');
            let elMenu = document.querySelector('.menu-icon-link');
            elMenu.click();
            expect(elBody).not.toHaveClass('menu-hidden');
            elMenu.click();
            expect(elBody).toHaveClass('menu-hidden');
        });
    });

    /* Test suite to check initial entry is loaded */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         * loadFeed() is asynchronous, so this test require beforeEach and done().
         */
    		beforeEach(done => {
      			loadFeed(0, function() {
        				done();
      			});
    		});

    		it('at least one entry exists upon initial load', function() {
      			let divFeed = document.querySelector('div.feed');
      			let arrayEntries = divFeed.querySelectorAll('.entry');
      			expect(arrayEntries.length).not.toBe(0);
    		});
    });

    // Test suite to check the content changes with the feed
    describe('New Feed Selection', function() {
    	  /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        /* Declaring variables to store content to compare */
        let initialContent = "";
        let newContent = "";
        
        /* Load initial feed and when completed go on */
        beforeAll(done => {
            loadFeed(0, function() {
                done();
            });
        });

        beforeEach(done => {
        	  /* Get initial content upon initial load */
            initialContent = document.querySelector('div.feed').innerHTML;
            /* Load new feed and when completed go on */
            loadFeed(2, function() {
                done();
            });
        });

        it('new feed loaded changes the content', function() {
        	  /* Get new content after new load is complete */
            newContent = document.querySelector('div.feed').innerHTML;
            expect(initialContent === newContent).toBe(false);
        });
    });
}());