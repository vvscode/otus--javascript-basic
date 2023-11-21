/**
 * Originally it's
 *
 * reveal.js table of contents plugin
 *
 * A plugin which generates automatically a table of contents slide.
 *
 * Demo https://naamor.github.io/reveal.js-tableofcontents/
 *
 * MIT License
 * Copyright (c) 2018 Roman Stocker
 *
 * Modified in 2023 by @vvscod as it doesn't support markdown
 * https://github.com/naamor/reveal.js-tableofcontents/issues/2
 */

var RevealTableOfContents =
  window.RevealTableOfContents ||
  (() => {
    // Set all option defaults
    const options = Reveal.getConfig().tableofcontents || {};
    const titleTag = options.titleTag || "h1";
    let titleTagSelector = ["h1", "h2", "h3", "h4", "h5", "h6"];
    let title = options.title || "Table of Contents";
    const position = options.position || 2;
    const fadeInElements = options.fadeInElements || false;

    let ignoreFirstSlide = options.ignoreFirstSlide;
    if (typeof ignoreFirstSlide === "undefined") ignoreFirstSlide = true;

    initialize();

    function initialize() {
      if (typeof options.titleTagSelector === "string") {
        titleTagSelector = options.titleTagSelector
          .split(",")
          .map((item) => item.trim());
      }

      generateTableOfContentsSlide();
    }

    function generateTableOfContentsSlide() {
      const slides = document.getElementsByClassName("slides")[0];

      const section = document.createElement("section");
      section.className = "table-of-contents";

      const heading = document.createElement(titleTag);
      heading.innerText = title;
      section.appendChild(heading);

      const list = generateList();
      section.appendChild(list);

      // Subtract by one because index starts with zero
      const slideAfter = slides.children[position - 1];

      // Check if there are enough slides for the configured table of contents slide position
      // or set the table of contents slide automatically after the last slide
      if (slideAfter !== undefined) {
        slides.insertBefore(section, slideAfter);
      } else {
        slides.appendChild(section);
      }
    }

    // Generate list with the title of each slide
    function generateList() {
      const slides = Reveal.getSlides();

      const ul = document.createElement("ul");

      let counter = 0;

      // Ignore first slide with counter 0
      if (ignoreFirstSlide) {
        counter++;
      }

      for (counter; counter < slides.length; counter++) {
        const title = getTitle(slides[counter]);

        if (title !== undefined) {
          const li = document.createElement("li");

          // Add attributes for use reveal.js fragment functionality
          if (fadeInElements) {
            li.className = "fragment";
            li.setAttribute("data-fragment-index", counter);
          }

          li.innerHTML = title;

          ul.appendChild(li);
        }
      }

      return ul;
    }

    // Select the text of the most important heading tag of every slide
    function getTitle({ childNodes }) {
      return (title = Array.from(childNodes)
        .filter(getSlideTitle)
        .map(getSlideTitle)[0]);
    }

    // Filter tags based on options
    function getSlideTitle(element) {
      const { tagName, textContent } = element;
      if (tagName === undefined) {
        return false;
      }

      const originalTitle =
        titleTagSelector.includes(tagName.toLowerCase()) && textContent;

      if (originalTitle) {
        return originalTitle;
      }
      if (element.matches('script[type="text/template"]')) {
        const markdownLinksRegexp = /\[(.*?)\]\((.*?)\)/g;
        return (
          element.innerHTML
            .trim()
            .split("\n")
            .filter((line) => line.trim().startsWith("#"))
            .map((line) => line.replaceAll("#", "").trim())
            .map((line) => line.replace(markdownLinksRegexp, ""))
            .join(". ") || undefined
        );
      }
    }
  })();
