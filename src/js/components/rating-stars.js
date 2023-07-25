export const ratingStarsMarkup = rating => {
  return `
  <div class="rating-container">
    <div class="star-empty"></div>
    <div style=" width:${rating}%;"  class="star-full"></div>
  </div>`;
};
