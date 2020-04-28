// import $ from "jquery";
export default {
  showIframe(url) {
    let container, iframe;
    container =
      "<div id='showMobilePreview'>" +
      "<div class='mobile_preview_header'><i class='mobile_preview_header_icon'></i></div>" +
      "<div class='mobile_preview_frame'><iframe id='YuFrameMobilePreview' name='YuFrameMobilePreview' ></iframe></div>" +
      "<div class='mobile_preview_footer'><i class='mobile_preview_footer_icon'></i></div>" +
      "</div>";
    document
      .querySelector(".editor-wrappper")
      .insertAdjacentHTML("afterbegin", container); //插入模态框
    iframe = document.querySelector("#YuFrameMobilePreview");
    iframe.src = url;

    document
      .querySelector(".mobile_preview_footer")
      .addEventListener("click", function() {
        //移除dom
        let wrapper = document.querySelector(".editor-wrappper");
        let iframe = document.querySelector("#showMobilePreview");
        wrapper.removeChild(iframe);
      });
  },

  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  watch: {
    content(nval) {
      var pDoc = document.querySelector("#YuFrameMobilePreview").contentWindow
        .document;
      console.log(nval, 555);
      pDoc.body.innerHTML = nval;
    }
  },
  methods: {
    initButton() {
      //在使用的页面中初始化按钮样式
      const sourceEditorButton = document.querySelector(".ql-pervMobile");
      console.log(sourceEditorButton);
      sourceEditorButton.style.cssText =
        "width:80px; border:1px solid #ccc; border-radius:5px;";
      sourceEditorButton.innerText = "预览";

      //这里也可以直接引用矢量图
      //像我开发的项目用的是element-ui框架，我直接用下面的方法去初始化样式
      // sourceEditorButton.classList.add("el-icon-edit-outline");
      // sourceEditorButton.title = "源码编辑";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initButton();
    });
  }
};
