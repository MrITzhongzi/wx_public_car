<script>
// 全局变量
// 控制加载动画的显示隐藏
let loadAnimated = {isShow:true};
function flushUI(ctx){
    ctx.$forceUpdate();
}
export default
{
  loadAnimated,
  flushUI
}
</script>
