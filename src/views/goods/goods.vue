<template>
  <div class="goods">
    <div class="bk-trans-asset">	
		<div class="container">
			<div class="bk-band clearfix">
                <div class="tradechoose logined" style="display: none;"> 
                    <div class="tab tabchoose">
                        <span onclick="switchOptional()">自选交易区</span>
                        <span class="edit" onclick="openEdit()">(编辑)</span>
                    </div>
                    <div class="bk-coinlist">
                        <div class="bk-tabList-hd clearfix">
                            <div class="btn-group" id="marketGroup0" role="group"></div>
                        </div>
                    </div>
                </div> 
				
				<div class="tradechoose">
					<a href="#ZB/QC" target="_self" class="tabchoose sactive active">ETH 交易区 </a>
					<div class="bk-coinlist">
						<div class="bk-tabList-hd clearfix">
							<div class="btn-group" id="marketGroup3" role="group">
								<a href="#ZB/ETH" class="btn" role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-zb.png?V1526537246247">ZB/ETH</a>
								
								<a href="#BTC/ETH" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-btc.png?V1526537246247">BTC/ETH</a>
								
								<a href="#BCC/ETH" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcc.png?V1526537246247">BCC/ETH</a>

								<a href="#LTC/ETH" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ltc.png?V1526537246247">LTC/ETH</a>

								<a href="#EOS/ETH" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-eos.png?V1526537246247">EOS/ETH</a>

							</div>
						</div>
					</div>
				</div>

				<div class="tradechoose">
					<a href="zbusdt" target="_self" class="tabchoose">USDT 交易区 </a>
					<div class="bk-coinlist">
						<div class="bk-tabList-hd clearfix">
							<div class="btn-group" id="marketGroup1" role="group">
								<a href="zbusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-zb.png?V1526537246247">ZB/USDT</a>
								 
								<a href="btcusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-btc.png?V1526537246247">BTC/USDT</a>
								 
								<a href="bccusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcc.png?V1526537246247">BCC/USDT</a>
																 
								<a href="ltcusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ltc.png?V1526537246247">LTC/USDT</a>
																 
								<a href="ethusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-eth.png?V1526537246247">ETH/USDT</a>
																 
								<a href="etcusdt" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-etc.png?V1526537246247">ETC/USDT</a>								
							</div>
						</div>
					</div>
				</div>
				
				<div class="tradechoose">
					<a href="zbbtc" target="_self" class="tabchoose">BTC 交易区 </a>
					<div class="bk-coinlist">
						<div class="bk-tabList-hd clearfix">
							<div class="btn-group" id="marketGroup2" role="group">
								<a href="zbbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-zb.png?V1526537246247">ZB/BTC</a>					  
								<a href="bccbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcc.png?V1526537246247">BCC/BTC</a>

								<a href="ltcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ltc.png?V1526537246247">LTC/BTC</a>

								<a href="ethbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-eth.png?V1526537246247">ETH/BTC</a>

								<a href="etcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-etc.png?V1526537246247">ETC/BTC</a>

								<a href="btsbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bts.png?V1526537246247">BTS/BTC</a>

								<a href="eosbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-eos.png?V1526537246247">EOS/BTC</a>

								<a href="qtumbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-qtum.png?V1526537246247">QTUM/BTC</a>

								<a href="hsrbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-hsr.png?V1526537246247">HSR/BTC</a>
																 
								<a href="xrpbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-xrp.png?V1526537246247">XRP/BTC</a>

								<a href="dashbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-dash.png?V1526537246247">DASH/BTC</a>

								<a href="ubtcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ubtc.png?V1526537246247">UBTC/BTC</a>

								<a href="bcdbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcd.png?V1526537246247">BCD/BTC</a>

								<a href="sbtcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-sbtc.png?V1526537246247">SBTC/BTC</a>

								<a href="inkbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ink.png?V1526537246247">INK/BTC</a>

								<a href="tvbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-tv.png?V1526537246247">TV/BTC</a>

								<a href="bcxbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcx.png?V1526537246247">BCX/BTC</a>
																  
								<a href="bthbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bth.png?V1526537246247">BTH/BTC</a>
								<a href="lbtcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-lbtc.png?V1526537246247">LBTC/BTC</a>

								<a href="chatbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-chat.png?V1526537246247">CHAT/BTC</a>
																  
								<a href="hlcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-hlc.png?V1526537246247">HLC/BTC</a>

								<a href="bcwbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bcw.png?V1526537246247">BCW/BTC</a>
										                     								  
								<a href="btpbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-btp.png?V1526537246247">BTP/BTC</a>

								<a href="topcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-topc.png?V1526537246247">TOPC/BTC</a>

								<a href="entbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ent.png?V1526537246247">ENT/BTC</a>

								<a href="batbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bat.png?V1526537246247">BAT/BTC</a>

								<a href="1stbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-1st.png?V1526537246247">1ST/BTC</a>
								  
								<a href="safebtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-safe.png?V1526537246247">SAFE/BTC</a>

								<a href="qunbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-qun.png?V1526537246247">QUN/BTC</a>

								<a href="btnbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-btn.png?V1526537246247">BTN/BTC</a>

								<a href="truebtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-true.png?V1526537246247">TRUE/BTC</a>
																 
								<a href="cdcbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-cdc.png?V1526537246247">CDC/BTC</a>
																 
								<a href="ddmbtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-ddm.png?V1526537246247">DDM/BTC</a>
																 
								<a href="bitebtc" class="btn " role="button"><img src="https://s.zb.com/statics/img/v2/trans/market-bite.png?V1526537246247">BITE/BTC</a>
							</div>
						</div>
					</div>
				</div>
				<search-coin :coin-list = "coinsData" selectVal = "handle" eventName = "handle1" v-on:handle1="showResult1" v-on:handle="showResult"></search-coin>	
			</div>
			
			<div class="bg_fff" style="padding:0px 15px 0;">
				<div class="bk-tabList">
					<div class="bk-tabList-bd">
						<div class="row">
							<div class="col-xs-8">
								<div class="row">
									<div class="col-xs-12 textLeft ft14 mt10 tradepair">
										交易对：<b>ZB / QC</b>
									</div>
									<div class="col-xs-6 text-left item">
										<div class="line">可用:<b id="canUseMoney" class="text-primary">--</b> QC</div>
										<div class="line">可买:<b id="canBuyCoin" class="text-gray">--</b> ZB</div>
									</div>
									<div class="col-xs-6 text-left item">
										<div class="line">可用:<b id="canUseCoin" class="text-second">--</b> ZB</div>
										<div class="line">可卖:<b id="canSellMoney" class="text-gray">--</b> QC</div>
									</div>
								</div>
							</div>
							
							<div class="col-xs-4 price">
								<h4><span>zb:</span> 
									<b id="curPrice" class="text-primary" style="display: inline;">QC5.5802<i class="iconfont icon-arrowup"></i></b>
									<span id="riseRate" class="text-primary" style="display:none !important;">--</span>
								</h4>
								<h6>高：<span id="maxHeightPrice" class="mr15">QC5.8600</span>低：<span id="minLowPrice" class="mr15">QC3.7312</span>量：<span id="dayVolume" title="ZB 700780239.02">7.0078亿</span></h6>
								
								<div class="iconlist-show">
									<a href="markets/zbqc"><i class="fa fa-line-chart fa-fw"></i>K线交易</a>
									<a href="https://www.zb.com/i/coin?id=51" target="_blank"><i class="fa fa-book fa-fw"></i>币种资料</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="bk-trans-form">
		<div class="container">
			<div class="clearfix">
			    <div class="bk-trans-left bg_fff col-xs-4 item">
					<div class="bk-buy-form">
						<div class="buy_header" id="bkBuyType">
							<div>
								<img src="../../assets/img/buy_60X60.png" alt="">
							</div>
							<div class="buy_title">
								限价买入
							</div>
						</div>

						<!-- 限价/批量买入委托开始 -->
						<div id="buyDefaultForm">
							<div class="form-group has-feedback form-subline">
								<label class="control-label" for="buyUnitPrice">
									<span class="buyDefaultLabel">买入价</span> (QC)
								</label>
								<div class="input-group">
									<input type="text" class="form-control form-second" id="buyUnitPrice" name="buyUnitPrice">
								</div>
							</div>
							
							<div class="form-group has-feedback form-subline">
								<label class="control-label" for="buyNumber">买入量 (ZB)</label>
								<div class="input-group">
									<input type="text" class="form-control form-second" id="buyNumber" name="buyNumber">
								</div>
							</div>

							<div class="range range_buy" id="buySlider">
								<!-- 买单滑动杆 -->
								<span class="sliderPercent">0.00%</span>
								<div class="range_wrap" data-ratio="0" tabindex="0">
									<div class="range_paths_wrap">
										<div class="range_path"></div>
									</div>
									<div class="range_track_wrap">
										<div class="range_track"></div>
										<div class="range_handle"></div>
									</div>
									<div class="range_points_wrap">
										<div class="range_point" data-point-ratio="0" style="left: 0%;"></div>
										<div class="range_point" data-point-ratio="25" style="left: 25%;"></div>
										<div class="range_point" data-point-ratio="50" style="left: 50%;"></div>
										<div class="range_point" data-point-ratio="75" style="left: 75%;"></div>
										<div class="range_point" data-point-ratio="100" style="left: 100%;"></div>
									</div>
								</div>
							</div>

							<div class="form-group has-feedback">
								<label class="control-label" for="realBuyAccount">预计交易额：<b class="text-primary" id="realBuyAccount">0.00</b> QC</label>	
								
							</div>

						</div>
						<!-- 限价/批量买入委托结束 -->



						<div class="form-group">
							<button id="buyBtn" type="button" class="btn btn-primary btn-block ft16">
							立即买入
							</button>
						</div>
					</div>
			  	</div>
				<div class="bk-trans-left bg_fff col-xs-4 item2">

						<div class="bk-sell-form">
							<div class="sell_header" >
								<div>
									<img src="../../assets/img/buy_60X60.png" alt="">
								</div>
								<div class="buy_title">
									限价卖出
								</div>
							</div>

							<!-- 限价/批量委托卖出开始 -->
							<div id="sellDefaultForm">
								<div class="form-group has-feedback form-subline">
									<label class="control-label" for="sellUnitPrice">
									<span class="sellDefaultLabel">卖出价</span> (QC)
									</label>
									<div class="input-group">
										<input type="text" class="form-control form-second" id="sellUnitPrice" name="sellUnitPrice" ref="sellPricev" v-on:input="pricecnysell()">
									</div>
								</div>
								
								<div class="form-group has-feedback form-subline">
									<label class="control-label" for="sellNumber">卖出量 (ZB)</label>
									<div class="input-group">
										<input type="text" class="form-control form-second" id="sellNumber" name="sellNumber">
									</div>
								</div>

								<div class="range range_sell" id="sellSlider"><!-- 卖单滑动杆 --><span class="sliderPercent">0.00%</span><div class="range_wrap" data-ratio="0" tabindex="0"><div class="range_paths_wrap"><div class="range_path"></div></div><div class="range_track_wrap"><div class="range_track"></div><div class="range_handle"></div></div><div class="range_points_wrap"><div class="range_point" data-point-ratio="0" style="left: 0%;"></div><div class="range_point" data-point-ratio="25" style="left: 25%;"></div><div class="range_point" data-point-ratio="50" style="left: 50%;"></div><div class="range_point" data-point-ratio="75" style="left: 75%;"></div><div class="range_point" data-point-ratio="100" style="left: 100%;"></div></div></div></div>

								<div class="form-group has-feedback">
									<label class="control-label" for="realSellAccount">预计交易额：<b class="text-second" id="realSellAccount">0.00</b> QC</label>
								</div>
							</div>
							<!-- 限价/批量委托卖出结束 -->

							<div class="form-group">
								<button id="sellBtn" type="button" class="btn btn-second btn-block ft16">
									立即卖出
								</button>
							</div>
						</div>

			  	</div>
			  	<div class="bk-trans-right bg_fff col-xs-4 pull-right">
					<div class="post_orders">
						<div style="display:inline-block;margin-right:35px">
							挂单
						</div>
						<el-select v-model="value" placeholder="买卖档位" size="mini">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="value" placeholder="默认深度" size="mini">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="bk-market-form market">
						<table id="sellMarket" width="100%">
							<thead>
								<tr>
									<td>买/卖</td>
									<td>价格</td>
									<td>数量</td>
									<td></td>
								</tr>
							</thead>
							<tbody>  
								<tr>
									<td width="20%" class="text-second">卖5</td>
									<td width="30%">5.5229</td>
									<td width="30%" class="text-right text-g">50.<g>00</g></td>
									<td width="20%" class="text-left"><div class="percent text-second" style="width:2.06%"></div></td>
								</tr>
								<tr>
									<td width="20%" class="text-second">卖4</td>
									<td width="30%">5.5202</td>
									<td width="30%" class="text-right text-g">517.<g>39</g></td>
									<td width="20%" class="text-left"><div class="percent text-second" style="width:21.35%"></div></td>
								</tr>
											  
								<tr>
									<td width="20%" class="text-second">卖3</td>
									<td width="30%">5.5201</td>

									<td width="30%" class="text-right text-g">761.<g>20</g></td>

									<td width="20%" class="text-left"><div class="percent text-second" style="width:31.40%"></div></td>
								</tr>

								<tr>
									<td width="20%" class="text-second">卖2</td>
									<td width="30%">5.5200</td>

									<td width="30%" class="text-right text-g">2204.<g>18</g></td>

									<td width="20%" class="text-left"><div class="percent text-second" style="width:90.94%"></div></td>
								</tr>
			  
								<tr>
									<td width="20%" class="text-second">卖1</td>
									<td width="30%">5.5198</td>

									<td width="30%" class="text-right text-g">2423.<g>84</g></td>

									<td width="20%" class="text-left"><div class="percent text-second" style="width:100.00%"></div></td>
								</tr>	  
							</tbody>
						</table>
			  	    	<div class="bk-divider" style="margin:10px auto;"></div>
						<table id="buyMarket" width="100%">
							<tbody>		
								<tr>
									<td width="20%" class="text-primary">买1</td>
									<td width="30%">5.5150</td>

									<td width="30%" class="text-right text-g">20.<g>00</g></td>

									<td width="20%" class="text-left"><div class="percent text-primary" style="width:2.44%"></div></td>
								</tr>
								<tr>
									<td width="20%" class="text-primary">买2</td>
									<td width="30%">5.5122</td>

									<td width="30%" class="text-right text-g">50.<g>00</g></td>

									<td width="20%" class="text-left"><div class="percent text-primary" style="width:6.10%"></div></td>
								</tr>
								<tr>
									<td width="20%" class="text-primary">买3</td>
									<td width="30%">5.5106</td>

									<td width="30%" class="text-right text-g">223.<g>65</g></td>

									<td width="20%" class="text-left"><div class="percent text-primary" style="width:27.27%"></div></td>
								</tr>
								<tr>
									<td width="20%" class="text-primary">买4</td>
									<td width="30%">5.5104</td>

									<td width="30%" class="text-right text-g">165.<g>10</g></td>

									<td width="20%" class="text-left"><div class="percent text-primary" style="width:20.13%"></div></td>
								</tr>

								<tr>
									<td width="20%" class="text-primary">买5</td>
									<td width="30%">5.5101</td>

									<td width="30%" class="text-right text-g">820.<g>00</g></td>

									<td width="20%" class="text-left"><div class="percent text-primary" style="width:100.00%"></div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			  	<div class="bk-trans-record bg_fff ">

					  <entrust :gettype="type1">                    
						<div class="btn-group bk-btn-group" role="group" slot="header">
                        <a class="btn" role="button"  >限价委托</a>
                    </div>
					</entrust>
					  <entrust :gettype="type2">
						  <div class="btn-group bk-btn-group" role="group" slot="header">
                        <a class="Abtn" role="button">历史委托</a>
                    </div>
					  </entrust>
				</div>
			</div>
		</div>
	</div>

  </div>
</template>

<script>
	import searchCoin from '@/components/search.vue'
	import entrust from '@/components/entrust2.vue'
	export default {
		name: 'goods',
		components:{searchCoin,entrust},

		data () {
			return {
				prices:{
				},
				options: [{
					value: '选项1',
					label: '5档'
					}, {
					value: '选项2',
					label: '10档'
					}, {
					value: '选项3',
					label: '20档'
					}, {
					value: '选项4',
					label: '50档'
					},],
				symbol:"btcusdt",
				value:"",
				type1:"0",
				type2:"2",
				coinsData:["ZB/QC","ZB/BTC","ZB/USDT","BTC/USDT","ETH/USDT","ETC/BTC","ETC/QC"]
			}
		},
	    computed: {
			      
		},
		methods: {
			showResult (res){
				console.log(res)
			},
			showResult1 (res){
				console.log(res)
			}

		},
	    created() {
	        
	    },
	    mounted() {
	     
	    }
	}
</script>

<style lang = "less">
	a {
	    color: #de211d;
	    text-decoration: none
	}

	a:focus,a:hover {
	    color: #f33a36;
	    text-decoration: underline
	}

	.bk-band .tab,.bk-band a {
	    position: relative;
	    height: 50px;
	    line-height: 50px;
	    padding: 0 15px;
	    min-width: 150px;
	    font-size: 16px;
	    color: #4b4c4d;
	    display: block;
	    float: left;
	    margin-right: 20px;
	    background-color: #eee;
	    -ms-transition: all .2s linear;
	    cursor: pointer;
	    -moz-transition: all .2s linear;
	    -webkit-transition: all .2s linear;
	    -o-transition: all .2s linear;
	    transition: all .2s linear
	}

	.bk-band .tab.active,.bk-band .tab:hover,.bk-band a:hover {
	    background-color: #fff;
	    text-decoration: none
	}

	.bk-band a.active {
	    background: #fff;
	    text-decoration: none
	}

	.bk-band a:before1 {
	    width: 0;
	    height: 0;
	    border-bottom: 50px solid #e4e4e4;
	    border-right: 13px solid transparent;
	    content: "";
	    display: block;
	    position: absolute;
	    right: -13px;
	    bottom: 0
	}

	.bk-band a:hover:before,.bk-band a.active:before {
	    border-bottom-color: #ddd
	}

	.bk-band .tab .edit {
	    font-size: 12px;
	    color: #E00
	}

	.bk-band a i {
	    font-size: 12px
	}

	.tradepair {
	    color: #666
	}

	.tradepair b {
	    font-weight: bold;
	    font-size: 16px;
	    color: #e00
	}

	.bk-trans-asset .item,.bk-trans-form .item {
	    font-size: 14px;
	    padding-bottom: 4px
	}

	.bk-trans-asset .price,.bk-trans-form .price {
	    font-size: 14px
	}

	.bk-trans-asset .item p,.bk-trans-asset .item .line {
	    margin: 5px auto 5px
	}

	.bk-trans-asset .bk-band {
	    position: relative
	}

	.bk-coinlist {
	    background: rgba(255,255,255,0.97);
	    position: absolute;
	    width: 100%;
	    z-index: 100;
	    top: 50px;
	    left: 0;
	    padding: 10px 10px;
	    display: block;
	    border: 1px solid #eee;
	    border-top: 0;
	    box-shadow: 0 2px 2px rgba(0,0,0,0.1);
	    display: none
	}

	.tradechoose:hover .bk-coinlist {
	    display: block;
	    top: 50px
	}

	.tradechoose:hover>a {
	    background: #FFF
	}

	.bk-coinlist a {
	    background: 0;
	    padding: 0!important;
	    margin-right: 5px;
	    height: auto;
	    line-height: 25px;
	    min-width: auto;
	    font-weight: 400
	}

	.bk-coinlist .bk-tabList-hd {
	    border-bottom: 0
	}

	.bk-trans-asset .bk-coinlist .bk-tabList-hd .btn-group .btn {
	    padding: 5px 10px!important;
	    font-weight: 400;
	    font-size: 12px;
	    width: 11%
	}

	.bk-trans-asset .bk-coinlist .bk-tabList-hd .btn-group .btn.active {
	    background: 0
	}

	@media(max-width: 1400px) {
	    .bk-trans-asset .bk-coinlist .bk-tabList-hd .btn-group .btn {
	        width:12.7%
	    }
	}

	#curPrice {
	    font-size: 24px;
	    cursor: pointer
	}

	#riseRate {
	    font-size: 14px;
	    display: inline-block;
	    padding: 3px 5px;
	    margin-left: 15px;
	    line-height: 1;
	    border-radius: 3px;
	    vertical-align: text-bottom;
	    color: #fff
	}

	#riseRate.text-primary {
	    background-color: #de211d
	}

	#riseRate.text-second {
	    background-color: #3dc18e
	}

	.bk-trans-asset .price {
	    text-align: left
	}

	.bk-trans-asset .price h4 {
	    margin-top: 10px
	}

	.bk-trans-asset .price h6 {
	    padding-left: 8px;
	    margin: 0;
	    color: #666
	}

	.bk-trans-asset .price .iconfont {
	    font-size: 14px;
	    position: relative;
	    left: 5px;
	    top: -3px
	}

	.bk-trans-asset {
	    padding-top: 5px;
	    margin-bottom: 20px;
	    position: relative
	}

	.bk-trans-asset .alert {
	    position: absolute;
	    top: 0;
	    left: 0;
	    z-index: 100;
	    width: 100%;
	    height: auto;
	    border: 0;
	    background-color: rgba(42,51,58,0.75);
	    padding: 20px 35px 20px 15px;
	    display: none;
	    color: #fdfdfd
	}

	.bk-trans-asset .bk-tabList {
	    margin: 0
	}

	.bk-trans-asset .bk-tabList-hd .btn-group .btn {
	    font-weight: bold;
	    margin-right: 15px
	}

	.bk-trans-asset .bk-tabList-bd {
	    padding-top: 10px;
	    position: relative
	}

	@media(max-width: 1230px) {
	}

	.bk-trans-asset .bk-tabList-hd .btn-group .btn img,.bk-kType img {
	    height: 20px;
	    width: auto;
	    margin-right: 5px
	}

	.add-btn {
	    position: absolute;
	    top: 0;
	    right: 0;
	    width: 40px;
	    height: 20px;
	    background-position: 50% 50%;
	    background-repeat: no-repeat;
	    display: block
	}

	.add-btn.new {
	    background-image: url(/statics/img/v2/trans/add-new.gif)
	}

	.add-btn.hot {
	    background-image: url(/statics/img/v2/trans/add-hot.gif)
	}

	.bk-trans-form .form-group {
	    margin-left: 0;
	    margin-right: 0;
	    margin-bottom: 5px;

	    text-align: left
	}

	.bk-trans-form .form-group a.openMember {
	    font-size: 12px;
	    float: right;
	    margin-top: 2px
	}

	.bk-trans-form .form-control {
	    padding-right: 15px;
	    font-size: 14px;
	    text-align: right;
	    -webkit-box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
	    box-shadow: inset 1px 1px 3px rgba(0,0,0,.075)
	}

	.bk-trans-form .input-group .form-control:last-child {
	    border-radius: 0
	}

	.bk-trans-form .input-group {
	    width: 100%
	}

	.bk-trans-form .control-label {
	    text-align: left;
	    font-weight: normal;
	    padding-top: 0;
	    margin-bottom: 5px
	}

	.bk-trans-form .form-subline {
	    margin-bottom: 20px
	}

	.bk-trans-form .form-subline .control-label {
	    font-family: "Microsoft YaHei";
	    margin-bottom: 4px;
	    color: #6d7b82;
	    position: absolute;
	    left: 10px;
	    top: 13px;
	    z-index: 90
	}

	.bk-trans-form .isreal {
	    display: inline-block;
	    padding-top: 3px;
	    float: right
	}

	.bluepopover {
	    display: block;
	    position: relative
	}

	.bluepopover .popover {
	    display: none;
	    width: 300px;
	    font-size: 12px;
	    text-align: left;
	    top: -91px;
	    left: -92px;
	    padding: 5px 0 0
	}

	.bluepopover:hover .popover {
	    display: block
	}

	.bk-buy-form,.bk-sell-form {
	    margin: 0 auto
	}

	.bk-buy-form .form-second {
	    color: #de211d;
	    font-weight: bold
	}

	.bk-sell-form .form-second {
	    color: #3dc18e;
	    font-weight: bold
	}

	.bk-trans-form .buyLabel,.bk-trans-form .sellLabel {
	    display: none
	}

	.bk-trans-left {
	    padding-top: 15px;
	    padding-bottom: 13px;
	    margin-bottom: 10px
	}

	.bk-trans-right {
	    padding-top: 15px;
	    padding-bottom: 10px;
	    border-left: 10px solid #f5f5f5
	}

	.bk-trans-form .range {
	    width: 100%;
	    padding-right: 70px;
	    height: 17px;
	    margin: 20px 0 15px 0;
	    background: none!important;
	    position: relative
	}

	.bk-trans-form .sliderPercent {
	    width: 60px;
	    height: 22px;
	    text-align: right;
	    display: block;
	    font-size: 14px;
	    line-height: 22px;
	    position: absolute;
	    right: 0;
	    top: -5px;
	    z-index: 11
	}

	.bk-kMarket .range {
	    width: 100%;
	    height: 17px;
	    margin: 10px 0 0 0;
	    padding: 0 5px
	}

	.sellBatLabel,.buyBatLabel,#sellPlanForm,#buyPlanForm {
	    display: none
	}

	.bk-market-form {
	    color: #333;
	    font-size: 14px
	}

	.bk-market-form g {
	    color: #999
	}

	.bk-market-form table tr {
	    cursor: pointer
	}

	.bk-market-form table tr td {
	    line-height: 26px;
	    font-family: Arial,"Microsoft YaHei",sans-serif
	}

	.bk-market-form table tr:hover td {
	    background-color: #f9f9f9
	}

	.bk-market-form table tr td:last-child {
	    padding-right: 15px;
	    padding-left: 5px
	}

	.bk-market-form table tr td:first-child {
	    font-size: 12px
	}

	.bk-market-form .percent {
	    display: inline-block;
	    height: 15px;
	    vertical-align: middle;
	    position: relative;
	    top: -2px;
	    max-width: 100%;
	    min-width: 3%
	}

	.bk-market-form .percent.text-primary {
	    background-color: #de211d
	}

	.bk-market-form .percent.text-second {
	    background-color: #3dc18e
	}

	.bk-trans-btn {
	    margin-bottom: 20px
	}

	.bk-trans-btn .btn {
	    height: 26px;
	    line-height: 1.2;
	    min-width: 110px;
	    border-radius: 15px;
	    margin: 0 6px 8px;
	    text-shadow: 0 0 1px #fff
	}

	.bk-entrust {
	    margin-bottom: 20px;
	    font-size: 14px
	}

	.bk-entrust .bkNum {
	    color: #61727c;
	    font-size: 16px
	}

	.bk-entrust .bkNum g {
	    color: inherit;
	    font-size: 14px
	}

	.bk-entrust .bkNum.text-primary {
	    color: #de211d
	}

	.bk-entrust .bkNum.text-second {
	    color: #3dc18e
	}

	.bk-entrust .table {
	    margin-bottom: 0
	}

	.bk-entrust .table thead a {
	    color: #3dc18e;
	    font-size: 12px
	}

	.bk-entrust .table tbody a {
	    color: #3dc18e;
	    font-size: 14px
	}

	.bk-entrust .table tbody td {
	    height: auto;
	    padding: 15px 8px
	}

	#tradeRecord td {
	    font-size: 12px;
	    padding: 5px 8px
	}

	.bk-entrust .bk-norecord {
	    margin: -15px -8px
	}

	.bk-entrust .label {
	    display: inline-block;
	    font-size: 12px;
	    padding: 2px;
	    position: relative;
	    top: -2px;
	    margin-right: 3px;
	    margin-left: 0;
	    font-weight: normal;
	    font-size: 12px
	}

	.bk-entrust .label.text-primary {
	    background-color: #de211d;
	    color: #fff
	}

	.bk-entrust .label.text-second {
	    background-color: #3dc18e;
	    color: #fff
	}

	.bk-depth {
	    margin: 10px auto
	}

	.bk-depth li {
	    float: left;
	    width: 16.66666666%;
	    height: 26px;
	    line-height: 26px;
	    text-align: center;
	    border: 1px solid #c9c9ca;
	    border-right: 0;
	    color: #656f77
	}

	.bk-depth li:last-child {
	    border-right: 1px solid #c9c9ca
	}

	.bk-depth li:hover,.bk-depth li.active {
	    background-color: #de211d;
	    color: #fff
	}

.buy_header ,.sell_header{
	border-top: 3px solid 5555;
	padding: 24px 0 20px 0;
}

	.bk-search {
	    text-align: left;
	    padding-bottom: 5px;
	    padding-left: 15px
	}

	.bk-search #doSearchBtn,.bk-search #reSetBtn {
	    min-width: 100px
	}

	.bk-trans-form .control-label,.bk-trans-asset .item .line,.bk-trans-asset .item p {
	    font-size: 12px;
	    color: #666
	}

	.bk-trans-form .control-label b,.bk-trans-asset .item p b,.bk-trans-asset .item .line b {
	    font-size: 14px;
	    font-family: Arial,"Microsoft YaHei",sans-serif;
	    cursor: pointer
	}

	#leverAccountSellLabel,#leverAccountBuyLabel {
	    opacity: .3;
	    cursor: not-allowed
	}

	#leverAccountSellLabel.open,#leverAccountBuyLabel.open {
	    opacity: 1;
	    cursor: auto
	}

	#leverAccountSellLabel .bluepopover,#leverAccountBuyLabel .bluepopover {
	    display: none
	}

	#leverAccountSellLabel.open .bluepopover,#leverAccountBuyLabel.open .bluepopover {
	    display: block
	}

	.bk-kMarket {
	    height: 280px;
	    overflow: hidden;
	    background-color: #1f1d1d;
	    margin-top: -4px;
	    border-top: 1px solid #2b2929
	}

	.bk-kMarket .bk-trans-form .item {
	    width: 260px;
	    font-size: 12px;
	    vertical-align: top;
	    padding-right: 10px;
	    padding-left: 0
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

	.bk-kMarket .bk-trans-form .btn-hg {
	    border-radius: 0!important;
	    padding: 0 10px;
	    font-size: 14px
	}

	.bk-kMarket .bk-trans-form .btn-hg .bk-ico {
	    display: none
	}

	.bk-kMarket .bk-trans-form .form-group {
	    margin-left: 0;
	    margin-right: 0;
	    margin-bottom: 5px;
	    text-align: left
	}

	.bk-kMarket .bk-trans-form .form-control {
	    padding: 0 15px;
	    font-size: 14px;
	    text-align: right;
	    border-radius: 0!important;
	    background-color: #212020;
	    color: #fff;
	    border: 1px solid #333;
	    -webkit-box-shadow: none;
	    box-shadow: none
	}

	.bk-kMarket .bk-trans-form .form-control:hover,.bk-kMarket .bk-trans-form .form-control:focus {
	    background-color: #052348
	}

	.bk-kMarket .bk-trans-form .input-group .form-control:last-child {
	    border-radius: 0
	}

	.bk-kMarket .bk-trans-form .control-label {
	    display: block;
	    font-family: "Microsoft YaHei";
	    margin-bottom: 4px;
	    color: #6d7b82;
	    position: absolute;
	    left: 10px;
	    top: 8px;
	    z-index: 90
	}

	.bk-kMarket .bk-buy-form,.bk-kMarket .bk-sell-form {
	    width: 100%;
	    margin: 0 auto
	}

	.bk-kMarket .bk-trans-form .buyLabel,.bk-trans-form .sellLabel {
	    display: none
	}

	.bk-kMarket .bk-entrust .bk-norecord {
	    background-color: transparent!important;
	    margin: 0!important
	}

	@media(max-width: 1199px) {
	    .bk-kMarket .bk-trans-form .item {
	        width:200px
	    }
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

	.bk-kHeader {
	    padding: 0 10px;
	    line-height: 40px;
	    color: #6d7b82;
	    border-bottom: 1px solid #2b2929
	}

	.bk-kHeader a {
	    color: #6d7b82
	}

	.bk-kHeader a:hover {
	    color: #de211d;
	    text-decoration: none
	}

	.bk-kLogo {
	    margin-right: 10px
	}

	.bk-kLogo img {
	    height: 32px;
	    width: auto
	}

	.bk-kUser a {
	    font-size: 14px;
	    padding: 0 10px
	}

	.bk-kType a {
	    font-size: 14px;
	    display: block;
	    padding: 0 10px;
	    font-weight: bold
	}

	.bk-kType a.active {
	    color: #de211d;
	    background-color: #333
	}

	.bk-kType a:hover {
	    color: #de211d
	}

	.bk-kType .dropdown-toggle {
	    line-height: 42px;
	    font-size: 16px;
	    font-weight: bold;
	    cursor: pointer;
	    text-align: left;
	    padding: 0 35px 0 25px;
	    border-left: 1px solid #333;
	    border-right: 1px solid #333;
	    background-color: #212020
	}

	.bk-kType .dropdown-toggle:hover {
	    background-color: #333;
	    color: #de211d
	}

	.bk-kType .dropdown-menu {
	    padding: 0;
	    width: 100%;
	    border: 1px solid #333;
	    background-color: #212020
	}

	.bk-kType .drop-group .dropdown-toggle:after {
	    top: 13px
	}

	.bk-kType .dropdown-toggle img {
	    height: 25px;
	    margin-right: 5px;
	    vertical-align: middle
	}

	.bk-kType .dropdown-menu img {
	    height: 20px;
	    vertical-align: middle
	}

	.bk-kcoin li {
	    float: left;
	    line-height: 42px;
	    border-right: 1px solid #333
	}

	.bk-kcoin li a {
	    display: block;
	    padding: 0 10px;
	    background-color: #212020;
	    font-size: 14px;
	    font-weight: bold;
	    cursor: pointer
	}

	.bk-kcoin a.active {
	    color: #de211d;
	    background-color: #333
	}

	.bk-kcoin a:hover {
	    color: #de211d
	}

	.bk-kcoin img {
	    height: 20px;
	    vertical-align: middle;
	    margin-right: 5px;
	    position: relative;
	    top: -2px
	}

	.bk-kTool {
	    line-height: 40px
	}

	.bk-kTool a {
	    width: 20px;
	    height: 20px;
	    display: inline-block;
	    vertical-align: middle;
	    margin: 0 10px;
	    cursor: pointer;
	    background-image: url(/statics/img/v2/common/kline-toggle.png);
	    background-position: 0 0;
	    background-repeat: no-repeat
	}

	.bk-kTool a.toggle-foot {
	    background-position: 0 0
	}

	.bk-kTool a.toggle-foot.active {
	    background-position: 0 -20px
	}

	.bk-kTool a.toggle-foot:hover {
	    background-position: -20px 0
	}

	.bk-kTool a.toggle-foot.active:hover {
	    background-position: -20px -20px
	}

	.bk-kTool a.toggle-right {
	    background-position: 0 -40px
	}

	.bk-kTool a.toggle-right.active {
	    background-position: 0 -60px
	}

	.bk-kTool a.toggle-right:hover {
	    background-position: -20px -40px
	}

	.bk-kTool a.toggle-right.active:hover {
	    background-position: -20px -60px
	}

	.bk-kType .dropdown-menu li {
	    position: relative;
	    border-bottom: 1px solid #333
	}

	.bk-kType .dropdown-menu li>a {
	    display: block
	}

	.bk-kType .dropdown-menu li:hover>a {
	    background: #3a3a3a;
	    color: #de211d
	}

	.bk-kType .right-show {
	    display: none;
	    width: 560px;
	    position: absolute;
	    left: 100%;
	    top: -1px;
	    background: #212020;
	    border: 1px solid #333;
	    text-align: left
	}

	.bk-kType .right-show a {
	    display: inline-block;
	    width: 25%;
	    text-align: left;
	    padding-left: 20px;
	    line-height: 41px;
	    float: left
	}

	.bk-kType .dropdown-menu li:hover .right-show {
	    display: block
	}

	.bk-kType .right-show a:hover {
	    background: #333;
	    color: #de211d
	}

	.range_wrap {
	    -moz-user-select: -moz-none;
	    -moz-user-select: none;
	    -webkit-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    outline: 0;
	    cursor: pointer;
	    padding: 7px 0 8px
	}

	.range_wrap .range_paths_wrap {
	    position: relative;
	    z-index: 1
	}

	.range_wrap .range_path {
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 2px;
	    width: 100%;
	    background: #ccc;
	    transition: all .05s;
	    -moz-transition: all .05s;
	    -webkit-transition: all .05s;
	    -o-transition: all .05s
	}

	.range_wrap .range_track_wrap {
	    position: relative
	}

	.range_wrap .range_track {
	    z-index: 2;
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 2px;
	    width: 0;
	    background: #090;
	    transition: all .05s;
	    -moz-transition: all .05s;
	    -webkit-transition: all .05s;
	    -o-transition: all .05s
	}

	.range_wrap .range_handle {
	    position: absolute;
	    width: 14px;
	    height: 14px;
	    border: 1px solid #ccc;
	    background: #FFF;
	    border-radius: 50%;
	    top: -7px;
	    z-index: 4;
	    margin-left: -4px;
	    cursor: col-resize;
	    cursor: -webkit-grab;
	    transition: left .05s;
	    -moz-transition: left .05s;
	    -webkit-transition: left .05s;
	    -o-transition: left .05s
	}

	.range_wrap .range_points_wrap {
	    position: relative;
	    top: -3px
	}

	.range_wrap .range_point {
	    z-index: 3;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 16px;
	    height: 16px;
	    border-radius: 50%;
	    margin: -4px 0 0 -4px;
	    text-align: center
	}

	.range_wrap .range_point:after {
	    content: '';
	    display: inline-block;
	    width: 8px;
	    height: 8px;
	    background: #ccc;
	    border-radius: 50%;
	    vertical-align: top;
	    margin-top: 4px
	}

	.range_wrap .range_point:hover:after {
	    width: 16px;
	    height: 16px;
	    margin-top: 0;
	    transition: all .05s;
	    -moz-transition: all .05s;
	    -webkit-transition: all .05s;
	    -o-transition: all .05s
	}

	.range_wrap .range_point.active:after {
	    background: #090
	}

	.range_wrap.click {
	    cursor: -webkit-grabbing
	}

	.range_wrap.click .range_handle {
	    cursor: -webkit-grabbing
	}

	.range_wrap.focus .range_handle {
	    border-color: #090
	}

	.range_wrap .range_handle {
	    background: #fff;
	    border-color: #d6d2d2
	}

	.range_wrap .range_point:after {
	    background: #d5d5d5
	}

	.range_wrap .range_path {
	    background: #d5d5d5
	}

	.bk-kMarket .range_wrap .range_handle {
	    background: #26272a;
	    border-color: #4d4d4d
	}

	.bk-kMarket .range_wrap .range_point:after {
	    background: #4d4d4d
	}

	.bk-kMarket .range_wrap .range_path {
	    background: #4d4d4d
	}

	.range_buy .range_point.active:after,.range_buy .range_track,.range_edit_buy .range_point.active:after,.range_edit_buy .range_track {
	    background-color: #de211d
	}

	.range_buy .focus .range_handle,.range_edit_buy .focus .range_handle {
	    border-color: #de211d
	}

	.range_sell .range_point.active:after,.range_sell .range_track,.range_edit_sell .range_point.active:after,.range_edit_sell .range_track {
	    background-color: #3dc18e
	}

	.range_sell .focus .range_handle,.range_edit_sell .focus .range_handle {
	    border-color: #3dc18e
	}

	.bk-kType .dropdown-menu {
	    width: 220px
	}

	.kmarket-down .titlelist {
	    overflow: hidden
	}

	.kmarket-down .titlelist a {
	    width: 50%;
	    display: block;
	    float: left;
	    height: 47px;
	    line-height: 47px;
	    text-align: center;
	    color: #666;
	    border-bottom: 1px solid #444;
	    cursor: pointer
	}

	.kmarket-down .titlelist a.on {
	    color: #de211d;
	    border-bottom: 1px solid #de211d
	}

	.kmarket-down ul {
	    display: none;
	    text-align: left;
	    max-height: 400px;
	    overflow-y: auto
	}

	.kmarket-down ul.on {
	    display: block
	}

	.kline-mbd-list b {
	    margin-right: 3px;
	    color: #999;
	    font-weight: 400;
	    font-size: 12px
	}

	.kline-mbd-list span {
	    color: #444;
	    margin-left: 3px;
	    font-size: 12px
	}

	.kmarket-down a.market-name {
	    width: 70%;
	    float: left
	}

	.kmarket-down a.market-kline {
	    width: 20%;
	    float: right;
	    margin-right: 10px;
	    color: #333
	}

	.kmarket-down li b {
	    margin-right: 5px;
	    font-weight: 400;
	    color: #FFF
	}

	.kmarket-down li span {
	    margin-left: 5px;
	    color: #444;
	    font-weight: 400
	}

	.bk-kType .dropdown-menu li {
	    overflow: hidden;
	    border-bottom: 0
	}

	.bk-kType .dropdown-menu li:hover {
	    background: #3a3a3a!important;
	    color: #de211d
	}

	.bk-kType .dropdown-menu li:hover b {
	    color: #de211d;
	    font-weight: bold
	}

	.bk-kType .dropdown-menu li a {
	    background: 0
	}

	.kmarket-down li:hover span {
	    color: #de211d
	}

	.bk-trans-asset .price h4 {
	    margin-top: 0
	}

	.bk-trans-asset .price h4 span {
	    text-transform: uppercase;
	    font-size: 16px;
	    color: #666;
	    margin-left: 7px;
	    font-weight: bold;
	    margin-right: 3px
	}

	.bk-trans-asset .price h4 b span {
	    font-weight: 400
	}

	.bk-trans-asset .price {
	    padding-bottom: 15px
	}

	.bk-trans-asset .item {
	    padding-top: 10px
	}

	.bk-trans-form .item {
	    min-height: 420px;
		padding-left: 30px;
		padding-right: 30px;
	}
	.bk-trans-form .item2 {
	    min-height: 420px;
		padding-left: 30px;
		padding-right: 30px;
		border-left: 10px solid #f7f7f7
	}

	.bk-band a.allmarket,.bk-band a.transrate {
	    float: right;
	    display: inline-block;
	    margin-right: 0;
	    background: 0;
	    font-size: 14px;
	    min-width: auto
	}

	.bk-band a.allmarket:hover,.bk-band a.transrate:hover {
	    color: #d00
	}

	.bk-band a.allmarket i,.bk-band a.transrate i {
	    margin-right: 5px
	}

	.buyprice-cny {
	    margin-top: -10px;
	    text-align: right;
	    margin-right: 15px;
	    color: #666;
	    margin-bottom: 10px
	}

	#lever-trans .lever-title {
	    padding-top: 10px
	}

	#lever-trans .lever-title h4 {
	    font-size: 14px;
	    margin-bottom: 5px;
	    margin-top: 0;
	    color: #555
	}

	#lever-trans .lever-title p {
	    margin-bottom: 0;
	    color: #de211d
	}

	#lever-trans .lever-title p span {
	    font-size: 14px;
	    margin-left: 5px
	}

	#lever-trans .bk-trans-asset .item {
	    padding-top: 0
	}

	.buyprice-cny,.sellprice-cny {
	    margin-top: -10px;
	    text-align: right;
	    margin-right: 15px;
	    color: #666;
	    margin-bottom: 10px
	}

	.overview-title {
	    font-size: 14px;
	    color: #de211d;
	    padding: 15px
	}

	.overview-title span {
	    font-size: 16px;
	    font-weight: bold;
	    margin: 0 5px
	}

	.overview-title .title-text {
	    color: #333
	}

	.bk-tabList .actions-bar {
	    text-align: right
	}

	.actions-bar .btn-group {
	    padding: 18px 5px
	}

	.actions-bar .btn-group a {
	    text-decoration: none;
	    color: #555;
	    margin-right: 8px
	}

	.frame-page {
	    padding: 0;
	    padding-bottom: 20px;
	    min-height: 360px
	}

	.lever-box .box-title {
	    text-align: center;
	    margin-bottom: 15px
	}

	.form-lever .form-group {
	    position: relative
	}

	.form-lever .control-label {
	    position: absolute;
	    left: 0;
	    z-index: 10;
	    height: 34px;
	    padding: 15px 12px;
	    top: 0
	}

	.form-lever .num {
	    color: #de211d;
	    font-weight: bold
	}

	.form-lever .btn-primary {
	    background-color: #de211d;
	    border-color: #de211d
	}

	.lever-box .overage-info {
	    margin: 8px 0
	}

	.lever-box .overage-info .col {
	    width: 49%;
	    display: inline-block
	}

	.lever-box .radio-group {
	    text-align: left;
	    margin-bottom: 15px;
	    vertical-align: middle
	}

	.lever-box .radio-group .radio-label {
	    margin-bottom: 0;
	    vertical-align: middle;
	    padding: 7px 10px 0 0
	}

	.lever-box .radio-group .radio-control {
	    display: inline-block;
	    vertical-align: middle
	}
	ul,li,dl,dt,dd {
	    list-style: none;
	    margin: 0;
	    padding: 0
	}
	.bk-table {
	    display: table;
	    table-layout: fixed;
	    width: 100%;
	    height: 100%
	}
	.bk-cell {
	    display: table-cell;
	    vertical-align: middle
	}

	.btn-primary {
	    background: linear-gradient(to right,#fb5555, #FFB144);
	}

	.btn-primary.active,.btn-primary.focus,.btn-primary:active,.btn-primary:focus,.btn-primary:hover,.open>.dropdown-toggle.btn-primary {
	    background: linear-gradient(to right,#f84848, #ffbd60);
	}

	.btn-primary:active:hover,.btn-primary.active:hover,.open>.dropdown-toggle.btn-primary:hover,.btn-primary:active:focus,.btn-primary.active:focus,.open>.dropdown-toggle.btn-primary:focus,.btn-primary:active.focus,.btn-primary.active.focus,.open>.dropdown-toggle.btn-primary.focus {
		background: linear-gradient(to right,#f84848, #ffbd60);
	}

	.btn-second {
	    background-color: #3dc18e;
	    border-color: #3dc18e;
	    color: #fff
	}

	.btn-second.active,.btn-second.focus,.btn-second:active,.btn-second:focus,.btn-second:hover,.open>.dropdown-toggle.btn-second {
	    background-color: #2ad593;
	    border-color: #2ad593;
	    color: #fff
	}
	.btn {
	    display: inline-block;
	    margin-bottom: 0;
	    font-weight: normal;
	    text-align: center;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    border: 0 none;
		outline: 0 none;
	    white-space: nowrap;
	    padding: 6px 12px;
	    font-size: 14px;
	    line-height: 1.42857143;
	    border-radius: 0;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    height: 44px;
		margin: 39px 30px 54px;
		max-width:260px;
		border-radius: 5px;
	}
	.table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th {
	    border: 1px solid transparent
	}
	.goods {
	    height: 100%;
	    position: relative;
	    font-family: "Microsoft YaHei",Arial,sans-serif;
	    color: #99abb7;
	    font-size: 12px;
	    background-color: #f7f7f7;
	    text-align: center;
	    margin: 0 auto
	}
	.bg_fff {
	    background-color: #fff!important
	}
	.textLeft {
	    text-align: left
	}

	.textRight {
	    text-align: right
	}

	.textCenter {
	    text-align: center
	}

	.form-control:focus {
	    border-color: #ddd;
	    -webkit-box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
	    box-shadow: inset 1px 1px 3px rgba(0,0,0,.075)
	}

	.form-control.form-second {
	    height: auto;
	    padding: 6px 15px;
	    line-height: 30px;
	    font-size: 16px;
	    border-radius: 0!important;
	    -webkit-box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
	    box-shadow: inset 1px 1px 3px rgba(0,0,0,.075)
	}
	.bk-trans-record{
		margin-top: 24px;
		float: left;
		width: 100%;
	}
	.post_orders{
		.el-select{
			.el-input{
				input{
					width: 100px;
				}
			}
		}
	}
	.market{
		margin-top: 20px;
	}
</style>
