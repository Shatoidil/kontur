(function($) {
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
      



            $.getJSON(options.url).done(
                function(data) { 
                    loadedData = data;
                }
            );

            results.on("click", ".result", function() {
                input.val($(this).text())
                .attr('city_id', $(this).closest('a').attr('city_id'));
                showOrHideResultsDiv(showDivs = false);
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
                            showOrHideResultsDiv(showDivs = true);
                            showAnimation = false;
                        }
                        
                        // очистка поиска
                        $(".result").remove();



                    }
                    else{
                        if(showAnimation){
                            showOrHideResultsDiv(showDivs = true);
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
                    showOrHideResultsDiv(showDivs = false);
                    showAnimation = true;
                }

            });
            function showOrHideResultsDiv(showDivs) {
                if(showDivs){
                    results.attr('class', 'results').transition('scale');
                }
                else{
                    results.attr('class', 'results').hide();
                }
            
            };
            
        }



    });
})(jQuery);