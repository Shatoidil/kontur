
$('#cityInput').on('input', function() {
    init();
    let userInput = $(this).val();
    let search = '';

    if(userInput.length > 2) {
            search = cities.filter(
            function(value){
                return value.City.toUpperCase().includes(userInput.toUpperCase());
            }
        )
        if (search === undefined || search.length == 0) {
                $('.result').remove();
                $('#citiesResult').removeClass('results transition hidden')
                .addClass('results transition visible')
                .css('display: block !important');

                $('#citiesResult').append( '<a class="result">' 
                + '<div class="content"><div class="title">' 
                + 'Ничего не найдено' + '</div></div></a>' );
            } 
        else {
                $('.result').remove();
                $('#citiesResult').removeClass('results transition hidden')
                .addClass('results transition visible')
                .css('display: block !important');

 
            
                search.forEach(element => {
                    $('#citiesResult').append( '<a class="result">' 
                    + '<div class="content"><div class="title">' 
                    + element.City + '</div></div></a>' );
                });
            }  
        }
    else {
        $('#citiesResult').removeClass('results transition visible')
        .addClass('results transition hidden')
        .css('display: block !important');
    }

});


$('#citiesResult').on('click', '.result', function(){
    $('#cityInput').val($(this).text());
    $('#citiesResult').removeClass('results transition visible')
    .addClass('results transition hidden')
    .css('display: block !important');
});