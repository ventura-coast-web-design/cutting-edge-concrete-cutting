const serviceAreasData = require('./_data/serviceAreas.json');

module.exports = function(eleventyConfig) {
  // Generate service area pages
  eleventyConfig.addCollection("serviceAreas", function(collectionApi) {
    const pages = [];
    
    serviceAreasData.forEach(area => {
      // County page
      pages.push({
        title: area.meta.title,
        description: area.meta.description,
        url: `/service-areas/${area.slug}/`,
        data: {
          ...area,
          type: 'county',
          layout: 'base.njk'
        }
      });
      
      // City pages
      area.serviceArea.forEach(city => {
        const citySlug = city.toLowerCase().replace(/\s+/g, '-');
        pages.push({
          title: `Concrete Cutting in ${city} — Cutting Edge Concrete`,
          description: `Professional concrete cutting, sawing and coring services in ${city}, ${area.county}. Fast, reliable, and experienced.`,
          url: `/service-areas/${area.slug}/${citySlug}/`,
          data: {
            ...area,
            city: city,
            citySlug: citySlug,
            type: 'city',
            layout: 'base.njk'
          }
        });
      });
    });
    
    return pages;
  });
};
