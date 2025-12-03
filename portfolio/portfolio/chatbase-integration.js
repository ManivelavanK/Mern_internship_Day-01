// Chatbase Integration with API
const CHATBASE_API_KEY = 'G9lM-Yk6pKpkcTNNqMTLj';
const CHATBASE_URL = 'https://www.chatbase.co/api/v1/chat';

let isKnowAboutMeOpen = false;

function toggleKnowAboutMe() {
    const container = document.getElementById('knowAboutMeContainer');
    
    isKnowAboutMeOpen = !isKnowAboutMeOpen;
    container.style.display = isKnowAboutMeOpen ? 'flex' : 'none';
}

function handleChatbaseKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatbaseMessage();
    }
}

function askChatbaseQuestion(question) {
    document.getElementById('chatbaseInput').value = question;
    sendChatbaseMessage();
}

function addChatbaseMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('chatbaseMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = content;
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showChatbaseTyping() {
    const messagesContainer = document.getElementById('chatbaseMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'chatbaseTyping';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideChatbaseTyping() {
    const typing = document.getElementById('chatbaseTyping');
    if (typing) typing.remove();
}

async function sendChatbaseMessage() {
    const input = document.getElementById('chatbaseInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatbaseMessage(message, true);
    input.value = '';
    
    // Show typing indicator
    showChatbaseTyping();
    
    try {
        const response = await fetch(CHATBASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CHATBASE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                chatbotId: CHATBASE_API_KEY,
                stream: false
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            hideChatbaseTyping();
            addChatbaseMessage(data.text || data.message || 'I can help you learn about Manivelavan! Ask me about his skills, projects, or experience.');
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        hideChatbaseTyping();
        // Fallback to local responses if API fails
        const fallbackResponse = getFallbackResponse(message);
        addChatbaseMessage(fallbackResponse);
    }
}

function getFallbackResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('about') || msg.includes('tell me')) {
        return `Manivelavan K is a passionate B.Tech AI-DS student at Sri Eshwar College of Engineering with a CGPA of 8.5. He's a MERN developer and AI/ML enthusiast with expertise in multiple programming languages and frameworks. 🚀`;
    }
    
    if (msg.includes('skill') || msg.includes('technology')) {
        return `Manivelavan's technical skills include:<br>
                • Programming: C, C++, Python, JavaScript<br>
                • Web: HTML, CSS, React.js, MERN Stack<br>
                • AI/ML: Machine Learning, OpenCV, Data Science<br>
                • Tools: VS Code, GitHub, Power BI<br>
                He's particularly strong in problem-solving with 160+ LeetCode problems solved! 💻`;
    }
    
    if (msg.includes('project')) {
        return `His key projects include:<br>
                🔹 Library Management System (Flask, Python)<br>
                🔹 AI Voice Agent for Insurance (90%+ accuracy)<br>
                🔹 Hand Detection using OpenCV & TensorFlow<br>
                All projects showcase his full-stack and AI/ML capabilities! 🛠️`;
    }
    
    if (msg.includes('education')) {
        return `Education Background:<br>
                🎓 B.Tech AI-DS at Sri Eshwar College (CGPA: 8.5)<br>
                🎓 HSC: 89% from St. Xavier's Higher Secondary<br>
                🎓 SSLC: 84% from St. Thomas High School<br>
                Strong academic foundation in AI and Data Science! 📚`;
    }
    
    if (msg.includes('contact') || msg.includes('reach')) {
        return `You can reach Manivelavan at:<br>
                📧 manivelavan420534@gmail.com<br>
                📱 +91 9344788223<br>
                💼 LinkedIn: linkedin.com/in/manivelavank534/<br>
                💻 GitHub: github.com/ManivelavanK<br>
                He's open for internships and collaborations! 🤝`;
    }
    
    return `I'm Manivelavan's AI assistant! I can tell you about his skills, projects, education, and experience. What would you like to know? 😊`;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbase integration loaded with API key:', CHATBASE_API_KEY);
});