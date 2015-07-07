
$(function() {



  var $spotifySearch = $('#spotify-search');

  var $track = $('#track');

  var $results = $('#results');


  var $loading = $('#loading');


  var trackTemplate = _.template($('#track-template').html());

  
  $spotifySearch.on('submit', function(event) {
    event.preventDefault();


    $results.empty();
    $loading.show();

    var searchTrack = $track.val();

    var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

  
    $.get(searchUrl, function(data) {

    
      var trackResults = data.tracks.items;
      console.log(trackResults);

     
      $loading.hide();

      
      if (trackResults.length > 0) {

        _.each(trackResults, function(result, index) {
          
      
          var templateData = {
            albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
            artist: result.artists[0].name,
            name: result.name,
            previewUrl: result.preview_url
          };

       
          var $trackResult = $(trackTemplate(templateData));
          $results.append($trackResult);
        });

     
      } else {
        $results.append('Oops!');
      }
    });


  
    $spotifySearch[0].reset();
    $track.focus();

  });


});
