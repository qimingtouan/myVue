<template>
<div class="search_coin">
   <div >
       <i class="fa fa-search"></i>
       <input placeholder="搜索交易币种" v-model="inputCoin">
        
    </div>
    <div v-if="showItem" class="show_coins">
        <ul>
            <li v-for="coin in coins" :key="coin.index" @click = "selectCoin(coin.toUpperCase())">
                <span>{{coin.toUpperCase()}}</span>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    name: "search",
    data() {
        return {
           inputCoin:"",
           coins :[],
           showItem:false,
           
           
        };
    },
    props:["coinList","eventName","selectVal"],
    computed: {
            
     
            
    },
    methods: {
        selectCoin (val){
            this.inputCoin = "";
            this.showItem = false;
            if(this.selectVal){
                this.$emit(this.selectVal,val)
            }
        }

    },
    watch: {
      inputCoin (val, oldval) {
        if(val){
            let res = this.coinList.filter( item => item.toLowerCase().indexOf(val.toLowerCase())>-1 );
            res.length > 0?this.showItem = true:this.showItem = false;
            this.coins = res;
            if(this.eventName){
                this.$emit(this.eventName,res)
            }
            
        }

      }
    },
    created() {
       
    },
    mounted() {
      console.log(this.coinList)
    }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color:#0ebb74;
.search_coin {
    float: right;
    width: 220px;
    height: 29px;
    border: 1px solid #ddd;
    background: #FFF;
    padding: 0;
    text-align: left;
    line-height: 26px;
    margin-top: 10px;
    position: relative;
    input {
        background: 0;
        border: 0;
        font-size: 14px;
        width: 180px;
    }
    input:focus{
        outline: none;
    }
    i{
      font-size: 14px;
      padding: 0 10px;  
    }
}
.show_coins{
    position: absolute;
    background: #FFF;
    border: 1px solid #ddd;
    max-height: 200px;
    overflow-y: scroll;
    z-index: 99;
    width: 100%;
    li {
        list-style: none;
        text-align: left;
        font-size: 12px;
        color: #555;
        background: 0;
        line-height: 36px;
        height: 36px;
        margin: 0;
        width: 100%;
        padding: 0 15px;
    }
    li:hover{
        background-color: #f5f5f5;
    }

}
</style>
