const sass = require("sass");
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, sizes = "(min-width: 1024px) 800px, 100vw", loading = "lazy") {
  const metadata = await Image(src, {
    widths: [400, 800, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/assets/optimized/",
    urlPath: "/assets/optimized/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  const imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/css");

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("./src/css/main.css");

  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    if (format === "yyyy") {
      return d.getFullYear().toString();
    }
    return d.toLocaleDateString();
  });

  // Add current year filter
  eleventyConfig.addFilter("currentYear", function() {
    return new Date().getFullYear().toString();
  });

  // Add responsive image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Add collection for counties
  eleventyConfig.addCollection("counties", function(collectionApi) {
    const serviceAreasData = require("./src/_data/serviceAreas.json");
    return serviceAreasData.map(county => ({
      ...county,
      url: `/service-areas/${county.slug}/`
    }));
  });

  // Add collection for all cities
  eleventyConfig.addCollection("cities", function(collectionApi) {
    const serviceAreasData = require("./src/_data/serviceAreas.json");
    const cities = [];
    
    serviceAreasData.forEach(county => {
      county.serviceArea.forEach(city => {
        cities.push({
          ...city,
          county: county,
          url: `/service-areas/${county.slug}/${city.slug}/`
        });
      });
    });
    
    return cities;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}; 