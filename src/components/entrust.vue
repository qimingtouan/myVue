<template>
<div class="bk-kMarket">
     <div class="bk-trans-form">
			  <div class="bk-table">
			    <div class="bk-cell list">
			      <div class="bk-tabList">
						    <div class="bk-tabList-hd clearfix">
						        <div class="btn-group bk-btn-group" role="group">
						            <a class="btn" role="button" @click="changeData('1')">限价委托<span style="display: none;">(<span id="limitEntrustNum">0</span>)</span></a>
						            <a class="btn" role="button" @click="changeData('2')">计划委托<span style="display: none;">(<span id="readyEntrustNum">0</span>)</span></a>
						            <a class="btn" role="button" @click="changeData('3')">历史委托</a>
						        </div>
						        <a class="pull-right" href="" target="_blank" role="button"><i class="fa fa-calendar fa-fw"></i>更多记录</a>
						    </div>
						    <div class="bk-tabList-bd">
						        <div class="bk-entrust">
									    <table class="table table-striped table-bordered table-hover">
									      <thead>
									        <tr>
									          <th style="">委托时间</th>
									          <th style="text-align:left;">委托数量/已成交(ZB)</th>
									          <th style="text-align:left;">委托价格/成交均价(QC)</th>
									          <th style="">成交总额(QC)</th>
									          <th style="">状态</th>
									          <th style="">订单来源</th>
									          <th style="width:115px;">操作</th>
									        </tr>
									      </thead>
									      <tbody ><tr><td colspan="8"><div class="bk-norecord"><p><i class="bk-ico info"></i>您还没有登录，请 <a style="color:#de211d; margin:0 5px;" href="https://vip.zb.com/user/login">登录</a> 或 <a style="color:#3dc18e; margin:0 5px;" href="">注册</a> 后再尝试。</p></div></td></tr><tr></tr></tbody>
							        </table>
								</div>
						    </div>
						</div>
						<div id="tradeList" style="display:none;">
						  <div class="bk-entrust" style="max-height:500px; min-height:150px;overflow-x:hidden;overflow-y:auto;">
						    <table class="table table-striped table-bordered table-hover">
						      <thead>
						        <tr>
						          <th>成交时间</th>
						          <th style="text-align:left;">成交数量(ZB)</th>
						          <th style="text-align:left;">成交价格(QC)</th>
						          <th style="text-align:left;">成交额(QC)</th>
						          
						        </tr>
						      </thead>
						      <tbody id="tradeRecord"></tbody>
				        </table>
						</div>
					</div>

			    </div>
			  </div>
		</div>
   </div>

</template>
<script>
export default {
    name: "entrust",
    data() {
        return {
            title:["委托时间","委托数量/已成交","委托价格/成交均价","成交总额(QC)","状态","订单来源","操作"],
        };
    },
    computed: {
            
     
            
    },
    methods: {
        changeData(type){
            switch(type){
                case 1:this.title
            }
        }

    },
    created() {
    
    },
    mounted() {
        console.log(this)
    }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color:#0ebb74;
.bk-kMarket {
    height: 280px;
    overflow: hidden;
    background-color: #1f1d1d;
    margin-top: -4px;
    border-top: 1px solid #2b2929
}

.bk-kMarket .bk-trans-form .list {
    width: auto;
    
    font-size: 12px;
    vertical-align: top;
    padding-right: 10px
}

.bk-kMarket .bk-trans-form {
    padding-bottom: 20px;
    padding-top: 0;
    background-color: transparent;
    border-bottom: 0
}

.bk-kMarket .bk-entrust .bk-norecord {
    background-color: transparent!important;
    margin: 0!important
}



.bk-kMarket .table thead tr th {
    color: #666;
    background-color: transparent;
    height: auto
}

.bk-kMarket .table tbody tr td {
    color: #6d7b82
}

.bk-kMarket .table-bordered,.bk-kMarket .table-bordered>tbody>tr>td,.bk-kMarket .table-bordered>tbody>tr>th,.bk-kMarket .table-bordered>tfoot>tr>td,.bk-kMarket .table-bordered>tfoot>tr>th,.bk-kMarket .table-bordered>thead>tr>td,.bk-kMarket .table-bordered>thead>tr>th {
    border: 1px solid transparent
}

.bk-kMarket .table-bordered>thead>tr>td,.bk-kMarket .table-bordered>thead>tr>th {
    border-bottom: 1px solid #2b2929
}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(even) {
    background-color: #212020
}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #1d1c1c
}

.bk-kMarket .table-hover>tbody>tr {
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear
}

.bk-kMarket .table-hover>tbody>tr:hover {
    background-color: #111
}

.bk-kMarket .table-hover>tbody>tr:last-child>td {
    border-bottom: 0
}

.bk-kMarket .bk-entrust .table tbody td {
    height: auto;
    padding: 2px 8px
}

.bk-kMarket .bk-tabList {
    margin: 0 auto;
    width: 100%;
    overflow-x: auto
}

.bk-kMarket .bk-tabList-hd a.pull-right {
    margin-top: 2px
}

.bk-kMarket .bk-tabList-hd .btn-group .btn {
    border-bottom: 0;
    margin-right: 10px;
    font-size: 14px;
    min-width: 100px;
    padding: 0 10px 2px;
    border-radius: 0
}

.bk-kMarket .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-radius: 0
}

.bk-kMarket .bk-tabList-hd .btn-group .btn.active:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus:before {
    display: none
}

@media(max-width: 768px) {
    .bk-kMarket .bk-btn-group.btn-group {
        display:table;
        table-layout: fixed;
        width: 100%
    }

    .bk-kMarket .bk-btn-group.btn-group .btn {
        font-size: 12px;
        float: none;
        display: table-cell;
        min-width: 1%
    }
}

.bk-kMarket .bk-tabList-hd {
    padding: 3px 5px;
    border-bottom: 1px solid #2b2929
}

.bk-kMarket .bk-tabList-hd .btn-group .btn {
    color: #6d7b82;
    background-color: #2f2c2c
}

.bk-kMarket .bk-tabList-hd .btn-group .btn.active,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus {
    color: #fff;
    background-color: #de211d
}

.bk-kMarket .bk-tabList-hd .btn-group .btn.active:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus:before {
    background-color: #fa290f
}

</style>
