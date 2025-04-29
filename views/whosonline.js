const whosonline = function(n){
	return `
	 <a href="#."  class="overlay line" id="whosonline"></a>
    <output id="whosonlineoutput" class="popi"><div class="krestikdiva">
    <b class="camsb">Cams:&nbsp;<span id="webcams2">0</span></b>&nbsp;<b class="camsb">Connects:&nbsp;
    <span id="conns2">0</span></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#." class="krestik-two">&#x274C;</a></div>
    <section id="whosonlinecontent">
    
    </section>
    <div id="yandex_rtb_R-A-12098170-6"></div>
    <script>
    window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
    "blockId":"R-A-12098170-6",
    "renderTo":"yandex_rtb_R-A-12098170-6",
    "type":"feed"
})
})
</script>
    </output>
	`;
}
module.exports = { whosonline }
