<template>
  <div class="container">
    <span>姓名：</span>
    <Input v-model="name"></Input>
    <span>更新了？ {{isUpdate}}</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '123',
        isUpdate: false,
      }
    },
    methods: {

    },
    beforeCreate() {console.log('beforeCreate')},
    created() {

      let a = x => x ? '1' : '2';
      console.log('a()', a());


      console.log('created')

      let person = {}
      Object.defineProperty(person, 'name', {
        value: '123',
        writable: true, // 是否可改变
        configrable: true, // 描述属性是否可配置/删除，默认false
      })
      person.name = 'jim'
      
      console.log('person', person)
    },
    beforeMount() {console.log('beforeMount')},
    mounted() {console.log('mounted')},
    beforeUpdate() {
      console.log('beforeUpdate')
    },
    updated() {
      console.log('updated')
      this.isUpdate = true;
    },
    beforeDistroy() {console.log('beforeDistroy')},
    distroyed() {console.log('distroyed')},
  }
</script>