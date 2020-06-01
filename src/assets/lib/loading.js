const loading = {
  methods: {
    setLoading() {
      let loaderWrapper = document.createElement("div");
      loaderWrapper.setAttribute("id", "loader-wrapper");
      let loader = document.createElement("div");
      let loadingBar = document.createElement("div");
      let loaderSpan = document.createElement("span");
      loader.setAttribute("class", "loader");
      loadingBar.setAttribute("class", "loading-bar");
      let logo = document.createElement("div");
      logo.setAttribute("class", "logo");
      let logoImg = document.createElement("img");
      logoImg.setAttribute("src", "favicon.ico");
      let websiteTitle = document.createElement("div");
      websiteTitle.setAttribute("class", "website_title");
      // let copyright = document.createElement("div");
      // copyright.setAttribute("class", "copyright");
      // let copyrightContent = document.createTextNode(
      //   "Copyright © 2003-2020 Bocon. All Rights Reserved."
      // );
      let websiteTitleContent = document.createTextNode("正在加载智维云");
      logo.appendChild(logoImg);
      // copyright.appendChild(copyrightContent);
      websiteTitle.appendChild(websiteTitleContent);
      // loaderWrapper.appendChild(copyright);
      loaderWrapper.appendChild(websiteTitle);
      loader.appendChild(loadingBar);
      loadingBar.appendChild(loaderSpan);
      loaderWrapper.appendChild(loader);
      loaderWrapper.appendChild(logo);
      document.getElementById("app").appendChild(loaderWrapper);
    },
    removeLoading() {
      if (document.getElementById("loader-wrapper")) {
        document
          .getElementById("app")
          .removeChild(document.getElementById("loader-wrapper"));
      }
    }
  }
};

export default loading;
