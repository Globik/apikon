function ytest(n){
	return `<h2>Купить сердечки</h2>
	<p>
	Одно сердечко стоит 50 руб 
	</p>
	<section>
	<div data-count="10" data-amount="500.00" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 10 сердечек = 500 руб</div>
	<div data-count="50" data-amount="2000.00" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 50 сердечек = 2000 руб</div>
	<div data-count="100" data-amount="4000.00" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 100 сердечек = 4000 руб</div>
	</section>
	<pre>
	  {
  id: '2d501afb-000f-5000-a000-13913c77edea',
  status: 'pending',
  amount: { value: '500.00', currency: 'RUB' },
  description: 'Сердечек покупка в количестве 10 штук',
  recipient: { account_id: '326070', gateway_id: '2179833' },
  created_at: '2024-02-03T09:28:27.916Z',
  confirmation: {
    type: 'redirect',
    confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea'
  },
  test: true,
  paid: false,
  refundable: false,
  metadata: { alikey: 'number one' }
}

	</pre>
	<a href="https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea">https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea</a>
	<div><button onclick="takeCb(this);">Проверить есть ли какие сообщения от вебхука</button></div>
	<output id="out"></output>
	`;
}
module.exports = { ytest }
