const event = {
  methods: {
    onSubmit() {
      this.current = 1; //页码
      this.getTableData();
    },
    pagechange(page) {
      //页码
      this.current = page;
      this.getTableData();
    },
    sizechange(_, pageSize) {
      //页数
      this.current = 1;
      this.pageSize = pageSize;
      this.getTableData();
    },
    debounceFn(fn, delay = 500) {
      //节流
      var timer = null;
      return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    },
    //下拉框过滤
    filterOptions(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input.toLowerCase()) >=
        0
      );
    }
  }
};
export default event;
