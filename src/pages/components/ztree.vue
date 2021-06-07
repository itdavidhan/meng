<template>
  <div class="container">
    <!--使用ztree-->
    <ul id="treeDemo" class="ztree"></ul>
    <el-tree :data="data" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <a href="javascript:;" @click="append(data)">Append</a>
          <el-button
            type="text"
            size="mini"
            @click="remove(node, data)"> Delete </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
  import '../../plugins/ztree/js/jquery-1.4.4.min.js'
  import '../../plugins/ztree/js/jquery.ztree.core.min.js'
  import '../../plugins/ztree/js/jquery.ztree.excheck.min.js'
  import '../../plugins/ztree/js/jquery.ztree.exedit.min.js'
  import '../../plugins/ztree/css/zTreeStyle.css'

  let id = 1000;
  export default {
    data() {
      return {
        data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],


        newCount: 1,
        setting: {
          view: {
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: false
          },
          edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: this.showRemoveBtn,
            showRenameBtn: this.showRenameBtn
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            // beforeDrag: beforeDrag,
            // beforeEditName: beforeEditName,
            // beforeRemove: beforeRemove,
            // beforeRename: beforeRename,
            // onRemove: onRemove,
            // onRename: onRename
          }
        },
        zNodes: [
          { id:1, pId:0, name:"父节点 1", open:true},
          { id:11, pId:1, name:"叶子节点 1-1"},
          { id:12, pId:1, name:"叶子节点 1-2"},
          { id:13, pId:1, name:"叶子节点 1-3"},
          { id:2, pId:0, name:"父节点 2", open:true},
          { id:21, pId:2, name:"叶子节点 2-1"},
          { id:22, pId:2, name:"叶子节点 2-2"},
          { id:23, pId:2, name:"叶子节点 2-3"},
          { id:3, pId:0, name:"父节点 3", open:true},
          { id:31, pId:3, name:"叶子节点 3-1"},
          { id:32, pId:3, name:"叶子节点 3-2"},
          { id:33, pId:3, name:"叶子节点 3-3"}
        ]
      }
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },




      addHoverDom(treeId, treeNode) {
        let vm = this;
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
          + "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          zTree.addNodes(treeNode, {id:(100 + vm.newCount), pId:treeNode.id, name:"new node" + (vm.newCount++)});
          return false;
        });
      },
      removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
      },
      showRemoveBtn(treeId, treeNode) {
        return !treeNode.isFirstNode;
      },
      showRenameBtn(treeId, treeNode) {
        return !treeNode.isLastNode;
      },
    },
    mounted() {
      console.log('$', $.fn)
      $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes).expandAll(true);
    },
  }
</script>
