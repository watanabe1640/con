interface Window {
	SpeechRecognition: typeof SpeechRecognition;
	webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  declare var SpeechRecognition: {
	new (): SpeechRecognition;
	prototype: SpeechRecognition;
  };
  
  interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
	start(): void;
	stop(): void;
  }
  
  interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
	[index: number]: SpeechRecognitionResult;
	length: number;
  }
  
  interface SpeechRecognitionResult {
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
	length: number;
  }
  
  interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
  }