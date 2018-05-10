<template>
  <footer class="footer">
      <div class="bottom_nav">
        <div class="container">
          <div class="row">
            <div class="col-xs-2">
              <div class="footer-contact">
                <h5>{{footerData[0].title}}</h5>
                <p class="link" v-for="item in footerData[0].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="footer-contact">
                <h5>{{footerData[1].title}}</h5>
                <p class="link" v-for="item in footerData[1].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="footer-contact">
                <h5>{{footerData[2].title}}</h5>
                <p class="link" v-for="item in footerData[2].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="footer-contact">
                <h5>{{footerData[3].title}}</h5>
                <p class="link" v-for="item in footerData[3].content" :key="item.index"><a href="" target="_blank">{{item}}</a></p>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="footer-contact">
                <h5>{{footerData[4].title}}</h5>
                <a><img src="../assets/img/qq.png" alt=""></a>
                <a><img src="../assets/img/wechat.png" alt=""></a>
                <a><img src="../assets/img/weibo.png" alt=""></a>
              </div>

            </div>
          </div>
        
        </div>
      </div>
      <div class="copyright">
        <div class="container">
          <div class="row">
              <div class="col-xs-12">
                  <p >
                      <span >{{footerCopyright}}</span> 
                  </p>
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
        footerData:[
            {
                title:"下载支持",
                content:["API文档","APP下载","其它下载"]
            },
            {
                title:"客户服务",
                content:["使用教程","常见问题","服务协议","交易费率"]
            },
            {
                title:"其它",
                content:["官方公告","上币申请"]
            },
            {
                title:"联系我们",
                content:["服务邮箱","服务邮箱","业务邮箱"],
                linkTo:["support@nb.com","support@nb.com","info@nb.com"]
            },
            {
                title:"联系我们",
                content:["../assets/img/qq.png","../assets/img/wechat.png","../assets/img/weibo.png"]
            },
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer{
  .bottom_nav{
    color: #ccc;
    height: 272px;
    background-color:#303030;
    h5{
      font-size: 18px;
      line-height: 18px;
      margin:46px 0 38px 0 ;
    }
    .link{
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 21px;
      a{
        color: #ccc;
      }
    }
 
  }
  .copyright{
    height: 40px;
    background-color: #3D3D3D;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
}
</style>
