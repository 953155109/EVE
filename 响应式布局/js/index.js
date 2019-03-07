var gnOn = document.getElementsByClassName('gn-on')[0],
    gnList = document.getElementsByClassName('gn-list')[0];

gnOn.onclick = function(){
    if(document.getElementsByClassName('gn-list-active')[0]) {
        gnList.classList.remove('gn-list-active');
    }else{
        gnList.classList.add('gn-list-active');
    }
}