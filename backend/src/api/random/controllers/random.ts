export default {
  async getRandom(ctx, next) {
    const getServerParams = strapi.config.get;
    const baseUrl = getServerParams('server.url') ?
      getServerParams('server.url')
      : `http://${getServerParams('server.host')}:${getServerParams('server.port')}`
    const catImages = await strapi.services['api::cat-image.cat-image'].find({
      populate: "image"
    });
    const quotes = await strapi.services['api::quote.quote'].find();

    const randomCatImage = catImages.results[Math.floor(Math.random() * catImages.results.length)];
    const randomQuote = quotes.results[Math.floor(Math.random() * quotes.results.length)];
    const catImageUrl = `${baseUrl}${randomCatImage.image.url}`;
    ctx.body = {
      catImage: catImageUrl,
      quote: randomQuote
    };
  }
}
