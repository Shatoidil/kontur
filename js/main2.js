(function($) {
    'use strict';
    $.fn.extend({
        autoSearch: function(options) {
            let settings = {
                url :'',
            };
            options = $.extend(settings, options);

            let loadedData  = [];
            let searchArray = [];
            let input = this;
            let results = $(".results");
            let showAnimation = true;
            let showDivs = true;

            $.getJSON(options.url).done(
                function(data) { 
                    loadedData = data;
                }
            );
            results.on("click", ".result", function() {
                input.val($(this).text())
                .attr('city_id', $(this).closest('a').attr('city_id'));
                showResult(showDivs = false);
                showAnimation = true;
            });
            input.on('keyup', function(e){ 
                if (input.val().length >= 2){

                    searchArray = loadedData.filter(function(value) {
                        return value.City.toUpperCase()
                        .includes(input.val().toUpperCase());
                    });
                    if(searchArray.length){
                        if(showAnimation){
                            showResult(true);
                            showAnimation = false;
                        }
                        // очистка поиска
                        $(".result").remove();
                        for (let i = 0; i < searchArray.length; i++) {
                            results.append(
                              '<a city_id="' + searchArray[i].Id + '" class="result">' +
                                '<div class="content"><div class="title">' +
                                searchArray[i].City +
                                "</div></div></a>"
                            );
                        }
                    }
                    else{
                        if(showAnimation){
                            showResult(true);
                            showAnimation = false;
                        }
                        $(".result").remove();
                        results.append('<a class="result">' +
                        '<div class="content"><div class="title">' +
                        "Ничего не найдено" +
                        "</div></div></a>");
                    }
                }
                else {
                    showResult(false);
                    showAnimation = true;
                }
            });
            function showResult(value) {
                if(value){
                    results.attr('class', 'results').transition('scale');
                }
                else{
                    //
                    results.attr('class', 'results').css({"visibility":"hidden"});
                }  
            };
        }
    });
})(jQuery);