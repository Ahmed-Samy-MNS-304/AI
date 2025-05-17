// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');

// Chatbot responses
const responses = {
  'what is ai': 'AI stands for Artificial Intelligence, where machines perform tasks that normally require human intelligence.',
  'what is artificial intelligence': 'Artificial Intelligence refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect.',
  'how is ai used in healthcare': 'AI helps doctors diagnose diseases, predict patient outcomes, analyze medical images, discover new drugs, and personalize treatment plans.',
  'what are the concerns of ai': 'People worry about job displacement, privacy issues, algorithmic bias, security risks, and the potential for AI systems to make harmful decisions.',
  'benefits of ai': 'AI can automate repetitive tasks, increase efficiency, provide data-driven insights, enhance customer experiences, and solve complex problems in fields like healthcare and climate science.',
  'how does machine learning work': 'Machine Learning is a subset of AI that enables systems to learn from data, identify patterns, and make decisions with minimal human intervention. It uses algorithms that improve automatically through experience.',
  'what is natural language processing': 'Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and generate human language in a valuable way.',
  'examples of ai': 'Examples of AI include virtual assistants like Siri and Alexa, recommendation systems on platforms like Netflix, autonomous vehicles, image recognition in photo apps, and fraud detection systems in banking.',
  'ai ethics': 'AI ethics involves ensuring AI systems are designed and deployed fairly, transparently, with privacy protection, and with appropriate human oversight to prevent harmful outcomes.',
  'future of ai': 'The future of AI likely includes more capable generative systems, broader integration across industries, advances in reasoning capabilities, and increasingly sophisticated AI-human collaboration tools.',
  'hello': 'Hello! How can I help you learn about AI today?',
  'hi': 'Hi there! What would you like to know about artificial intelligence?',
  'thanks': 'You\'re welcome! If you have any other questions about AI, feel free to ask.',
  'thank you': 'You\'re welcome! Is there anything else you\'d like to know about AI?'
};

// Default response for unknown queries
const defaultResponse = 'Sorry, I don\'t understand that question. Try asking about what AI is, how it\'s used in healthcare, or concerns about AI.';

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.toggle('active');
  
  // Focus input when opening
  if (chatbotWindow.classList.contains('active')) {
    chatbotInput.focus();
  }
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
  chatbotWindow.classList.remove('active');
});

// Process user input and display response
function processMessage() {
  const userMessage = chatbotInput.value.trim();
  
  if (userMessage === '') return;
  
  // Add user message to chat
  addMessage(userMessage, 'user');
  
  // Get bot response
  const botResponse = getBotResponse(userMessage);
  
  // Clear input field
  chatbotInput.value = '';
  
  // Add bot response with a slight delay to seem more natural
  setTimeout(() => {
    addMessage(botResponse, 'bot');
  }, 500);
}

// Get appropriate bot response based on user input
function getBotResponse(userInput) {
  // Convert to lowercase for matching
  const input = userInput.toLowerCase();
  
  // Check for exact matches first
  if (responses[input]) {
    return responses[input];
  }
  
  // Check for partial matches
  for (const key in responses) {
    if (input.includes(key)) {
      return responses[key];
    }
  }
  
  // Try to provide more contextual responses
  if (input.includes('job') || input.includes('work') || input.includes('career')) {
    return 'AI may change the job market, automating routine tasks while creating new opportunities in areas like AI development, data analysis, and human-AI collaboration.';
  }
  
  if (input.includes('learn') || input.includes('study')) {
    return 'To learn about AI, you can start with online courses on platforms like Coursera or edX, read books like "AI: A Modern Approach," or try practical tutorials on TensorFlow or PyTorch.';
  }
  
  // Return default response if no match found
  return defaultResponse;
}

// Add a message to the chat
function addMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('message-content');
  contentElement.textContent = message;
  
  messageElement.appendChild(contentElement);
  chatbotMessages.appendChild(messageElement);
  
  // Scroll to latest message
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle send button click
chatbotSend.addEventListener('click', processMessage);

// Handle enter key in input field
chatbotInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    processMessage();
  }
});

// Auto-expand chatbot input field
chatbotInput.addEventListener('input', function() {
  this.style.height = 'auto';
  const maxHeight = 100; // Maximum height in pixels
  
  if (this.scrollHeight <= maxHeight) {
    this.style.height = this.scrollHeight + 'px';
  } else {
    this.style.height = maxHeight + 'px';
  }
});

// Create folder structure for images
function createFolderStructure() {
  // This is a client-side only app, so we don't need to create folders
  // Adding this comment to explain the folder structure expected:
  // - / (root)
  //   - index.html
  //   - css/
  //     - styles.css
  //     - chatbot.css
  //   - js/
  //     - main.js
  //     - chatbot.js
  //   - images/
  //     - favicon.svg
}

// Call function to acknowledge folder structure
createFolderStructure();