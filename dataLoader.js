import { Cake, DecorElements } from "./models.js";

export async function loadCakes(filePath) {
  const response = await fetch(filePath);
  const cakes = await response.json();
  return cakes.map(cake => new Cake(cake.id, cake.tags, cake.photo));
}

export async function loadDecorElements(filePath) {
  const response = await fetch(filePath);
  const elements = await response.json();
  return elements.map(
    el => new DecorElements(el.question, el.tag, el.index)
  );
}
