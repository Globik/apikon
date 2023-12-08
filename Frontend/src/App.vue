<template>
  <div id="app">
    <router-view/>
    <modal-interface :is-open="isOpenModal" container-width="750px" style="z-index: 2!important;">
      <template v-slot:container>
        <div class="modal-header">
          <h1>Правила видеочата</h1>
        </div>
        <div class="modal-body">
          <ol>
            <li id="1">
              <h4>Запрещено проявлять неуважительное отношение к собеседнику:</h4>
              <ul>
                <li>вести себя по-хамски и использовать ненормативную лексику;</li>
                <li>оскорблять по национальным, расовым и религиозным признакам;</li>
                <li>угрожать собеседнику.</li>
              </ul>
            </li>
            <li id="2">
              <h4>Запрещено вести себя вульгарно:</h4>
              <ul>
                <li><u>находиться в чате с голой грудью, не показывая своё лицо</u>;</li>
                <li>предлагать виртуальный секс;</li>
                <li>использовать слова, которые могут иметь неприличный сексуальный подтекст (вирт, пошалим, и
                  т.п.);
                </li>
                <li>находиться в чат рулетке без одежды или в нижнем белье;</li>
                <li>демонстрировать половые органы и другие интимные части тела;</li>
                <li>прикасаться к половым органам даже через одежду;</li>
                <li>направлять камеру ниже груди (старайтесь, чтобы ваше лицо было в кадре);</li>
                <li>совершать любые действия, которые могут расцениваться как непристойные.</li>
              </ul>
            </li>
            <li id="3">
              <h4>Запрещено показывать вместо себя посторонние изображения:</h4>
              <ul>
                <li>направлять камеру на экран монитора, планшета, телефона или телевизора;</li>
                <li>направлять камеру на фотографии;</li>
                <li>направлять камеру на любые текстовые сообщения;</li>
                <li>использовать эмуляторы веб-камеры.</li>
              </ul>
            </li>
            <li id="4">
              <h4>Запрещено спамить:</h4>
              <ul>
                <li>транслировать изображения или писать сообщения рекламного характера;</li>
                <li>отправлять в чате любые ссылки;</li>
                <li>осуществлять массовые рассылки сообщений;</li>
                <li>просить посетителей видеочата совершать действия в интернете: проголосовать, поставить лайки,
                  принять участие в опросе, зайти на сайт и т.п.
                </li>
              </ul>
            </li>
            <li id="5">
              <h4>Система жалоб</h4>
              <ul>
                <li>Любой посетитель видеочата может отправить жалобу на своего собеседника. К жалобе прикрепляется
                  изображение пользователя и его сообщение, на основании которых модератор принимает решение о
                  бане. Модераторы реагируют на жалобы круглосуточно, без выходных.
                </li>
                <li>Если на человека, нарушающего правила чата, часто жалуется большое количество пользователей, он
                  банится автоматически. Сложный механизм системы жалоб исключает случайные или несправедливые
                  баны.
                </li>
              </ul>
            </li>
          </ol>
          <p>Администрация видеочата не несёт ответственности за действия посетителей, но всеми силами старается бороться с нарушителями. Физически невозможно уследить за всеми нарушениями в чат рулетке, поэтому настоятельно просим вас жаловаться на нарушителей. Ваши жалобы помогают нам делать чат чище и лучше.</p>
          <p>Пользуясь чатом, вы принимаете и соглашаетесь выполнять установленные правила. Если вы не согласны с действующими правилами, вам следует прекратить пользоваться чатом.</p>
          <div class="center-button">
            <button class="register-button" @click.prevent="confirmRules">Принять</button>
          </div>
        </div>
      </template>
    </modal-interface>
    <modal-interface :is-open="isOpenAuthModal">
      <template v-slot:container>
        <div class="modal-header">
          Авторизация / Регистрация
          <span class="model-header-label" @click="isOpenModal = !isOpenModal">
            Правила чата
          </span>
        </div>
        <div class="modal-body">
          <div class="error-message" v-show="error">{{ error }}</div>
          <form @submit.prevent="login">
            <label for="name" style="
              margin-top: 5px;
            ">Имя</label>
            <input v-model="form.name" type="text" placeholder="Введите Имя/Логин" id="name">

            <label for="name">Пароль</label>
            <input v-model="form.password" type="password" placeholder="Введите пароль" id="password">

            <button class="register-button" @click.prevent="register">Зарегистрироваться</button>
            <button class="login-button" @click.prevent="login">Войти</button>
          </form>
        </div>
      </template>
    </modal-interface>
  </div>
</template>

<script>
import ModalInterface from '@/components/ModalInterface'
import { mapState } from 'vuex'
import store from './store'
import { computed, ref } from 'vue'

export default {
  components: {
    ModalInterface
  },
  computed: mapState(['error', 'user']),
  setup () {
    const form = ref({
      name: null,
      password: null
    })
    const isConfirmRules = localStorage.getItem('confirmRules')
    const isOpenModal = ref(isConfirmRules == null)

    store.dispatch('updateUser')

    return {
      isOpenModal,
      isOpenAuthModal: computed(() => store.state.user == null),
      form,
      login: () => {
        store.dispatch('loginUser', form.value)
      },
      register: () => {
        store.dispatch('registerUser', form.value)
      },
      confirmRules: () => {
        isOpenModal.value = false
        localStorage.setItem('confirmRules', true)
      }
    }
  }
}
</script>

<style lang="less">
@import "~@fortawesome/fontawesome-free/less/fontawesome.less";
@import "~@fortawesome/fontawesome-free/less/solid.less";

*,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

form * {
  font-family: 'Poppins',sans-serif;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

label {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  padding: 0px 8px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  background: #ddd;
  border: 0;
}

span.model-header-label {
  float: right;
  font-weight: bold;
  color: #ff5722;
}

.login-button {
  margin-top: 10px;
  width: 100%;
  background: linear-gradient(#446ca2,#446ca2 25%,#184076);
  color: #fff;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}

.register-button {
  margin-top: 25px;
  width: 100%;
  background: #4caf50;
  color: #fff;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}

.login-button:hover, .register-button:hover {
  color: #ddd;
}

.center-button > button {
  width: 230px;
}
.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.error-message {
  display: block;
  width: 100%;
  border-radius: 10px;
  padding: 12px 8px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  background: #e91e4d;
  border: 0;
  color: white;
}

.modal-header {
  padding: 14px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.modal-body {
  padding: 14px;
}

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

ul, h1, h2 {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  height: 100%;
  border: none;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  color: #767676;
  background-color: #fff;

  &:hover {
    color: #333;
  }

  &:active {
    color: #000;
  }
}

#app {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.flex {
  display: flex;
}
</style>
