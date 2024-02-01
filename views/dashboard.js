function dashboard(n){
return `
 <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Админка</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <link rel="icon" href="favicon.ico">
    <link href="/css/main2.css" rel="stylesheet">
    <link href="/css/adminka.css" rel="stylesheet">
    <script src="/js/globalik.js"></script>
    </head><body>
    <a href="/">На главную</a>
    <nav id="adminNav"><button onclick="getUsers(this);">Пользователи</button><button onclick="getStun(this)";>Stun / turn</button><button onclick="whosOnline(this);">Кто онлайн</button>
    <button id="settings" onclick="getSettings(this);">Настройки</button>
    </nav>
    <div id="dynamicNav"><div><b>Юзеров:</b> <span>${n.usercount?n.usercount:0}</span></div><div></div>
    <div><b>Веб-камер:</b> <span id="camsCount">0</span></div><div><b>Коннектов:</b> <span id="connects">0</span></div></div><hr>
    <section id="adminContainer">
    <div id="someSpinner" class="hide"><div class="loader"></div></div>
    <section id="contentBox"></section>
    <section id="dynamicSection"><div id="dynamicContainer"></div></section>
    </section>
    <script src="/js/adminka.js"></script>
    </body></html>`;
}
module.exports = { dashboard }
