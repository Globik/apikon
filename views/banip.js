const banip = function(n){
	return `<!-- banip.js --> <a href="#."  class="overlay" id="banned"></a>
    <output id="bannedoutput" class="popi">
   
    <p>Ваш айпи адрес забанен за нарушение правил чата!</p>
    <p>Чтобы разбанить его, оплатите 2 рубля штрафа.</p>
    <form id="bannedForm" method="post" action="https://yoomoney.ru/quickpay/confirm" name="ordertodo">
    <div><input type="hidden"  placeholder="Получатель yoomoney" name="receiver" value="4100118676103827" required/> </div>
	<input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&p=900"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <input type="hidden" name="formcomment" value="Разбан" />
    <input type="hidden" name="targets" value="Разбан" />
    <input type="hidden" name="bill_id" value="non" />
    <div><input class="number"  type="hidden" name="sum" value="2.00" required data-type="number"/></div>
   <input  class="input" type="hidden" checked name="paymentType" value="PC" /></div>
   <div><input  class="input" type="hidden" name="paymentType" value="AC" /></div>
   <div class="bandiv"><input type="submit"  value="Разбанить"/></div>
    </form>
    
    </output> `
}
module.exports = { banip }
