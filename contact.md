---
layout: default
title: "Contact Us"
description: "Get in touch with Travel with Kota for your Bhutan adventure. We're here to help plan your perfect trip."
---

<h1 class="page-title">Contact Us</h1>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
    <div>
        <h3>Get in Touch</h3>
        <p>Ready to explore Bhutan? We'd love to help you plan your perfect adventure. Reach out to us and let's start planning your journey to the Last Shangri-La.</p>
        
        <div style="margin-top: 2rem;">
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> info@travelwithkota.com</p>
            <p><strong>Phone:</strong> +975 XXX XXXXX</p>
            <p><strong>Address:</strong> Thimphu, Bhutan</p>
        </div>
        
        <div style="margin-top: 2rem;">
            <h4>Why Choose Travel with Kota?</h4>
            <ul>
                <li>Local expertise and authentic experiences</li>
                <li>Personalized itineraries</li>
                <li>Sustainable tourism practices</li>
                <li>24/7 support during your trip</li>
            </ul>
        </div>
    </div>

    <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone">
        </div>

        <div class="form-group">
            <label for="country">Country</label>
            <input type="text" id="country" name="country">
        </div>

        <div class="form-group">
            <label for="travel-dates">Preferred Travel Dates</label>
            <input type="text" id="travel-dates" name="travel_dates" placeholder="e.g., March 2024">
        </div>

        <div class="form-group">
            <label for="group-size">Group Size</label>
            <select id="group-size" name="group_size">
                <option value="">Select group size</option>
                <option value="1-2">1-2 people</option>
                <option value="3-4">3-4 people</option>
                <option value="5-8">5-8 people</option>
                <option value="9+">9+ people</option>
            </select>
        </div>

        <div class="form-group">
            <label for="interests">Interests/Activities</label>
            <select id="interests" name="interests" multiple>
                <option value="culture">Cultural Sites</option>
                <option value="trekking">Trekking</option>
                <option value="festivals">Festivals</option>
                <option value="nature">Nature/Wildlife</option>
                <option value="photography">Photography</option>
                <option value="spirituality">Spirituality</option>
            </select>
        </div>

        <div class="form-group">
            <label for="message">Tell us about your dream Bhutan trip *</label>
            <textarea id="message" name="message" required placeholder="What would you like to experience in Bhutan? Any special requirements or questions?"></textarea>
        </div>

        <button type="submit" class="submit-button">Send Message</button>
    </form>
</div>
