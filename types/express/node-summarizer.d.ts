declare module 'node-summarizer' {
    class SummarizerManager {
      constructor(text: string, sentencesCount: number);
      getSummaryByRank(): Promise<{ summary: string }>;
    }
  
    export = SummarizerManager;
  }
  