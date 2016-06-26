var $ = require('jquery');
var Vue = require('vue');
// var vueSelect = require('vue-select');

Vue.config.devtools = true;
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
});
var vm = new Vue({
  el: "#app",
  data:{
    debug: false,
    mensaje: '',
    users:[{id:88,nombre:'Ei.j Chavez'}]
  },
  methods:{
    insertarUsuario: function(){
      var id = (this.users.length > 0)?this.users[this.users.length-1].id+1: 1;
      if (this.mensaje != '') {
        this.users.push({id:id,nombre: this.mensaje});
        this.mensaje = '';
      }
    },
    borrarUsuario: function (index) {
      this.users.splice(index, 1);
    },
    borrarUsuarios: function(){
      if (confirm('Se borraran todos los usuarios agregados')) {
        this.users = [];
      }
    }
  }
});