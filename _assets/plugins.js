options.dependencies = options.dependencies || [];

options.dependencies.push(
  // https://github.com/naamor/reveal.js-tableofcontents
  {
    src: window.location.href.includes("vvscode")
      ? "../_assets/plugins/tableofcontents.js"
      : "_assets/plugins/tableofcontents.js",
  }
);
