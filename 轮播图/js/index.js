var oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oMain = document.getElementsByClassName('main')[0],
    oList = document.getElementsByClassName('list')[0],
    oLi = oList.getElementsByTagName('li'),
    oContainer =document.getElementsByClassName('container')[0];
var timer,
    oLiLength = oLi.length;
    index = 0,
    flag=true;
function moveImg(dis){//dis（传进来的距离）
    flag=false;
    var time = 400;//每次轮播的时间(ms毫秒)
    var eachTime =20;//每小次移动的时间
    var eachDis =dis/(time/eachTime);//总距离除以次数(每次轮播的总时间/每挪动一小下的时间)
    var newLeft = oMain.offsetLeft + dis;//目标点
    function eachMove(){//移动函数
        if(dis > 0 && oMain.offsetLeft < newLeft || dis < 0 && oMain.offsetLeft > newLeft){
            oMain.style.left = oMain.offsetLeft + eachDis + 'px';//让他移动
        }else{
            clearInterval(timer);//清空计时器
            oMain.style.left = newLeft + 'px';
        
        
            if(newLeft == -3120){
                oMain.style.left = -520 + 'px';
            }
            if(newLeft == 0){
                oMain.style.left = -2600 + 'px';
            }
            flag=true;
        }    

    }
    timer = setInterval(eachMove,eachTime);
}

oPrev.onclick = function(){
    if(flag == false)return;
    moveImg(520);
    if(index == 0){
        index = 4;
    }else{
        index--;
    }
    
    oLiStyle();
} //往前点击向前移
oNext.onclick = function(){
    if(flag == false)return;
    moveImg(-520);
    if(index == 4){
        index = 0;
    }else{
        index++;
    }
    
    oLiStyle();
} //往后点击向后移
function oLiStyle(){
    oList.getElementsByClassName('active')[0].className = '';
    oLi[index].className = 'active';
}
for(var i =0; i < oLiLength; i++){
    (function(j){
        oLi[j].onclick = function (){
            var offset=(j - index) * -520;
            index = j;
            oLiStyle();
            moveImg(offset);
        }
    })(i);
    
    
}
timer2 = setInterval (oNext.onclick,2000);
oContainer.onmouseover = function(){
    clearInterval(timer2);
}
oContainer.onmouseout = function(){
    timer2 = setInterval (oNext.onclick,2000);
}