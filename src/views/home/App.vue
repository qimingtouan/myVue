<template>
  <div id="app">
    <div class="roof"> 
      <div class="container">
        <div class="notice_text">
          <div>
            <span class="b_white">LTC/CT:</span>
            <span class="b_blue">↓1089.452</span>
          </div>
          <div>
            <span class="b_white">MVS.CMC/CT:</span>
            <span class="b_red">↑0.409</span>
          </div>
          <div>
            <span class="b_white">MVS.CMC/CT:</span>
            <span class="b_red">↑0.409</span>
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
        <div class="currency">USDT</div>
        <div class="currency">USDT</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang = "less">
*{
  box-sizing:content-box;
}
.b_blue{
  color: #1B79F9;
}
.b_333{
  color: #333;
}
.roof{
  height: 40px;
  background-color: #2264D4;
  color: #fff;
  width: 100%;
  font-size: 14px;
  .notice_text{
    display: flex;
    justify-content: space-around;
    align-items:center;
  }
}
.banner{
  height: 559px;
  background-image: url('../../assets/img/banner1.png');
  position: relative;
}

.home_nav {
  position: absolute;
  list-style: none;
  left: 50%;
  top: 25px;
  height: 36px;
}
.home_nav > li {
  position: relative;
  display: block;
  float: left;
  font-size: 16px;
  font-family: "Adobe Heiti Std R"
}
.home_nav > li > a {
  position: relative;
  display: block;
  padding: 7px 15px;
  color: #c2c2c2;
}
.home_nav > li > a:hover{
  text-decoration: none;
  color: #fff;
}
.home_nav > li > a:focus {
  text-decoration: none;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.home_title{
  text-align: center;
  padding-top: 183px;
  font-size:100px;
  line-height: 90px;
  height: 90px;
  color: #fff;
  font-family:Microsoft Sans Serif;
  text-shadow: 5px 5px 5px #000D2C;
}
.home_info{
  width: 668px;
  height: 44px;
  border-radius: 20px;
  background: linear-gradient(to right,#3FD2FF, #63A4FF, #4AC0FE);
  margin: 75px auto;
  line-height: 44px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  font-family: SimHei;
}
.carousel-indicators{
  bottom:60px;
}
.trade_info{
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items:center;

}
.advantage{
  height: 220px;
  display: flex;
  justify-content: space-around;
  .feature{
    margin: 40px 0 38px 0;
    text-align: center;
  }
  .feature img{
    height: 75px;
    width: 75px;
  }
  .feature span{
    display: block;
    margin: 15px auto  7px;
    text-align: center;
  }
}

.notice{
  background-color: #f1f1f1;
  height: 46px;
}

.data_section{
  .line{
    margin-top: 41px;
    border-bottom: 1px solid #1B79F9;
    width: 531px;
  }
  .container .title{
    margin: 15px 0 34px 0 ;
    .w_en{
      font-size: 18px;
      font-family: "MicrosoftYaHeiUI";
      color: #1B79F9;
      margin-bottom: 0;
    }
    .w_zh{
      font-size: 18px;
      color: #333;
      font-family: "SourceHanSansCN-Normal";
      margin-bottom: 0;
    }
    .short_line{
      width: 21px;
      border: 1px solid #1B79F9;
      margin-top: 31px;
    }
  }

}
.data_info{
  height: 52px;
  .currency{
    max-width:600px;
    width: 50%;
    height: 52px;
    background-color: #f9f9f9;
    line-height: 52px;
    text-align: center;
    color: #000;
    font-size: 18px;
    float: left;
  }

}
  .currency .selected {
  color: #fff;
  background-color:#1B79F9;
}
</style>
