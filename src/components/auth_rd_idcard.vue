<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-user"></i><b>实名认证设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <!-- 未认证 -->
            <div class="container" v-if="realNameLevel == 'Not'">
                <div class="ctips user_main_title2">
                    <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                    <p>根据国家反洗钱法，所有在本站交易的用户均需要实名认证，请提供真实有效的本人身份证号，虚假认证可能会导致账户被冻结，由虚假认证产生的一切后果由用户负责！ </p>
                    <div class="close" title="关闭">×</div>
                </div>

                <div class="bk-onekey-form" id="mainForm">
                    <el-form :model="simpleForm" ref="simpleForm" label-width="150px" class="auth_form">
                        <el-form-item label="证件所在区域：" prop="country" v-if="false">
                            <el-input v-model="simpleForm.country" auto-complete="off" :readonly="accountDisabled"></el-input>
                        </el-form-item>

                        <el-form-item label="姓名：" prop="realName">
                            <el-input v-model="simpleForm.realName" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="身份证号：" prop="cardId">
                            <el-input v-model="simpleForm.cardId" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item size="large">
                            <div class="do">
                                <a @click="simpleSubmit('simpleForm')" class="btn btn-outsecond btn-lg">
                                    <i class="fa fa-check fa-lg"></i>&nbsp; 提交认证信息
                                </a>
                            </div>
                        </el-form-item>
                    </el-form> 
                </div>
            </div>

            <!-- 初级认证通过 -->
            <div class="container" v-if="realNameLevel == 'Simple'">
                <div class="user_main_title1">
                    您已经通过初级实名认证，真实姓名：<b style="color:#f00000;">{{realNameInfo.realName}}</b>，实名认证后不能更改。您还可以进行
                    <a class="btn btn-outsecond btn-lg" @click="toDepthAuth()" style="margin-left: 15px;">
                        <i class="fa fa-cog "></i>&nbsp; 高级实名认证&gt;
                    </a>
                </div>
            </div>

            <!-- 高级认证表单 -->
            <div class="container" v-if="realNameLevel == 'stepDepth'">
                <div class="ctips user_main_title2">
                    <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                    <p> 1、根据国家反洗钱法，所有在本站交易的用户均需要实名认证，请提供真实有效的手持本人身份证照片，虚假认证可能会导致账户被冻结，由虚假认证产生的一切后果由用户负责！</p>
                    <p> 2、工作人员需要手动填写证件信息，请尽可能保证证件照清晰。</p>
                    <p> 3、<i class="text_red">照片要求：右手持身份证件，左手持带有BCKJ.com、认证人签名、认证当天时间的证明文件</i>。</p>
                    <div class="close" title="关闭">×</div>
                </div>

                <div class="bk-onekey-form" id="depthForm">
                    <el-form :model="depthForm" ref="depthForm" label-width="160px" class="auth_form">
                        <el-form-item label="证件所在区域：" prop="country" v-if="false">
                            <el-input v-model="realNameInfo.country" auto-complete="off" readonly="true"></el-input>
                        </el-form-item>

                        <el-form-item label="证件姓名：" prop="realName">
                            <el-input v-model="realNameInfo.realName" auto-complete="off" readonly="true"></el-input>
                        </el-form-item>

                        <el-form-item label="证件号：" prop="cardId">
                            <el-input v-model="realNameInfo.cardId" auto-complete="off" readonly="true"></el-input>
                        </el-form-item>

                        <el-form-item label="证件有效起始日期：">
                            <el-date-picker v-model="depthForm.startDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                        </el-form-item>

                        <el-form-item label="证件有效结束日期：">
                            <el-date-picker v-model="depthForm.endDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                        </el-form-item>

                        <el-form-item size="large">
                            <div class="do">
                                <a @click="depthSubmit('depthForm')" class="btn btn-outsecond btn-lg">
                                    <i class="fa fa-check fa-lg"></i>&nbsp; 提交认证信息
                                </a>
                            </div>
                        </el-form-item>
                    </el-form> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_idcard',
        data() {
            return {
                realNameLevel: 'Not',
                accountDisabled: false,
                realNameInfo: {
                    country: '中国',
                    realName: '高甜',
                    cardId: '012345678901234567'
                },
                simpleForm: {
                    country: '中国',
                    realName: '',
                    cardId: ''
                },
                stepDepth: false,
                depthForm: {
                    country: '中国',
                    realName: '',
                    cardId: '',
                    startDate: '',
                    endDate: ''
                }
            }
        },
        methods: {
            // 错误提示弹窗
            errorConfirm(errMsg, errTitle) {
                this.$confirm(errMsg, errTitle, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {

                }).catch(() => {

                });
            },

            // 初级认证提交
            simpleSubmit(formName) {
                let _this = this;

                let _simpleForm = this.simpleForm;
                let _country = _simpleForm.country;
                let _realName = _simpleForm.realName;
                let _cardId = _simpleForm.cardId;

                if (!_realName || $.trim(_realName) == '') {
                    _this.errorConfirm('请填写您的真实姓名', '');
                    return false;
                }

                if (!_cardId || $.trim(_cardId) == '') {
                    _this.errorConfirm('请填写有效的身份证号码', '');
                    return false;
                }

                var simpleData = {
                    "country": _country,
                    "realName": _realName,
                    "_cardId": _cardId
                };
                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/userSendCodeMock.json",
                    data: simpleData,
                    dataType: "json",
                    success: function (res) {
                        // if (res.code == 200) {
                            _this.$confirm('您已通过初级认证', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                // window.location.href = "/views/user/user.html";
                                _this.realNameLevel = 'Simple';
                            }).catch(() => {
                                // window.location.href = "/views/user/user.html";
                                _this.realNameLevel = 'Simple';
                            });
                        // } else {
                        //     _this.errorConfirm(res.des, '');
                        // }
                    },
                    error: function (err) {
                        _this.errorConfirm("呀，出错啦。。。", '');
                    }
                });
            },

            // 高级认证按钮事件
            toDepthAuth() {
                this.realNameLevel = 'stepDepth';
                this.depthForm.country = this.realNameInfo.country;
                this.depthForm.realName = this.realNameInfo.realName;
                this.depthForm.cardId = this.realNameInfo.cardId;
            },

            // 高级认证提交
            depthSubmit(formName) {
                let _this = this;

                let _depthForm = this.depthForm;
                let _country = _depthForm.country;

                let _realName = _depthForm.realName;
                let _cardId = _depthForm.cardId;

                let _startDate = _depthForm.startDate;
                let _endDate = _depthForm.endDate;

                if (!_startDate || !_endDate) {
                    _this.errorConfirm('请填写证件有效日期', '');
                    return false;
                }

                var simpleData = {
                    "country": _country,
                    "realName": _realName,
                    "cardId": _cardId,
                    "idCardStartVaildDate": _startDate,
                    "idCardEndVaildDate": _endDate
                };

                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/userSendCodeMock.json",
                    data: simpleData,
                    dataType: "json",
                    success: function (res) {
                        // if (res.code == 200) {
                            _this.$confirm('您已通过高级实名认证', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                window.location.href = "/views/user/user.html";
                            }).catch(() => {
                                window.location.href = "/views/user/user.html";
                            });
                        // } else {
                        //     _this.errorConfirm(res.des, '');
                        // }
                    },
                    error: function (err) {
                        _this.errorConfirm("呀，出错啦。。。", '');
                    }
                });
            },
        },
        created() {
            // 查询是否实名认证，若未认证，显示认证表单；若已认证，是初级还是高级
            // realNameLevel：'Not': 未认证，'Simple': 初级认证，'stepDepth': 高级认证表单，'Depth': 高级认证通过
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
