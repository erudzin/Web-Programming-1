(function ($) {
  //Page Load
  var requestConfig = {
    method: "GET",
    url: "http://api.tvmaze.com/shows",
  };
  //AJAX call
  $.ajax(requestConfig).then(function (responseMessage) {
    //Append each show as list item in the UL
    $.each(responseMessage, function (index, element) {
      $("#showList").append(
        `<li><a class="linkToShow" href='${element._links.self.href}'>${element.name}</a></li>`
      );
    });

    $(".linkToShow").on("click", function (event) {
      linkClicked(event);
    });

    $("#show").hide();

    $("#homeLink").hide();

    $("#showList").show();
  });

  //Search Form Submission
  //https://api.jquery.com/submit/
  $("#searchForm").submit(function (event) {
    //Prevent default
    event.preventDefault();

    var searchTerm = $("#search_term").val();
    if (!$(searchTerm) || searchTerm.trim() == "") {
      alert("Search term is empty or whitespace. Please try again.");
    } else {
      var requestConfig = {
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + searchTerm,
      };

      //empty showList
      $("#showList").empty();
      //AJAX call
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log("in request");
        //Append each show as list item in the UL
        $.each(responseMessage, function (index, element) {
          $("#showList").append(
            `<li><a class="linkToShow" href='${element.show._links.self.href}'>${element.show.name}</a></li>`
          );
        });

        $(".linkToShow").on("click", function (event) {
          linkClicked(event);
        });

        $("#show").hide();

        $("#homeLink").show();

        $("#showList").show();
      });
    }
  });

  //Link Clicked
  function linkClicked(event) {
    console.log("link clicked");
    event.preventDefault();

    $("#showList").hide();

    $("#show").empty();

    var requestConfig = {
      method: "GET",
      url: event.target.href,
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      // parse through the show data returned from the AJAX request
      // check if all the elements are valid
      var img, name, language, rating, network, summary, genres;

      //img
      if (!responseMessage.image) {
        img = "/public/no_image.jpeg";
      } else {
        if (!responseMessage.image.medium) {
          img = "/public/no_image.jpeg";
        } else {
          img = responseMessage.image.medium;
        }
      }

      // name
      if (!responseMessage.name || responseMessage.name.trim() == "") {
        name = "N/A";
      } else {
        name = responseMessage.name;
      }

      //language
      if (!responseMessage.language || responseMessage.language.trim() == "") {
        language = "N/A";
      } else {
        language = responseMessage.language;
      }

      //rating
      if (!responseMessage.rating) {
        rating = "N/A";
      } else {
        if (!responseMessage.rating.average) {
          rating = "N/A";
        } else {
          rating = responseMessage.rating.average;
        }
      }

      //network
      if (!responseMessage.network) {
        network = "N/A";
      } else {
        if (
          !responseMessage.network.name ||
          responseMessage.network.name.trim() == ""
        ) {
          network = "N/A";
        } else {
          network = responseMessage.network.name;
        }
      }

      //summary
      if (!responseMessage.summary || responseMessage.summary.trim() == "") {
        summary = "N/A";
      } else {
        summary = responseMessage.summary;
      }

      //genres
      genresString = "";
      if (responseMessage.genres.length == 0) {
        genresString = "N/A";
      } else {
        genres = responseMessage.genres;
        genresString = "";
        for (let i = 0; i < genres.length; i++) {
          genresString += `<li>${genres[i]}</li>`;
        }
      }

      //add to show elememt
      $("#show").append(`<h1>${name}<h1>
				<img src="${img}"/>
				<dl>
					<dt>Language</dt>
					<dd>${language}</dd>
					<dt>Genres</dt>
          <dd>
					  <ul>
                ${genresString}
            </ul>
          </dd>
					<dt>Average Rating</dt>
					<dd>${rating}</dd>
					<dt>Network</dt>
					<dd>${network}</dd>
					<dt>Summary</dt>
					<dd>${summary}</dd>`);
    });
    $("#show").show();

    $("#homeLink").show();
  }
})(window.jQuery);
