
$(document).ready(function() {

    let cities, search, userInput;

    $.getJSON("https://rawgit.com/Shatoidil/kontur/master/kladr.json")
                   .done(function(data) {
                    cities = data;
                    });

    $('#cityInput').on('input', function() {
        
        userInput = $(this).val();

        if(userInput.length > 2) {

            search = cities.filter(
                function(value){
                    return value.City.toUpperCase().includes(userInput.toUpperCase());
                }
            )
            if (search === undefined || search.length == 0) {

                    showOrHide(true);
                    $('.result').remove();
                    $('#citiesResult').append( '<a class="result">' 
                    + '<div class="content"><div class="title">' 
                    + 'Ничего не найдено' + '</div></div></a>' );
                } 
            else {

                    $('.result').remove();
                    showOrHide(true);
                    search.forEach(element => {
                        $('#citiesResult').append( '<a class="result">' 
                        + '<div class="content"><div class="title">' 
                        + element.City + '</div></div></a>' );
                    });
                }  
            }
        else {

            showOrHide(false);
        }
    
    });
    
    
    $('#citiesResult').on('click', '.result', function(){
        $('#cityInput').val($(this).text());
        showOrHide(false);
    });

    function showOrHide(switchState){
        if(switchState) {

            return $('#citiesResult').removeClass('results transition hidden')
           .addClass('results transition visible')
           .css('display: block !important');
        }
        else{

            return $('#citiesResult').removeClass('results transition visible')
            .addClass('results transition hidden')
            .css('display: block !important');
        }
    }

});
