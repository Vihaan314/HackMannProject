if (typeof chatForm === 'undefined') {
    loadConversationHistory();
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');
    const saveConversationButton = document.getElementById('save-conversation');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });

    messageInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            sendMessage();
        }
    });

    saveConversationButton.addEventListener('click', function() {
        fetch('/counseling/save', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
            });
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage(message, 'user-message');

            fetch('/counseling/chat', {
                method: 'POST',
                body: JSON.stringify({ 'message': message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                appendMessage(data.ai_response, 'ai-message');
            });

            messageInput.value = '';
        }
    }

    document.getElementById('start-new-chat').addEventListener('click', function() {
    fetch('/counseling/start_new', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data.status); 
            document.getElementById('chat-container').innerHTML = ''; 
            session['conversation'] = [];  
        });
});


    function appendMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = className;
        chatContainer.appendChild(messageDiv);
    }    

    function loadConversationHistory() {
        fetch('/counseling/history')
            .then(response => response.json())
            .then(conversations => {
                const conversationList = document.getElementById('conversation-list');
                const pastConversations = document.getElementById('past-conversations');
                if (conversations.length > 0) {
                    pastConversations.style.display = 'block';
                    conversationList.innerHTML = '';  
                    conversations.forEach(convo => {
                        const convoItem = document.createElement('li');
                        convoItem.className = 'cursor-pointer p-2 hover:bg-green-200';
                        const previewMessage = "Therapist";
                        convoItem.textContent = `${convo.date}: ${previewMessage.substring(0, 50)}`;
                        convoItem.onclick = () => loadConversation(convo.id);
                        conversationList.appendChild(convoItem);
                    });
                } else {
                    pastConversations.style.display = 'none';
                }
            });
    }

    function loadConversation(convoId) {
        fetch(`/counseling/conversation/${convoId}`)
        .then(response => response.json())
        .then(messages => {
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = '';  
            messages.forEach((msg, index) => {
                const className = index % 2 === 0 ? 'user-message' : 'ai-message';
                appendMessage(msg, className);
            });
        });
}

}