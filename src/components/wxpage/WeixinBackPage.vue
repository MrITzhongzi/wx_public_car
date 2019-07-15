<template>
    <div>hahahah</div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        let myURL = new URL(window.location.href.split("#")[0]);     
        let searchParams = new URLSearchParams(myURL.search);
        this.code = searchParams.get("code");
        axios.get("/weixin/getTokenByCode", {
            params: {
                code: this.code
            }
        }).then(function(response){
            alert("chenggong")
        });
    },
    data: function(){
        return {
            code: ''
        };
    }
}
</script>

<style>

</style>
