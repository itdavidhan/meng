# （一）改写if else的几种方式

### 1.switch  
* 优点：
    - 结构更清晰
    - 提高程序效率
* 缺点：只能处理字符或者数字类型的变量，不如if else灵活  
* 示例：
    ```
    if(type == 1) {
      n = 'a';
    } else if(type == 2) {
      n = 'b';
    } else {
      n = 'c';
    }
    switch(type) {
      case 1:
        n = 'a';
        break;
      case 2:
        n = 'b';
        break;
      default:
        n = 'c';
        break;
    }
    ```

### 2.三元运算符  
* 优点：代码简化，更加清爽
* 缺点：复杂的三元运算符可读性较差，需友好注释  
* 示例：
    ```
    if(n>0) {
      a = 'b';
    } else {
      a = 'c';
    }
    a = n>0 ? 'b' : 'c';
    ```

### 3.逻辑判断 and(&&) or(||)  
* 原理：利用逻辑判断的短路运算来实现
* 优点：代码简化，更加清爽
* 缺点：适用于简单判断逻辑，复杂的判断运算可读性较差，需友好注释  
* 示例：
    ```
    if(cb) cb();
    cb && cb();
    ```

### 4.look-up  
* 原理：数据与业务逻辑分离
* 优点：便于维护，需求变化时只需修改数据，不必修改业务逻辑
* 缺点：只适用于if判断逻辑统一的情形
* 示例：
    ```
    function showGrade1(grade) {
      if(grade >= 100) {
        return '满分';
      } else if(grade >= 90) {
        return '优秀';
      } else if(grade >= 80) {
        return '良好';
      } else if(grade >= 60) {
        return '及格';
      } else {
        return '不及格';
      }
    }
    function showGrade2(grade) { 
      let gradeForLevel = [100, 90, 80, 60];
      let levelText = ['满分','优秀','良好','及格','不及格']; 
      gradeForLevel.forEach((item, index) => {
        if(grade >= item) {
          return levelText[index];
        }
      }); 
      return levelText[levelText.length-1]; 
    }
    ```
### 5.策略模式
* 原理：定义一系列的算法，把它们一个个封装起来，目的就是将算法的使用与算法的实现分离开来
* 优点：
    - 有效避免多重条件选择语句
    - 提供了对外开放封装原则的完美支持，将方法封装在独立的strategy中，使得它们易于切换、易于理解、易于扩展
    - 便于复用
* 缺点：
    - 增加了策略类/对象的使用
    - 使用策略模式，必须先了解所有的strategy，违反了最少知识原则
* 示例：
    ```
    <template>
      <div class="container">
        <Form :model="formData" ref="my-form" :rules="formValidate" :label-width="100">
          <FormItem label="姓名" prop="name">
            <Input v-model="formData.name"></Input> 
          </FormItem>
          <FormItem label="姓别">
            <RadioGroup v-model="formData.sex">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="出生日期" prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formData.date" @on-change="formData.date=$event"></DatePicker>
          </FormItem>
          <FormItem label="所在地" prop="area">
            <cityPicker @getCpData="getData" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit('my-form')">提交</Button>
          </FormItem>
        </Form>
      </div>
    </template>
    <script>
      import cityPicker from '@/components/tools/cityPicker'
      export default {
        components: {cityPicker},
        data() {
          return {
            formData: {
              name: '',
              sex: 'male',
              date: '',
              area: '',
            },
            formValidate: {
              name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
              date: [{ required: true, message: 'Please select time', trigger: 'change' }],
              area: [{ required: true, message: 'Please select area', trigger: 'change' }],
            }
          }
        },
        methods: {
          submit(name) {
            this.$refs[name].validate(valid => {
              if(valid) {
                this.$Modal.success({
                  title: '提示',
                  content: '保存成功！'
                });
              }
            });
            // if(this.formData.name.length == 0) {
            //   this.$Message.error('请输入姓名');
            // } else if(this.formData.date.length == 0) {
            //   this.$Message.error('请输入出生日期');
            // } else if(this.formData.area.length == 0) {
            //   this.$Message.error('请输入所在地');
            // } else {
            //   this.$Modal.success({
            //     title: '提示',
            //     content: '保存成功！'
            //   });
            // }
          },
          getData(o) {
            console.log('o', o);
            this.formData.area = o.prov_name + o.city_name + o.area_name;
          },
        }
      }
    </script>
    ```

=======================================================================

# （二）js的防抖节流  

#### 为什么要做防抖节流？  

*在进行窗口的resize、scroll，输入框内容校验等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少调用频率，同时又不影响实际效果。*

#### 防抖  

>对于短时间内连续触发的事件（如滚动事件），防抖的含义就是让某个时间期限内，事件处理函数只执行一次。
* 实现方式： 定时器

```
<script>
  // 使用jq
  let timer = null;
  $(window).on('scroll', function() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      // 要执行的代码
      ...
    }, 600);
  });
  // 使用vue & lodash
  fnName: _.debounce(function() {
    // 要执行的代码
    ...
  }, 600)
</script>
```
#### 节流  

>一般而言，使用防抖（debounce）已经能够满足我们的需求。但是，防抖本身也会产生一个问题，那就是在连续
>触发事件不间断时，我们的事件处理函数是不会执行的。这个时候，我们可以优化的地方是，即使用户不间断的触发
>事件（如滚动事件），我们也可以定期触发一次事件处理函数，这就是**节流**(throttle)。
* 实现方式：定时器 + 时间戳

```
let throttle = function(func, delay) {
  let prev = Date.now();
  let vm = this;
  return function() {
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      func.apply(vm, args);
      prev = Date.now();
    }
  }
}
function handle() {
  // 要执行的代码
  ...
}
window.addEventListener('scroll', throttle(handle, 1000));
// 使用vue & lodash
fnName: _.throttle(function() {
// 要执行的代码
...
}, 1000),
```