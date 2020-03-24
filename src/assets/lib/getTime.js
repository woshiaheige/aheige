const time = {
  todayBeginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
  todayEndTime: new Date(
    new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000
  ),
  yesterdayBeginTime: new Date(
    new Date(new Date().toLocaleDateString()).getTime() - 24 * 3600 * 1000
  ),
  yesterdayEndTime: new Date(
    new Date(new Date().toLocaleDateString()).getTime()
  ),
  presentTime: new Date().getTime(), //现在
  oneHourBefore: new Date(new Date().getTime() - 3600 * 1000).getTime(), //现在
  yesterday: new Date(new Date().getTime() - 24 * 3600 * 1000).getTime(), //昨天
  lastWeek: new Date(new Date().getTime() - 6 * 24 * 3600 * 1000).getTime(), //上周
  lastMonth: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000).getTime(), //上个月

  refresh() {
    this.presentTime = new Date().getTime(); //现在
    this.oneHourBefore = new Date(this.presentTime - 3600 * 1000).getTime(); //现在
    this.yesterday = new Date(this.presentTime - 24 * 3600 * 1000).getTime(); //现在
    this.lastWeek = new Date(this.presentTime - 6 * 24 * 3600 * 1000).getTime(); //现在
    this.lastMonth = new Date(
      this.presentTime - 30 * 24 * 3600 * 1000
    ).getTime(); //现在
  }
};

export default time;
