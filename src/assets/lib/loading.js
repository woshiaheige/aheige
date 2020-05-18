const loading = {
  methods: {
    setLoading() {
      let loaderWrapper = document.createElement("div");
      loaderWrapper.setAttribute("id", "loader-wrapper");
      let loader = document.createElement("div");
      loader.setAttribute("id", "loader");
      let loaderSectionLeft = document.createElement("div");
      loaderSectionLeft.setAttribute("class", "loader-section section-left");
      let loaderSectionRight = document.createElement("div");
      loaderSectionRight.setAttribute("class", "loader-section section-right");
      let logo = document.createElement("div");
      logo.setAttribute("class", "logo");
      let logoImg = document.createElement("img");
      logoImg.setAttribute("src", "img/logo.png");
      let websiteTitle = document.createElement("div");
      websiteTitle.setAttribute("class", "website_title");
      // let copyright = document.createElement("div");
      // copyright.setAttribute("class", "copyright");
      // let copyrightContent = document.createTextNode(
      //   "Copyright © 2003-2020 Bocon. All Rights Reserved."
      // );
      let websiteTitleContent = document.createTextNode("博控智维云");
      logo.appendChild(logoImg);
      // copyright.appendChild(copyrightContent);
      websiteTitle.appendChild(websiteTitleContent);
      // loaderWrapper.appendChild(copyright);
      loaderWrapper.appendChild(websiteTitle);
      loaderWrapper.appendChild(loader);
      loaderWrapper.appendChild(loaderSectionLeft);
      loaderWrapper.appendChild(loaderSectionRight);
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
