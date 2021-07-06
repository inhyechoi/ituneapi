$(function() {

    $('form').on('submit', function() {
               event.preventDefault(); // stops page refresh
               $('.album-list').empty(); // clears list if searching again
               $('.album-list').append('<h1 class="h1loading">Gimmie a sec...</h1>'); 
                // while geting data show a loading message

                var input = $('#artist-name').val();
                //you can add .replace(/ /g, '+'); after val()
                // Jay Z 
                // sets var of input to be whats in the text box 
                input = input.replace(/ /g,'+');
                // looking for blank spaces and changing to +, so iTunes doesnt get                    confused
              // Jay+Z
                console.log(input);
                event.preventDefault();

                var $albumList = $('.album-list');

                $.ajax({
               method: 'GET',
               dataType: 'jsonp',
               url: 'https://itunes.apple.com/search?entity=album&limit=6&term='+input,
                       })

               .done(function(data) {
                  // when the ajax call is done, were going to run this 
                  // function and pass in the data we recieved 
                 var albumData = '';


                  
                  if (data.resultCount !== 0) {

                  
                          $.each(data.results, function (index, value) {
                          	//getting into an array


                          	albumData += '<div class="results_wrap">';

                          	albumData += value.collectionName;

                          	albumData += '<img src="' +value.artworkUrl100+ '">';

                          	albumData += '</div>';

// '<div class="results_wrap"><h1 class="h1result">'+value.collectionName+'</h1><img src='+value.artworkUrl100+' /></div>'

                       

                           })
                }else {
                	$('.album-list').append('<h1 class="h1result">Couldnt find anything, Yo</h1>');
                }  


                  $('.album-list').append(albumData);
                }).fail(function() {
                  alert('FAIL!');                 
                }).always(function(){
                $('.h1loading').hide();

               })
      
      
                    
           });
     
 });
    

    
    
  

