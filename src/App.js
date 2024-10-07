import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState(`
    Good Morning, Respected Teachers,

We group of class 10 section D presenting  a working model based on the chapter "Applications of Trigonometry."

In this chapter, we explored important concepts such as the line of sight, angle of elevation, angle of depression, and the horizontal plane at the observer's level. Today, we'll be demonstrating how the angle of elevation works using a laser model to clearly illustrate the relationship between the line of sight and the horizontal line.

Case 1:
In the first scenario, the angle of elevation is 45°, and the distance between the observer and the object is 12 meters. Since the value of tan 45° is 1, the height of the object (or building) will also be 12 meters.

Case 2:
In the second scenario, the angle of elevation is 60°, and the distance from the observer is 10 meters. Using the trigonometric value of tan 60°, which is approximately 1.73, the height of the building comes out to be around 17.3 meters.

Thank you for your time and attention as we showcase our project.
  `);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Fetch available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length) {
        setSelectedVoice(availableVoices[0].name); // Select the first voice by default
      }
    };

    // Wait for voices to be available (sometimes speechSynthesis.getVoices is async)
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Function to trigger the speech
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Set voice properties
      utterance.volume = 0.5; // 0 to 1
      utterance.pitch = 1; // 0 to 2
      utterance.rate = 1; // 0.1 to 10

      // Set the selected voice
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }

      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech not supported in this browser.');
    }
  };

  // Function to cancel the speech
  const cancelSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div>
      <h1>Text to Speech in React</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <label htmlFor="voiceSelect">Choose Voice: </label>
      <select
        id="voiceSelect"
        onChange={(e) => setSelectedVoice(e.target.value)}
        value={selectedVoice}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <br />
      <button onClick={speakText}>Speak</button>
      <button onClick={cancelSpeech}>Cancel</button>
    </div>
  );
};

export default TextToSpeech;
