<template>
  <footer class="footer">
    <div style="">
        <div class="bottom_nav">
          <div class="container">
            <div class="row">
              <div class="col-xs-3">
                <div class="footer-contact">
                  <h5><img src="./../assets/img/logo_new.png" alt=""></h5>
                  <p class="link"><span class="navTitle">{{footerData[0].title}}</span></p>
                  <p style="line-height:22px"><a class="contact_img"><img src="../assets/img/qq.png" alt="qq:1234567890"></a>
                  <a class="contact_img"><img src="../assets/img/wechat.png" alt="wechat:1234567890" style="margin-top:1px"></a></p>
                  <p class="link" v-for="item in footerData[0].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
                </div>
              </div>
              <div class="col-xs-5">
                <div class="col-xs-4">
                  <div class="footer-contact">
                    <h5> <span class="navTitle">{{footerData[1].title}}</span></h5>
                    <p class="link" v-for="item in footerData[1].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="footer-contact">
                    <h5> <span class="navTitle">{{footerData[2].title}}</span></h5>
                    <p class="link" v-for="(item,index) in footerData[2].content" :key="item.index"><a :href="footerData[2].linkTo[index]" target="_blank">{{item}}</a></p>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="footer-contact">
                    <h5> <span class="navTitle">{{footerData[3].title}}</span></h5>
                    <p class="link" v-for="(item,index) in footerData[3].content" :key="item.index"><a :href="footerData[3].linkTo[index]" target="_blank">{{item}}</a></p>
                  </div>
                </div>
              </div>
              <div class="col-xs-2">
                <div class="footer-contact" style="text-align:center">
                  <div class="down_title"><span >扫码下载ios版</span></div>
                  <div class="down_img"><img  src="../assets/img/qrcode.png" alt=""></div>
                </div>

              </div>
              <div class="col-xs-2">
                <div class="footer-contact" style="text-align:center">
                  <span class="down_title">扫码下载android版</span>
                  <div class="down_img"><img  src="../assets/img/qrcode.png" alt=""></div>
                </div>

              </div>
            </div>
          
          </div>
        </div>
        <div class="copyright">
          <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <p class="copytitle">
                        BITRR NETWORK TECHNOLOGY LIMITED
                    </p>
                    <p>
                       Copyright © 2018 - BITRR.IO All Rights Reserved 
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>

  export default {
    name: 'footerNav',
    data () {
      return {
        footerCopyright: '版权所有@武汉XXXXXX有限公司',
        logoTitle:"默默交易网",
        friendlyLink:[],
        footerData:[
            {
                title:"联系我们",
                content:["联系电话:  027-1234567","业务邮箱:  hcwt@nb.com"],
            },
            {
                title:"下载支持",
                content:["API文档","APP下载","其它下载"]
            },
            {
                title:"客户服务",
                content:["使用教程","常见问题","服务协议","交易费率"],
                linkTo:["/views/service/service.html#/guide","/views/service/service.html#/question","/views/service/service.html#/protocol","/views/service/service.html#/fees"]
            },
            {
                title:"其它",
                content:["官方公告","上币申请"],
                linkTo:["/views/notice/notice.html","/views/apply/apply.html"]
            },

        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer{
  background: #151B4A;
  .bottom_nav{
    color: #fdfdfd;
    height: 329px;
    h5{
      font-size: 16px;
      line-height: 16px;
      margin:68px 0 25px 0 ;
    }
    .navTitle{
      border-bottom: 1px solid #fff;
      padding-bottom: 5px;
    }
    .link{
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 21px;
      a{
        color: #FDFDFD;
        cursor: pointer;
      }
      a:hover{
        text-decoration: underline;
      }
    }
 
  }
  .footer-contact{
    text-align: left;
  }
  .contact_img{
    display: inline-block;
    margin: 0px 15px 5px 5px;
  }
  .friendly-link{
    color: #ccc;
    .friendly-content{
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
     p{
       margin: 12px 0px;
     } 
    }
    
  }
  .down_title{
    display: inline-block;
    padding: 10px 0;
    width: 75%;
    min-width: 145px;
    text-align: center;
    border-radius: 24px;
    margin-top: 69px;
    background-color: #4353D0;
  }
  .down_img{
    width: 125px;
    height: 125px;
    margin: 15px auto;

  }
  .copyright{
    height: 80px;
    line-height: 24px;
    text-align: center;
    color: #fdfdfd;
    .copytitle{
      padding-top: 10px;
      border-top: 1px solid #37414a
    }
  }
}
</style>
