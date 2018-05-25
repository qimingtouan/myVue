<template id="modal-dialog">
    <div role="dialog" class="modal" style="display:block">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <slot name="modal-header">
                    <div class="modal-header">
                        <h4>这是Modal弹框的标题</h4> 
                        
                    </div> 
                </slot>
                <slot name="modal-body">
                    <div class="modal-body">
                        <input type="text" v-model="msg"/>
                    </div>
                </slot>
                <slot name="modal-footer">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click='cancel()'>Exit</button>
                        <button type="button" class="btn btn-success" @click='ok()'>Ok</button>
                    </div>
                </slot>

            </div>
        </div>

        
    </div>
</template>
<script>
export default {
    name: "modal-dialog",
    data() {
        return {
           msg:""
        };
    },
    props:[],
    computed: {
              
    },
    methods: {
        cancel(){
            console.log(this)
            this.$emit("btn_cancel",this.$el)
        },
        ok(){
            this.$emit("btn_cancel",this.$el)
        }

    },
    watch: {

    },
    created() {
       
    },
    mounted() {
      
    },
    destroyed(){
        console.log("destroyed")
    }
};
</script>

<style scoped lang="less">

</style>
