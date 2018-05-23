function SetTimer(){
    this.timer = null;
    this.eventHandle = [];
    this.removeFns = [];
    this.createFns = {};
    this.pause = false;
    this.currentHandle = [];
};
SetTimer.prototype.create = function(id,fn){
    this.createFns[id] = fn;
}
SetTimer.prototype.remove = function(id){
    this.removeFns.push(id)
}
SetTimer.prototype.has = function(id){
    return this.eventHandle[id] != null?true:false;
}
SetTimer.prototype.init = function(){
    let _this = this
    let args = arguments
    this.timer = setTimeout(function(){
        _this.install.apply(_this,args)
    },1000)
}
SetTimer.prototype.install =function(){
    this.lastHandle();
    for(let name in this.eventHandle){
        this.currentHandle.push(name)
        if(this.eventHandle[name] && !this.pause){
            this.eventHandle[name].apply(this,arguments)
        }
    }
    if(!this.pause){
        this.init.apply(this,arguments);
    }
}
SetTimer.prototype.stop = function(){
    if(this.timer){
        clearTimeout(this.timer);
    }
}
SetTimer.prototype.lastHandle = function(){
    let _this = this
    this.removeFns.forEach(function(id){
        delete _this.eventHandle[id];
        console.log(`${id} has been deleted`)
    })
    this.removeFns = [];
    this.eventHandle = Object.assign(this.eventHandle,this.createFns);
    this.createFns = [];
};

export default new SetTimer()