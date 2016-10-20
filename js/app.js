$(document).ready(function() {

     $("#btn_close").on("click", chiudiScheda);                
        
        $("#search").submit(function(event) { //console.log(event);
           //alert( "Handler for .submit() called." );
           event.preventDefault();
           
           var title = $("#title").val();           
           var genre = $("#genre").val();
          
           title="s="+title;
           genre="&type="+genre;
           //console.log(title + " " + genre);
            
           if ((title!="")&&(genre!="")) {
               /*
               var data = {
                   t: "s="+title,
                   type: "&?type="+genre
               };*/
               //console.log(data);
              // console.log(JSON.stringify(data));
              $("#tbody_film").html("");  
                $.ajax({
                       url: url+title+genre,
                       method: "GET"
                       
                       }).then(function(data)  {
                           //console.log(data); 
                           content = data.Search;
                           //console.log(content); 
                           caricaTabella(content);
                           
                           
                       });
                      
               
                
            }
        });
        
 
    
    $(document).on("click", "#riga", function(){              
               var id = $(this).data("id"); //console.log($(this).data("id"));
               //id = "i="+id; console.log(id); //console.log(url+id);
               $.ajax({
                       url: url+"i="+id,
                       method: "GET"
                       
                       }).then(function(data)  {
                           //console.log(data); 
                           content = data;
                           //console.log(content); 
                           caricaDettaglio(id);
                           
                           
                       });
               
               
               
            });
        
    
    function caricaTabella(param) {
        //console.log(param.length);
        
        var tr = '';
            for (i=0; i < param.length; i++) {
                var obj = param[i];    
                //console.log(obj);          
                
                if(obj.Poster=="N/A") { 
                    var poster="img/artoo.jpg";
                } else { 
                    var poster=obj.Poster;
                }
                
                tr += '' +
                    '<tr id="riga" data-id='+obj.imdbID+' title="dettagli '+obj.Title+'">' +
                    '<td><img style="width: 20%;" src="'+poster+'" alt="'+obj.Title+'"/></td>' +
                    '<td>'+obj.Title+'</td>' +
                    '<td>'+obj.Year+'</td>' +
                    '<td>'+obj.Type+'</td>' +                                  
                    '</tr>';
                    //console.log(tr);
                
                   
                    $("#tbody_film").html(tr);
                    $("#dettaglio_film").modal("hide"); 
                    $("#film").show();   
                
            }
    }   
    
    function caricaDettaglio(id) {
        //console.log(id);
        
        var tr = '';
        if (id == content.imdbID) {
           
                var obj = content;    
                //console.log(obj);                     
              
                tr += '' +
                    '<tr>' +
                        '<td><img style="width: 80%;" src="'+obj.Poster+'" alt="'+obj.Title+'"/></td>' +
                        '<td>'+obj.Title+'</td>' +
                        '<td>'+obj.Year+'</td>' +
                        '<td>'+obj.Type+'</td>' +
                    '</tr>'+
                    '<tr>' +
                        '<td>'+obj.Actors+'</td>' +
                        '<td>'+obj.Director+'</td>' +
                        '<td>'+obj.Plot+'</td>' +  
                        '<td>'+obj.imdbRating+'</td>' +
                    '</tr>';
                    //console.log(tr);
                
                   
                    $("#dettaglio_tab").html(tr);
                    $("#film").hide();
                    $("#dettaglio_film").modal("show");         
            
        }  
    }
    
    function chiudiScheda() {
            $("#dettaglio_film").modal("hide");
        }

});
