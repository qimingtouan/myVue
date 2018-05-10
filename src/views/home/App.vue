<template>
  <div id="app">
    <div class="roof"> 
      <div class="container">
        <div class="notice_text">
          <div v-for="item in currencyData" :key="item.index">
            <span class="b_white">{{item.currency+" :"}}</span>
            <span class=""><i class="fa" :class="item.positive?'fa-long-arrow-up':'fa-long-arrow-down'" aria-hidden="true"></i>{{item.value}}</span>
          </div>
        </div>
      </div> 
    </div>
    <div class="banner">
        <ul class="home_nav">
          <li class="active"><a href="#">首页</a></li>
          <li><a href="#">交易中心</a></li>
          <li><a href="#">用户中心</a></li>
          <li><a href="#">登录</a></li>
        </ul>
      <div class="home_title">
        XXXBTC 上线
      </div>
      <div class="home_info">
        6月15日10：00开放充提 | 6月15日10：00开放充提
      </div>
      <ol class="carousel-indicators" id="banner_indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class=""></li><li data-target="#carousel-example-generic" data-slide-to="1" class=""></li><li data-target="#carousel-example-generic" data-slide-to="2" class=""></li><li data-target="#carousel-example-generic" data-slide-to="3" class=""></li><li data-target="#carousel-example-generic" data-slide-to="4" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="5" class=""></li></ol>
    </div>
    <div class="trade_info container">
      <div>
        <span>
          <img src="./../../assets/img/money.png" alt="">
        </span>
          <span class="b_ccc">
            累计收益额:
          </span>
          <span class="b_blue">
              88888.88
          </span>
      </div>
      <div>
        <span>
          <img src="./../../assets/img/money.png" alt="">
        </span>
          <span class="b_333">
            累计收益额:
          </span>
          <span class="b_blue">
              88888.88
          </span>
        </div>
      </div>

    <div class="advantage container">
      <div class="feature">
        <div>
          <img src="./../../assets/img/ad1.png" alt="">
        </div>
        <span>顶级</span>
        <p>
          
        </p>
      </div>
      <div class="feature">
        <div>
          <img src="./../../assets/img/ad1.png" alt="">
        </div>
        <span>顶级</span>
        <p>
          重金千万注册顶级域名<br>
          是您选择的信心保证
        </p>
      </div>
    </div>

    <div class="notice">
      
    </div>

    <div class="data_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">THE DATA SECTION</p>
            <p class="w_zh">数据专区</p>
            <div class="short_line"></div>
          </div>  
        </div>
        
    </div>
    <div class="data_info">
      <div class="container">
        <div class="row">
          <div class="currency selected col-md-6">USDT</div>
          <div class="currency col-md-6">USDT</div>
          <div class="col-md-12">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>币种兑(USDT)</th>
                    <th>价格(USDT)</th>
                    <th>最高价(USDT)</th>
                    <th>最低价(USDT)</th>
                    <th>交易量</th>
                    <th>日涨跌</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td >Tanmay</td>
                    <td>Bangalore</td>
                    <td>560001</td>
                    <td >Tanmay</td>
                    <td>Bangalore</td>
                    <td>560001</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>

    </div>
    
    <div class="client_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">THE CLIENT</p>
            <p class="w_zh">客户端</p>
            <div class="short_line"></div>
          </div>
          <div class="phone_img">
              <img src="../../assets/img/phone1.png" alt="">
              <img src="../../assets/img/phone2.png" alt="">
          </div> 
          <div class="phone_word">
              <h1>XXXX看行情专用</h1>
              <div class="short_line"></div>
              <p class="intro">币行情：支持90+全球主流交易所实时价格跟踪</p>
              <p class="intro">币资产：帮你记账，随时了解总资产变化</p>
              <p class="intro">币资料：帮你记账，众筹成本、流通量、总量，项目介绍等</p>
              <p class="intro">币资讯：交易所公告、币聊，各种教程</p>
              <div class="button_down">
                <button  class="apple_btn common_btn"><i class="fa fa-apple" aria-hidden="true"></i><span>App Store</span></button>
                <button type="button" class="android_btn common_btn"><i class="fa fa-android" aria-hidden="true"></i><span>Android</span></button>
                
              </div>
          </div>  
        </div>
    </div>

    <div class="dynamics_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">INDUSTRY DYNAMICS</p>
            <p class="w_zh">行业动态</p>
            <div ><span class="short_line"></span><span class="more_detail">更多详情>></span></div>
          </div>  
        </div>
        <div class="container dynamics_content">
              <div class="row">
                <div class="col-xs-6">
                    <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                    <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                </div>
                <div class="col-xs-6">
                  <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                </div>
              </div>
        </div>
    </div>

    <div class="coverage_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">MEDIA COVERAGE</p>
            <p class="w_zh">媒体报道</p>
            <div class="short_line"></div>  
          </div>  
        </div>
        <div class="container coverage_content">
              <div class="row">
                <div class="col-xs-3">
                  <div class="fist_content">
                    <div>
                      <img src="../../assets/img/coverage.png" alt="">
                    </div>
                    <div>
                      <h5>关于提币手续费调整</h5>
                      <p><span class="show_date">2018.3.10</span></p>
                    </div>
                    <div class="detail">
                      <p>
                        经广大用户建议，平台提币手续由以前按比例...
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xs-3">
                <div class="date"><span>01/20</span><br><span class="year">2018</span></div>
                <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                <span class="more">更多 >></span>
                </div>
                <div class="col-xs-3">
                  <div class="date"><span>01/20</span><br><span>2018</span></div>
                <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                </div>
                <div class="col-xs-3">
                  <div class="date"><span>01/20</span><br><span>2018</span></div>
                   <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                </div>
              </div>
            </div>
    </div>


    <div class="guide_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">BEGINNER’S GUIDE</p>
            <p class="w_zh">新手指南</p>
            <div class="short_line"></div>
          </div>  
        </div>
        <div class="container guide_content">
              <div class="row">
                <div class="col-xs-3">
                <h4>如何充值提现</h4>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <h4>如何充值提现</h4>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                </div>
                <div class="col-xs-3">
                <h4>认证</h4>
                <p class="link"><a href="" target="_blank">交易认证</a></p>
                <p class="link"><a href="" target="_blank">谷歌认证</a></p>
                <h4>认证</h4>
                <p class="link"><a href="" target="_blank">邀请人奖励如何获得？</a></p>
                <p class="link"><a href="" target="_blank"></a></p>
                <p class="link"><a href="" target="_blank"></a></p>
                <button type="button" class="btn guide_btn">新手指南</button>
                </div>
                <div class="col-xs-6">
                    <img class="guide_img" src="../../assets/img/guide.png" alt="">
                </div>
              </div>
            </div>
    </div>
    <footer-bottom></footer-bottom>
    
  </div>
  
</template>

<script>
import footerBottom from '@/components/footerNav'
import mockData from './mock.json'
export default {
  name: 'App',
  components:{footerBottom},
  data () {
    return {
      currencyData:{},
      msg:"hello"
    }
  },
  methods: {
    getData() {
        console.log(this)
        this.currencyData = mockData;
        
    }
  },
  mounted() {
      this.getData()
  }
}
</script>

<style lang = "less">
@import "index.less";
</style>
