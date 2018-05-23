<template>
    <div class="trade">           
        <table class="table table-hover">
            <thead class="price_bos" >
                <tr class="price_no">
                    <th><span id="trad_buy_sell">{{title[0]}}</span><label>&nbsp;</label></th>
                    <th><span class="trad_jg">{{title[1]}}</span>(<label class="curr_name">{{tradeData.quoteCurrency}}</label>)</th>
                    <th style="text-align:right;padding-right:10px;"><span class="trad_quantity">{{title[2]}}</span>(<label class="coin_name">{{tradeData.baseCurrency}}</label>)</th>
                </tr>
            </thead>
                    <tbody>
                        <tr v-for="item in tradeData.sell" :key="item.index">
                            <td >{{"卖"+item.number}}</td>
                            <td class="seller_color">{{item.price}}</td>
                            <td class="amount seller_color">{{item.amount}}</td>
                        </tr>
                        <tr v-for="item in tradeData.buy" :key="item.index">
                            <td >{{"买"+item.number}}</td>
                            <td class="buyer_color">{{item.price}}</td>
                            <td class="amount buyer_color">{{item.amount}}</td>
                        </tr>
                    </tbody>
        </table>
    </div>

</template>
<script>
export default {
    name: "trade",
    data() {
        return {
            title:["买/卖","价格","数量"],
        };
    },
    props:["tradeData"],
    computed: {
            
     
            
    },
    methods: {
   

    },
    created() {
        let data = {}
        this.$ajax.post("/trade/api/market/price",data).then(function(res){
            let copyData = Object.assign({},res.data)
          console.log(copyData)
        }).catch(function(err){
          console.log(err)
        })
    },
    mounted() {
        console.log(this)
    }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color:#0ebb74;
.trade {
  width: 33%;
  height: 600px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
}
.amount{
    text-align:right;
    padding-right:10px;
    position: relative;
}
.buyer_color{
    color:@buyer-color;
}
.seller_color{
    color:@seller-color;
}

</style>
