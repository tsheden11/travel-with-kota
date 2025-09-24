const Airtable = require('airtable');
const fs = require('fs');

// Initialize Airtable
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BASE_ID);

// Utility function to clean text for HTML
function cleanText(text) {
  return text ? text.replace(/"/g, '\\"').replace(/\n/g, '\\n') : '';
}

// Sync Destinations Page
async function syncDestinations() {
  console.log('Syncing destinations...');
  const destinations = [];
  
  try {
    await base('Destinations').select({
      filterByFormula: "{Status} = 'Published'",
      sort: [{field: "Name", direction: "asc"}]
    }).eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const fields = record.fields;
        destinations.push({
          name: fields.Name || 'Unnamed Destination',
          emoji: fields.Emoji || '🏔️',
          subtitle: fields.Subtitle || '',
          description: fields.Description || 'No description available',
          duration: fields.Duration || 'Duration not specified',
          bestTime: fields['Best Time'] || 'Year-round',
          highlights: (fields.Highlights || []).join(', ')
        });
      });
      fetchNextPage();
    });

    // Generate destinations.md file
    const destinationsContent = `---
layout: default
title: Destinations
---

<div class="container">
  <h1>Our Destinations</h1>
  <p>Explore the most beautiful and culturally rich destinations in Bhutan with our expertly guided tours.</p>

  <div class="destination-grid">
${destinations.map(dest => `    <div class="destination-card">
      <h3>${dest.emoji} ${dest.name}</h3>
      <p><strong>${dest.subtitle}</strong></p>
      <p>${dest.description}</p>
      <ul>
        <li>Duration: ${dest.duration}</li>
        <li>Best time: ${dest.bestTime}</li>
        <li>Highlights: ${dest.highlights}</li>
      </ul>
    </div>`).join('\n')}
  </div>

  <section style="margin-top: 3rem;">
    <h2>Planning Your Journey</h2>
    <p>Each destination offers unique experiences and can be combined into comprehensive itineraries. Contact us to create a personalized travel plan that matches your interests and time frame.</p>
    <a href="{{ '/contact' | relative_url }}" class="btn-primary">Plan Your Trip</a>
  </section>
</div>`;

    fs.writeFileSync('destinations.md', destinationsContent);
    console.log(`✅ Destinations page updated with ${destinations.length} destinations`);
    
  } catch (error) {
    console.error('❌ Error syncing destinations:', error);
    throw error;
  }
}

// Sync Packages Page
async function syncPackages() {
  console.log('Syncing packages...');
  const packages = [];
  
  try {
    await base('Packages').select({
      filterByFormula: "{Status} = 'Published'",
      sort: [{field: "Duration", direction: "asc"}]
    }).eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const fields = record.fields;
        packages.push({
          name: fields['Package Name'] || 'Unnamed Package',
          duration: fields.Duration || 0,
          price: fields.Price || 0,
          description: fields.Description || 'No description available',
          inclusions: fields.Inclusions || [],
          highlights: fields.Highlights || []
        });
      });
      fetchNextPage();
    });

    // Generate packages.md file
    const packagesContent = `---
layout: default
title: Travel Packages
---

<div class="container">
  <h1>Travel Packages</h1>
  <p>Carefully curated travel packages designed to showcase the best of Bhutan. All packages include accommodation, meals, transportation, and expert local guides.</p>

  <div class="destination-grid">
${packages.map(pkg => `    <div class="destination-card">
      <h3>${pkg.name}</h3>
      <p><strong>${pkg.duration} Days - $${pkg.price}</strong></p>
      <p>${pkg.description}</p>
      ${pkg.inclusions.length > 0 ? `<h4>Included:</h4>
      <ul>
${pkg.inclusions.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>` : ''}
      <a href="{{ '/contact' | relative_url }}" class="btn-primary">Book Now</a>
    </div>`).join('\n')}
  </div>
</div>`;

    fs.writeFileSync('packages.md', packagesContent);
    console.log(`✅ Packages page updated with ${packages.length} packages`);
    
  } catch (error) {
    console.error('❌ Error syncing packages:', error);
    throw error;
  }
}

// Sync About Page
async function syncAbout() {
  console.log('Syncing about page...');
  const aboutSections = [];
  
  try {
    await base('About Content').select({
      filterByFormula: "{Status} = 'Published'",
      sort: [{field: "Order", direction: "asc"}]
    }).eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const fields = record.fields;
        aboutSections.push({
          section: fields.Section || 'Untitled Section',
          content: fields.Content || 'No content available'
        });
      });
      fetchNextPage();
    });

    // Generate about.md file
    const aboutContent = `---
layout: default
title: About Us
---

<div class="container">
  <h1>About Travel with Kota</h1>
  
${aboutSections.map(section => `  <section style="margin: 2rem 0;">
    <h2>${section.section}</h2>
    <p>${section.content}</p>
  </section>`).join('\n')}

  <section style="margin: 3rem 0;">
    <h2>Ready to Explore Bhutan?</h2>
    <p>Contact us today to start planning your unforgettable journey to the Last Shangri-La.</p>
    <a href="{{ '/contact' | relative_url }}" class="btn-primary">Get in Touch</a>
  </section>
</div>`;

    fs.writeFileSync('about.md', aboutContent);
    console.log(`✅ About page updated with ${aboutSections.length} sections`);
    
  } catch (error) {
    console.error('❌ Error syncing about page:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Airtable sync...');
    
    // Check if environment variables exist
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      throw new Error('Missing required environment variables: AIRTABLE_API_KEY and AIRTABLE_BASE_ID');
    }
    
    await syncDestinations();
    await syncPackages();
    await syncAbout();
    
    console.log('✅ All content synced successfully!');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
main();
