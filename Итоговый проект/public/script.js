Vue.component('hello-component', {
  template: `<h1>Hello, <slot></slot></h1>`
});

Vue.component('full-name', {
  props: ['firstname', 'lastname'],
  template: `<div><h3 class="full-name">{{ firstname }} {{ lastname }}</h3>
  <h3 class="full-name">{{ firstname }} {{ lastname }}</h3></div>`,
});

const app = new Vue({
  el: '#app',
  data: {
    name: 'Dmitry',
    surname: 'Petrov',
    items: [
      { title: 'MongoDB', weight: 10, active: true },
      { title: 'MySQL', weight: 1 },
      { title: 'RethinkDB', weight: 3 },
      { title: 'Redis', weight: 7 },
    ],
  },
  methods: {
    handleClick() {
      
    }
  },
  mounted() {
    console.log('Mounted');
  },
  computed: {
    transformedName() {
      return `Mr. ${this.name.toUpperCase()}`;
    }
  }
});
