// chatbotWidget.js - Simple Widget (FAKE config placeholders)
// ============================================
// Host this file on your server (Netlify / GH Pages / your server)
// ============================================

(function() {
  'use strict';

  // ----- Get client ID from script tag data attribute -----
  const currentScript = document.currentScript || document.querySelector('script[data-chatbot-id]');
  const clientId = currentScript?.getAttribute('data-chatbot-id');

  if (!clientId) {
    console.error('Chatbot: No client ID provided (data-chatbot-id)');
    return;
  }

  // ----- Firebase Configuration (FAKE placeholders) -----

  const firebaseConfig = {
      apiKey: "AIzaSyCbEtMWeyMRRvqpRy_FXAbK1VO3K7aZUUk",
      authDomain: "chatbot-2e7cc.firebaseapp.com",
      databaseURL: "https://chatbot-2e7cc-default-rtdb.firebaseio.com",
      projectId: "chatbot-2e7cc",
      storageBucket: "chatbot-2e7cc.firebasestorage.app",
      messagingSenderId: "261386645061",
      appId: "1:261386645061:web:6309829b2e11bca5c9bd2c",
      measurementId: "G-BVKP2Q2SCY"
    };

  // widget state
  let chatbotData = null;
  let chatHistory = [];
  let isOpen = false;
  let db = null;
  let rootEl = null; // will point to the widget root container

  // ==========================
  // LOAD FIREBASE (robust)
  // ==========================
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load script: ' + src));
      (document.head || document.getElementsByTagName('head')[0]).appendChild(s);
    });
  }

  function loadFirebase() {
    return new Promise((resolve, reject) => {
      // If firebase and database are already available, resolve immediately
      if (window.firebase && typeof window.firebase.database === 'function') {
        resolve();
        return;
      }

      // If firebase is not present, load app-compat first
      const loadApp = window.firebase ? Promise.resolve() : loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');

      loadApp
        .then(() => {
          // If database already available after app load, resolve
          if (window.firebase && typeof window.firebase.database === 'function') {
            resolve();
            return;
          }
          // Otherwise load database compat
          return loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js')
            .then(() => {
              if (window.firebase && typeof window.firebase.database === 'function') {
                resolve();
              } else {
                reject(new Error('Firebase database module not available after loading scripts.'));
              }
            });
        })
        .catch(reject);
    });
  }

  // ==========================
  // LOAD CHATBOT CONFIG FROM FIREBASE
  // ==========================
  async function loadChatbotConfig() {
    try {
      // init firebase if no app already exists
      if (!window.firebase) {
        throw new Error('Firebase not loaded');
      }

      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      db = firebase.database();
      const snapshot = await db.ref(`clients/${clientId}`).once('value');
      chatbotData = snapshot.val();

      if (!chatbotData) {
        console.error(`Chatbot: No configuration found for client ID "${clientId}"`);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Chatbot: Error loading config:', err);
      return false;
    }
  }

  // ==========================
  // SIMPLE FAQ MATCHER
  // ==========================
  function findMatchingFAQ(userMessage) {
    if (!chatbotData) return { answer: "Sorry, something went wrong.", quickReplies: [] };

    const normalized = userMessage.toLowerCase().trim();
    const faqs = Array.isArray(chatbotData.faqs) ? chatbotData.faqs : [];

    for (const faq of faqs) {
      if (faq.keywords && Array.isArray(faq.keywords)) {
        const match = faq.keywords.some(k => normalized.includes(String(k).toLowerCase()));
        if (match) {
          return {
            answer: faq.answer || chatbotData.defaultResponse || "Thanks — we'll get back to you.",
            quickReplies: faq.quickReplies || []
          };
        }
      }
    }

    return {
      answer: chatbotData.defaultResponse || "I'm not sure about that. Please contact us for more information.",
      quickReplies: chatbotData.defaultQuickReplies || []
    };
  }

  // ==========================
  // UTILS
  // ==========================
  function safeHexLighten(hex, percent) {
    try {
      if (!hex || typeof hex !== 'string' || hex[0] !== '#') return '#3b82f6';
      let c = hex.slice(1);
      if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
      if (c.length !== 6) return '#3b82f6';
      const num = parseInt(c, 16);
      const amt = Math.round(2.55 * percent);
      let R = (num >> 16) + amt; if (R > 255) R = 255; if (R < 0) R = 0;
      let G = ((num >> 8) & 0x00FF) + amt; if (G > 255) G = 255; if (G < 0) G = 0;
      let B = (num & 0x0000FF) + amt; if (B > 255) B = 255; if (B < 0) B = 0;
      return '#' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
    } catch (e) {
      return '#3b82f6';
    }
  }

  // ==========================
// LOCALSTORAGE FUNCTIONS
// ==========================
const storageKey = `chatbot_${clientId}_history`;

// Save conversation to localStorage
function saveConversation(messages) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
        console.log('💾 Conversation saved');
    } catch (e) {
        console.warn('⚠️ localStorage not available:', e);
    }
}

// Load conversation from localStorage
function loadConversation() {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            console.log('📂 Loaded conversation from localStorage');
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn('⚠️ Error loading conversation:', e);
    }
    return [];
}

// Clear conversation (for testing)
function clearConversation() {
    try {
        localStorage.removeItem(storageKey);
        chatHistory = [];
        console.log('🗑️ Conversation cleared');
    } catch (e) {
        console.warn('⚠️ Error clearing conversation:', e);
    }
}

  // ==========================
  // CREATE WIDGET UI
  // ==========================
  function createWidget() {
    // pick colors safely
    const primaryColor = chatbotData.primaryColor || (chatbotData.theme && chatbotData.theme.color) || '#3b82f6';
    const secondaryColor = safeHexLighten(primaryColor, 18);

    // styles
    const style = document.createElement('style');
        style.textContent = `
            :root {
                --chatbot-primary: ${primaryColor};
                --chatbot-secondary: ${secondaryColor};
            }

            .chatbot-widget-container {
                position: fixed;
                right: 24px;
                bottom: 24px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .chatbot-widget-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--chatbot-primary) 0%, var(--chatbot-secondary) 100%);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .chatbot-widget-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
            }

            .chatbot-widget-button svg {
                width: 28px;
                height: 28px;
                fill: white;
            }

            .chatbot-widget-window {
                position: fixed;
                right: 24px;
                bottom: 100px;
                width: 380px;
                height: 600px;
                max-height: calc(100vh - 150px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }

            .chatbot-widget-window.open {
                display: flex;
                animation: chatbotSlideUp 0.3s ease;
            }

            @keyframes chatbotSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .chatbot-widget-header {
                background: linear-gradient(135deg, var(--chatbot-primary) 0%, var(--chatbot-secondary) 100%);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chatbot-widget-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .chatbot-widget-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chatbot-widget-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f8f9fa;
            }

            .chatbot-widget-message {
                margin-bottom: 16px;
                display: flex;
                gap: 10px;
            }

            .chatbot-widget-message.user {
                justify-content: flex-end;
            }

            .chatbot-widget-message.bot {
                justify-content: flex-start;
                flex-direction: column;
            }

            .chatbot-message-bubble {
                max-width: 75%;
                padding: 12px 16px;
                border-radius: 12px;
                line-height: 1.5;
                word-wrap: break-word;
                white-space: pre-wrap;
            }
            .chatbot-mssage-bubble a{
            color: var(--chatbot-primary);
            }

            .chatbot-widget-message.user .chatbot-message-bubble {
                background: var(--chatbot-primary);
                color: white;
                border-bottom-right-radius: 4px;
            }

            .chatbot-widget-message.user .chatbot-message-bubble a {
              color: var(--chatbot-primary);
            }

            .chatbot-widget-message.bot .chatbot-message-bubble {
                background: white;
                color: #333;
                border-bottom-left-radius: 4px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .chatbot-widget-message.bot .chatbot-message-bubble a {
              color: var(--chatbot-primary);
            }

            .chatbot-quick-replies {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-top: 0px;
                padding-left: 0px;
            }

            .chatbot-quick-reply-btn {
                background: white;
                border: 2px solid var(--chatbot-primary);
                color: var(--chatbot-primary);
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 10px;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .chatbot-quick-reply-btn:hover {
                background: var(--chatbot-primary);
                color: white;
            }

            .chatbot-widget-input-area {
                padding: 16px 16px 8px 16px;
                background: white;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 12px;
            }

            .chatbot-widget-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e9ecef;
                border-radius: 24px;
                font-size: 14px;
                outline: none;
            }

            .chatbot-widget-input:focus {
                border-color: var(--chatbot-primary);
            }

            .chatbot-widget-send {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: var(--chatbot-primary);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .chatbot-widget-send:hover {
                transform: scale(1.1);
            }

            .chatbot-widget-send svg {
                width: 20px;
                height: 20px;
                fill: white;
            }

            .chatbot-typing-indicator {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
            }

            .chatbot-typing-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #94a3b8;
                animation: chatbotTyping 1.4s infinite;
            }

            .chatbot-typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .chatbot-typing-dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes chatbotTyping {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                30% { transform: translateY(-10px); opacity: 1; }
            }
            .chatbot-clear-chat-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0px 16px 8px 16px;
                background: white;
                text-align: left;
            }

            .chatbot-clear-chat-btn {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 12px;
                cursor: pointer;
                padding: 4px 8px;
                transition: color 0.2s;
            }
            .chatbot-clear-chat-btn:hover {
                color: #64748b;
                text-decoration: underline;
            }
            .chatbot-poweredBy-btn {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 12px;
                cursor: pointer;
                padding: 4px 0px;
                transition: color 0.2s;
                opacity: 0.5;
            }
            .chatbot-poweredBy-link {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 12px;
                cursor: pointer;
                padding: 4px 2px;
                transition: color 0.2s;
            }
            @media (max-width: 480px) {
                .chatbot-widget-window {
                    width: calc(100vw - 48px);
                    height: calc(100vh - 150px);
                    right: 24px;
                }
                .chatbot-widget-container {
                    right: 24px;
                }
            }
        `;

    document.head.appendChild(style);

    // Build HTML skeleton (static markup only; dynamic text set via DOM)
    const container = document.createElement('div');
    container.className = 'chatbot-widget-container';
    container.innerHTML = `
      <button class="chatbot-widget-button" id="chatbotWidgetToggle">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.31-3.86-.86l-.28-.15-2.91.49.49-2.91-.15-.28C4.31 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/></svg>
      </button>
      <div class="chatbot-widget-window" id="chatbotWidgetWindow">
        <div class="chatbot-widget-header">
          <h3 class="chatbot-widget-title"></h3>
          <button class="chatbot-widget-close" id="chatbotWidgetClose">×</button>
        </div>
        <div class="chatbot-widget-messages"></div>
        <div class="chatbot-widget-input-area">
          <input type="text" class="chatbot-widget-input" placeholder="Type your message...">
          <button class="chatbot-widget-send" type="button">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
        <div class="chatbot-clear-chat-container">
          <button class="chatbot-clear-chat-btn" type="button">Clear Chat</button>
          <span class="chatbot-poweredBy-btn"> Built By<a href="https://www.goodmorningchat.com" class="chatbot-poweredBy-link" >GoodMorningChat</a>
          </span>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    rootEl = container; // keep reference for other functions

    // set dynamic header text safely (avoid innerHTML user insertion)
    const title = rootEl.querySelector('.chatbot-widget-title');
    title.textContent = chatbotData.businessName || chatbotData.name || 'Chat with us';

    // attach events
    attachEventListeners();

    // if you want to show a welcome message in chat history immediately (optional)
    // Load previous conversation from localStorage
    chatHistory = loadConversation();

    // If no history exists, add welcome message
    if (chatHistory.length === 0 && chatbotData.welcomeMessage) {
        chatHistory.push({ role: 'bot', message: chatbotData.welcomeMessage });
        saveConversation(chatHistory);
    }
  }

  // ==========================
  // EVENT LISTENERS (use rootEl)
  // ==========================
  function attachEventListeners() {
    if (!rootEl) return;

    const toggleBtn = rootEl.querySelector('#chatbotWidgetToggle');
    const closeBtn = rootEl.querySelector('#chatbotWidgetClose');
    const sendBtn = rootEl.querySelector('.chatbot-widget-send');
    const inputEl = rootEl.querySelector('.chatbot-widget-input');
    const clearChatBtn = rootEl.querySelector('.chatbot-clear-chat-btn');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);
    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (inputEl) inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
    if (clearChatBtn) clearChatBtn.addEventListener('click', handleClearChat);
  }

  function toggleChat() {
    if (!rootEl) return;
    isOpen = !isOpen;
    const win = rootEl.querySelector('.chatbot-widget-window');
    const inputEl = rootEl.querySelector('.chatbot-widget-input');

    if (isOpen) {
        win.classList.add('open');
        const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
        const messagesHaveContent = messagesContainer.children.length > 0;
        
        // If UI is empty but we have chat history, restore it
        if (!messagesHaveContent && chatHistory.length > 0) {
            chatHistory.forEach(msg => {
                if (msg.role === 'bot') {
                    addBotMessage(msg.message, [], false);
                } else if (msg.role === 'user') {
                    addUserMessageToUI(msg.message);
                }
            });
        }
        // If no history at all, show welcome message
        else if (!messagesHaveContent && chatbotData && chatbotData.welcomeMessage) {
            addBotMessage(chatbotData.welcomeMessage, chatbotData.defaultQuickReplies || []);
        }
        
        if (inputEl) inputEl.focus();
    } else {
        win.classList.remove('open');  // ← ADD THIS
    }
  }

  function handleClearChat() {
    if (!rootEl) return;
    
    if (confirm('Clear all chat history?')) {
      clearConversation();
      
      // Clear UI
      const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
      messagesContainer.innerHTML = '';
      
      // Show welcome message again
      if (chatbotData && chatbotData.welcomeMessage) {
        addBotMessage(chatbotData.welcomeMessage, chatbotData.defaultQuickReplies || []);
      }
    }
  }

  // ==========================
  // MESSAGES
  // ==========================
  function handleSend() {
    if (!rootEl) return;
    const input = rootEl.querySelector('.chatbot-widget-input');
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;
    addUserMessage(message);
    input.value = '';
    showTypingIndicator();

    setTimeout(() => {
      const response = findMatchingFAQ(message);
      hideTypingIndicator();
      addBotMessage(response.answer, response.quickReplies || []);
    }, 600);
  }

  function addUserMessage(message) {
    if (!rootEl) return;
    const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'chatbot-widget-message user';
    const bubble = document.createElement('div');
    bubble.className = 'chatbot-message-bubble';
    bubble.innerHTML = message || '';
    messageEl.appendChild(bubble);
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
    chatHistory.push({ role: 'user', message });
    saveConversation(chatHistory);
  }

  // Add user message to UI only (for restoring from history)
  function addUserMessageToUI(message) {
      if (!rootEl) return;
      const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
      const messageEl = document.createElement('div');
      messageEl.className = 'chatbot-widget-message user';
      const bubble = document.createElement('div');
      bubble.className = 'chatbot-message-bubble';
      bubble.innerHTML = message || '';
      messageEl.appendChild(bubble);
      messagesContainer.appendChild(messageEl);
  }

  function addBotMessage(message, quickReplies = [], shouldSave = true) {
      if (!rootEl) return;
      const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
      const messageEl = document.createElement('div');
      messageEl.className = 'chatbot-widget-message bot';

      const bubble = document.createElement('div');
      bubble.className = 'chatbot-message-bubble';
      bubble.innerHTML = message || '';
      messageEl.appendChild(bubble);

      if (quickReplies && quickReplies.length) {
          const quickWrap = document.createElement('div');
          quickWrap.className = 'chatbot-quick-replies';
          quickReplies.forEach(reply => {
              const btn = document.createElement('button');
              btn.className = 'chatbot-quick-reply-btn';
              btn.type = 'button';
              btn.textContent = reply;
              btn.addEventListener('click', () => {
                  window.chatbotSelectQuickReply(reply);
              });
              quickWrap.appendChild(btn);
          });
          messageEl.appendChild(quickWrap);
      }

      messagesContainer.appendChild(messageEl);
      scrollToNewMessage();
      
      if (shouldSave) {
          chatHistory.push({ role: 'bot', message });
          saveConversation(chatHistory); // ← ADD THIS LINE
      }
  }

  function showTypingIndicator() {
    if (!rootEl) return;
    const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'chatbot-widget-message bot';
    typingEl.id = 'chatbotTypingIndicator';
    typingEl.innerHTML = `<div class="chatbot-message-bubble chatbot-typing-indicator">
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
    </div>`;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    if (!rootEl) return;
    const typingEl = rootEl.querySelector('#chatbotTypingIndicator');
    if (typingEl) typingEl.remove();
  }

  function scrollToBottom() {
    if (!rootEl) return;
    const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  function scrollToNewMessage() {
  if (!rootEl) return;
  const messagesContainer = rootEl.querySelector('.chatbot-widget-messages');
  const lastMessage = messagesContainer.lastElementChild;
  
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  } 

  // allow quick replies to call into widget (keeps API simple)
  window.chatbotSelectQuickReply = function(text) {
    if (!rootEl) return;
    const input = rootEl.querySelector('.chatbot-widget-input');
    if (!input) return;
    input.value = text;
    handleSend();
  };

  // ==========================
  // INIT
  // ==========================
  async function init() {
    try {
      await loadFirebase();
      const ok = await loadChatbotConfig();
      if (ok) {
        createWidget();
      }
    } catch (err) {
      console.error('Chatbot: init failed', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
