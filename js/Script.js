var jsObj        
var temp;
var movies = [];
var moviesSortedBySeeds = []
var popu=[];
var genersArr = [];
var time = [];
$( document ).ready(function() {
 


var xhrSearch = new XMLHttpRequest();
xhrSearch.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US");
xhrSearch.send();
xhrSearch.onreadystatechange = function (e) {
    if(this.readyState == 4 && this.status == 200 ) {
        genersArr = (JSON.parse(this.responseText)).genres;
        }
    }


function getGenreName(genderId)
{    
    var ret=[]
     for(j=0;j<genderId.length;j++)
     {
        for(var i = 0 ; i < genersArr.length ; i++)
        {
            if(genersArr[i].id == genderId[j])
            {
                  ret.push(genersArr[i]) 
            }
        }
    }
    return ret;
}


var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page=1https://yts.mx/api/v2/list_movies.json");
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4)
        if (xhr.status >= 200 && xhr.status < 300) {

                jsObj = JSON.parse(xhr.responseText);
                var prefix = 'https://image.tmdb.org/t/p/w500'
                var pp =0 ;
                var lk = 0;
                for(i=0;i<jsObj['results'].length;i++)
                {   
                    var relDate = jsObj['results'][i]['release_date'];
                    var relDate = relDate.replaceAll('-','.');
                    console.log(relDate)
                    var ti = jsObj['results'][i]['title'];
                    var im= prefix+jsObj['results'][i]['poster_path'];
                    popu.push(jsObj['results'][i]["popularity"])
                    var ttime = new Date(relDate).getTime()/1000;
                    time.push(ttime);
                    console.log(ttime)

                    var rat =jsObj["results"][i]['vote_average']
                    var genIds = jsObj["results"][i]['genre_ids']
                    var dat = jsObj['results'][i]['release_date']
                    var id = jsObj['results'][i]['id'];
                    var overV = jsObj['results'][i]['overview']
                    var lang = jsObj['results'][i]['original_language']
                    dat = dat.substr(0,4)
                    //console.log(dat)
                    var gens=[];
                    gens= (getGenreName(genIds))
                    var m = new Movie(id,ti,dat,rat,gens,overV,im,lang)
                    movies.push(m);
                    moviesSortedBySeeds.push(m)
                    
                }

                for(i=0;i<moviesSortedBySeeds.length-1;i++)
                {
                    for(j=0;j<moviesSortedBySeeds.length-i-1;j++)
                    {
                        if(popu[j+1]>popu[j])
                        {
                            var temp = moviesSortedBySeeds[j];
                            moviesSortedBySeeds[j] = moviesSortedBySeeds[j+1];
                            moviesSortedBySeeds[j+1] =temp;

                            var temp1 = popu[j];
                            popu[j] = popu[j+1];
                            popu[j+1] = temp1;
                            
                        }
                    }
                }
                 var len = movies.length;
                 var f = len;
                 var countt = 0;
                 for(j=0;j<5;j++)
                 {   
                     var row = document.createElement('tr');
                     $('#pop').append(row);
                     for( i =0;i<4;i++)
                     {   
                         var temp = moviesSortedBySeeds[countt].title;
                         var genn=''
                         for(k =0;k<moviesSortedBySeeds[countt].genre_ids.length;k++)
                         {  
                             genn = genn + moviesSortedBySeeds[countt].genre_ids[k]['name']+'<br>'
                         }
                         if(temp.length>32)
                         {
                           var temp= temp.substr(0,32);
                           temp = temp +'...';

                         }
                         var col = document.createElement('td');
                         col.setAttribute('class', 'movElm');

                         col.innerHTML = `
                         <a href="movieDetails.html?${moviesSortedBySeeds[countt].id}">
                         <div class="container"><img id="iii" src="${moviesSortedBySeeds[countt].poster_path}" alt="">
                          <div class="layer" style="text-align: center;"></div>
                          <h1 class="starr">
                          <span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
                          </span>
                          <p class="ra">${moviesSortedBySeeds[countt].vote_average}/10</p>
                          <p classs="gen">${genn}</p><input type="button" class="button" value="View Details">
                          </h1>
                          <a style="text-align: center;" href="movieDetails.html?${moviesSortedBySeeds[countt].id}"><h5 class="title" style="margin-top: 3px;">${temp}</h5></a><p class='datte'>${moviesSortedBySeeds[countt].release_date}</p></div>
                         </a>
                         
                         `
                         row.append(col);
                         $('#pop').append(row);
                         countt++;
                         

                     }
                 }
                 for(i=0;i<movies.length-1;i++)
                 {
                     for(j=0;j<movies.length-i-1;j++)
                     {
                         if(time[j+1]>time[j])
                         {
                             var temp = movies[j];
                             movies[j] = movies[j+1];
                             movies[j+1] =temp;

                             var temp1 = time[j];
                             time[j] = time[j+1];
                             time[j+1] = temp1;

                         }
                     }
                 }
                 countt = 0;
                 for(j=0;j<5;j++)
                 {   
                     
                     var row = document.createElement('tr');
                     $('#late').append(row);
                     for( i =0;i<4;i++)
                     {   

                        var temp = movies[countt].title;
                        var genn=''
                        for(k =0;k<movies[countt].genre_ids.length;k++)
                        {  
                            genn = genn + movies[countt].genre_ids[k]['name']+'<br>'
                        }
                        if(temp.length>32)
                        {
                          var temp= temp.substr(0,32);
                          temp = temp +'...';

                        }
                         var col = document.createElement('td');
                         col.setAttribute('class', 'movElm');                         col.innerHTML = `
                         <a href="movieDetails.html?${movies[countt].id}">
                         <div class="container"><img id="iii" src="${movies[countt].poster_path}" alt="">
                          <div class="layer" style="text-align: center;"></div>
                          <h1 class="starr">
                          <span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
                          </span>
                          <p class="ra">${movies[countt].vote_average}/10</p>
                          <p classs="gen">${genn}</p><input type="button" class="button" value="View Details">
                          </h1>
                          <a style="text-align: center;" href="movieDetails.html?${movies[countt].id}"><h5 style="margin-top: 3px;" class="title">${temp}</h5></a><p class="datte">${movies[countt].release_date}</p></div>
                         </a>
                         
                         `

                         row.append(col);
                         $('#late').append(row);
                         countt++;
                     }
                 }
                 $(".layer").hide();
                 
                 $(".starr").hide();
                 $('a').hover(function(){  
                    $(this).children('[class=layer]').fadeIn("fast");
                    $(this).children('[class=starr]').fadeIn("fast");
                    $(this).children('[id=iii]').css("border-color", "#4CAF50");

                });
                $('a').mouseleave(function(){  
                    $(this).children('[class=layer]').fadeOut("fast");
                    $(this).children('[class=starr]').fadeOut("fast");
                    $(this).children('[id=iii]').css("border-color", "white");

                });


                 
        
        
        
        
        
                }
         else {
             console.log("PAGENOTFOUND");
         }           
     };
     //3) send req data-->POST
    xhr.send("");

    
    



    
    



    $('a').mouseout(function(){  
        //$(this).children('[class=layer]').fadeOut();
        
    });



 })
