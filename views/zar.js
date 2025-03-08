const zar = function(n){
	return `
	 <a href="#."  class="overlay" id="myZar"></a>
    <output id="zaroutput" class="popi">
    <section id="zarcont">
    <p id="pzar"><h1 style="line-height:1.5;">Общайтесь и зарабатывайте деньги!</h1>
    За каждый коннект Вы получаете <b>300 рублей</b>. Вывод средств в юмани от <b>10 млн</b> рублей.
    </p>
    <button onclick="hideZar(this);">Не показывать больше</button>
    </section>
    <script>
    function hideZar(el){
		window.location.href="#.";
		localStorage.setItem('zar','yes');
	}
    </script>
    </output>
	`;
}
module.exports = { zar }
