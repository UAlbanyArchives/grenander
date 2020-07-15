window.addEventListener('load', function() {

    // URLs for Search form get request
    var allSearchURL = "https://archives.albany.edu/search";
    var arclightSearchURL = "https://archives.albany.edu/description/catalog";
    var hyraxSearchURL = "https://archives.albany.edu/catalog/";
    var historySearchURL = "https://archives.albany.edu/history/catalog";

    //query selector for search form
    var searchForm = document.getElementsByClassName('historySearch');
    var searchPlaceholder = document.getElementById('params-q');
    var currentSelection = document.getElementById('currentSelection');


    //button query selectors
    var allSearchBtn = document.getElementById('allSearch')
    var arclightBtn = document.getElementById('arclightSearch');
    var hyraxBtn = document.getElementById('hyraxSearch');
    var historyBtn = document.getElementById('historySearch');


    //
    //
    // Event Listeners - Search options change
    //
    //

    //Search all
    allSearchBtn.addEventListener('click', function() {
        searchForm[0].action = allSearchURL;
        searchPlaceholder.placeholder = "Search everything...";
        currentSelection.textContent = "Everything";
    });

    //Search Arclight
    arclightBtn.addEventListener('click', function() {
        searchForm[0].action = arclightSearchURL;
        searchPlaceholder.placeholder = "Search all collection records...";
        currentSelection.textContent = "Collections";
    });

    //Search Hyrax
    hyraxBtn.addEventListener('click', function() {
        searchForm[0].action = hyraxSearchURL;
        searchPlaceholder.placeholder = "Search only online digital content...";
        currentSelection.textContent = "Digital Selections";
    });

    //Search UA History
    historyBtn.addEventListener('click', function() {
        searchForm[0].action = historySearchURL;
        searchPlaceholder.placeholder = "Search UAlbany's history...";
        currentSelection.textContent = "UAlbany History";
    });



}, false);


window.addEventListener('load', function() {
    $('#toggleSearch').click( function() {
        $('#searchSub').addClass('subnavTransition');
        $("#searchSub").toggleClass("fixedSubnav");
        $("#main-container").toggleClass("subnavSpacer");
    } );

    $(window).scroll(function () {
        var top_offset = $(window).scrollTop();
        if (top_offset < 57) {
            $('#searchSub').removeClass('subnavTransition');
            $('#searchSub').removeClass('fixedSubnav');
            $('#main-container').removeClass('subnavSpacer');
         }
    } );
});

