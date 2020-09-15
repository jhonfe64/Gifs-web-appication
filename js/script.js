let dropdown_menu_btn = document.querySelector("#dropdown-btn");
let toggle_menu = document.querySelector("#toggle-menu");
let searching_input = document.querySelector("#searching-input");
let searching_button = document.querySelector("#searching_button");
let searching_button_img = document.querySelector("#searching_button img");
let searching_options = document.querySelector("#search-options");
let choose_theme = document.querySelector("#choose-theme");
let dropdown_btn = document.querySelector("#dropdown-btn");
let searching_options_btn = document.querySelectorAll(".searching-options_btn");
let visits = document.querySelector("#counting_users");


/*===============================================
VISITS
===============================================*/


localStorage.setItem("visitas", Number(localStorage.getItem("visitas")) + 1);
var counting_visitors = localStorage.getItem("visitas");
visits.innerHTML = `${counting_visitors}`;



/*===============================================
TOGGLE MENU
===============================================*/

/*******Dropdown********/ 

dropdown_menu_btn.addEventListener("click", function(){

    let choose_theme_width = choose_theme.offsetWidth;
    let dropdown_btn_width = dropdown_btn.offsetWidth;

    toggle_menu.style.width =  choose_theme_width + dropdown_btn_width + "px";

    toggle_menu.classList.toggle("toggle-menu-show"); 
});

/*===============================================
SEARCHING
===============================================*/

function searching_options_width(){    
    for(i=0; i<searching_options_btn.length; i++){
        let searching_input_width = searching_input.offsetWidth;
        searching_options_btn[i].style.width = searching_input_width + "px";
    }
}

searching_options_width();

/**********Searching resize*********/

window.addEventListener("resize", function(){  
    searching_options_width();
});

let dark_mode_btn = document.querySelector("#night_mode");
let dark_mode_body = document.querySelector("#body");

dark_mode_btn.addEventListener("click", function(){
    dark_mode_body.classList.add("night_mode");
    var dark_class = dark_mode_body.classList;
    localStorage.setItem("darkClass", dark_class);
});

let recovering_dark_mode = localStorage.getItem("darkClass");

if(recovering_dark_mode){
    dark_mode_body.classList.add("night_mode");
}

/*===============================================
LIGHT MODE
===============================================*/

let light_mode_btn = document.querySelector("#light_mode");

light_mode_btn.addEventListener("click", ()=>{
    dark_mode_body.classList.remove("night_mode");
    localStorage.removeItem("darkClass");
});


/*===============================================
RECOMENDED WORDS
===============================================*/

searching_input.addEventListener("input", function(){
    searching_input_value =  searching_input.value;
    if(searching_input_value !== ""){
         searching_options.classList.add("search-options-show");
         searching_options.classList.remove("search-options-hide");
         searching_button.classList.add("searching-button-active");
         searching_button_img.src  = "images/lupa.svg";
    }else{
         searching_options.classList.add("search-options-hide");
         searching_options.classList.remove("search-options-show");
         searching_button.classList.remove("searching-button-active");
         searching_button_img.src = "images/lupa_inactive.svg";
    }
 });

/*===============================================
RECOMMENDED  GIFS HOME
===============================================*/

let searching_btn = document.querySelector("#searching_button");
let searching_bar = document.querySelector("#searching-input");
let gifs_tendences = document.querySelector("#tendences_gifs");
let tendences_title = document.querySelector("#tendences");
let recommended_tittle = document.querySelector("#recommended");


async function getting_gifs(url_recommended){

    /**********mostrando los 4 gifs recomendados*****************/

    let gift = await fetch(url_recommended);
    let json_transform = await gift.json();

    let json_transform_objects = json_transform.data;

    for(i of json_transform_objects){
      
        let gif_title = i.title.substring(i.title.indexOf(0), i.title.indexOf("GIF"));
        let recommended_gif = i.images.downsized_large.url;
        let new_element = document.createElement("div");
        new_element.classList.add("gifs-item", "suggested_gifs_item");
        new_element.innerHTML = `<img class="close_button" src="images/close.svg" alt="">
        <h4 class="recommended_gif_tittle"># ${gif_title}</h4>
        <img  src="${recommended_gif}" alt="">
        <button class="see_more">Ver más...</button>`;
        recommended_tittle.after(new_element);
    }

    
   /***********replacing gif when clicking x buttom************/

   var removing_btn = document.querySelectorAll(".close_button");


   async function remove_gif(url_change_gif){

       let removing_gif = await fetch(url_change_gif);
       let json_transform_remove_gif = await removing_gif.json();
       let changed_gif = json_transform_remove_gif.data.images.downsized_large.url;
       var changed_gif_title = json_transform_remove_gif.data.title;

       if(changed_gif_title.length > 25){
        changed_gif_title = changed_gif_title.slice(0, 25) + "...";
       }
       
       let new_element = document.createElement("div");
       new_element.classList.add("gifs-item", "suggested_gifs_item");
       new_element.innerHTML = `<img class="close_button close_button2" src="images/close.svg" alt="">
       <h4 class="recommended_gif_tittle"># ${changed_gif_title}</h4>
       <img  src="${changed_gif}" alt="">
       <button class="see_more_two">Ver más+++</button>`;

       recommended_tittle.after(new_element);
       
        var see_more_btn = document.querySelectorAll(".see_more_two");

        for(i=0; i<see_more_btn.length; i++){
            see_more_btn[i].addEventListener("click", function(){

            if(changed_gif_title.length !== 0){
                tendences_title.innerHTML = changed_gif_title;
                gifs_tendences.innerHTML = "";
            }

                new_gif_by_name(`http://api.giphy.com/v1/gifs/search?q=${changed_gif_title}&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=24`);
            });

        }
   }

   for(i=0; i<removing_btn.length; i++){
       removing_btn[i].addEventListener("click", function(){
           this.parentElement.style.display = "none";
         remove_gif("http://api.giphy.com/v1/gifs/random?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d");
       });
   } 
   

  
     /*****Showing new gifs when clicking see more button*******/

    async function new_gif_by_name(gif_by_name_url){

        let gif_by_name = await fetch(gif_by_name_url);
        let json_transform_gif = await gif_by_name.json();
        
        var json_transform_gif_data  =  json_transform_gif.data;

        for(i of json_transform_gif_data){
           let replaced_gif = i.images.downsized.url
           let new_element = document.createElement("div");
           new_element.setAttribute("class", "gifs-item tendences_item");
           new_element.innerHTML = `<img  src="${replaced_gif}" alt="">`;
           gifs_tendences.appendChild(new_element);
        }
      }
 
      let see_more_btn = document.querySelectorAll(".see_more");

        for(i=0; i<see_more_btn.length; i++){

        see_more_btn[i].addEventListener("click", function(){

           gifs_tendences.innerHTML = "";
           let parent = this.parentElement;
           let first_h4 = parent.children[1].innerHTML.substring(1);
 
            tendences_title.innerHTML = first_h4;
           new_gif_by_name(`http://api.giphy.com/v1/gifs/search?q=${first_h4}&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=24`);
 
        });
    }
}

getting_gifs("http://api.giphy.com/v1/gifs/trending?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=4");


/*===============================================
RAMDOM  GIFS HOME 24
===============================================*/

async function getting_random_random_gifs(random_gif_url){
    
     let random_gifs = await fetch(random_gif_url);
     let json_transform_random_gifs = await random_gifs.json();
 
     //Random gifs 24 when loading page
     let json_transform_random_gifs_data = json_transform_random_gifs.data
     
     for(i of json_transform_random_gifs_data){
 
         let home_random_gif = i.images.downsized_large.url;
 
         let new_element = document.createElement("div");
         new_element.setAttribute("class", "gifs-item tendences_item");
         new_element.innerHTML = `<img  src="${home_random_gif}" alt="">`;
         gifs_tendences.appendChild(new_element); 
     
     }
}
   
getting_random_random_gifs("http://api.giphy.com/v1/gifs/trending?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=24&offset=5");


/*===============================================
SEARCHING GIFS
===============================================*/

async function searching_gifs(searching_url){
           
    let getting_search_gif = await fetch(searching_url);
    let json_transform_searching = await getting_search_gif.json();


    var json_transform_searching_objects = json_transform_searching.data;
    
    for(i of json_transform_searching_objects){
        
        let searched_gif = i.images.downsized_large.url;
        let new_element = document.createElement("div");
        new_element.setAttribute("class", "gifs-item tendences_item");
        new_element.innerHTML = `<img  src="${searched_gif}" alt="">`;

        gifs_tendences.appendChild(new_element);  
        
    }
}

searching_btn.addEventListener("click", ()=>{
    
    gifs_tendences.innerHTML = "";

    var searching_bar_value = searching_bar.value.trim();
    if(searching_bar_value !== "" && searching_bar_value !== undefined){
        searching_gifs(`http://api.giphy.com/v1/gifs/search?q=${searching_bar_value}&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=24`);
    }else{
        empty_search();
    }
});

function empty_search(){

    tendences_title.innerHTML = "Introduce una palabra o frase en la barra de búsqueda";
    gifs_tendences.innerHTML = `<img id="searching_error" src="https://media.giphy.com/media/2rtQMJvhzOnRe/giphy.gif"><h4 id=searching_error_text>Nothing found </h4>`;
}

/*===============================================
SEARCH SUGGESTIONS
===============================================*/

async function suggestions(sugestions_url){
    let json_transform_suggestions = [];

    let showing_suggestions = await fetch(sugestions_url);
        json_transform_suggestions = await showing_suggestions.json();
        return json_transform_suggestions;
}

searching_bar.addEventListener("input", ()=>{
        
    var typing_suggestion = searching_bar.value;
    suggestions(`http://api.giphy.com/v1/tags/related/${typing_suggestion}?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=3`)
    .then((res)=>{
        let suggested_words = [];
        searching_options.innerHTML = "";
        suggested_words = res.data;
        for(i=0; i<suggested_words.length; i++){
            let suggested_search = suggested_words[i].name;
            let new_element = document.createElement("button");
            new_element.classList.add("searching-options_btn");
            new_element.innerHTML = suggested_search;
            searching_options.appendChild(new_element);
        }
        
        let search_buttons = document.querySelectorAll(".searching-options_btn");

        for(i=0; i<search_buttons.length; i++){
            search_buttons[i].addEventListener("click", function(){
                let suggested_seach = this.innerHTML;
                tendences_title.innerHTML = suggested_seach;
                gifs_tendences.innerHTML = "";
                searching_gifs(`http://api.giphy.com/v1/gifs/search?q=${suggested_seach}&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=24`);
            });
        }
    });
});

/*===============================================
SEARCHED WORDS BUTTONS
===============================================*/

let searching_buttons = document.querySelector("#serching_buttons_container");

var searched_words = [];

searching_button.addEventListener("click", function(){

    let popular_words_value = searching_input.value;

    if(popular_words_value !== ""){
        var searched_words = [];
        searched_words.push(popular_words_value);

        localStorage.setItem("searched_words", JSON.stringify(searched_words));

        let getting_searched_words = JSON.parse(localStorage.getItem("searched_words"));

        if(getting_searched_words){
            for(i=0; i<getting_searched_words.length; i++){
                let new_element = document.createElement("button");
                new_element.classList.add("serching_buttons");
                new_element.innerHTML =  getting_searched_words[i];
                searching_buttons.appendChild(new_element);
                console.log(getting_searched_words);
            }
        }
    }

});



















