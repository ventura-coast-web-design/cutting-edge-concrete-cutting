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

  // Add global data for service areas
  eleventyConfig.addGlobalData("serviceAreas", function() {
    const serviceAreasData = require("./src/_data/serviceAreas.json");
    const serviceAreas = [];
    
    serviceAreasData.forEach(area => {
      // Add county page
      serviceAreas.push({
        title: area.meta.title,
        description: area.meta.description,
        url: `/service-areas/${area.slug}/`,
        data: {
          ...area,
          type: 'county'
        }
      });
      
      // Add city pages
      area.serviceArea.forEach(city => {
        const citySlug = city.toLowerCase().replace(/\s+/g, '-');
        serviceAreas.push({
          title: `Concrete Cutting in ${city} — Cutting Edge Concrete`,
          description: `Professional concrete cutting, sawing and coring services in ${city}, ${area.county}. Fast, reliable, and experienced.`,
          url: `/service-areas/${area.slug}/${citySlug}/`,
          data: {
            ...area,
            city: city,
            citySlug: citySlug,
            type: 'city'
          }
        });
      });
    });
    
    return serviceAreas;
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