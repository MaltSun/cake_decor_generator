export function calculateTagProbabilities(tagWeights) {
  const result = {};
  for (const [tag, weight] of Object.entries(tagWeights)) {
    result[tag] = (weight + 1) / 2; // преобразуем в вероятность
  }
  return result;
}

export function recommendCakes(cakes, tagProbabilities) {
  const cakeScores = {};
  cakes.forEach(cake => {
    let score = 0;
    cake.tags.forEach(tag => {
      if (tagProbabilities[tag]) score += tagProbabilities[tag];
    });
    cakeScores[cake.id] = score / cake.tags.length;
  });

  const topCakes = Object.entries(cakeScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => cakes.find(c => c.id === parseInt(id)));

  return topCakes;
}
