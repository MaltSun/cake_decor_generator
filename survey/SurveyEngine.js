import fs from 'fs';

export default class SurveyEngine {
  constructor(jsonPath) {
    this.questions = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    this.answers = [];
  }

  getNextQuestion() {
    return this.questions[this.answers.length] || null;
  }

  answerCurrent(answer) {
    const current = this.questions[this.answers.length];
    if (!current) return;

    if (answer) {
      this.answers.push(current.tag);
    } else {
      this.answers.push(null);
    }
  }

  getResultTags() {
    // Убираем null и дубликаты
    return [...new Set(this.answers.filter(tag => tag))];
  }
}
