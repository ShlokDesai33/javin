import { Ring } from "@uiball/loaders";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Discovering new ways of making you wait.",
  "Your time is very important to us. Please wait while I ignore you.",
  "Still faster than a Windows update.",
  "Bored? Sounds like a you problem.",
  "Kindly hold on until I finish a cup of coffee.",
  "Javin will be back in 1/0 minutes.",
  "Why don't you order a sandwich?",
  "Don't panic. Just count to infinity.",
  "Loading... (but not really)",
  "While you're waiting, take a shower 🤢.",
  "I'm better than ChatGPT, screw you."
];

export default function Spinner() {
  // pick a random index to 
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[Math.round(Math.random() * 11)]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = loadingMessages.indexOf(loadingMessage);
      const nextIndex = index + 1 === loadingMessages.length ? 0 : index + 1;
      setLoadingMessage(loadingMessages[nextIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, [loadingMessage]);
  
  return (
    <div className="flex justify-center items-center mt-20 gap-x-3">
      <Ring
        size={30}
        lineWeight={5}
        speed={2}
        color="grey"
      />
      <p>
        {loadingMessage}
      </p>
    </div>
  );
}