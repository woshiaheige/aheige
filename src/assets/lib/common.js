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
    debounces(func, wait = 500) {
      //节流
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
      };
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input.toLowerCase()) >=
        0
      );
    }
  }
};
export default event;
