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
    <nav id="adminNav"><button onclick="getUsers(this);">Пользователи</button><button>Stun / turn</button></nav>
    <section id="adminContainer">
    <div id="someSpinner" class="hide"><div class="loader"></div></div>
    <section id="contentBox"></section>
    </section>
    <script src="/js/adminka.js"></script>
    </body></html>`;
}
module.exports = { dashboard }
