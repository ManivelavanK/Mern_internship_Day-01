// Enhanced Interactive Chatbot with Portfolio Knowledge

const portfolioData = {
    skills: ["C", "C++", "Python", "HTML", "CSS", "JavaScript", "OOPs", "DSA", "AI & ML", "Web Scraping", "OpenCV", "VS Code", "GitHub", "Power BI", "Canva"],
    projects: [
        {
            name: "Library Management System",
            tech: "Flask, Python, CSV",
            description: "Flask-based system for managing books & users with CSV upload functionality."
        },
        {
            name: "AI Voice Agent for Insurance",
            tech: "AI/ML, Voice Processing",
            description: "Voice + Chat AI agent trained on insurance data with 90%+ accuracy for customer queries."
        },
        {
            name: "Hand Detection using OpenCV",
            tech: "OpenCV, NumPy, TensorFlow",
            description: "Real-time gesture recognition system using computer vision technologies."
        }
    ],
    education: "B.Tech AI-DS at Sri Eshwar College of Engineering (CGPA: 8.5)",
    contact: {
        email: "manivelavan420534@gmail.com",
        phone: "9344788223",
        linkedin: "https://www.linkedin.com/in/manivelavank534/",
        github: "https://github.com/ManivelavanK"
    },
    achievements: ["Top 5 in InsureBot Hackathon 2025", "Top 50 in A2HackFest 2025", "LeetCode 160+ problems solved", "CodeChef 250+ problems solved"]
};

let isOpen = false;

function toggleChat() {
    const container = document.getElementById('chatContainer');
    const icon = document.getElementById('chat-icon');
    
    isOpen = !isOpen;
    container.style.display = isOpen ? 'flex' : 'none';
    icon.textContent = isOpen ? '✕' : '💬';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function askQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function addMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = content;
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Skills related
    if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech')) {
        return `Manivelavan's technical skills include:<br><br>
                <strong>Programming:</strong> ${portfolioData.skills.slice(0, 6).join(', ')}<br>
                <strong>AI/ML:</strong> ${portfolioData.skills.slice(6, 9).join(', ')}<br>
                <strong>Tools:</strong> ${portfolioData.skills.slice(9).join(', ')}<br><br>
                He's particularly strong in AI/ML and web development! 🚀`;
    }
    
    // Projects related
    if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
        let response = "Here are Manivelavan's key projects:<br><br>";
        portfolioData.projects.forEach((project, index) => {
            response += `<strong>${index + 1}. ${project.name}</strong><br>
                        ${project.description}<br>
                        <em>Tech: ${project.tech}</em><br><br>`;
        });
        return response + "All projects showcase his AI/ML and development expertise! 💻";
    }
    
    // Education related
    if (msg.includes('education') || msg.includes('study') || msg.includes('college') || msg.includes('degree')) {
        return `Manivelavan is currently pursuing ${portfolioData.education}. He also completed HSC with 89% and SSLC with 84%. Strong academic background in AI and Data Science! 🎓`;
    }
    
    // Contact related
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone')) {
        return `You can reach Manivelavan at:<br><br>
                📧 Email: ${portfolioData.contact.email}<br>
                📱 Phone: ${portfolioData.contact.phone}<br>
                💼 LinkedIn: <a href="${portfolioData.contact.linkedin}" target="_blank">Connect here</a><br>
                🔗 GitHub: <a href="${portfolioData.contact.github}" target="_blank">View projects</a>`;
    }
    
    // Experience/achievements
    if (msg.includes('experience') || msg.includes('achievement') || msg.includes('award') || msg.includes('hackathon')) {
        return `Manivelavan's achievements include:<br><br>
                🏆 ${portfolioData.achievements.join('<br>🏆 ')}<br><br>
                He's actively participating in hackathons and competitive programming! 🎯`;
    }
    
    // AI/ML specific
    if (msg.includes('ai') || msg.includes('ml') || msg.includes('machine learning') || msg.includes('artificial intelligence')) {
        return `Manivelavan specializes in AI/ML with projects like:<br><br>
                🤖 AI Voice Agent for Insurance (90%+ accuracy)<br>
                👁️ Hand Detection using OpenCV & TensorFlow<br>
                📚 Various ML algorithms and data science projects<br><br>
                He's passionate about applying AI to solve real-world problems! 🧠`;
    }
    
    // Hiring/availability
    if (msg.includes('hire') || msg.includes('available') || msg.includes('job') || msg.includes('opportunity')) {
        return `Manivelavan is open to opportunities! He's looking for:<br><br>
                💼 Internships in AI/ML or Full-Stack Development<br>
                🚀 Entry-level positions in tech<br>
                🤝 Freelance projects<br><br>
                Contact him directly for discussions about opportunities! 📞`;
    }
    
    // Default responses
    const defaultResponses = [
        "I can help you learn about Manivelavan's skills, projects, education, or contact information. What would you like to know? 😊",
        "Feel free to ask about his technical skills, AI/ML projects, or how to get in touch! 🚀",
        "Try asking about his projects, skills, education, or achievements. I'm here to help! 💡"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Simulate thinking time and respond
    setTimeout(() => {
        hideTyping();
        const response = getBotResponse(message);
        addMessage(response);
    }, 1000 + Math.random() * 1000);
}

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Interactive Chatbot loaded! 🤖');
});
