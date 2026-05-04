const express = require("express");
const axios = require("axios");
const Search = require("../models/Search");

const router = express.Router();

router.get("/query/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const page = req.query.page || 1;

    await Search.create({ term: searchTerm });

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchTerm,
        page,
        per_page: 10
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const results = response.data.results.map((image) => ({
      imageUrl: image.urls.regular,
      description: image.alt_description || image.description || "No description",
      pageUrl: image.links.html
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: "Image search failed"
    });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const recentSearches = await Search.find()
      .sort({ when: -1 })
      .limit(10)
      .select("-_id term when");

    res.json(recentSearches);
  } catch (error) {
    res.status(500).json({
      error: "Could not get recent searches"
    });
  }
});

module.exports = router;