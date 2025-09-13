---
title: "Life Recordings"
permalink: /life/
author_profile: true
---

## My Life

<div class="photo-wall">
  <a href="/assets/images/life/1.jpg" data-lightbox="life" data-title="Meal 1">
    <img src="/assets/images/life/1.jpg" alt="Meal 1">
  </a>
  <a href="/assets/images/life/2.jpg" data-lightbox="life" data-title="Meal 2">
    <img src="/assets/images/life/2.jpg" alt="Meal 2">
  </a>
</div>

<style>
.photo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
}
.photo-wall img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
.photo-wall img:hover {
  transform: scale(1.05);
}
</style>

