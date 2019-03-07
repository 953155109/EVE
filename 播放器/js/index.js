var oAudio = document.getElementById('audio'),
    oCurrentTime = document.getElementsByClassName('current-time')[0],
    oAllTime = document.getElementsByClassName('all-time')[0],
    oBtn = document.getElementsByClassName('btn')[0],
    oProActive = document.getElementsByClassName('pro-active')[0],
    oRadioBox = document.getElementsByClassName('radio-box')[0],
    oProBox = document.getElementsByClassName('pro-box')[0],
    oPrev = document.getElementsByClassName('prev')[0],
    oNext = document.getElementsByClassName('next')[0],
    oVoiceActive = document.getElementsByClassName('voice-active')[0],
    oVoiceAbox = document.getElementsByClassName('voice-abox')[0],
    oVoiceBox = document.getElementsByClassName('voice-box')[0],
    oIsPlay = oBtn.getElementsByClassName('iconfont')[0];

var duration,
    timer,
    bgWidth = 232;

var song = ['./souce/薛之谦 - 演员.mp3','./souce/薛之谦 - 其实.mp3','./souce/薛之谦 - 一半.mp3'];
var index = 0;
var len = song.length;
// 定义时间
oAudio.onloadedmetadata = function () {
    // console.log(this);
    oCurrentTime.innerHTML = conversion(0);
    duration = oAudio.duration;
    oAllTime.innerText = conversion(duration);
}

// 换算分秒
function conversion(time) {
    var sec = parseInt(time%60) <10 ? '0' + parseInt(time%60) : parseInt(time%60);
    var min = parseInt(time/60) <10 ? '0' + parseInt(time/60) : parseInt(time/60);
    return min + ':' +sec;
}

// 点击播放暂停
oBtn.onmouseup = function (){
    if(oAudio.paused) {
        musicPlay();
    }else{
        musicPause();
    }
}

// 播放函数
function musicPlay(){
    oAudio.play();
    oIsPlay.className = 'iconfont icon-zanting';
    timer = setInterval(movePro,200);
}
// 暂停函数
function musicPause(){
    oAudio.pause();
    oIsPlay.className = 'iconfont icon-bofang';
    clearInterval(timer);
}
// 进度条和初始时间自动增长
function movePro() {
    var currentTime = oAudio.currentTime;
    oCurrentTime.innerHTML = conversion(currentTime) ;
    oProActive.style.width = currentTime/duration * bgWidth + 8 + 'px';
}


// 放完自动重头播放
oAudio.onended = function (){
    oNext.onclick()
}
//     musicPause();
//     oAudio.currentTime = 0;
//     oCurrentTime.innerHTML = conversion(0);
//     oProActive.style.width = 8 + 'px';
//     musicPlay();
// }

// 拖拽进度条
oRadioBox.onmousedown = function () {
    clearInterval(timer);
    // duration = oAudio.duration;
    var c = oAudio.currentTime;
    document.body.onmousemove = function (e){
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;

        if(newWidth < 8){
            newWidth = 8;
        }else if(newWidth > 240){
            newWidth = 240;
        }

        oProActive.style.width = newWidth + 'px';
        c = (newWidth-8)/bgWidth * duration;
        oCurrentTime.innerHTML = conversion(c);
    }
    document.body.onmouseup = function(){
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        oAudio.currentTime = c;
        musicPlay();
        
        
    }
}


// 下一首
oNext.onclick = function (){  
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    oProActive.style.width = 8 + 'px';
    index++;
    if(index > song.length - 1){
        index = 0;
    }
    oAudio.src = song[index];
    oAudio.load();
    duration = oAudio.duration;
    musicPlay();
}
// 上一首
oPrev.onclick = function (){
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    oProActive.style.width = 8 + 'px';
    index--;
    if(index < 0){
        index = song.length - 1;
    }
    oAudio.src = song[index];
    oAudio.load();
    duration = oAudio.duration;
    console.log(duration);
    musicPlay();
}

// 拖拽音量条
oVoiceBox.onmousedown=function(){
    document.body.onmousemove=function(e){
        var freshWidth=e.clientX-oVoiceAbox.getBoundingClientRect().left;
        if(freshWidth<8){
            freshWidth=8;           
        }
        else if(freshWidth>80){
            freshWidth=80;
        }
        oVoiceActive.style.width=freshWidth+'px';
        oAudio.volume=(freshWidth-8)/(80-8)*1;
        // console.log(freshWidth);
    }
    document.body.onmouseup=function(){
        document.body.onmousemove=null;
        document.body.onmouseup=null;
    }
}
