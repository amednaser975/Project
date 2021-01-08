var jsObj        
var temp;
var movies = [];
var moviesSortedBySeeds = []
var Movie=function(ti,post,see,tim,rat,gen,dat){ //Movie Class
    var title = ti;
    var poster = post;
    var popularity = see;
    var time = tim;
    var rating = rat;
    var genres = gen;
    var date = dat;
    Object.defineProperties(this,{
        getTitle:{
              value:function()
              {
                  return title;
              }
          },
         getPoster:{
            value:function()
            {
                return poster;
            }
        },
         getPopularity:
         {
             value:function()
             {
                return popularity;
             }
         },
         getTime:
         {
             value:function()
             {
                 return time;
             }
         },
         getRating:
         {
             value:function()
             {
                 return rating;
             }
         },
         getGenrs:
         {
             value:function()
             {
                 return genres;
             }
         },
         getDate:
         {
             value:function()
             {
                 return date;
             }
         }
         
       })
    
}
var genersArr = [];
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
//xhr.open("GET","https://imdb8.p.rapidapi.com/title/auto-complete");
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4)
        if (xhr.status >= 200 && xhr.status < 300) {

                jsObj = JSON.parse(xhr.responseText);
                var prefix = 'https://image.tmdb.org/t/p/w500'
                //var movies = [];
                //var moviesSortedBySeeds = []
                var pp =0 ;
                var lk = 0;
                for(i=0;i<jsObj['results'].length;i++)
                {   
                    var relDate = jsObj['results'][i]['release_date'];
                    var relDate = relDate.replaceAll('-','.');

                    var ti = jsObj['results'][i]['title'];
                    var im= prefix+jsObj['results'][i]['poster_path'];
                    var popu =jsObj['results'][i]["popularity"];
                    var time = new Date(relDate).getTime()/1000;
                    var rat =jsObj["results"][i]['vote_average']
                    var genIds = jsObj["results"][i]['genre_ids']
                    var dat = jsObj['results'][i]['release_date']
                    dat = dat.substr(0,4)
                    console.log(dat)
                    var gens=[];
                    gens=getGenreName(genIds)

                    var m = new Movie(ti,im,popu,time,rat,gens,dat)
                    movies.push(m);
                    moviesSortedBySeeds.push(m)
                    
                }
                //console.log(lk*19*20)

                for(i=0;i<moviesSortedBySeeds.length-1;i++)
                {
                    for(j=0;j<moviesSortedBySeeds.length-i-1;j++)
                    {
                        if(moviesSortedBySeeds[j+1].getPopularity()>moviesSortedBySeeds[j].getPopularity())
                        {
                            var temp = moviesSortedBySeeds[j];
                            moviesSortedBySeeds[j] = moviesSortedBySeeds[j+1];
                            moviesSortedBySeeds[j+1] =temp;
                        }
                    }
                }
                //console.log(moviesSortedBySeeds)
                 var len = movies.length;
                 var f = len;
                 var countt = 0;
                 for(j=0;j<5;j++)
                 {   
                     var row = document.createElement('tr');
                     $('#pop').append(row);
                     for( i =0;i<4;i++)
                     {   
                        //console.log(countt)

                         //var im= jsObj['data']['movies'][countt]['large_cover_image'];
                         //var title= jsObj['data']['movies'][countt]['title'];
                         //console.log(im)
                         var genn=''
                         //var len = 
                         //console.log(moviesSortedBySeeds[countt].getGenrs()[0])
                         for(k =0;k<moviesSortedBySeeds[countt].getGenrs().length;k++)
                         {
                             genn = genn+moviesSortedBySeeds[countt].getGenrs()[k]['name']+'<br>'
                             /*if(moviesSortedBySeeds[countt].getGenrs().length>3&&k==1)
                             {
                                 genn = genn +'<br>'
                             }*/
                         }
                         var col = document.createElement('td');
                         col.innerHTML = '<a href=""><div class="container"><img id="iii" src='+moviesSortedBySeeds[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span><p class="ra">'+moviesSortedBySeeds[countt].getRating()+'/10'+'</p><p classs="gen">'+genn+'</p><input type="button" class="button" value="View Details"></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+moviesSortedBySeeds[countt].getTitle()+'</h5></a><p>'+moviesSortedBySeeds[countt].getDate()+'</p></div></a>'
                         //col.innerHTML = '<td><div class="container"><img src="/images/111.jpg" alt=""><div class="layer" style="text-align: center;"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span></div><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">Spider-Man: Into the Spider-Vers</h5></a><p>2018</p></div></td>'
                         //$('table').append(row);
                         //$('table').children().last().append(col);
                         row.append(col);
                         $('#pop').append(row);
                         countt++;
                         

                     }
                 }
                 for(i=0;i<movies.length-1;i++)
                 {
                     for(j=0;j<movies.length-i-1;j++)
                     {
                         if(movies[j+1].getTime()>movies[j].getTime())
                         {
                             var temp = movies[j];
                             movies[j] = movies[j+1];
                             movies[j+1] =temp;
                         }
                     }
                 }
                 //console.log(movies)
                 countt = 0;
                 for(j=0;j<5;j++)
                 {   
                     
                     var row = document.createElement('tr');
                     $('#late').append(row);
                     for( i =0;i<4;i++)
                     {   
                         //var im= jsObj['data']['movies'][countt]['large_cover_image'];
                         //var title= jsObj['data']['movies'][countt]['title'];
                         //console.log(im)
                         var col = document.createElement('td');
                         col.innerHTML = '<a href=""><div class="container"><img id="iii" src='+movies[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span><p class="ra">'+movies[countt].getRating()+'/10'+'</p><p class="gen">'+genn+'</p><input type="button" class="button" value="View Details"></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+movies[countt].getTitle()+'</h5></a><p>'+movies[countt].getDate()+'</p></div></a>'
                         //col.innerHTML = '<a href=""><div class="container"><img src='+movies[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+movies[countt].getTitle()+'</h5></a><p>2018</p></div></a>'
                         //col.innerHTML = '<td><div class="container"><img src="/images/111.jpg" alt=""><div class="layer" style="text-align: center;"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span></div><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">Spider-Man: Into the Spider-Vers</h5></a><p>2018</p></div></td>'
                         //$('table').append(row);
                         //$('table').children().last().append(col);
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
/*
<a href="">
    <div class="container">
        <img src='+moviesSortedBySeeds[countt].getPoster()+' alt="">
            <div class="layer" style="text-align: center;"></div>
            <span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span>
            <a style="text-align: center;" href="#">
                <h5 style="margin-top: 3px;">'+moviesSortedBySeeds[countt].getTitle()+'</h5>
            </a>
            <p>2018</p>
    </div>
</a>*/

/*The mouseleave event differs from mouseout in the way it handles event bubbling. 
If mouseout were used in this example, then when the mouse pointer moved out of the Inner element,
the handler would be triggered. This is usually undesirable behavior. 
The mouseleave event, on the other hand, only triggers its handler when the mouse leaves the element it is bound to, not a descendant.
So in this example, the handler is triggered when the mouse leaves the Outer element,
but not the Inner element.*/