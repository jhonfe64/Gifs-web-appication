let permission = document.querySelector("#start");
    gif_video = document.querySelector("#my_video_gif");
    display_video = document.querySelector("#display_video");
    close_creating_gif = document.querySelector("#close_creating_gif");
    btn_capture = document.querySelector("#btn_capture");
    btn_capture_btns = document.querySelectorAll(".btn_capture_new_gif");
    gift_ready_btns = document.querySelectorAll(".gift-ready-btns");
    stop_recording = document.querySelector("#stop_recording");
    timer_seconds = document.querySelector("#seconds");
    timer_minutes = document.querySelector("#minutes");
    timer_hours = document.querySelector("#hours");
    repeat_capture = document.querySelector("#repeat_capture");
    repeat_capture_buttons = document.querySelector("#repeat_capture_buttons");
    btn_repeat_capture = document.querySelector("#btn_repeat_capture");
    btn_upload_gif = document.querySelector("#btn_upload_gif");
    video_container = document.querySelector("#video_container");
    play_btn = document.querySelector("#play_btn");
    pause_btn = document.querySelector("#pause_btn");
    counter = document.querySelector(".counting");
    video_seconds = document.querySelector("#video_seconds");
    video_minutes = document.querySelector("#video_minutes")
    video_hours = document.querySelector("#video_hours");
    loading_gifo = document.querySelector("#loading_gifo");
    showing_updated_gif = document.querySelector("#showing_updated_gif");
    new_gif_img = document.querySelector("#new_gif-img");
    download_gif = document.querySelector("#download_gif");
    copy_link_input = document.querySelector("#copy_link_input");
    copy_gif_link = document.querySelector("#copy_gif_link");
    new_image = document.querySelector("#nueva_imagen");
    close_uploading_gif = document.querySelector("#close_uploading_gif");
    close_uploaded_gif = document.querySelector("#close_uploaded_gif");

let all_new_gifs = [];
    
permission.addEventListener("click", function(){
    //Permission for camera
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio: false
    })
    .then((stream)=>{
        if(stream.active == true){
            alert("la camara está activa");
            var recorder = RecordRTC(stream, {
                type: 'video',
                frameInterval: 90,
            });

            var create_gifos = document.querySelector("#creating_gif_permission");
            create_gifos.style.display = "none";
            display_video.style.display = "block";
            
            gif_video.srcObject = stream;
            gif_video.play();

            close_creating_gif.addEventListener("click", function(){
                window.location.reload();
            }); 

            var seconds = 0;
            var minutes = 0
            var hours = 0;

            function timer(){
            counting = setInterval(function(){
                if(seconds == 60){
                    minutes++
                    timer_minutes.innerHTML = minutes;
                    seconds = 0;
                    if(minutes == 60){
                        minutes = 00;
                        hours++
                        timer_hours.innerHTML = hours;
                    }
                }
                seconds++;
                timer_seconds.innerHTML = seconds
                }, 1000);
            } 

            
            /*=====================================================================
            Recording video
            ======================================================================*/

            btn_capture.addEventListener("click", function(){
                recorder.startRecording();
                for(let i=0; i<btn_capture_btns.length; i++){
                    btn_capture_btns[i].style.display = "none";
                }
    
                for(let i=0; i<gift_ready_btns.length; i++){
                    gift_ready_btns[i].style.display = "flex";
                }
    
                timer();
            });

            

            //Stop recording video
            stop_recording.addEventListener("click", function(){
                clearInterval(counting);
         
                recorder.stopRecording(callback);
                for(i=0; i<gift_ready_btns.length; i++){
                    gift_ready_btns[i].style.display = "none";
                } 
                repeat_capture.style.display = "flex";
                repeat_capture_buttons.style.display = "block";

                function callback(){

                    form = new FormData();
                    form.append('file', recorder.getBlob(), 'myGif.gif');
                    file = form.get('file');
    
                    objectURL = URL.createObjectURL(recorder.getBlob());
                    gif_video.style.display = "none";

                    let new_element = document.createElement(`video`);
                    new_element.id = "new_video";
                    new_element.src = objectURL;
                    video_container.appendChild(new_element);
                    gif_video.src = objectURL;
                    
                } 
            });

            recorded_video_seconds = 0;
            recorded_video_minutes = 0
            recorded_video_hours = 0;
            
            function video_timer(){
                video_counting = setInterval(function(){
                    if(recorded_video_seconds == 60){
                        recorded_video_minutes++
                        video_minutes.innerHTML = recorded_video_minutes;
                        recorded_video_seconds = 0;
                        if(recorded_video_minutes == 60){
                            recorded_video_minutes = 00;
                            recorded_video_hours++
                            video_hours.innerHTML = recorded_video_hours;
                        }
                    }
                    recorded_video_seconds++;
                    video_seconds.innerHTML = recorded_video_seconds;
                    }, 1000);
                } 

            play_btn.addEventListener("click", function(){
            play_video = document.querySelector("#new_video");
         
            play_video.play();    
            video_timer();
       
                play_btn.classList.add("hide_button");
                pause_btn.classList.remove("hide_button");
                play_video.addEventListener("ended", function(){
                    clearInterval(video_counting);
                });
            });

            pause_btn.addEventListener("click", function(){
                clearInterval(video_counting);
                play_btn.classList.remove("hide_button");
                pause_btn.classList.add("hide_button");
        
                play_video.pause();
            });

            btn_repeat_capture.addEventListener("click", function(){
                
                recorder.clearRecordedData();
                gif_video.style.display = "block !important";
               gif_video.style.display = "block";


               video_container.lastElementChild.remove();
                repeat_capture.style.display = "none";
                repeat_capture_buttons.style.display = "none";
                for(let i=0; i<btn_capture_btns.length; i++){
                    btn_capture_btns[i].style.display = "block";
                }
            });

            /*==========================================================================================================================
            Recording gif
            ===========================================================================================================================*/

            function creating_new_gif(){
                var recorder_gif = RecordRTC(stream, {
                    type: 'gif',
                    frameInterval: 90,
                });
    
                btn_capture.addEventListener("click", function(){
                    recorder_gif.startRecording();
                });
    
                //Stp recording gif
                stop_recording.addEventListener("click", function(){
                    recorder_gif.stopRecording(callback);

                    function callback(){
                        form_gif = new FormData();
                        form_gif.append('file', recorder_gif.getBlob(), 'myGif.gif');
                        let file_gif = form_gif.get('file');
                        gif_url = URL.createObjectURL(recorder_gif.getBlob());
                        gif_video.play();
                    } 
                });
            }

            creating_new_gif();
         
            //clicking on repeat capture button
            btn_repeat_capture.addEventListener("click", function(){
                recorder.clearRecordedData();
                creating_new_gif();
            });

            btn_upload_gif.addEventListener("click", function(){
                display_video.style.display = "none";
                loading_gifo.style.display = "block";
                var gif_header = new Headers();
                
                var options = {
                    method: 'POST',
                    mode: "cors",
                    headers: gif_header,
                    body: form_gif
                }
                
                function sending_new_gif(url){
                    fetch(url, options)
                    .then((res)=>{
                        return res.json();
                    }).then((answear)=>{
                        var status = answear.meta.status;
                        if(status == 200){
                            new_gif_id = answear.data.id;
                            loading_gifo.style.display = "none";
                            showing_updated_gif.style.display = "block";
                            new_gif_img.src = gif_url;
                           
                            function getting_new_gif(url){
                                fetch(url)
                                .then((res)=>{
                                    return res.json();
                                }).then((answear)=>{
                                    let new_gif_url = answear.data[0].images.downsized_large.url;
                                    //Downloading gif
                                    download_gif.setAttribute("href", new_gif_url);
                                    download_gif.setAttribute("download", '');
                                    //copying new gif link
                                    copy_link_input.value = new_gif_url;
                                    copy_gif_link.addEventListener("click", function(){
                                        copy_link_input.select();
                                        document.execCommand("copy");
                                        alert("Enlace copiado");
                                    });
                
                                    let currentData = localStorage.getItem("all_new_gifs");
                                    //Check the data if its not null
                                    all_new_gifs = currentData ? JSON.parse(currentData) : [];
                                    all_new_gifs.push(new_gif_url);
                                    var json_transform = JSON.stringify(all_new_gifs);
                                    localStorage.setItem("all_new_gifs", json_transform);
                                    //Showing new gif
                                    let new_gif_container = document.getElementById("my_new_gif");
                                    let new_element = document.createElement("div");
                                    new_element.classList.add("my_new_gif", "gifs_item", "tendences_item");
                                    new_element.innerHTML = `<img src='${new_gif_url}'>`;
                                   new_gif_container.appendChild(new_element);

                                });
                            }
                            getting_new_gif(`https://api.giphy.com/v1/gifs?api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&ids=${new_gif_id}`);
                        }
                    });
                }
                sending_new_gif(`https://upload.giphy.com/v1/gifs?api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d`);
            });
        }
        
    }).catch((error)=>{
        console.log(error);
    })
});


//Showing all gifs
window.addEventListener("load", function(){
    var gifs_from_local = JSON.parse(localStorage.getItem("all_new_gifs"));
    if(gifs_from_local){
        for(i=0; i<gifs_from_local.length; i++){
            let new_gif_container = document.getElementById("my_new_gif");
            let new_element = document.createElement("div");
            new_element.classList.add("my_new_gif", "gifs_item", "tendences_item");
            new_element.innerHTML = `<img src='${gifs_from_local[i]}'>`;
           new_gif_container.appendChild(new_element);
        }
    }
});

close_uploading_gif.addEventListener("click", function(){
    window.location.reload();
});

close_uploaded_gif.addEventListener("click", function(){
    window.location.reload();
})
