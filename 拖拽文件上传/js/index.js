var content = document.getElementsByClassName('content')[0];
var val = document.getElementsByClassName('val')[0];
var text = document.getElementsByClassName('text')[0];

// 绑定事件
content.addEventListener('dragover',function(e){
    e.preventDefault();
});
content.addEventListener('drop',function (e){
    e.preventDefault();
    file = e.dataTransfer.files[0];
    // total = file.size;
    // console.log(file);
    // readBlob(reader,0,step);
    // bindEvent();
    var loader = new FileLoader(file,events);//传进文件和对象
});
// 用户操作
var events = {
    progressIng: function(per){
        val.style.width = per * 250 + 'px';
        text.innerHTML = Math.round(per * 100) + '%';
    },//用户的回调操作
    stepLoad: function (loaded){
        console.log('上传'+loaded+'部分');
    },
    finish: function(){
        console.log('上传完成');
        document.getElementById("demo").innerHTML = "上传完成";
    }
}

