<template>
  <div id="app">
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" :active-name="activeIndex">
                    <div class="layout-logo">m e n g ❤ v u e</div>
                    <div class="layout-nav">
                        <MenuItem name="home" to="/home">
                            <Icon type="ios-navigate"></Icon>
                            例子
                        </MenuItem>
                        <MenuItem name="components" to="/components">
                            <Icon type="ios-keypad"></Icon>
                            组件 
                        </MenuItem>
                        <!-- <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem> -->
                    </div>
                </Menu>
            </Header>
            <Layout>
                 <router-view />
            </Layout>
        </Layout>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      activeIndex: this.$route.meta.active
    }
  },
  created() {
    console.log('this.$route', this.$route)

    // window.onload = function() {  
    //   console.log(666, document.getElementsByTagName("body")[0])
    //   document.getElementsByTagName("body")[0].onkeydown =function(){  
            
    //       //获取事件对象  
    //       var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;   
            
    //       if(event.keyCode==8){//判断按键为backSpace键  
            
    //               //获取按键按下时光标做指向的element  
    //               var elem = event.srcElement || event.currentTarget;   
                    
    //               //判断是否需要阻止按下键盘的事件默认传递  
    //               var name = elem.nodeName;  
                    
    //               if(name!='INPUT' && name!='TEXTAREA'){  
    //                   return _stopIt(event);  
    //               }  
    //               var type_e = elem.type.toUpperCase();  
    //               if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){  
    //                       return _stopIt(event);  
    //               }  
    //               if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){  
    //                       return _stopIt(event);  
    //               }  
    //           }  
    //       }  
    // }  
    // function _stopIt(e){  
    //         if(e.returnValue){  
    //             e.returnValue = false ;  
    //         }  
    //         if(e.preventDefault ){  
    //             e.preventDefault();  
    //         }                 
      
    //         return false;  
    // }  
  },
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;

  .layout{
      height: 100%;
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      .ivu-layout {
          height: 100%;
      }
      .ivu-layout-header {
          background-color: orange;
          .ivu-menu-light {
              background: transparent;
              .ivu-menu-item {
                  font-size: 16px;
                  color: #fff;
              }
              .ivu-menu-item-active {
                  color: #2d8cf0;
              }
              &:after {
                  background: transparent;
              }
          }
      }
  }
  .layout-logo{
      width: 100px;
      height: 30px;
      border-radius: 3px;
      float: left;
      color: #2d8cf0
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
  }
}

</style>
