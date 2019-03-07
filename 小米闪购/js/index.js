// 标签切换显示
var tabs = document.getElementById("tabs").getElementsByTagName("li");
console.log(tabs);
var lists = document.getElementById("lists").getElementsByTagName("ul");
console.log(lists);


for(var i =0; i<tabs.length; i++){
    tabs[i].onclick = showlist;
}

function showlist(){
    for( var i=0; i<tabs.length; i++){
        if(tabs[i] === this){
            tabs[i].className = "active";
            lists[i].className = "clearfix active";
       }
       else {
            tabs[i].className = "";
            lists[i].className = "clearfix";
       }
        
    }
}


// 固定主题选项卡
var seckillNav = document.getElementById("seckillNav");
window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop  ||  window.pageXOffset  ||  document.body.scrollTop;
    if(scrollTop >= 270){
        seckillNav.className="seckill-nav seckill-navfixed"
    }else{
        seckillNav.className="seckill-nav";
    }
    console.log(scrollTop);
}