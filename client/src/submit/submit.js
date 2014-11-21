SC_CLIENT_TOKEN = "b26f74f37982329cf2c257c10409ffa2";


$(function() {
    // Initialize third party libraries
    SC.initialize({
  		client_id: SC_CLIENT_TOKEN
	});

    // Declare variables
    var media = {};

    // Prepare display : 
    $("fieldset").eq(2).hide();
    $("div.loadingMessage").hide();


    $("input[name='source']").change(function(){
    	// Assign the source to the media object
    	media["source"] = $(this).val();
    });

    $("input[name='url'] ").change(function(){
    	// Assign the url to the media object
    	media["url"] = $(this).val();
    });

    $("#fetch").click(function(){
    	// Hide the artist information fieldset. 
    	$("div.loadingMessage").show();
    	retrieveInformation(media,function(){
    		$("div.loadingMessage").hide();
    		$("fieldset").eq(2).show();
    	});

    })


});


function retrieveInformation(media,cb){
   	if (media.source && media.url){ // If the user correctly filled the source and the url
		/*
		* TODO : Undelegate events
		*/
		console.log("Fecthing the information");
		retrieveArtistInformation(media,function(err,infos){
			if (err){
				console.log("Error")
				cb(err);
			}
			else{
				findArtistinDB(infos.artist, function(result){
					if (result.found){ // The artist exists in the DB
						console.log("The artist exists in the DB");
						$("input[name='artistname']").hide(); // No need to manually enter the name of the artist.
						$("option[value='"+result.artist._id+"']").prop('selected',true);
						fillFormInputWithArtistData(infos);
						cb(null);
					}
					else { // The artist should be added to the DB
						console.log("You should create a new artist");
						$("input[name='artist']").hide(); // Hide the select
						$("input[name='artistname']").val(infos.artist); // Fill the input for the artist name
						fillFormInputWithArtistData(infos);
						cb(null);
					}
				})
			}
		})

	}
	else {
		// Focus the user on the missing point
		if (!media.source){ // Missing source

			$("input[name='source']").focus();
		}
		else { // Missing url

			$("input[name='url']").focus();
		}
	}
}

function retrieveArtistInformation(media,cb){
	if (media.source == "soundcloud"){
		console.log("Soundcloud");
		getInformationFromSoundcloud(media,cb);
	}
	else if (media.source == "youtube"){
		console.log("Youtube");
		getInformationFromYoutube(media,cb);
	}	
	else{
		console.log("Error");

	}
}

function getInformationFromSoundcloud(media,cb){
	SC.get('/resolve', { url: media.url }, function(track) {
		if (track){
			var infos = parseSoundCloudInformation(track);
			cb(null,infos);
		}
		else{
			cb("Error while contacting Soundcloud");
		}
	});
}

function parseSoundCloudInformation(track){
	var infos = {
		'title' : track.title,
		'album' : null,
		'artist' : track.user.username,
		'producer' : track.user.username // Fix it in v2
	}

	return infos;
}

function getInformationFromYoutube(media,cb){
}

function findArtistinDB(name,cb){
	$.get( "/artist/search/" + name, function( data ) {
		cb(data);
	});
}

function fillFormInputWithArtistData(infos){
	$("input[name='title']").val(infos.title);
}