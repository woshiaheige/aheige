const event = {
  methods: {
    onSubmit() {
      this.pagesize = 10; //每页数量
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
      console.log(_, size);
      this.current = 1;
      this.pagesize = size;
      this.getTableData();
    }
  }
};
export default event;
