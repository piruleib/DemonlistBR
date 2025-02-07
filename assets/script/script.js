Promise.all
([
    fetch('data/leveldata.json').then(response => response.json()),
    fetch('data/playerdata.json').then(response => response.json())
]).then(([levelData, playerData]) => {
    levelData.Data.sort((a, b) => a.position_lvl - b.position_lvl);

    var contentDiv = document.getElementById('ListContent');
    for (var i = 0; i < levelData.Data.length; i++) {
        var section = document.createElement('section');
        section.className = 'ListSection';

        var videoDiv = document.createElement('div');
        videoDiv.className = 'video';
        var videoId = ExtractVideoId(levelData.Data[i].video_lvl);
        var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
        var videoUrl = 'https://youtu.be/' + videoId;
        videoDiv.innerHTML = '<a href="' + videoUrl + '" target="_blank"><img src="' + thumbnailUrl + '"style="width:320px; height:180px; object-fit:cover;"></a>';
        section.appendChild(videoDiv);

        //levelDetailPage = 'pages/levelDetails.html'
        var textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.innerHTML = '<a href="pages/leveldetails.html?id=' + levelData.Data[i].id_lvl + '"><h2>' + levelData.Data[i].position_lvl + '. ' + levelData.Data[i].name_lvl + '</h2></a>' +
                            '<p>Criador: ' + levelData.Data[i].creator_lvl + '</p>' +
                            '<p>Verificador: ' + levelData.Data[i].verifier_lvl + '</p>';
        if (levelData.Data[i].publisher_lvl) 
        {
            textDiv.innerHTML += '<p class="fw-lighter">Publicado por: ' + levelData.Data[i].publisher_lvl + '</p>';
        }

        section.appendChild(textDiv);
        contentDiv.appendChild(section);
    }
});

function ExtractVideoId(videoUrl){
    var videoId;
    if(videoUrl == null || videoUrl == undefined || videoUrl == ''){
        return null;
    }
    if(videoUrl.includes('https://www.youtube.com/watch?v=')){
        videoId = videoUrl.split('https://www.youtube.com/watch?v=')[1];
    } else if(videoUrl.includes('https://youtu.be/')){
        videoId = videoUrl.split('https://youtu.be/')[1].split('?')[0];
    } else if(videoUrl.includes('https://m.youtube.com/watch?v=')){
        videoId = videoUrl.split('https://m.youtube.com/watch?v=')[1];
    } else if(videoUrl.includes('https://youtu.be/')){
        videoId = videoUrl.split('https://youtu.be/')[1];
    }
    return videoId;
}

//back to top button
document.addEventListener('DOMContentLoaded', (event) => {
    let backToTopButton = document.querySelector("#btn-back-to-top");

    window.onscroll = function(){
        scrollFunction();
    };

    function scrollFunction(){
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    backToTopButton.addEventListener("click", backToTop);
    function backToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});