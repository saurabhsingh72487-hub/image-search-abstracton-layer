# Image Search Abstraction Layer

A full-stack JavaScript API project built for the freeCodeCamp Back End Development and APIs certification.

Live Demo: https://image-search-abstracton-layer.onrender.com/

## Features

- Search images by keyword
- Get image URLs, descriptions, and source page URLs
- Paginate results using `?page=`
- View recently searched terms
- Stores recent searches in MongoDB

## API Endpoints

### Search Images

```txt
GET /query/:searchTerm?page=2
