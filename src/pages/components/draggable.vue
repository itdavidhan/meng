<template>
  <div class="container">
    <div class="prepare">
      <h3>前期准备</h3>
      <p>yarn add vuedraggable</p>
      <p>or</p>
      <p>npm i -S vuedraggable</p>
    </div>
    <div class="stage">
      <h3>拖拽展示</h3>
      <draggable
        class="img-list"
        tag="ul"
        v-model="imgList"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            class="list-group-item"
            v-for="element in imgList"
            :key="element.order"
          >
            <img :src="element.name">
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  const imgHref = [
    '//img.alicdn.com/i2/2/TB1gOvrmZLJ8KJjy0FnXXcFDpXa?abtest=&pos=19&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB19rJeHNjaK1RjSZFAXXbdLFXa?abtest=&pos=18&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/T25cAwXGhXXXXXXXXX-1785908005.jpg_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1R1K4GFmWBuNjSspdSuvugXXa.jpg_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1A9Eicf5TBuNjSspmXXaDRVXa?abtest=&pos=15&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1ytKieRWD3KVjSZKPXXap7FXa?abtest=&pos=14&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1sM7GSXXXXXb3aXXXXXXXXXXX?abtest=&pos=13&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1nJxqJXXXXXchapXXSutbFXXX.jpg_125x125q100.jpg_.webp',
    '//img.alicdn.com/i2/2/TB1_kq7j1SSBuNjy0FlXXbBpVXa?abtest=&pos=11&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_125x125q100.jpg_.webp',
  ]
  export default {
    data() {
      return {
        imgList: imgHref.map((name, index)=>{
          return { name, order: index + 1 };
        }),
        drag: false,
      }
    },
    components: {
      draggable
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .img-list {
      width: 330px;
      height: 330px;
      span {
        display: flex;
        flex-wrap: wrap;
        width: 330px;
        height: 330px;
      }
      li {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        margin-right: 10px;
        padding: 10px;
        border: 1px solid #DDD;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>