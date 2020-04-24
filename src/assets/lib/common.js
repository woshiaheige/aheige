const event = {
  methods: {
    onSubmit() {
      this.size = 10; //每页数量
      this.current = 1; //页码
      this.getTableData();
    },
    pagechange(page) {
      //页码
      this.current = page;
      this.getTableData();
    },
    sizechange(_, size) {
      //页数
      this.current = 1;
      this.size = size;
      this.getTableData();
    },
    debounceFn(func, wait = 500) {
      //节流
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
      };
    }
  }
};
export default event;
