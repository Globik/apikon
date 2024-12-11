const {langpage} = require('./langpage.js');
function about(n){
	const { lang } = n;
return `
 <!DOCTYPE html>
<html ng-app="projectRtc">

<head>
    <title>Чат рулетка-видеочат для общения, знакомства онлайн</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--
    <meta name="description" content="Чат рулетка ! Онлайн видеочат без регистрации для знакомства и общения" />
    <meta name="keywords" content="для онлайн знакомства, как чатрулетка,общение, видео знакомства, бесплатно, без регистрации, чат, видеочат,чат рулетка-видеочат №1, знакомства" />
    <meta name="yandex-verification" content="fda46e049783b204" />
    <meta name='wmail-verification' content='98c0f2f2d54a70e546cef505fbab8330' />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="120x120" href="/img1/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img1/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img1/icons/favicon-16x16.png">
 <link rel="manifest" href="/img/icons/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <link rel="icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="144x144"  href="/android-icon-144x144.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/manifest.json">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">
		
<meta name="description" content="Чат-рулетка — самый популярный русскоязычный чат. Заработок на виртуальных подарках. Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
  <meta name="keywords" content="rouletka.ru, roulet.chat, chat.roulet, roulette, chat, Chatroulette, видеочат, чатрулетка, чатрулет, chatroulette русский, чатрулетт, анонимность, видео, чат, рулетка, чат рулет, чат рулетка, чат рулетт, chat roulette, chatroulette.com, знакомства, videochatru, videochat.ru, videochat.com" />
 
  <meta property="og:title" content="Чат-рулетка - анонимный видеочат (Русский аналог ChatRoulette)" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="//rouletka.ru/" />
  <meta property="og:image" content="//rouletka.ru/og_image.png" />
  <meta property="og:site_name" content="Чат-рулетка" />
  <meta property="og:description" content="Чат-рулетка для русскоязычных пользователей. Заработок на виртуальных подарках. Случайные знакомства в видеочате. Есть веб-камера? Найди пару в чат рулетке!" />
  
  <meta itemprop="name" content="Чат-рулетка - анонимный видеочат (Русский аналог ChatRoulette)" />
<meta itemprop="description" content="Чат-рулетка — самый популярный русскоязычный чат. Заработок на виртуальных подарках Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
<meta name="description" content="Чат-рулетка — самый популярный русскоязычный чат. Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Organization", "url": "https://rouletka.ru", "logo": "https://rouletka.ru/og_image.png" } </script>
  
    <base href="/" />
    <link rel="canonical" href="https://rouletka.ru/" />
    <link rel='stylesheet' href='/css/style.css' />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.4.0/animate.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
    <script src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
    <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
    <script src="/pwabuilder-sw-register.js"></script>
</head>

<body>
    <div class="langs">
${lang=='en'?'':'<a href="/about/en" hreflang="en">'} <img title="English Version" alt="English Version" src="/img/en.png" width="35" height="22"> ${n.ln=='en'?'':'</a>'}
${lang=='ru'?'':'<a href="/about" hreflang="ru">'} <img alt="Русская версия" src="/img/ru.png"  width="35" height="22">${n.ln=='ru'?'':'</a>'}
${lang=='zh'?'':'<a href="/about/zh" hreflang="zh">'}<img title="Китай" alt="中文网站" src="/img/zh.png"  width="35" height="22">${n.ln=='zh'?'':'</a>'}
${lang=='id'?'':'<a href="/about/id" hreflang="zh">'}<img title="Индонезия" alt="versi indonesia" src="/img/indonesia.png"  width="35" height="22">${n.ln=='zh'?'':'</a>'}
</div>
    <section class="hero">
    
        <div class="container wow fadeInUp">
            <div class="logoЧатРулетка"></div>
            <h1 class="hero__title">Видео чат — случайные знакомства</h1>
            <h2 id="sukaK" class="hero__subtitle">Знакомьтесь с новыми людьми прямо сейчас!</h2>
            <button class="btn btn_orange" id="start_chat_btn">Начать общаться</button>
            <div class="hero__mobile-btn only-mobile">
                <a href="https://play.google.com/store/apps/details?id=ru.rouletka.pwa" class="btn btn_play-market only-mobile">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" class="svg-inline--fa fa-google-play fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                    </path>
                </svg> Приложение в Google Play
                </a><!--
                <a class="btn btn_appGallery only-mobile" href="https://appgallery.huawei.com/app/C109425847?sharePrepath=ag&locale=ru_RU&source=appshare&subsource=C109425847&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=b582f0a3a57545f99084d72b532620c1_com.android.bluetooth&callType=SHARE">
                    <div class="btn__icon">
                        <img src="/img1/icons/appgallery-icon.png" alt="AppGallery">
                    </div>
                    Откройте в<br> AppGallery
                </a> -->
            </div>
            <div class="parallax-bg" id="scene">
                <div data-depth="0.2" class="parallax-bg__face1">
                    <img src="/img1/faces/face1.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.3" class="parallax-bg__face2">
                    <img src="/img1/faces/Ellipse-1.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.3" class="parallax-bg__face3">
                    <img src="/img1/faces/Ellipse-2.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.5" class="parallax-bg__face4">
                    <img src="/img1/faces/Ellipse-3.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.5" class="parallax-bg__face5">
                    <img src="/img1/faces/Ellipse-4.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.6" class="parallax-bg__face6">
                    <img src="/img1/faces/Ellipse-5.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.4" class="parallax-bg__face7">
                    <img src="/img1/faces/Ellipse-6.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.6" class="parallax-bg__face8">
                    <img src="/img1/faces/Ellipse-7.png" alt="Лицо" class="parallax-bg__img">
                </div>
                <div data-depth="0.4" class="parallax-bg__face10">
                    <img src="/img1/faces/Ellipse-9.png" alt="Лицо" class="parallax-bg__img">
                </div>
            </div>
        </div>
    </section>

    <section class="info">
        <div class="container">
            <div class="info-description  wow fadeInUp">
                <h3 class="info-description__title">
                    Видео чат - случайные знакомства
                </h3>
                <p class="info-description__text">
                    Такая чат рулетка не похожа на все другие, ведь вы можете начинать беседы в любое удобное для себя время. Вне зависимости от того, когда проходит разговор днем или ночью, вам всегда будет найден случайный собеседник. Необычная чатрулетка, путем нестандартного
                    выбора, найдет вам человека для беседы, подарит общение, знакомства и море положительных эмоций.
             <!--   Можно купиь <b>виртульных подарков</b> и дарить их собеседнику. <b>Зарабатывайте на виртуальных подарках</b> 
             в виде сердечек &#x1f496. Виртуальные подарки можно обменять на <b>деньги</b>. -->
                </p>
            </div>

            <div class="info-block">
                <div class="info-block__col info-block__col_rel-flex">
                    <img src="/img1/1.png" alt="новые друзья" class="info-block__img info-block__img_1 wow fadeInUp">
                    <img src="/img1/2.png" alt="новые друзья" class="info-block__img info-block__img_2 wow fadeInDown">
                </div>
                <div class="info-block__col wow fadeInRight">
                    <h4 class="info-block__title">Русская чат рулетка</h4>
                    <p class="info-block__text">Вас ждут увлекательные разговоры, длительные беседы, вы найдете здесь много разных людей, общение знакомства и, быть может, одно из них перейдет во что-то большее.
                    </p>
                    <p class="info-block__text">Помните, что каждая девушка – это достойная претендентка на ваше сердце. Здесь каждый находит то, что ищет.</p>
                    <p class="info-block__text">Теперь нет необходимости писать черные буквы на белом экране, не имеет смысла тратить много времени, на изнурительный подбор фраз, поскольку видео чат открывает совсем другие грани.</p>
                    <p class="info-block__text">
                        Чат Рулетка — это популярный русскоязычный видеочат, ежедневно посещаемый большим количеством пользователей из России и государств СНГ. Наш сервис открыт для всех людей, которые ищут новые интригующие знакомства. Возможности такого общения намного шире,
                        нежели при обычной интернет-переписке, ведь оно позволяет собеседникам видеть друг друга при помощи веб-камеры. Если вы ощущаете жажду общения, видеочат поможет вам реализовать эти желания.
                    </p>
                </div>
            </div>

            <div class="info-block">
                <div class="info-block__col wow fadeInLeft">
                    <h4 class="info-block__title">Чат Рулетка с девушками — это реально!</h4>
                    <p class="info-block__text">
                        Чат рулетка работает по принципу случайных знакомств. Использовать данный интернет-сервис чрезвычайно легко.Если вы поймете, что с вашим собеседником скучно, то вы сможете продолжить поиск, нажав кнопку «дальше»
                    </p>
                    <p class="info-block__text">Девушки в чате рулетке — это не какие-то там платные агенты, задача которых завлекать и развлекать мужчин, которые зашли на этот чат. 
                    Это обычные девушки, которые, как и вы, оказались на этом чате в поиске своей половинки или приятного
                        собеседника.<!-- Вы можете приобрести <b>виртуальных сердечек</b> &#x1f496 и подарить сердечко девушке. --> 
                    </p>
                </div>
                <div class="info-block__col info-block__col_rel-flex">
                    <img src="/img1/3.png" alt="новые друзья" class="info-block__img info-block__img_3 wow fadeInDown">
                    <img src="/img1/4.png" alt="новые друзья" class="info-block__img info-block__img_4 wow fadeInUp">
                </div>
            </div>

    </section>
    <div><a href="/photos">rouletka.ru</a></div>
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
${langpage(n)}
    <footer class="footer">
        <div class="container">
            <a href="https://play.google.com/store/apps/details?id=ru.rouletka.pwa" class="btn btn_play-market">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" class="svg-inline--fa fa-google-play fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                    </path>
                </svg> Приложение в Google Play
            </a>

            <div class="footer-desc">
                <h4 class="footer-desc__title">Знакомьтесь с новыми людьми прямо сейчас!</h4>
                <p class="footer-desc__text">
                    Вы никогда не угадаете заранее, с кем наш алгоритм видеочат рулетки соединит вас в следующий раз. Может быть, это девушка по соседству, а может, это кто-то, кто живет за тысячи километров от вас. Вы никогда не узнаете, пока не попробуете.
                </p>
                <p class="footer-desc__text">
                    Готовьтесь к сюрпризам и веселым беседам с незнакомцами каждый раз, когда вы нажимаете кнопку “Далее”. Откройте для себя новые увлекательные приключения! Если вы всегда мечтали пообщаться с новыми людьми, но не знали как, видеочат Rouletka вам в этом
                    поможет.
                </p>
                <p class="footer-desc__text">
                    Мир увлекательных знакомств находится всего в одном шаге от вас. Не упустите возможность совершить множество новых открытий.
                </p>
                <p class="footer-desc__copy">
                    &copy;2023 Rouletka
                </p>
            </div><!--
            <a href="https://appgallery.huawei.com/app/C109425847?sharePrepath=ag&locale=ru_RU&source=appshare&subsource=C109425847&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=b582f0a3a57545f99084d72b532620c1_com.android.bluetooth&callType=SHARE" class="btn btn_appGallery">
                <div class="btn__icon">
                    <img src="/img1/icons/appgallery-icon.png" alt="AppGallery">
                </div>
                Откройте в<br> AppGallery
            </a> -->
        </div>
        
        <section id="minifooter">
       <div id="donatebox">
<div class="dnate"><b>Помочь проекту:&nbsp;&nbsp;&nbsp;</b></div>
<div>
<iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
</div>
</div>
<!--
<div id="rustorebox"><a href="https://apps.rustore.ru/app/ru.rouletka.pwa"><img id="rustoreimg" src="/img/rustore.png" /></a></div> -->
<div id="socialbox"><!-- <b>Наш Телеграм:&nbsp;&nbsp;&nbsp;</b><a href="https://t.me/rouletka3"><img id="telegimg" src="/img/telega.png" /></a> --></div>
        </section> 
    </footer>
    ${process.env.DEVELOPMENT==="yes"?'':`<script>
     // https://yandex.ru/support2/partner/ru/web/units/sizes
     function getReklama(){
		
     window.yaContextCb.push(()=>{
     if(Ya.Context.AdvManager.getPlatform()==='desktop'){
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-12098170-3",
			// "renderTo":"yandex_rtb_R-A-12098170-1
			"type":"floorAd",
			"platform":"desktop",
			"onClose":function(){
			console.log("Reklama closed")
				//if(isLogin.value=="true")window.location.href="#setPrem";
			},
		 })
	 }else{
		 Ya.Context.AdvManager.render({
		 "blockId":"R-A-12098170-5",
		 "type":"floorAd",
			"platform":"touch",
			"onClose":function(){
			console.log("Reklama closed")
		//	if(isLogin.value=="true")window.location.href="#setPrem";
			}
		})
	 }
	 })
 }
 getReklama();
	 </script> `}
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
<script>
new WOW().init();

// Parallax

let scene = document.querySelector('#scene');
let parallaxInstance = new Parallax(scene);

let start_chat_btn = document.querySelector('#start_chat_btn');
start_chat_btn.onclick = suka;
function suka(){
	window.location.href="/about";
}
</script>

</html>`;
}
module.exports={about}

/*
<!--
<div>
<b>Помочь проекту.!</b>
<irame src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
</div> -->
*/ 
