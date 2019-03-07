function FileLoader(file,events){
    this.file = file;
    this.step = 1024*1024;
    this.reader = new FileReader();
    this.total = file.size;
    this.loaded = 0;//已经上传了多少
    this.events = events;
    this.readBlob(this.reader,0,this.step);//读取函数
    this.bindEvent();//监听函数
}
FileLoader.prototype ={
    // 读取函数
    readBlob:function (reader,start,step){
        var file = this.file;
        var reader = this.reader;
        // 判断浏览器是否支持slice函数，分部上传
        if(file.slice) {
            var blob = file.slice(start,start+step);//分段上传
        }else {
            var blob = file;
        }
        
        reader.readAsText(blob);
    },
    // 监听，执行函数
    bindEvent:function (){
        var reader = this.reader;
        var _this = this;//用_this接收外边的this，指向obj
        reader.onprogress = function(e){//文件进行中
            _this.onProgress(e.loaded);
        }
        reader.onload = function(){//文件读取完成
            _this.onLoad();
        }
    },
    // 显示百分比，改变宽度函数
    onProgress:function (num){
        this.loaded += num;
        var per = this.loaded/this.total;//计算百分比
        if (per > 1){
            per = 1;
        }
        this.events.progressIng(per);//执行用户的回调操作
    },
    onLoad:function (){//onLoad函数的回调操作
        // 执行上传文件操作
        var result = this.reader.result;
        this.events.stepLoad(this.loaded);
    
        if(this.loaded < this.total){
            this.readBlob(this.reader,this.loaded,this.step);//执行读取函数
        }else{
            this.events.finish();
        }
    }

}








