
    var tableBody = document.getElementById("tableBody");
    var myBtn = $("#pagination ul li input");
    var listOfMovies = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://yts.mx/api/v2/list_movies.json?limit=50");
    xhr.send();
    xhr.onreadystatechange = function () {
        if(this.readyState = 4 && this.status == 200 ) {
            fetchMoviesData((JSON.parse(this.responseText)).data.movies);
        }
    }
    function fetchMoviesData(movieList) {
        for (var i = 0; i < movieList.length; i++) {
            listOfMovies.push(new Movie(movieList[i].id, movieList[i].title, movieList[i].year, 
                movieList[i].rating, movieList[i].runtime, movieList[i].genres, movieList[i].summary,
                movieList[i].medium_cover_image, movieList[i].language, movieList[i].torrents, movieList[i].date_uploaded))
        }
        displayMovies(0, 10);
    }
    function displayMovies(start, limit) {
        
        console.log(listOfMovies);
        tableBody.innerHTML = "";
        for (var i = start; i < limit; i+=4) {
            
            tableBody.innerHTML += `<tr>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfMovies[i].backgroundImg!= undefined?listOfMovies[i].backgroundImg: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i].rating}</p>
                                                        <p>${listOfMovies[i].genres != undefined? listOfMovies[i].genres[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfMovies[i].title}</p>
                                                    <p>${listOfMovies[i].year}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfMovies[i+1].backgroundImg!= undefined?listOfMovies[i+1].backgroundImg: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+1].rating}</p>
                                                        <p>${listOfMovies[i+1].genres != undefined? listOfMovies[i+1].genres[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                <p>${listOfMovies[i+1].title}</p>
                                                <p>${listOfMovies[i+1].year}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfMovies[i+2].backgroundImg!= undefined?listOfMovies[i+2].backgroundImg: ""}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+2].rating}</p>
                                                        <p>${listOfMovies[i+2].genres != undefined? listOfMovies[i+2].genres[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfMovies[i+2].title}</p>
                                                    <p>${listOfMovies[i+2].year}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                        <div class="movie">
                                            <div class="imgPart">
                                                <img src="${listOfMovies[i+3].backgroundImg!= undefined?listOfMovies[i+3].backgroundImg: ""}" alt=""/>
                                                <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfMovies[i+3].rating}</p>
                                                        <p>${listOfMovies[i+3].genres != undefined? listOfMovies[i+3].genres[0]: "Ahmed"}</p>
                                                        <div><input type="button" value="View Details"></div>
                                                    </div>
                                            </div>
                                            <div class="textPart">
                                                <p>${listOfMovies[i+3].title}</p>
                                                <p>${listOfMovies[i+3].year}</p>
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
        var btnVal = parseInt(e.target.value);  
        console.log(btnVal);
        $("li").removeClass("active");
        $(this).parent().addClass("active");
        btnVal--;
        displayMovies(11*btnVal, (10*btnVal)+12);
    })
