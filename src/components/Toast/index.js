
 var Toast = {};
 var showToast = false, // 存储toast显示状态
   showLoad = false, // 存储loading显示状态
   toastVM = null, // 存储toast vm
   loadNode = null; // 存储loading节点元素
  
 Toast.install = function (Vue, options) {
   // 参数
   var opt = {
    direction: 'top',
     type:'success',
     duration: '2500',
     wordWrap: false
   };
   for (var property in options) {
     opt[property] = options[property];
   }
  
   Vue.prototype.$toast = function (config) {
      var curType = config.direction ? config.direction : opt.direction;
      var msgType = config.type ? config.type : opt.type;
      var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
      var tips = '';
      if(typeof config == 'string') {
        tips = config;
      }else {
        tips = config.tips; 
      }
      var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
      var tmp = '<div v-show="show" class="lx-toast lx-toast-'+curType+' '+msgType +' ' + wordWrap + '" ' + style + '>{{tip}}</div>';
     if (showToast) {
       // 如果toast还在，则不再执行
       return;
     }
    //  if (!toastVM) {
    //    var toastTpl = Vue.extend({
    //      data: function () {
    //        return {
    //          show: showToast,
    //          tip: tips,
    //          type: 'lx-toast-' + curType
    //        }
    //      },
    //      template: tmp
    //    });
    //    toastVM = new toastTpl()
    //    var tpl = toastVM.$mount().$el;
    //    document.body.appendChild(tpl);
    //  }
    var toastTpl = Vue.extend({
      data: function () {
        return {
          show: showToast,
          tip: tips,
          type: 'lx-toast-' + curType
        }
      },
      template: tmp
    });
    toastVM = new toastTpl()
    var tpl = toastVM.$mount().$el;
    document.body.appendChild(tpl);


     toastVM.type = 'lx-toast-' + curType+' '+msgType;
     toastVM.tip = tips;
     toastVM.show = showToast = true;
  
     setTimeout(function () {
       toastVM.show = showToast = false;
     }, opt.duration)
   };
  
   ['success', 'warning', 'error'].forEach(function (type) {
     Vue.prototype.$toast[type] = function (data) {
       let config = {}
      if(typeof data == 'string') {
        config.tips = data;
      }else {
        config = data
      }
      config.type = type;
      return Vue.prototype.$toast(config, type)
     }
   });
  
   Vue.prototype.$loading = function (tips, type) {
     if (type == 'close') {
       loadNode.show = showLoad = false;
     } else {
       if (showLoad) {
         // 如果loading还在，则不再执行
         return;
       }
       var loadTpl = Vue.extend({
         data: function () {
           return {
             show: showLoad
           }
         },
         template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'
       });
       loadNode = new loadTpl();
       var tpl = loadNode.$mount().$el;
  
       document.body.appendChild(tpl);
       loadNode.show = showLoad = true;
     }
   };
  
   ['open', 'close'].forEach(function (type) {
     Vue.prototype.$loading[type] = function (tips) {
       return Vue.prototype.$loading(tips, type)
     }
   });
 }
 module.exports = Toast;
 