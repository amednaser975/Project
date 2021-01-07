var jsObj        
var temp;
var Movie=function(ti,post,see,tim,rat){ //Movie Class
    var title = ti;
    var poster = post;
    var seeds = see;
    var time = tim;
    var rating = rat;
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
         getSeeds:
         {
             value:function()
             {
                return seeds;
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
         
       })
    
}
$( document ).ready(function() {
  



var xhr = new XMLHttpRequest();
xhr.open("GET", "https://yts.mx/api/v2/list_movies.json");
//xhr.open("GET","https://imdb8.p.rapidapi.com/title/auto-complete");
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4)
        if (xhr.status >= 200 && xhr.status < 300) {

                jsObj = JSON.parse(xhr.responseText);

                var movies = [];
                var moviesSortedBySeeds = []
                for(i=0;i<jsObj['data']['movies'].length;i++)
                {   
                    var ti = jsObj['data']['movies'][i]['title'];
                    var im= jsObj['data']['movies'][i]['large_cover_image'];
                    var see =jsObj['data']["movies"][i]["torrents"][0]['seeds']
                    var time =jsObj['data']["movies"][i]['date_uploaded_unix']
                    var rat =jsObj['data']["movies"][i]['rating']
                    
                    var m = new Movie(ti,im,see,time,rat)
                    movies.push(m);
                    moviesSortedBySeeds.push(m)
                    
                }
                for(i=0;i<moviesSortedBySeeds.length-1;i++)
                {
                    for(j=0;j<moviesSortedBySeeds.length-i-1;j++)
                    {
                        if(moviesSortedBySeeds[j+1].getSeeds()>moviesSortedBySeeds[j].getSeeds())
                        {
                            var temp = moviesSortedBySeeds[j];
                            moviesSortedBySeeds[j] = moviesSortedBySeeds[j+1];
                            moviesSortedBySeeds[j+1] =temp;
                        }
                    }
                }
                console.log(moviesSortedBySeeds)
                 var len = movies.length;
                 var f = len;
                 var countt = 0;
                 for(j=0;j<5;j++)
                 {   
                     var row = document.createElement('tr');
                     $('#pop').append(row);
                     for( i =0;i<4;i++)
                     {   
                        console.log(countt)

                         //var im= jsObj['data']['movies'][countt]['large_cover_image'];
                         //var title= jsObj['data']['movies'][countt]['title'];
                         //console.log(im)
                         var col = document.createElement('td');
                         col.innerHTML = '<a href=""><div class="container"><img id="iii" src='+moviesSortedBySeeds[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span><p>'+moviesSortedBySeeds[countt].getRating()+'/10'+'</p><input type="button" class="button" value="View Details"></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+moviesSortedBySeeds[countt].getTitle()+'</h5></a><p>2018</p></div></a>'
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
                 console.log(movies)
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
                         col.innerHTML = '<a href=""><div class="container"><img id="iii" src='+movies[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span><p>'+movies[countt].getRating()+'<p><input type="button" class="button" value="View Details"></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+movies[countt].getTitle()+'</h5></a><p>2018</p></div></a>'
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