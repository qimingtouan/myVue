<template>
<div class="wrapper">
    <header-asset></header-asset>
    <div class="container">
        <div class="bk-tabList">
            <div class="nowcoin-show">
                <span>当前搜索的交易对：<b>bcc/zb</b></span>
                <div style="float:right; ">
                    <a class="btn btn-primary btn-sm btn-backtrans" href="##" target="_self"><i class="fa fa-exchange fa-fw"></i>返回交易</a>

                </div>
            </div>
            <div class="search_more">
                <el-form :inline="true" :model="searchInfo" size="small">
                    <el-form-item label="交易对">
                        <el-input v-model="searchInfo.base" class="coin_input"></el-input>
                    </el-form-item>
                    <el-form-item label="/">
                    <el-select v-model="searchInfo.qoute" class="entrust_input">
                            <el-option label="BTC" value="shanghai"></el-option>
                            <el-option label="USDT" value="guangdong"></el-option>
                            <el-option label="ETH" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="searchInfo.entrust" placeholder="委托类型" class="entrust_input">
                            <el-option label="限价委托" value="shanghai"></el-option>
                            <el-option label="历史委托" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="类型">
                        <el-select v-model="searchInfo.trade" placeholder="交易类型" class="trade_input">
                            <el-option label="不限" value="default"></el-option>
                            <el-option label="买入" value="buy"></el-option>
                            <el-option label="卖出" value="sell"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="时间">
                        <el-date-picker
                        v-model="searchInfo.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker></el-form-item>
                    <el-form-item>
                    <el-button type="primary" >查询</el-button>
                    </el-form-item>
                </el-form>            
    <p></p>
<el-table :data="tableData5" style="width: 100%" @expand-change = "expandChange" ref="tableList" height="700px">
    <el-table-column type="expand">
      <template slot-scope="props">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>          
      </template>
    </el-table-column>
    <el-table-column label="商品 ID" prop="id">
    </el-table-column>
    <el-table-column label="商品名称" prop="name">
    </el-table-column>
    <el-table-column label="描述" prop="desc">
    </el-table-column>
     <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import headerAsset from '@/components/assetHeaderNav'
export default {
    name: "more",
    components:{headerAsset},
    data() {
        return {
            searchInfo:{
                time:"",
                trade:"",
                entrust:"",
                base:"",
                qoute:""
            },        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
        };
    },
    props:[],
    computed: {
            
     
            
    },
    methods: {
         "expandChange" (row,expandRows){
            if(expandRows.length>1){
                expandRows.forEach((element,index) => {
                    if(index < expandRows.length - 1){
                        this.$refs.tableList.toggleRowExpansion(element,false)
                    }
                });
            }

        },
        handleClick(a){
            console.log(a)
        }

    },
    watch: {
     
    },
    created() {
       
    },
    mounted() {
    
    }
};
</script>

<style  lang="less">
@buyer-color :#de211d;
@seller-color:#0ebb74;
.wrapper{
    background-color:#f5f5f5
}
.bk-tabList{
    background-color: #fff;
}
.search_more{
    padding: 20px;
}
.nowcoin-show {
    text-align: left;
    font-size: 14px;
    padding: 10px 10px 5px 10px;
    color: #666;
}

.nowcoin-show b {
    font-size: 18px;
    font-weight: bold;
    color: #e00;
    text-transform: uppercase;
}

.bk-toolBar {
    position: relative;
    line-height: 36px;
    height: 36px;
    background-color: #2a333a;
    color: #dbe1e7;

    ul li {
    	cursor: pointer;
	    display: inline-block;
	    height: 100%;
	    color: #dbe1e7;
	    text-transform: uppercase;
	    a {
		    color: #7c8187;
		    display: block;
		    padding: 0 20px;
		    position: relative;
		    z-index: 1200
		}
    }
    >ul>li.logined {
		min-width: 176px;
    	text-align: left
    }
    >ul>li:first-child {
    	margin-left: 0
    }
    >ul>li:last-child {
	    margin-right: 0
	}
	>ul>li:hover>a, >ul>li:focus>a {
	    background-color: #fff;
	    color: #2f383d;
	    height: 100%;
	    text-decoration: none
	}

	#menuNew .badge {
	    background-color: #169bd7;
	    font-weight: normal;
	    margin-left: 5px;
	    padding: 3px 6px
	}
}
.hide {
    display: none!important;
}


.navbar-black .bk-menuBar {
    background-color: #fdfdfd;
    border-bottom: 1px solid #eaebeb
}
.bk-nav .navbar-header {
    padding: 0;
    position: relative;
    z-index: 100;

    img{
    	height: 47px;
    	width: auto
    }
    a.navbar-brand {
    	padding: 0;
	    padding-top: 1px;
	    width: auto;
	    height: 53px;
	    display: block;
	    background-repeat: no-repeat;
	    background-position: left center;
	    overflow: hidden;
	    background-size: 65%;
    }
}
.bk-nav {
	.bk-sec-menu {
		border: 4px solid rgba(251,212,207,0.25);
		border-top: 0;
		padding: 0;
	}
	.bk-secd-menu:after {
		content: "";
		width: 18px;
		height: 12px;
		display: block;
		position: absolute;
		top: -11px;
		right: 50%;
		margin-right: -9px;
		background-image: url('./../../assets/img/dropdown_arrow.png');
		background-repeat: none;
		z-index: 1025; 
	}
	.bk-secd-menu:before {
		content: "";
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		border: 1px solid #eee;
		z-index: 1020 
	}
	.bk-secd-menu {
		width: 180px;
		right: -30px;

		li a img {
			height: 16px;
			width: auto;
			margin-top: -1px;
			vertical-align: middle;
			display: inline-block;
			margin-right: 3px
		}
	}
}
@media(min-width: 769px) {
	.navbar {
        border-radius:0
    }
    .navbar-static-top {
    	padding-left: 0;
		padding-right: 0;
		border-radius: 0;
    }
    .navbar-nav>li {
    	min-width: 0;
    	height: 80px;
    	padding: 20px 10px 0;
    }
    .en .navbar-nav>li {
        padding-left: 10px;
        padding-right: 10px
    }
    .bk-secd-menu {
    	background-color: transparent;
    	border-image: none;
    	border: 0;
    	border-radius: 0;
    	-webkit-box-shadow: none;
    	box-shadow: none;
    	width: 400px;
    	right: -140px;

    	.bk-secd-menu-list {
    		min-height: 200px;
    		border-left: 1px solid #eaebeb;
    		padding: 0 10px;
    		display: table-cell;
    		vertical-align: top;
    		float: none;

    		li.sxb a {
				margin: 15px auto;
				height: 26px;
				line-height: 26px;
				padding: 0;
				border-radius: 17px;
				background-color: #3a3a3a;
				color: #edfbfe;
				text-align: center;
    		}
    		li.sxb a:hover {
				background-color: #009cde;
				color: #fff;
    		}
    	}
    	.bk-secd-menu-list:first-child {
    		border-left: none;
    	}
    	.bk-secd-menu-list:last-child {
    		padding-right: 0;
    	}

    	li {
    		position: relative;
    		z-index: 1025;
    		text-align: left;
    		width: 16.6%;
    		float: left;
    		padding-left: 6px;
    		a {
    			display: inline-block;
    			padding: 7px 0 7px 15px;
    			font-size: 12px;
    			line-height: 26px;
    			color: #333;
    			white-space: normal;
    			word-break: keep-all;
    			text-align: left;
    			padding-left: 15px;
    			text-decoration: none;
    		}
    	}
    	li:focus, li:hover {
			color: #333;
			background-color: #fdf2f1;
			text-decoration: none;
    	}
    }
	.bk-secd-menu.allblock li,.bk-secd-menu.allblock li a {
		width: 100%;
		text-align: center;
		padding-left: 0
	}
	.bk-nav.navbar-black .bk-navbar .nav {
		>li>a {
			color: #4b4c4d;
		}
		>li>a.active, >li>a:focus, >li>a:hover, .open>a, .open>a:focus, .open>a:hover {
			color: #de211d
		}
	}
    .bk-navbar {
    	position: relative;
    	.nav>li>a {
			color: #fff;
			max-height: 80px;
			padding-bottom: 5px;
			overflow: hidden;
			font-size: 14px;
			font-weight: normal;
			z-index: 1005;
			border: 0;
			padding: 15px 5px 25px;
			display: inline-block;
		}
		.nav>li>a.active, .nav>li>a:focus, .nav>li>a:hover, .nav>li>a.active:focus, .nav>li>a.active:hover, .nav>li:focus>a.active, .nav>li:hover>a.active,
		.nav .open>a, .nav .open>a:focus, .nav .open>a:hover, .nav .open>a.active:focus, .nav .open>a.active:hover {
			color: #c42320;
			background-color: transparent;
	    }
		.nav>li.quit {
			min-width: 0;
			padding-left: 0;
			padding-right: 0;
			>a {
				padding: 15px 0;
			}
		}
    }
    .bk-nav .navbar-header a.navbar-brand {
        margin-left: 0;
        margin-top: 15px
    }
    .bk-nav {
    	.bk-secd-menu {
    		min-width: 180px;
    		width: 100%;
    		padding: 10px;
    		background-color: #fff;
    		border: 1px solid #eaebeb;
    		z-index: 1015;
    		font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    		-webkit-font-smoothing: antialiased;
    		-moz-osx-font-smoothing: grayscale;
    	}
    	.bk-toolBar .bk-secd-menu {
    		z-index: 1100;
    	}
    }

}
.regbtn {
    position: relative
}


.entrust_input , .trade_input{
    width: 110px;
}
.coin_input{
    width:60px;
}
</style>
