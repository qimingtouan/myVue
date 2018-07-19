<template>  
    <div class="safe-rd ml0">
        <div class="main-bd" id="mainForm">
            <div class="tab_head" id="userTab">
                <span class="api_config_title"><i class="fa fa-cogs"></i><b>API设置</b></span>
                <a class="rd mt10" href="javascript:openApi();" id="open_api_btn">查看API文档</a>
            </div>

            <div class="api_tips">
                <h4><b class="red">注意事项</b></h4>
                <div class="api_tips_content">
                    <p>1.我们提供 REST 和 WebSocket API，通过查看 <a>API文档</a>。</p>
                    <p>2.每个用户最多可创建10对API密钥。</p>
                    <p>3.单个IP限制每分钟1000次访问，超过1000次将被锁定1小时，一小时后自动解锁。</p>
                    <p>4.单个API限制每秒钟30次访问，一秒钟内30次以上的请求，将会视作无效。</p>
                    <p>5.K线接口每秒只能请求一次数据。</p>
                    <p>6.如果在使用过程中有任何问题，请加群 <a>XXXXXXXX</a>，我们将为您做出最权威的解答。</p>
                </div>
            </div>

            <div class="panel-group" id="accordionAdd">
                <div class="panel panel_api mb15">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordionAdd"  href="#collapseOne" class="panel_title_btn">
                                添加新秘钥<i class="fa fa-angle-down rd"></i>
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div class="row api_add">
                                <div class="col-sm-6">
                                    <h4 class="api_add_title">API密钥资料填写：</h4>
                                    <div class="list-show">
                                        <label class="list-label">备注：</label>
                                        <input class="list-input" placeholder="备注API名称" name="keyName" id="keyName">
                                    </div>

                                    <div class="list-show">
                                        <label class="list-label">（选填）绑定IP：</label>
                                        <input class="list-input" placeholder="可加多个, 用‘,’分割, 为空则不限制" id="apiIpBind" name="apiIpBind">
                                    </div>

                                    <div class="list-show">
                                        <label class="list-label">Google验证码：</label>
                                        <input type="text" class="list-input" name="googleCode" id="googleCode" value="" position="s" mytitle="请输入移动设备上的验证码" errormsg="验证码错误，请重新输入。" errorname="验证码" pattern="limit(4,10)">
                                    </div>
                                </div>
                                                    
                                <div class="col-sm-6">
                                    <h4 class="api_add_title">API密钥权限</h4>
                                    <div class="authority-list">
                                        <p><input type="checkbox" name="assetPerm" id="59289631"><label onclick="changeCheckBox('59289631')" class="checkbox checked" id="ck_59289631"></label><span>查询资产：查询账号信息及资产情况</span></p>
                                        <p><input type="checkbox" name="entrustPerm" id="7634242"><label onclick="changeCheckBox('7634242')" class="checkbox checked" id="ck_7634242"></label><span>委托交易：委托、取消、查询交易订单</span></p>
                                        <p><input type="checkbox" name="moneyPerm" id="36639876"><label onclick="changeCheckBox('36639876')" class="checkbox checked" id="ck_36639876"></label><span>充值提币：获取充值、提币地址和记录，发起提币业务</span></p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group col-sm-12 api_add_btn_wrap mt15">
                                <span class="separate_line_gray col-sm-4"></span>
                                <div class="col-sm-4">
                                    <button id="apiAddBtn" type="button" data-loading-text="Loading..." 
                                            class="api_add_btn" onclick="">
                                            创建API秘钥
                                    </button>
                                </div>
                                <span class="separate_line_gray col-sm-4"></span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-group" id="accordionTable">
                <div class="panel panel_api">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordionTable"  href="#collapseTable" class="panel_title_btn">
                                我的API秘钥<i class="fa fa-angle-down rd"></i>
                            </a>
                        </h4>
                    </div>
                    <div id="collapseTable" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div class="api_table_wrap">
                                <!-- <table class="table">
                                    <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th>备注</th>
                                            <th>权限</th>
                                            <th>IP</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>5</td>
                                            <td>渣渣士大夫（***2cxs）</td>
                                            <td>查询资产、委托交易</td>
                                            <td>123.123.123.123</td>
                                            <td>
                                                <a class="btn-edit" onclick="goEdit(1)"><i class="fa fa-edit"></i>修改</a>
                                                <a class="btn-del" onclick="goDel(1)"><i class="fa fa-trash-o"></i>删除</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                                <el-table :data="tableData" style="width: 100%; font-size:12px;" tooltip-effect="light" empty-text="暂无记录">
                                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                                    <el-table-column prop="name" label="备注" show-overflow-tooltip  width="240"></el-table-column>
                                    <el-table-column prop="authority" label="权限" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="ip" label="IP" show-overflow-tooltip></el-table-column>
                                    <el-table-column label="操作" width="180" align='center'>
                                        <template slot-scope="scope">
                                            <a class="operate_btn operate_edit" @click="goEdit(scope.$index, scope.row)"><i class="fa fa-edit paddingRight5"></i>修改</a>
                                            <a class="operate_btn operate_delete" @click="goDel(scope.$index, scope.row)"><i class="fa fa-trash-o ft13 paddingRight5"></i>删除</a>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_api',
        data() {
           return {
                tableData: [{
                    name: 'API密钥',
                    authority: '[查询资产][委托交易][充值提币]',
                    ip: '192.168.0.194'
                }, {
                    name: 'API密钥_Test_20180627',
                    authority: '查询资产、委托交易',
                    ip: '192.168.0.194,192.168.0.198,192.168.0.192,192.168.0.196'
                }, {
                    name: 'API密钥',
                    authority: '查询资产、充值提币',
                    ip: '192.168.0.194'
                }, {
                    name: 'API密钥',
                    authority: '查询资产',
                    ip: '192.168.0.194'
                }]
           }
        },
        methods: {
            
        },
        created() {
            
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .api_config_title {
        i{
            width: 30px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            margin: -2px 10px 0 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 100%;
            vertical-align: middle;
            font-size: 16px;
        }
    }

    .api_tips {
        border: 1px dotted #ddd;
        padding: 10px 20px;
        font-size: 12px;
        margin-top: 20px;
        color: #333;
        margin-bottom: 15px;

        h4 {
            font-size: 14px;
            padding-bottom: 5px;
        }

        .api_tips_content {
            a {
                cursor: pointer;
            }
        }
    }

    .panel_api {
        border-color: #dfdcf1;

        .panel-heading {
            background-color: #f3f1fb;
            border-color: #dfdcf1;
        }
    }

    .panel-group .panel-heading+.panel-collapse>.panel-body {
        border-top: 1px solid #dfdcf1;
    }

    .panel_title_btn {
        display: block;
        color: #666;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        text-decoration: none;
        i{
            transition: transform .3s;
        }
    }
    .collapsed {
        i{
            transition: transform .3s;
            transform: rotate(-90deg);
        }
    }

    .api_add {
        color: #444;

        .api_add_title {
            font-size: 14px;
            color: #333;
            padding: 15px 0px 15px 25px;
        }
        
        input {
            display: inline-block;
        }

        .list-show {
            width: 94%;
            margin: 0 auto 10px auto;

            .list-label {
                width: 100px;
                text-align: right;
            }

            input.list-input {
                background: none;
                border: none;
                border-bottom: 1px solid #ddd;
                line-height: 30px;
                width: 300px;
                padding-left: 5px;
            }
        }

        .authority-list {
            padding-left: 25px;

            label {
                display: none;
            }

            p {
                margin-bottom: 15px;
            }

            input {
                margin-right: 10px;
                top: 2px;
                position: relative;
                left: 0;
            }

            .checkbox {
                display: none;
            }
        }
    }

    .api_add_btn_wrap {
        text-align: center;

        .api_add_btn {
            width: 280px;
            border: 2px solid #7280e8;
            border-radius: 25px;
            background: #fff;
            color: #7280e8;
            font-size: 18px;
            font-weight: bold;
            outline: none;
            box-shadow: none;
            text-shadow: none;
        }

        .api_add_btn:hover {
            color: #fff;
            background: #7280e8;
        }
    }

    .separate_line_gray {
        border: 1px dashed #c0c5ef;
        margin-top: 20px;
    }

    input:-moz-placeholder {
        font-size: 12px;
    }
    input:-ms-input-placeholder {
        font-size: 12px;
    }
    input::-webkit-input-placeholder {
        font-size: 12px;
    }

    .api_table_wrap {
        .table thead tr th {
            text-align: left;
        }
        
        .operate_btn {
            display: inline-block;
            padding: 5px 10px;
            font-size: 12px;
            line-height: 1.5;
            border-radius: 3px;
            cursor: pointer;
            text-decoration: none;
        }
        .operate_edit {
            color: #27ae60;
        }
        .operate_edit:hover {
            color: #fff;
            background-color: #2ad593;
            border-color: #2ad593;
        }

        .operate_delete {
            color: #fb5555;
        }
        .operate_delete:hover {
            color: #fff;
            background-color: #f1280f;
            border-color: #f1280f;
        }
    }
</style>
