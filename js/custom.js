$(document).ready(function(){


	// adding an event listener to when the user clicks one of the audio-icons
	$(document).on('click', ".audio_link" , function(){
		if (window.speechSynthesis.speaking == true)
		{
			window.speechSynthesis.cancel();
		}
		else
		{
			var title = $(this).attr("id");
			readHeadline(title);
		} 
	});

	voiceSelector = document.getElementById("voice");

	// event thats triggered when the voices are ready. Populates the voice selector with options
	window.speechSynthesis.onvoiceschanged = function(){
	voices = speechSynthesis.getVoices();
	voices.map(function(voice){
		var option = document.createElement('option');
		option.name = voice.name;
		option.innerHTML = voice.name;
		voiceSelector.appendChild(option);
	});

}

	// getting the web speech api to read the message, and fetching the choosen voice
	function readHeadline(input){	
	message = new SpeechSynthesisUtterance(input);
	message.voice = voices.filter(function(voice_alternative){ 
		return voice_alternative.name == voiceSelector.value; 
	})[0];
	window.speechSynthesis.speak(message);
	}


	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

	function renderArticles(articles, category) {
		var listItems = [];
		articles[category].map(function(article){
			var link  = '<a href="' +article.webUrl + '" id="link">'+article.webTitle +'</a>';
			var img   = '<img class="audio" src="img/audio.png">';
			var audio = '<a class="audio_link" id="' + article.webTitle  +  '">' +img +'</a>';
			var item  = '<li>' +link +audio + '</li>';
			listItems.push(item);
		})

		$("#myTab").append("<li id='" + category + "'class='active'><a href='#" + category + "' data-toggle='tab'>Added: " + category + "</a>" + '<i class="fa fa-times">' + "</i></li>");

		$("#myTabContent").append("<div class='tab-pane fade active in' id='" + category + "'><ol id = '" + category + "-articles'></ol></div>");

		var id = '#'+ category +'-articles'
		$(id).append(listItems.join(""));
		return;
	}

	function getArticles(category) {
		// tech articles
		$.ajax({
			url: "http://content.guardianapis.com/search?q=" + category + "&api-key=v2jpnga8trgw9x4p3u84yvrw",
			dataType: 'jsonp',
			success: function(json){
				articles[category] = json.response.results; // 
				renderArticles(articles, category);
			}
		});
	}

	categories.map(function(category) {
		getArticles(category);
	})


	// Adding tab functionality 
	$("#add").click(function(){

		var exists;
		var search = document.getElementById("input").value;
		var searchLower = search.toLowerCase();

		$("li").removeClass("active");
		$("div").removeClass("active in");

		for (var i=0; i<categories.length; i++){
			if (searchLower == categories[i]){
				exists = true;
				break;
			}
			else{
				exists = false;
			}		
		}
		
		if (exists)
		{

		//	$("li").addClass("active");

		//	$("#myTabContent").addClass("active in");
		}
		else
		{
			categories.push(searchLower);

		//	$("#myTab").append("<li class='active'><a href='#" + search + "' data-toggle='tab'>Added: " + search + "</a>" + '<i class="fa fa-times">' + "</i></li>");

		//	$("#myTabContent").append("<div class='tab-pane fade active in' id='" + search + "'><ol id = '" + search + "-articles'></ol></div>");

			getArticles(search);
		}

		$("#category").html("").append("#"+search);

	});

	//$(document).on("click", ".fa-times",function(){
	$("a").click(function(){

		var header =  $(this).attr("href");
		$("#category").html(header);

	});

	// closing a tab functionality
	
	// $(document).on("click", ".fa-times",function(){   //for elements inserted via jquery, use this document thing.  
	// 	$(this).parent().remove();
	// 	$("div").removeClass("active in");
	// 	$("#sport").click();
		
	// });
		

	

	$(document).on("click", ".fa-times",function(){   //for elements inserted via jquery, use this document thing.  
		
		console.log(categories);
	categories.splice( $.inArray(category, categories), 1 );  //this removes the search term from the categories array. 
		console.log(categories);

		
	});





	$("h1").click(function(){
		console.log(" sportclicked");
	});

	$("#sport").click(function(){
		console.log(" h1clicked");
	});


// end of JS
});


