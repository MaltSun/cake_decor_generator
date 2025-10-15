export function generatePrompts(topTags) {
  const prompts = [];
  for (let i = 0; i < 5; i++) {
    prompts.push(`Сгенерируй торт с декором: ${topTags.join(", ")}`);
  }
  return prompts;
}
