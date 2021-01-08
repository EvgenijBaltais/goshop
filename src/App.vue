<template>
    <MainLayout/>
</template>

<script>

import MainLayout from './layouts/MainLayout'
import axios from 'axios'

export default {

  name : 'app',
  components: {
    MainLayout
  },
  created() {
    this.$store.dispatch('get_catalog')
    this.$store.dispatch('get_flowers_types')
    this.$store.dispatch('get_categories_data')
    this.$store.dispatch('get_all_colors')
    this.$store.dispatch('get_all_occasions')
  },
  mounted(){

      // Определить данные клиента при заходе на сайт и сохранить их в таблицу клиентов, чтобы потом присвоить номер и идентифицировать его

            (function(){

              let client_id = 0

              if (localStorage.getItem('client_id')) {
                client_id = localStorage.getItem('client_id')
                document.body.setAttribute('client_id', client_id)
                return false
              }
                  axios
                    .get('https://flowers.home-trees.ru')
                    .then(response => {

                      if (!response.data) return false

                      axios.get('//localhost:3000/save_client_data', {
                        params: {
                            'ip': response.data.REMOTE_ADDR,
                            'user_agent': response.data.HTTP_USER_AGENT
                        }
                      }).then(res => {
                        client_id = res.data[1][0]['LAST_INSERT_ID()']
                        localStorage.setItem('client_id', res.data[1][0]['LAST_INSERT_ID()'])
                        document.body.setAttribute('client_id', client_id)
                      })
                    })
            })()
}
}
// Доделать ленивую подгрузку в каталоге
// Доделать чтобы при заходе в товар нормально менялось изображение

</script>

<style>
@import 'assets/css/style.css';
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Andika&display=swap');

/*body {font-family: 'Pangolin', cursive;}
body {font-family: 'Andika', sans-serif;}*/
body {font-family: 'Neucha', cursive;}
</style>
