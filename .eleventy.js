const sass = require("sass");

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