const loading = {
  methods: {
    setLoading(text) {
      let loaderWrapper = document.createElement("div");
      loaderWrapper.setAttribute("id", "loader-wrapper");
      let loader = document.createElement("div");
      loader.setAttribute("id", "loader");
      let loaderSectionLeft = document.createElement("div");
      loaderSectionLeft.setAttribute("class", "loader-section section-left");
      let loaderSectionRight = document.createElement("div");
      loaderSectionRight.setAttribute("class", "loader-section section-right");
      let loadTitle = document.createElement("div");
      loadTitle.setAttribute("class", "load_title");
      let loadTitleContent = document.createTextNode(text);
      loadTitle.appendChild(loadTitleContent);
      loaderWrapper.appendChild(loader);
      loaderWrapper.appendChild(loaderSectionLeft);
      loaderWrapper.appendChild(loaderSectionRight);
      loaderWrapper.appendChild(loadTitle);
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
