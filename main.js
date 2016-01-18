(function(){
	//Array to store the objects of the response.
	var news = [];

	//Function to inicialize de APP
	function startApp () {
		//Requesting data API and invoke storeData function that store the objects in news array.
		$.getJSON('http://www.freecodecamp.com/news/hot', storeData);
		//Delay waiting for the server response 
		
	}

	//Store data in 'news' variable
	function storeData (data) {
		news = data;
		iterarNews();
	}

	//Assign data item to temporary object.
	function createItemTemp (item) {
		var item = item;
		//Temporary object.
		var itemTemp = {};
		//Author name.
		itemTemp.username = item.author.username;
		//Author avatar.
		itemTemp.avatar = item.author.picture;
		//Author url of freeCodeCamp profile.
		itemTemp.userUrl = "http://www.freecodecamp.com/" + itemTemp.username;
		//HeadLine of the post.
		itemTemp.headline = item.headline;

		//If the headline is too long to fit 28 characters.
		if (itemTemp.headline.length > 20) {
	    itemTemp.headline = itemTemp.headline.substring(0, 25);
	    itemTemp.headline += '...';
	  }
	  //Url post.
		itemTemp.link = item.link;
		//Post rank
		itemTemp.rank = item.rank;

		//Posted date
		var fecha = item.timePosted; //Assign the time of publication to a variable in UNIX time in milliseconds.
		fecha = new Date(fecha); //Create an object date
		fecha = fecha.toDateString(); // Return the part of the date English
		itemTemp.timeposted = fecha; // Assign a temporary object timeposted property.

		//Render 
		renderTemplate(itemTemp);
	}

	//Iterate the 'news' array 
	function iterarNews () {
		for (var i = 0; i < news.length; i++) {
			createItemTemp (news[i]);
			//Handlebars option
		}
	}
		
	function renderTemplate (item) {
		// console.log(item);
		// Grab the template script
	  var theTemplateScript = $("#news-item-template").html();

	  // Compile the template
	  var theTemplate = Handlebars.compile(theTemplateScript);

	  // Define our data object
	  var context= item;

	  // Pass our data to the template
	  var theCompiledHtml = theTemplate(context);

	  // Add the compiled html to the page
	  $('.news').append(theCompiledHtml);
	}



	startApp();



})();