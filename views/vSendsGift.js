const vSendsGift = function(n){
	return `
	<h1>Кто кому шлет cердечки</h1><h3>Показаны 200 последних человек</h3>
	<main id="mainGift">${n.giftcount?getTestGift(n.giftcount):"Никто не послал сердечек"}</main>
	`;
}
module.exports = { vSendsGift }

function getTestGift(arr){
	let s = `<style>section.gift-sec:nth-child(odd) {background: lime;}</style>`
	arr.forEach(function(el,i){
		s+=`<section class="gift-sec"><div class="giftgrids">
		<div class="item">${el.id}</div>
		<div class="item">От: ${el.from_nick}</div>
		<div class="item">K: ${el.to_nick}</div>
		<div class="item">Cердечко: ${el.wieviel}</div>
		<div class="item">Kогда: ${el.wann}</div>
		</div></section>`
	});
	return s;
}
