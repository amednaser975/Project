
    var tableBody = document.getElementById("tableBody");
    var myBtn = $("#pagination ul li input");
    var listOfMovies = [];
    var paginitionBtn9 = $("#paginitionBtn").clone();
    paginitionBtn9.children("input").val("9");
    var paginitionBtn10 = $("#paginitionBtn").clone();
    paginitionBtn10.children("input").val("10");
    var currentPage = 1;
    var totalNumMovies = $("#totalNumMovies");
    var imgPrefix = "https://image.tmdb.org/t/p/w500/";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page="+currentPage);
    xhr.send();
    xhr.onreadystatechange = function (e) {
        if(this.readyState == 4 && this.status == 200 ) {
            fetchMoviesData((JSON.parse(this.responseText)).results);
            totalNumMovies.text((JSON.parse(this.responseText)).total_results)
        }
    }
    function fetchMoviesData(movieList) {
        listOfMovies = [];
        for (var i = 0; i < movieList.length; i++) {
            listOfMovies.push(new Movie(movieList[i].id, movieList[i].title, movieList[i].release_date, 
                movieList[i].vote_average, movieList[i].genre_ids, movieList[i].overview,
                movieList[i].poster_path, movieList[i].original_language))
        }
        displayMovies();
    }
    function displayMovies() {
        console.log(listOfMovies)
        tableBody.innerHTML = "";
        for (var i = 0; i < listOfMovies.length; i+=5) {
            
            tableBody.innerHTML += `<tr>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${imgPrefix+listOfMovies[i].poster_path!= undefined?imgPrefix+listOfMovies[i].poster_path: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i].vote_average}</p>
                                                        <p>${listOfMovies[i].genre_ids != undefined? listOfMovies[i].genre_ids[0]: "Ahmed"}</p>
                                                        <div><a href="../movieDetails.html" target="_blank" class="MovieDetails">View Details</a><input type="hidden" value="${listOfMovies[i].id}"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfMovies[i].title}</p>
                                                    <p>${listOfMovies[i].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${imgPrefix+listOfMovies[i+1].poster_path!= undefined?imgPrefix+listOfMovies[i+1].poster_path: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+1].vote_average}</p>
                                                        <p>${listOfMovies[i+1].genre_ids != undefined? listOfMovies[i+1].genre_ids[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                <p>${listOfMovies[i+1].title}</p>
                                                <p>${listOfMovies[i+1].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${imgPrefix+listOfMovies[i+2].poster_path!= undefined?imgPrefix+listOfMovies[i+2].poster_path: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+2].vote_average}</p>
                                                        <p>${listOfMovies[i+2].genre_ids != undefined? listOfMovies[i+2].genre_ids[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfMovies[i+2].title}</p>
                                                    <p>${listOfMovies[i+2].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                        <div class="movie">
                                            <div class="imgPart">
                                                <img src="${imgPrefix+listOfMovies[i+3].poster_path!= undefined?imgPrefix+listOfMovies[i+3].poster_path: ""}" alt=""/>
                                                <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+3].vote_average}</p>
                                                        <p>${listOfMovies[i+3].genre_ids != undefined? listOfMovies[i+3].genre_ids[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                            </div>
                                            <div class="textPart">
                                                <p>${listOfMovies[i+3].title}</p>
                                                <p>${listOfMovies[i+3].release_date}</p>
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${imgPrefix+listOfMovies[i+4].poster_path!= undefined?imgPrefix+listOfMovies[i+4].poster_path: ""}" alt=""/>
                                                    <div class="shadow">
                                                            <p><i class="fas fa-star"></i></p>
                                                            <p>${listOfMovies[i+4].vote_average}</p>
                                                            <p>${listOfMovies[i+4].genre_ids != undefined? listOfMovies[i+4].genre_ids[0]: "Ahmed"}</p>
                                                            <div><input type="button" value="View Details"></div>
                                                        </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfMovies[i+4].title}</p>
                                                    <p>${listOfMovies[i+4].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>`;
        }
    }
    $("#tableBody").on("mouseenter mouseleave", ".imgPart", function () {
        $(this).parent().toggleClass("active");
        $(this).children(".shadow").fadeToggle(300);
        // $(this).children(".shadow").children("div").slideToggle(300);
    });
    $(".imgPart").hover(function () {
        $(this).parent().addClass("active");
        $(this).children(".shadow").fadeIn(300);
            
        }, function () {
            $(this).parent().removeClass("active");
            $(this).children(".shadow").fadeOut(300);
        }
    );

    myBtn.on("click", function (e) {
        var btnVal = e.target.value;  
        console.log(btnVal);
        if(isFinite(btnVal)) {
            currentPage = parseInt(btnVal);
            $("li").removeClass("active");
            $(this).parent().addClass("active");
            if(currentPage <= 999) {
                $("#nextBtn").removeClass("hidden");
                $("#lastBtn").removeClass("hidden");
            }
            if(currentPage == 7) {
                paginitionBtn9.insertAfter($("input[value=8]").parent());
                paginitionBtn10.insertAfter($("input[value=9]").parent());
                $("input[value="+3+"]").val("...");
            } else if(currentPage < 7) {
                $("input[value='...']:eq(0)").val("3");
            }
            if(parseInt($(this).val()) >= 8) {
                $("li input").each(function() {
                    if(parseInt($(this).val()) >= 4 && parseInt($(this).val()) <= 998) {
                        // var test = parseInt($(this).val()) - parseInt($("li.active input").val());
                        // console.log(test)
                        $(this).val(parseInt($(this).val()) + 1);
                    }
                  });
                  $("li").removeClass("active");
                  $(this).parent().prev().addClass("active");
            } else {
                // $("li input").each(function( index ) {
                //     if(parseInt($(this).val()) >= 4 || parseInt($(this).val()) <= 998) {
                //         $(this).val(parseInt($(this).val())-1);
                //     }
                //   });
                //   $("li").removeClass("active");
                //   $(this).parent().prev().addClass("active");
            }
            if(currentPage == 2) {
                $("#prevBtn").removeClass("hidden");
            }
            else if(currentPage == 1) {
                $("#firstBtn").addClass("hidden");
                $("#prevBtn").addClass("hidden");
            }
            else if(currentPage == 1000) {
                $("#nextBtn").addClass("hidden");
                $("#lastBtn").addClass("hidden");
                $("#firstBtn").removeClass("hidden");
                $("#prevBtn").removeClass("hidden");
            }
            else if(currentPage > 2) {
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            else {
                $("#prevBtn").addClass("hidden");
                $("#firstBtn").addClass("hidden");
            }
        } else {
            if(btnVal == '« First') {
                currentPage = 1;
                $("#firstBtn").addClass("hidden");
                $("#prevBtn").addClass("hidden");
            }
            else if(btnVal == '« Previous') {
                currentPage--;
                if(currentPage < 7) {
                    $("input[value='...']").val("3");
                    $("input[value='3']").css("cursor", "pointer");
                }
                if(currentPage == 1) {
                    $("#prevBtn").addClass("hidden"); 
                    $("#firstBtn").addClass("hidden"); 
                }
            }
            else if(btnVal == 'Last »') {
                currentPage = 1000;
                $("#nextBtn").addClass("hidden");
                $("#lastBtn").addClass("hidden"); 
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            else if(btnVal == 'Next »') {
                currentPage++;
                if(currentPage == 1000) {
                    $("#nextBtn").addClass("hidden");
                    $("#lastBtn").addClass("hidden");   
                } else if(currentPage == 999)
                    $("#lastBtn").addClass("hidden");
                if(currentPage >= 7) {
                    paginitionBtn9.insertAfter($("input[value="+8+"]").parent());
                    paginitionBtn10.insertAfter($("input[value="+9+"]").parent());
                    $("input[value="+3+"]").val("...");
                    $("input[value='...']").css("cursor", "not-allowed");
                }
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            $("li").removeClass("active");
            $("input[value="+currentPage+"]").parent().addClass("active");
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page="+currentPage);
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if(this.readyState == 4 && this.status == 200 ) {
                fetchMoviesData((JSON.parse(this.responseText)).results);
            }
        }
    })

    var MovieDetails;
    var movieImg = $("#movieImg");
    console.log("tag",movieImg);
    var titleMovie = $("#titleMovie");
    var release_dateMovie = $("#release_dateMovie");
    var geners = $("#geners");
    var movieLikes = $("#movieLikes");
    var movieAudience = $("#movieAudience");
    var movieRate = $("movieRate");
    var movieSynopsis = $("#movieSynopsis");
    var movieUploadedDate = $("#movieUploadedDate");

    $("#tableBody").on("click" , ".MovieDetails" , function(){
        var movieID = $(this).next().val();  // ID Of Movie
        var xhrMovieDetails = new XMLHttpRequest();
        xhrMovieDetails.open("GET", "https://yts.mx/api/v2/movie_details.json?movie_id=" + movieID);
        xhrMovieDetails.send();
        xhrMovieDetails.onreadystatechange = function () {
            if(this.readyState = 4 && this.status == 200 ) {
                MovieDetails = (JSON.parse(this.responseText)).data.movie;    
                console.log("back",MovieDetails.medium_cover_image); 
                console.log("uuuuuuu",MovieDetails); 
                console.log("tag",movieImg);
                movieImg.src = MovieDetails.medium_cover_image;
            }
    }});

   