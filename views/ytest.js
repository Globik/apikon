function ytest(n){
	return `<h2>Купить сердечки</h2>
	<p>
	Одно сердечко стоит 50 руб 
	</p>
	<section>
	<div data-count="10" data-amount="500" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 10 сердечек = 500 руб</div>
	<div data-count="50" data-amount="2000" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 50 сердечек = 2000 руб</div>
	<div data-count="100" data-amount="4000" onclick="pay(this);"><div class="heart" style="width:50px"></div>Купить 100 сердечек = 4000 руб</div>
	</section>
	
	`;
}
module.exports = { ytest }
