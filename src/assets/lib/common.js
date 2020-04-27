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
    sizechange(_, size) {
      //页数
      this.current = 1;
      this.size = size;
      this.getTableData();
    },

    //下拉框过滤
    filterOptions(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0;
    }
  }
};
export default event;
