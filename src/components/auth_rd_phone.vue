<template>  
    <div class="safe-rd snav-rd">
        <div class="hd">
           <h3><i class="fa fa-mobile fa-lg"></i><b>手机认证设置</b></h3>
        </div>

        <div v-if="isPhoneModify === 'unbind'">未验证</div>

        <div v-if="isPhoneModify === 'bind'" class="authbody">
            <div class="container">
                <form autocomplete="off">
                    <div class="user_main_title1">
                        您的手机号码已经通过认证：<b style="font-family: Arial; color: #f00000;">+86 132****4922</b> 
                        <router-link to="/phone/modify" class="btn btn-outsecond btn-lg" style="margin-left: 15px;">
                            <i class="fa fa-cog" aria-hidden="true"></i>&nbsp;修改
                        </router-link>
                    </div>
                </form>
            </div>
        </div>

        <!-- 修改绑定手机 -->
        <div v-if="isPhoneModify === 'modify'" class="bk-onekey"> 
            <div class="authbody">
                <div class="container">
                    <div class="ctips user_main_title2">
                        <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                        <p>发起修改手机申请后，我们的客服人员会尽快审核。</p>
                        <p id="imgTips" style="display: none">
                            照片要求：右手持身份证件，左手持带有zb.com、认证人签名、认证当天时间的证明文件
                        </p>
                        <div class="close" title="关闭">×</div>
                    </div>

                    <form id="submitForm" autocomplete="off">
                        <div id="mainForm" class="bk-onekey-form">
                            <div id="userTab" class="tab_head hide">修改安全手机</div>
                            
                            <div id="stepOne">
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">原手机：</div>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control form-second pull-left inputlong smallfont" style="width:350px;" disabled="disabled" value="+86 132****4922">
                                    </div>
                                </div>
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">原手机短信验证码：</div>
                                    <div class="col-sm-7">
                                        <input type="text" name="mobileCode" id="mobileCode" v-model="mobileCode" 
                                                class="form-control form-second pull-left inputlong smallfont" style="width:250px" 
                                                mytitle="请输入发送到您手机上的验证码" 
                                                errormsg="验证码错误，请重新输入。" 
                                                errorname="验证码" 
                                                pattern="limit(4,10)">
                                        <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="abtn-red nb_send_code_btn" value="点击获取" @click="sendCode()">
                                    </div>
                                </div>
                                <div class="do row">
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-7">
                                        <a @click="setpOne()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 下一步</a>
                                        <a @click="skipStepOne()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 遗失旧手机</a>
                                    </div>
                                </div>
                            </div>

                            <div id="stepTwo" style="display:none;">
                                <!-- 新手机号 -->
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">新手机号码：</div>
                                    <div class="col-sm-7">
                                        <div class="mobyzm countryw">
                                            <div id="country" class="goog-inline-block talk-select-country" style="float: left;">
                                                <div class="goog-inline-block talk-select-country-caption">
                                                    <div class="talk-flag" style="background-position: 0px -825px;"></div>
                                                </div>
                                                <input type="text" style="width: 55px;" name="mCode" id="mCode" disabled="disabled" position="s" v-model="mCode">
                                            </div>
                                            <input type="text" name="mobile" id="mobile" position="t" v-model="newMobile" 
                                                    class="form-control form-second pull-left inputlong smallfont" 
                                                    style="margin-left: -6px; width: 220px; border-left: none;" 
                                                    mytitle="请输入您的手机号码" 
                                                    errormsg="请输入正确的手机号码" 
                                                    errorname="手机号码" 
                                                    pattern="limit(8,16);checkMobile()">
                                        </div>
                                        
                                        <!-- 手机区号 -->
                                        <div class="goog-menu talk-select-country-menu" id="countryDownload" style="left: 16px; top: 47px; display: none;">
                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -44px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">美国 (United States)</span> 
                                                        <span class="talk-select-country-code" dir="ltr">+001</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuseparator"></div>
                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1375px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">加拿大 (Canada)</span> 
                                                        <span class="talk-select-country-code" dir="ltr">+1</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -363px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴哈马 (Bahamas)</span> 
                                                        <span class="talk-select-country-code" dir="ltr">+1242</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1573px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴巴多斯 (Barbados)</span> 
                                                        <span class="talk-select-country-code" dir="ltr">+1246</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1980px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">安圭拉 (Anguilla)</span> 
                                                        <span class="talk-select-country-code" dir="ltr">+1264</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -869px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">安提瓜和巴布达 (Antigua and Barbuda)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1268</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1408px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">英属维京群岛 (British Virgin Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1284</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1782px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">美属维京群岛 (U.S. Virgin Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1340</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -308px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">开曼群岛 (Cayman Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1345</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1914px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">百慕大 (Bermuda)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1441</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2399px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">格林纳达 (Grenada)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1473</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1309px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">特克斯和凯科斯群岛 (Turks and Caicos Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1649</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -583px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">蒙塞拉特 (Montserrat)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1664</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -704px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">北马里亚纳群岛 (Northern Mariana Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1670</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2366px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">关岛 (Guam)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1671</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1562px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">美属萨摩亚 (American Samoa)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1684</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2773px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">荷属圣马丁 (Sint Maarten)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1721</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1397px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣卢西亚 (Saint Lucia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1758</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2432px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">多米尼克 (Dominica)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1767</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2619px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣文森特和格林纳丁斯 (Saint Vincent and the Grenadines)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1784</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -473px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">波多黎各 (Puerto Rico)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1787</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1529px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">多米尼加共和国 (República Dominicana)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1809</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -440px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">特立尼达和多巴哥 (Trinidad and Tobago)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1868</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -99px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣基茨和尼维斯 (Saint Kitts and Nevis)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1869</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1727px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">牙买加 (Jamaica)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+1876</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2201px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">埃及 (&#8235;مصر&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+20</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2741px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">南苏丹 (&#8235;جنوب السودان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+211</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2333px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">摩洛哥 (&#8235;المغرب&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+212</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -528px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿尔及利亚 (&#8235;الجزائر&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+213</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -539px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">突尼斯 (&#8235;تونس&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+216</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -132px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">利比亚 (&#8235;ليبيا&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+218</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -627px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">冈比亚 (Gambia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+220</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2134px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塞内加尔 (Sénégal)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+221</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -253px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">毛里塔尼亚 (&#8235;موريتانيا&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+222</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2520px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马里 (Mali)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+223</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2575px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">几内亚 (Guinée)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+224</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1661px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">科特迪瓦 (Côte d’Ivoire)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+225</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -726px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">布基纳法索 (Burkina Faso)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+226</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -550px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">尼日尔 (Nijar)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+227</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -605px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">多哥 (Togo)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+228</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1298px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">贝宁 (Bénin)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+229</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2179px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">毛里求斯 (Moris)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+230</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2068px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">利比里亚 (Liberia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+231</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -737px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塞拉利昂 (Sierra Leone)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+232</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2112px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">加纳 (Gaana)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+233</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2476px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">尼日利亚 (Nigeria)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+234</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -814px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">乍得 (Tchad)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+235</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1837px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">中非共和国 (République centrafricaine)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+236</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2057px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">喀麦隆 (Cameroun)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+237</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2652px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">佛得角 (Kabu Verdi)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+238</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2388px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣多美和普林西比 (São Tomé e Príncipe)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+239</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1507px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">赤道几内亚 (Guinea Ecuatorial)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+240</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -880px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">加蓬 (Gabon)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+241</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1793px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">刚果（布） (Congo-Brazzaville)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+242</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1518px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">刚果（金） (Jamhuri ya Kidemokrasia ya Kongo)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+243</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1947px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">安哥拉 (Angola)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+244</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1925px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">几内亚比绍 (Guiné Bissau)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+245</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -55px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">英属印度洋领地 (British Indian Ocean Territory)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+246</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -55px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿森松岛 (Ascension Island)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+247</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1045px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塞舌尔 (Seychelles)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+248</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -352px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">苏丹 (&#8235;السودان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+249</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2674px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">卢旺达 (Rwanda)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+250</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2443px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">埃塞俄比亚 (Ethiopia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+251</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1364px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">索马里 (Soomaaliya)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+252</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2101px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">吉布提 (Djibouti)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+253</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2630px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">肯尼亚 (Kenya)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+254</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2289px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">坦桑尼亚 (Tanzania)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+255</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1166px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">乌干达 (Uganda)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+256</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1892px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">布隆迪 (Uburundi)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+257</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -638px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">莫桑比克 (Moçambique)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+258</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1595px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">赞比亚 (Zambia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+260</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1287px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马达加斯加 (Madagasikara)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+261</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -264px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">留尼汪 (Réunion)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+262</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2046px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">津巴布韦 (Zimbabwe)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+263</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1881px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">纳米比亚 (Namibia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+264</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2145px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马拉维 (Malawi)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+265</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2190px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">莱索托 (Lesotho)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+266</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2707px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">博茨瓦纳 (Botswana)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+267</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2278px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">斯威士兰 (Swaziland)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+268</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1430px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">科摩罗 (&#8235;جزر القمر&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+269</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2355px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">南非 (South Africa)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+27</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -495px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣赫勒拿 (Saint Helena)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+290</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -715px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">厄立特里亚 (Eritrea)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+291</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -792px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿鲁巴 (Aruba)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+297</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1111px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">法罗群岛 (Føroyar)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+298</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1760px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">格陵兰 (Kalaallit Nunaat)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+299</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -165px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">希腊 (Ελλάδα)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+30</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1441px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">荷兰 (Nederland)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+31</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px 0px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">比利时 (België)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+32</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1012px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">法国 (France)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+33</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1155px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">西班牙 (España)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+34</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -275px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">直布罗陀 (Gibraltar)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+350</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -517px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">葡萄牙 (Portugal)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+351</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1474px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">卢森堡 (Luxembourg)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+352</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1969px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">爱尔兰 (Ireland)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+353</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1991px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">冰岛 (Ísland)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+354</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1034px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿尔巴尼亚 (Shqipëria)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+355</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1551px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马耳他 (Malta)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+356</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -561px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塞浦路斯 (Κύπρος)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+357</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1903px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">芬兰 (Suomi)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+358</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2586px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">保加利亚 (България)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+359</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -682px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">匈牙利 (Magyarország)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+36</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1122px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">立陶宛 (Lietuva)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+370</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1936px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">拉脱维亚 (Latvija)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+371</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2410px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">爱沙尼亚 (Eesti)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+372</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2685px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">摩尔多瓦 (Republica Moldova)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+373</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -176px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">亚美尼亚 (Հայաստան)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+374</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1100px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">白俄罗斯 (Беларусь)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+375</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -594px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">安道尔 (Andorra)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+376</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -913px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">摩纳哥 (Monaco)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+377</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2123px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣马力诺 (San Marino)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+378</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2322px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">梵蒂冈 (Città del Vaticano)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+379</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2002px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">乌克兰 (Україна)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+380</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2465px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塞尔维亚 (Србија)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+381</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2167px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">黑山共和国 (Crna Gora)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+382</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -902px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">克罗地亚 (Hrvatska)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+385</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1221px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">斯洛文尼亚 (Slovenija)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+386</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1584px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">波斯尼亚和黑塞哥维那 (Босна и Херцеговина)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+387</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1353px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马其顿 (Македонија)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+389</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -143px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">意大利 (Italia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+39</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -671px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">罗马尼亚 (România)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+40</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1320px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瑞士 (Schweiz)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+41</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2256px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">捷克共和国 (Česká republika)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+420</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2212px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">斯洛伐克 (Slovensko)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+421</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -979px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">列支敦士登 (Liechtenstein)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+423</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1331px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">奥地利 (Österreich)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+43</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -55px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">英国 (United Kingdom)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+44</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1386px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">丹麦 (Danmark)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+45</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -385px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瑞典 (Sverige)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+46</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -836px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">挪威 (Norge)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+47</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1177px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">波兰 (Polska)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+48</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2509px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">德国 (Deutschland)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+49</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2762px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">福克兰群岛 (Falkland Islands [Islas Malvinas])
                                                        </span> <span class="talk-select-country-code" dir="ltr">+500</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -484px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">伯利兹 (Belize)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+501</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -935px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">危地马拉 (Guatemala)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+502</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1639px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">萨尔瓦多 (El Salvador)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+503</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2156px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">洪都拉斯 (Honduras)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+504</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -154px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">尼加拉瓜 (Nicaragua)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+505</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2090px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">哥斯达黎加 (Costa Rica)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+506</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -847px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴拿马 (Panamá)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+507</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1078px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣皮埃尔和密克隆群岛 (Saint-Pierre-et-Miquelon)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+508</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -319px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">海地 (Haiti)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+509</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -946px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">秘鲁 (Perú)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+51</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2024px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">墨西哥 (México)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+52</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -748px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">古巴 (Cuba)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+53</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2377px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿根廷 (Argentina)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+54</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -770px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴西 (Brasil)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+55</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1342px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">智利 (Chile)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+56</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -330px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">哥伦比亚 (Colombia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+57</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1056px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">委内瑞拉 (Venezuela)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+58</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -55px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">法属圣马丁 (Saint-Martin [partie française])
                                                        </span> <span class="talk-select-country-code" dir="ltr">+590</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -407px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瓜德罗普岛 (Guadeloupe)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+590</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1012px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圣巴泰勒米 (Saint-Barthélémy)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+590</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1650px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">玻利维亚 (Bolivia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+591</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -803px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">圭亚那 (Guyana)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+592</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1188px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">厄瓜多尔 (Ecuador)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+593</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2234px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">法属圭亚那 (Guyane française)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+594</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2344px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴拉圭 (Paraguay)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+595</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -198px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马提尼克 (Martinique)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+596</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2663px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">苏里南 (Suriname)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+597</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2608px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">乌拉圭 (Uruguay)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+598</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2719px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">荷兰加勒比 (Caribbean Netherlands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+599</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2729px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">库拉索 (Curaçao)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+599</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1870px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马来西亚 (Malaysia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+60</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1716px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">澳大利亚 (Australia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+61</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1958px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">印度尼西亚 (Indonesia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+62</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1815px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">菲律宾 (Philippines)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+63</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1540px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">新西兰 (New Zealand)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+64</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -22px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">新加坡 (Singapore)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+65</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -957px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">泰国 (ไทย)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+66</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2784px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">东帝汶 (Timor-Leste)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+670</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -209px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">诺福克岛 (Norfolk Island)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+6723</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1683px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">文莱 (Brunei)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+673</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1749px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瑙鲁 (Nauru)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+674</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1485px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴布亚新几内亚 (Papua New Guinea)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+675</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1089px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">汤加 (Tonga)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+676</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1067px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">所罗门群岛 (Solomon Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+677</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1265px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瓦努阿图 (Vanuatu)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+678</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1859px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">斐济 (Fiji)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+679</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -231px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">帕劳 (Palau)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+680</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1012px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">瓦利斯和富图纳 (Wallis and Futuna)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+681</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2267px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">库克群岛 (Cook Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+682</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2079px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">纽埃 (Niue)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+683</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2300px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">萨摩亚 (Samoa)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+685</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -374px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">基里巴斯 (Kiribati)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+686</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1276px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">新喀里多尼亚 (Nouvelle-Calédonie)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+687</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -286px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">图瓦卢 (Tuvalu)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+688</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1705px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">法属波利尼西亚 (Polynésie française)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+689</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2751px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">托克劳 (Tokelau)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+690</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1738px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">密克罗尼西亚联邦 (Micronesia)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+691</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1144px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马绍尔群岛 (Marshall Islands)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+692</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -660px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">俄罗斯 (Россия)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+7</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1210px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">哈萨克斯坦 (Казахстан)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+7</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -429px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">日本(日本)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+81</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2245px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">韩国 (대한민국)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+82</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -968px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">越南 (Việt Nam)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+84</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1804px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">朝鲜 (조선 민주주의 인민 공화국)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+850</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2696px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">香港(香港)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+852</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2597px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">澳门 (澳門)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+853</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -242px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">柬埔寨 (កម្ពុជា)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+855</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -451px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">老挝 (ສ.ປ.ປ ລາວ)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+856</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -825px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">中国(中国)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+86</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1771px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">孟加拉国 (বাংলাদেশ)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+880</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -506px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">台湾 (台灣)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+886</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1606px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">土耳其 (Türkiye)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+90</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1694px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">印度 (भारत)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+91</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2035px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴基斯坦 (&#8235;پاکستان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+92</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2311px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿富汗 (&#8235;افغانستان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+93</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2641px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">斯里兰卡 (ශ්&zwj;රී ලංකාව)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+94</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -11px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">缅甸 (မြန်မာ)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+95</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -616px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">马尔代夫 (Maldives)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+960</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1254px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">黎巴嫩 (&#8235;لبنان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+961</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1463px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">约旦 (&#8235;الأردن&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+962</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1826px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">叙利亚 (&#8235;سوريا&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+963</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -649px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">伊拉克 (&#8235;العراق&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+964</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2487px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">科威特 (&#8235;الكويت&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+965</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -33px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">沙特阿拉伯 (&#8235;المملكة العربية السعودية&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+966</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1672px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">也门 (&#8235;اليمن&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+967</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2454px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿曼 (&#8235;عُمان&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+968</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1199px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴勒斯坦 (&#8235;فلسطين&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+970</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2223px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿拉伯联合酋长国 (&#8235;الإمارات العربية المتحدة&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+971</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -341px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">以色列 (&#8235;ישראל&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+972</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1496px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">巴林 (&#8235;البحرين&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+973</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -462px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">卡塔尔 (&#8235;قطر&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+974</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1848px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">不丹 (འབྲུག)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+975</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2553px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">蒙古 (Монгол)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+976</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -110px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">尼泊尔 (नेपाल)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+977</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2013px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">伊朗 (&#8235;ایران&#8236;)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+98</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -187px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">塔吉克斯坦 (Tajikistan)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+992</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -2542px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">土库曼斯坦 (Turkmenistan)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+993</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1243px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">阿塞拜疆 (Azərbaycan)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+994</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -858px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">格鲁吉亚 (საქართველო)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+995</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1617px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">吉尔吉斯斯坦 (Kyrgyzstan)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+996</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="goog-menuitem">
                                                <div class="goog-menuitem-content">
                                                    <div>
                                                        <div class="goog-inline-block">
                                                            <div class="talk-flag" style="background-position: 0px -1001px;"></div>
                                                        </div>
                                                        <span class="talk-select-country-name">乌兹别克斯坦 (Ўзбекистон)
                                                        </span> <span class="talk-select-country-code" dir="ltr">+998</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 图形验证码 -->
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">图形验证码：</div>
                                    <div class="col-sm-7">
                                        <input type="text" name="code" id="code" v-model="code" 
                                                class="form-control form-second pull-left inputlong smallfont" style="width:250px"
                                                mytitle="请输入图形验证码" 
                                                errormsg="图形验证码错误" 
                                                errorname="图形验证码" 
                                                pattern="limit(4,10)">
                                        <div class="input-add img_code_wrap"><img @click="getCode()" :src="mobCodeSrc" id="idMobCode" class="img_code"></div>
                                    </div>
                                </div>

                                <!-- 新手机短信验证码 -->
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">新手机短信验证码：</div>
                                    <div class="col-sm-7">
                                        <input type="text" name="newMobileCode" id="newMobileCode" v-model="newMobileCode" 
                                                class="form-control form-second pull-left inputlong smallfont" style="width:250px" 
                                                mytitle="请输入发送到您手机上的短信验证码" 
                                                errormsg="短信验证码错误" 
                                                errorname="短信验证码" 
                                                pattern="limit(4,10)">
                                        <input type="button" name="sendNewCodeBtn" class="abtn-red nb_send_code_btn" id="sendNewCodeBtn" value="点击获取" @click="sendNewCode()">
                                    </div>
                                </div>

                                <!-- 资金安全码 -->
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">资金安全密码：</div>
                                    <div class="col-sm-7">
                                        <input type="password" name="safePwd" id="safePwd" v-model="safePwd" 
                                        class="form-control form-second pull-left inputlong smallfont" errormsg="请确认资金安全密码是否正确" errorname="资金安全密码" pattern="limit(6,20)">
                                    </div>
                                </div>

                                <!-- 证件上传 -->
                                <div class="form-line row">
                                    <div class="col-sm-4 textright">证件上传：</div>
                                    <div class="col-sm-7 ">
                                        <div class="uploadipic">
                                            <div id="frontalImgDiv" style="width: 220px;">
                                                <p>
                                                    <a data-toggle="popover" data-placement="top" data-trigger="hover" data-html="true" 
                                                    data-content="<img src='https://s.zb.com/statics/img/v2/user/zhengdemo3qx.jpg' style='width:237px; height:237px;'>" 
                                                    data-original-title="" title=""></a>
                                                </p>

                                                <div class="pm-itemcont" id="photoA" errorname="手持证件照">
                                                    <input id="upload_pics_path_hidden_id_1" name="frontalImg" position="s" type="text" 
                                                            style="width:0px;height:0px;margin:0 0 0 100px;border:none;padding:0px;"  
                                                            pattern="fileIsUploading('upload_pics_path_hidden_id_1');fileNumIsRight(1 , 'upload_pics_path_hidden_id_1')" 
                                                            errormsg="你至少上传1张图片" >
                                                    <div class="item ">
                                                        <span class="preview">
                                                            <a>请上传</a>
                                                            <span class="deal-file"><em class="left"></em><em class="right"></em><em class="del"></em></span>
                                                        </span>
                                                        <span class="upload ">
                                                            <input type="hidden" value="0" name="file_upload_stat">
                                                            <input type="hidden" value="goods" name="plan_task_name">
                                                            <input type="hidden" value="955894" name="userId">
                                                            <input type="hidden" value="1" name="userType">
                                                            <input type="hidden" value="false" name="savePicSize">
                                                            <input type="hidden" value="true" name="auth">
                                                            <a href="javascript:;"><input type="file" name="_fma.pu._0.ima"></a>
                                                        </span>
                                                        <input type="hidden" value="" name="fileUrl" class="J_PicUrl">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="do row">
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-7">
                                        <a @click="save()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 提交</a>
                                        <a href="/service/self/forgetSafePwd" target="_blank" class="btn btn-outsecond btn-lg">忘记资金安全密码？</a>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" id="method" v-model="method">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_phone',
        data() {
           return {
                isPhoneModify: '',
                mobCodeSrc: '',
                countdown: 60,
                countdown2: 60,
                mobileCode: '',
                mCode: '+86',
                newMobile: '',
                code: '',
                newMobileCode: '',
                safePwd: '',
                method: '1'
           }
        },
        methods: {
            // 获取图形验证码
            getCode() {
                let _this = this;
                _this.mobCodeSrc = "https://vip.zb.com/imagecode/get-28-80-32-"+new Date().getTime();
            },

            // 修改手机号：下一步
            setpOne() {
                let mobileCode = this.mobileCode;
                $.ajax({
                    type : "POST",
                    url : "/u/auth/doMobileModifyStepOne",
                    data : {
                        mobileCode : mobileCode,
                    },
                    dataType : "json",
                    error : function() {
                        // JuaBox.info(json.des);
                        alert(json.des);
                        // inAjaxing = false;
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            $('#stepOne').hide();
                            $('#stepTwo').show();
                        } else {
                            // JuaBox.info(json.des);
                            console.log(json)
                        }
                    }
                });
            },
            // 修改手机号：遗失旧手机
            skipStepOne() {
                this.method = '2';
                $('#stepOne').hide();
                $('#stepTwo').show();
                $('#imgTips').show();
            },

            //修改手机号: 旧手机发送短信验证码 
            sendCode() {
                let _this = this;
                $.ajax({
                    // type : "POST",
                    // url : "https://vip.zb.com/user/userSendCode",
                    type : "GET",
                    url: './../../../static/mock/userSendCodeMock.json',
                    data : {
                        codeType : 8
                    },
                    dataType : "json",
                    error: function(err) {
                        // JuaBox.info(jsLan[1]);
                        // inAjaxing = false;
                        console.log(err);
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            _this.settime($('#sendCodeBtn'));
                        } else if ('needMobileAuth' == json.des) {
                            alert("您未进行手机认证，请先进行手机认证");
                        } else {
                            alert(json.des);
                        }
                    }
                });
            },
            // 修改手机号: 旧手机发送短信验证码倒计时
            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _obj.val("点击获取");
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _obj.val("已发送"+"(" + _this.countdown + ")");
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj)
                    }, 1000)
                }
            },

            //修改手机号: 新手机发送短信验证码
            sendNewCode() {
                let _this = this;
                var _mCode = _this.mCode;
                var _newMobile = _this.newMobile;
                var _code = _this.code;
                if (!_newMobile) {
                    alert("请输入正确的手机号!");
                    return;
                }
                $.ajax({
                    type : "POST",
                    url : "https://vip.zb.com/user/sendCode",
                    data : {
                        countryCode : _mCode,
                        phonenumber : _newMobile,
                        code : _code,
                        codeType : 8
                    },
                    dataType : "json",
                    error : function(err) {
                        // JuaBox.info(jsLan[1]);
                        // inAjaxing = false;
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            _this.settime2($('#sendNewCodeBtn'));
                        } else if (json.datas.id == 'code') {
                            // JuaBox.info(json.des, {btnFun1:function(JuaId) {
                            //     window.top.JuaBox.close(JuaId);
                            //     getCode();
                            // }});
                            alert(json.des);
                            _this.getCode();
                        } else {
                            alert(json.des)
                        }
                    }
                });
            },
            // 修改手机号: 新手机发送短信验证码倒计时
            settime2(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown2 == 0) {
                    _obj.removeAttr("disabled");
                    _obj.val("点击获取");
                    _this.countdown2 = 60;
                } else {
                    _obj.attr("disabled", true);
                    _obj.val("已发送"+"(" + _this.countdown2 + ")");
                    _this.countdown2--;
                    setTimeout(function() {
                        _this.settime2(_obj)
                    }, 1000)
                }
            },

            // 提交
            save() {
                let _this = this;
                let _newMobile = _this.newMobile;
                var _newMobileCode = _this.newMobileCode;
                var _safePwd = _this.safePwd;
                var _method = _this.method;
                var _mCode = _this.mCode;
                var _realImg = $('#frontalImgDiv .J_PicUrl').val();
                $.ajax({
                    type : "POST",
                    url : "https://vip.zb.com/u/auth/doMobileModify",
                    data : {
                        countryCode : _mCode,
                        newMobileNumber : _newMobile,
                        newMobileCode : _newMobileCode,
                        safePwd : _safePwd,
                        method : _method,
                        realImg: _realImg
                    },
                    dataType : "json",
                    error : function(err) {
                        // JuaBox.info(json.des);
                        // inAjaxing = false;
                        alert("err");
                        console.log(err);
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            /*JuaBox.info(json.des, {btnFun1:function(JuaId) {
                                 window.top.JuaBox.close(JuaId);
                                 window.location.href="/u/auth/mobile";
                            }});*/
                            alert(json.des);
                            window.location.href="/views/auth/auth.html#/phone/";
                        } else if (json.datas.needStepOne == 1) {
                            /*JuaBox.info(json.des, {btnFun1:function(JuaId) {
                                $('#submitForm')[0].reset();
                                $('#stepOne').show();
                                $('#stepTwo').hide();
                            }});*/
                            $('#submitForm')[0].reset();
                            $('#stepOne').show();
                            $('#imgTips').hide();
                            $('#stepTwo').hide();
                        } else {
                            alert(json.des);
                        }
                    }
                });
            }

            // 提示框关闭
            
        },
        created() {
            let _this = this;
            console.log(_this.$route.params);
            let routerName = _this.$route.params;
            if (routerName[0] === 'unbind') {
                _this.isPhoneModify = 'unbind';
            } else if (routerName[0] === 'modify') {
                _this.isPhoneModify = 'modify';
                _this.getCode();
            } else {
                _this.isPhoneModify = 'bind';
            }
        },
        watch: {
            '$route': function (route) {
                let _this = this;
                // 监听路由变化
                console.log("router changed");
                console.log(_this.$route);
                let routerName = _this.$route.params;
                if (routerName[0] === 'unbind') {
                    _this.isPhoneModify = 'unbind';
                } else if (routerName[0] === 'modify') {
                    _this.isPhoneModify = 'modify';
                    _this.getCode();
                } else {
                    _this.isPhoneModify = 'bind';
                }
            }
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .uploadipic .pm-itemcont .item .upload input[type=file] {
        width: 202px;
        height: 180px;
    }
    .uploadipic .pm-itemcont .item .upload a, 
    .uploadipic .pm-itemcont .item .upload, 
    .uploadipic .pm-itemcont .item {
        width: 202px;
        height: 180px;
    }

    #photoA {
        width: 202px;
        height: 180px;
        background: url(https://s.zb.com/statics/img/v2/user/zhengdemo_n1b.jpg) center center no-repeat;
        background-size: cover;
        cursor: pointer;
        float: none;
        border: 1px solid #eee;
    }
    .uploadipic {
        width: auto;
    }
</style>
