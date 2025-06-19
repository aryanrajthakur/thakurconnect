// VVRS SkillConnect - Main JavaScript File
// All functionality for the school social platform

// Global Variables and Data Storage
let currentUser = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Teachers Data
const teachersData = [
    { name: "Rahul Shandilya", phone: ["+91 99962 09203", "7979062808"], subject: "General" }, 
    { name: "Pradeep Kumar Singh", phone: ["88878 21940"], subject: "General" },
    { name: "Archana Bharti", phone: ["+91 92636 39613"], subject: "General" },
    { name: "Urvashi Mala Srivastava", phone: ["+91 94308 04368"], subject: "General" },
    { name: "Rupali Das", phone: ["93080 80460"], subject: "General" },
    { name: "Rajesh Mishra", phone: ["99346 81888"], subject: "General" },
    { name: "Principal, VVRS Purnea", phone: ["92040 68913"], subject: "Administration" },
    { name: "Arshi Begum", phone: ["93048 96991"], subject: "General" },
    { name: "Bipin Kumar Singh", phone: ["94309 68164"], subject: "General" },
    { name: "Supriya Mishra", phone: ["73208 26853"], subject: "General" },
    { name: "Chandrakant Kumar", phone: ["77640 63577"], subject: "General" },
    { name: "Arunesh Suman", phone: ["79039 63782"], subject: "General" },
    { name: "Veena Pandey", phone: ["88251 76278"], subject: "Sanskrit" },
    { name: "PKP", phone: ["90062 41204"], subject: "Chemistry Lab" },
    { name: "Seema Sircar", phone: ["99343 11159"], subject: "Biology" },
    { name: "Prem Mishra", phone: ["98395 67712"], subject: "Mathematics" }
];

// Memes Data
const memesData = [
    "When the teacher says 'This won't be in the exam' but it's the first question 😭",
    "Me: I'll study from tomorrow\nTomorrow: I'll study from tomorrow 🔄",
    "When you realize the assignment was due yesterday 💀",
    "Teacher: Any questions?\nMe: *Has 100 questions*\nAlso me: No ma'am 😶",
    "When you get 99% and your parents ask about the 1% 📊",
    "Me explaining to my parents why I need a gaming setup for 'online classes' 🎮",
    "When the WiFi disconnects during online exam 📡❌",
    "Group project: 1 person works, 4 people get credit 👥",
    "When you accidentally open the front camera during class 📱😱",
    "Me: I'll wake up early tomorrow\n*Sets 10 alarms*\n*Sleeps through all of them* ⏰"
];

// Quiz Data
const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correct: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 15 × 8?",
        options: ["120", "125", "115", "130"],
        correct: 0
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    }
];

// Poll Data
const pollData = {
    question: "What's your favorite subject?",
    options: [
        { text: "Mathematics", votes: 0 },
        { text: "Science", votes: 0 },
        { text: "English", votes: 0 },
        { text: "History", votes: 0 },
        { text: "Computer Science", votes: 0 }
    ]
};

// Achievement System
const achievements = [
    {
        id: 'first_profile',
        title: 'Profile Creator',
        description: 'Created your first profile',
        icon: '👤',
        points: 10,
        unlocked: false
    },
    {
        id: 'social_butterfly',
        title: 'Social Butterfly',
        description: 'Viewed 10 different profiles',
        icon: '🦋',
        points: 25,
        unlocked: false
    },
    {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Completed 5 daily quizzes',
        icon: '🧠',
        points: 30,
        unlocked: false
    },
    {
        id: 'tournament_host',
        title: 'Tournament Host',
        description: 'Hosted your first tournament',
        icon: '🏆',
        points: 50,
        unlocked: false
    },
    {
        id: 'freelancer',
        title: 'Freelancer',
        description: 'Posted your first service',
        icon: '💼',
        points: 20,
        unlocked: false
    },
    {
        id: 'daily_streak',
        title: 'Daily Visitor',
        description: 'Visited platform for 7 consecutive days',
        icon: '⚡',
        points: 40,
        unlocked: false
    }
];

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Theme Functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Local Storage Functions
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key, defaultValue = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// Profile Functions
function saveProfile(profileData) {
    const profiles = getFromStorage('profiles', []);
    profileData.id = generateId();
    profileData.createdAt = new Date().toISOString();
    profileData.views = 0;
    
    profiles.push(profileData);
    saveToStorage('profiles', profiles);
    
    // Update stats
    updateStats();
    
    // Check achievements
    checkAchievement('first_profile');
    
    return profileData.id;
}

function getProfiles() {
    return getFromStorage('profiles', []);
}

function getProfileById(id) {
    const profiles = getProfiles();
    return profiles.find(profile => profile.id === id);
}

function incrementProfileViews(id) {
    const profiles = getProfiles();
    const profile = profiles.find(p => p.id === id);
    if (profile) {
        profile.views = (profile.views || 0) + 1;
        saveToStorage('profiles', profiles);
    }
}

// Service Functions
function saveService(serviceData) {
    const services = getFromStorage('services', []);
    serviceData.id = generateId();
    serviceData.createdAt = new Date().toISOString();
    
    services.push(serviceData);
    saveToStorage('services', services);
    
    // Update stats
    updateStats();
    
    // Check achievements
    checkAchievement('freelancer');
    
    return serviceData.id;
}

function getServices() {
    return getFromStorage('services', []);
}

// Tournament Functions
function saveTournament(tournamentData) {
    const tournaments = getFromStorage('tournaments', []);
    tournamentData.id = generateId();
    tournamentData.createdAt = new Date().toISOString();
    tournamentData.participants = [];
    
    tournaments.push(tournamentData);
    saveToStorage('tournaments', tournaments);
    
    // Update stats
    updateStats();
    
    // Check achievements
    checkAchievement('tournament_host');
    
    return tournamentData.id;
}

function getTournaments() {
    return getFromStorage('tournaments', []);
}

// Squad Functions
function saveSquadRequest(squadData) {
    const squads = getFromStorage('squads', []);
    squadData.id = generateId();
    squadData.createdAt = new Date().toISOString();
    
    squads.push(squadData);
    saveToStorage('squads', squads);
    
    return squadData.id;
}

function getSquads() {
    return getFromStorage('squads', []);
}

// Stats Functions
function updateStats() {
    const profiles = getProfiles();
    const services = getServices();
    const tournaments = getTournaments();
    
    // Update homepage stats
    const totalProfilesEl = document.getElementById('totalProfiles');
    const totalServicesEl = document.getElementById('totalServices');
    const totalTournamentsEl = document.getElementById('totalTournaments');
    
    if (totalProfilesEl) totalProfilesEl.textContent = profiles.length;
    if (totalServicesEl) totalServicesEl.textContent = services.length;
    if (totalTournamentsEl) totalTournamentsEl.textContent = tournaments.length;
}

// Achievement Functions
function checkAchievement(achievementId) {
    const userAchievements = getFromStorage('achievements', []);
    
    if (!userAchievements.includes(achievementId)) {
        userAchievements.push(achievementId);
        saveToStorage('achievements', userAchievements);
        
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
            showToast(`🏆 Achievement Unlocked: ${achievement.title}!`, 'success');
            
            // Add points
            const currentPoints = getFromStorage('totalPoints', 0);
            saveToStorage('totalPoints', currentPoints + achievement.points);
        }
    }
}

function getUserAchievements() {
    return getFromStorage('achievements', []);
}

// Fun Zone Functions
function loadDailyMeme() {
    const memeContainer = document.getElementById('memeContainer');
    if (!memeContainer) return;
    
    const today = new Date().toDateString();
    const lastMemeDate = localStorage.getItem('lastMemeDate');
    
    let memeIndex = parseInt(localStorage.getItem('currentMemeIndex') || '0');
    
    if (lastMemeDate !== today) {
        memeIndex = Math.floor(Math.random() * memesData.length);
        localStorage.setItem('currentMemeIndex', memeIndex.toString());
        localStorage.setItem('lastMemeDate', today);
    }
    
    memeContainer.innerHTML = `
        <div class="meme-text">
            <h4>😂 ${memesData[memeIndex]}</h4>
        </div>
    `;
    
    // Update meme views
    const memesViewed = parseInt(localStorage.getItem('memesViewed') || '0') + 1;
    localStorage.setItem('memesViewed', memesViewed.toString());
    
    const memesViewedEl = document.getElementById('memesViewed');
    if (memesViewedEl) memesViewedEl.textContent = memesViewed;
}

function getNewMeme() {
    const memeIndex = Math.floor(Math.random() * memesData.length);
    localStorage.setItem('currentMemeIndex', memeIndex.toString());
    loadDailyMeme();
}

function loadDailyPoll() {
    const pollContainer = document.getElementById('pollContainer');
    if (!pollContainer) return;
    
    const savedPoll = getFromStorage('dailyPoll', pollData);
    const userVote = localStorage.getItem('dailyPollVote');
    
    let pollHTML = `<div class="poll-question">${savedPoll.question}</div><div class="poll-options">`;
    
    const totalVotes = savedPoll.options.reduce((sum, option) => sum + option.votes, 0);
    
    savedPoll.options.forEach((option, index) => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        const isVoted = userVote === index.toString();
        
        pollHTML += `
            <div class="poll-option ${isVoted ? 'voted' : ''}" onclick="voteInPoll(${index})">
                <span>${option.text}</span>
                <span class="poll-percentage">${percentage}%</span>
            </div>
        `;
    });
    
    pollHTML += '</div>';
    pollContainer.innerHTML = pollHTML;
}

function voteInPoll(optionIndex) {
    const userVote = localStorage.getItem('dailyPollVote');
    if (userVote !== null) {
        showToast('You have already voted in today\'s poll!', 'warning');
        return;
    }
    
    const savedPoll = getFromStorage('dailyPoll', pollData);
    savedPoll.options[optionIndex].votes++;
    saveToStorage('dailyPoll', savedPoll);
    
    localStorage.setItem('dailyPollVote', optionIndex.toString());
    
    // Update polls voted count
    const pollsVoted = parseInt(localStorage.getItem('pollsVoted') || '0') + 1;
    localStorage.setItem('pollsVoted', pollsVoted.toString());
    
    const pollsVotedEl = document.getElementById('pollsVoted');
    if (pollsVotedEl) pollsVotedEl.textContent = pollsVoted;
    
    loadDailyPoll();
    showToast('Vote recorded! Thanks for participating.', 'success');
}

function loadDailyQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;
    
    const today = new Date().toDateString();
    const lastQuizDate = localStorage.getItem('lastQuizDate');
    
    if (lastQuizDate === today) {
        const score = localStorage.getItem('todayQuizScore');
        quizContainer.innerHTML = `
            <div class="quiz-completed">
                <h4>✅ Today's Quiz Completed!</h4>
                <p>Your Score: ${score}/5</p>
                <p>Come back tomorrow for a new quiz!</p>
            </div>
        `;
        return;
    }
    
    let quizIndex = parseInt(localStorage.getItem('currentQuizIndex') || '0');
    if (lastQuizDate !== today) {
        quizIndex = Math.floor(Math.random() * quizData.length);
        localStorage.setItem('currentQuizIndex', quizIndex.toString());
    }
    
    const quiz = quizData[quizIndex];
    let quizHTML = `
        <div class="quiz-question">${quiz.question}</div>
        <div class="quiz-options">
    `;
    
    quiz.options.forEach((option, index) => {
        quizHTML += `
            <div class="quiz-option" onclick="answerQuiz(${index}, ${quiz.correct})">
                ${option}
            </div>
        `;
    });
    
    quizHTML += '</div>';
    quizContainer.innerHTML = quizHTML;
}

function answerQuiz(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.onclick = null; // Disable further clicks
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            option.classList.add('incorrect');
        }
    });
    
    const isCorrect = selectedIndex === correctIndex;
    const currentScore = parseInt(localStorage.getItem('quizScore') || '0');
    const newScore = isCorrect ? currentScore + 1 : currentScore;
    
    localStorage.setItem('quizScore', newScore.toString());
    localStorage.setItem('todayQuizScore', '1'); // Simplified scoring
    localStorage.setItem('lastQuizDate', new Date().toDateString());
    
    // Update quizzes taken count
    const quizzesTaken = parseInt(localStorage.getItem('quizzesTaken') || '0') + 1;
    localStorage.setItem('quizzesTaken', quizzesTaken.toString());
    
    const quizzesTakenEl = document.getElementById('quizzesTaken');
    if (quizzesTakenEl) quizzesTakenEl.textContent = quizzesTaken;
    
    // Check quiz achievement
    if (quizzesTaken >= 5) {
        checkAchievement('quiz_master');
    }
    
    setTimeout(() => {
        showToast(isCorrect ? 'Correct! 🎉' : 'Wrong answer 😔', isCorrect ? 'success' : 'error');
        loadDailyQuiz();
    }, 2000);
}

// Message Functions
function openMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function sendMessage() {
    const messageText = document.getElementById('messageText');
    if (!messageText || !messageText.value.trim()) {
        showToast('Please enter a message', 'warning');
        return;
    }
    
    const message = encodeURIComponent(`Hi Aryan! Message from VVRS SkillConnect: ${messageText.value}`);
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closeMessageModal();
    messageText.value = '';
}

// Profile Form Functions
function previewProfile() {
    const formData = getProfileFormData();
    if (!formData.fullName || !formData.className) {
        showToast('Please fill in required fields', 'warning');
        return;
    }
    
    const previewModal = document.getElementById('previewModal');
    const previewContainer = document.getElementById('profilePreview');
    
    if (previewModal && previewContainer) {
        previewContainer.innerHTML = generateProfileCard(formData);
        previewModal.classList.add('active');
    }
}

function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function getProfileFormData() {
    return {
        fullName: document.getElementById('fullName')?.value || '',
        className: document.getElementById('className')?.value || '',
        bio: document.getElementById('bio')?.value || '',
        skills: document.getElementById('skills')?.value || '',
        interests: document.getElementById('interests')?.value || '',
        gamingIds: document.getElementById('gamingIds')?.value || '',
        instagram: document.getElementById('instagram')?.value || '',
        youtube: document.getElementById('youtube')?.value || '',
        whatsapp: document.getElementById('whatsapp')?.value || ''
    };
}

function generateProfileCard(profile) {
    return `
        <div class="profile-card">
            <div class="profile-header">
                <h3>${profile.fullName}</h3>
                <span class="profile-class">${profile.className}</span>
            </div>
            ${profile.bio ? `<p class="profile-bio">${profile.bio}</p>` : ''}
            ${profile.skills ? `<div class="profile-section">
                <h4>🎯 Skills</h4>
                <p>${profile.skills}</p>
            </div>` : ''}
            ${profile.interests ? `<div class="profile-section">
                <h4>❤️ Interests</h4>
                <p>${profile.interests}</p>
            </div>` : ''}
            ${profile.gamingIds ? `<div class="profile-section">
                <h4>🎮 Gaming IDs</h4>
                <pre>${profile.gamingIds}</pre>
            </div>` : ''}
            <div class="profile-contacts">
                ${profile.whatsapp ? `<a href="https://wa.me/${profile.whatsapp.replace(/\D/g, '')}" class="contact-btn">📱 WhatsApp</a>` : ''}
                ${profile.instagram ? `<a href="https://instagram.com/${profile.instagram.replace('@', '')}" class="contact-btn">📷 Instagram</a>` : ''}
                ${profile.youtube ? `<a href="${profile.youtube.includes('http') ? profile.youtube : 'https://youtube.com/c/' + profile.youtube}" class="contact-btn">📺 YouTube</a>` : ''}
            </div>
            <div class="profile-stats">
                <span>👁️ ${profile.views || 0} views</span>
                <span>📅 ${profile.createdAt ? formatDate(profile.createdAt) : 'Today'}</span>
            </div>
        </div>
    `;
}

function shareProfile() {
    const profileData = getProfileFormData();
    const shareText = `Check out ${profileData.fullName}'s profile on VVRS SkillConnect!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'VVRS SkillConnect Profile',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`).then(() => {
            showToast('Profile link copied to clipboard!', 'success');
        });
    }
}

function viewAllProfiles() {
    window.location.href = 'peoplefinder.html';
}

// People Finder Functions
function searchProfiles() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const classFilter = document.getElementById('classFilter')?.value || '';
    
    let profiles = getProfiles();
    
    // Apply filters
    if (searchTerm) {
        profiles = profiles.filter(profile => 
            profile.fullName.toLowerCase().includes(searchTerm) ||
            profile.className.toLowerCase().includes(searchTerm) ||
            (profile.skills && profile.skills.toLowerCase().includes(searchTerm)) ||
            (profile.interests && profile.interests.toLowerCase().includes(searchTerm))
        );
    }
    
    if (classFilter) {
        profiles = profiles.filter(profile => profile.className === classFilter);
    }
    
    displayProfiles(profiles);
}

function filterProfiles() {
    searchProfiles();
}

function sortProfiles() {
    const sortBy = document.getElementById('sortFilter')?.value || 'recent';
    let profiles = getProfiles();
    
    switch (sortBy) {
        case 'name':
            profiles.sort((a, b) => a.fullName.localeCompare(b.fullName));
            break;
        case 'views':
            profiles.sort((a, b) => (b.views || 0) - (a.views || 0));
            break;
        case 'recent':
        default:
            profiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }
    
    displayProfiles(profiles);
}

function displayProfiles(profiles) {
    const profilesGrid = document.getElementById('profilesGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!profilesGrid) return;
    
    if (resultsCount) {
        resultsCount.textContent = `${profiles.length} student${profiles.length !== 1 ? 's' : ''} found`;
    }
    
    if (profiles.length === 0) {
        profilesGrid.innerHTML = `
            <div class="no-profiles">
                <div class="empty-state">
                    <h3>👥 No Profiles Found</h3>
                    <p>Try adjusting your search criteria or be the first to create a profile!</p>
                    <a href="profile.html" class="btn btn-primary">Create Profile</a>
                </div>
            </div>
        `;
        return;
    }
    
    profilesGrid.innerHTML = profiles.map(profile => `
        <div class="profile-card" onclick="viewProfile('${profile.id}')">
            <div class="profile-header">
                <h4>${profile.fullName}</h4>
                <span class="profile-class">${profile.className}</span>
            </div>
            ${profile.bio ? `<p class="profile-bio">${profile.bio.substring(0, 100)}${profile.bio.length > 100 ? '...' : ''}</p>` : ''}
            ${profile.skills ? `<div class="profile-skills">
                <strong>Skills:</strong> ${profile.skills.split(',').slice(0, 3).join(', ')}${profile.skills.split(',').length > 3 ? '...' : ''}
            </div>` : ''}
            <div class="profile-stats">
                <span>👁️ ${profile.views || 0} views</span>
                <span>📅 ${formatDate(profile.createdAt)}</span>
            </div>
        </div>
    `).join('');
}

function viewProfile(profileId) {
    const profile = getProfileById(profileId);
    if (!profile) return;
    
    // Increment view count
    incrementProfileViews(profileId);
    
    const modal = document.getElementById('profileModal');
    const profileDetails = document.getElementById('profileDetails');
    
    if (modal && profileDetails) {
        profileDetails.innerHTML = generateProfileCard(profile);
        modal.classList.add('active');
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Freelance Functions
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    if (tabName === 'browse') {
        loadServices();
    }
}

function loadServices() {
    const services = getServices();
    displayServices(services);
}

function filterServices() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    
    let services = getServices();
    
    if (categoryFilter) {
        services = services.filter(service => service.serviceCategory === categoryFilter);
    }
    
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
        services = services.filter(service => {
            const price = parseInt(service.servicePrice);
            if (max) {
                return price >= parseInt(min) && price <= parseInt(max);
            } else {
                return price >= parseInt(min);
            }
        });
    }
    
    displayServices(services);
}

function displayServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-services">
                <div class="empty-state">
                    <h3>💼 No Services Found</h3>
                    <p>Be the first to offer your skills and start earning!</p>
                    <button class="btn btn-primary" onclick="switchTab('offer')">Offer Service</button>
                </div>
            </div>
        `;
        return;
    }
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-header">
                <span class="service-category">${getCategoryIcon(service.serviceCategory)} ${getCategoryName(service.serviceCategory)}</span>
                <span class="service-price">₹${service.servicePrice}</span>
            </div>
            <h4>${service.serviceTitle}</h4>
            <p class="service-description">${service.serviceDescription}</p>
            <div class="service-provider">
                <strong>By:</strong> ${service.serviceName}
            </div>
            <div class="service-actions">
                <button class="btn btn-primary" onclick="hireFreelancer('${service.serviceContact}', '${service.serviceTitle}')">
                    💬 Contact
                </button>
            </div>
            <div class="service-date">
                Posted: ${formatDate(service.createdAt)}
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'video-editing': '📹',
        'photo-editing': '📸',
        'graphic-design': '🎨',
        'study-help': '📚',
        'game-coaching': '🎮',
        'content-writing': '✍️',
        'social-media': '📱',
        'other': '🔧'
    };
    return icons[category] || '🔧';
}

function getCategoryName(category) {
    const names = {
        'video-editing': 'Video Editing',
        'photo-editing': 'Photo Editing',
        'graphic-design': 'Graphic Design',
        'study-help': 'Study Help',
        'game-coaching': 'Game Coaching',
        'content-writing': 'Content Writing',
        'social-media': 'Social Media',
        'other': 'Other'
    };
    return names[category] || 'Other';
}

function hireFreelancer(contact, serviceTitle) {
    const message = encodeURIComponent(`Hi! I'm interested in your service: ${serviceTitle}. Found you on VVRS SkillConnect.`);
    
    if (contact.includes('@')) {
        // Instagram contact
        window.open(`https://instagram.com/${contact.replace('@', '')}`, '_blank');
    } else {
        // WhatsApp contact
        const phoneNumber = contact.replace(/\D/g, '');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
}

// GameZone Functions
function switchGameTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[onclick="switchGameTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    if (tabName === 'tournaments') {
        loadTournaments();
    } else if (tabName === 'squads') {
        loadSquads();
    }
}

function loadTournaments() {
    const tournaments = getTournaments();
    displayTournaments(tournaments);
}

function filterTournaments() {
    const gameFilter = document.getElementById('gameFilter')?.value || '';
    let tournaments = getTournaments();
    
    if (gameFilter) {
        tournaments = tournaments.filter(tournament => tournament.tournamentGame === gameFilter);
    }
    
    displayTournaments(tournaments);
}

function displayTournaments(tournaments) {
    const tournamentsGrid = document.getElementById('tournamentsGrid');
    if (!tournamentsGrid) return;
    
    if (tournaments.length === 0) {
        tournamentsGrid.innerHTML = `
            <div class="no-tournaments">
                <div class="empty-state">
                    <h3>🏆 No Tournaments Yet</h3>
                    <p>Be the first to host a tournament and bring gamers together!</p>
                    <button class="btn btn-primary" onclick="switchGameTab('host')">Host Tournament</button>
                </div>
            </div>
        `;
        return;
    }
    
    tournamentsGrid.innerHTML = tournaments.map(tournament => `
        <div class="tournament-card">
            <div class="tournament-header">
                <h4 class="tournament-title">${tournament.tournamentTitle}</h4>
                <span class="tournament-game">${getGameIcon(tournament.tournamentGame)} ${getGameName(tournament.tournamentGame)}</span>
            </div>
            <div class="tournament-info">
                <div class="info-item">
                    <div class="info-label">Host</div>
                    <div class="info-value">${tournament.hostName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Date</div>
                    <div class="info-value">${formatDate(tournament.tournamentDate)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Time</div>
                    <div class="info-value">${formatTime(tournament.tournamentTime)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Entry Fee</div>
                    <div class="info-value">₹${tournament.entryFee || 'Free'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Prize</div>
                    <div class="info-value">₹${tournament.prizePool || 'TBD'}</div>
                </div>
            </div>
            <div class="tournament-rules">
                <strong>Rules:</strong> ${tournament.tournamentRules.substring(0, 100)}${tournament.tournamentRules.length > 100 ? '...' : ''}
            </div>
            <div class="tournament-actions">
                <button class="btn btn-primary" onclick="joinTournament('${tournament.hostContact}', '${tournament.tournamentTitle}')">
                    🎮 Join Tournament
                </button>
            </div>
        </div>
    `).join('');
}

function getGameIcon(game) {
    const icons = {
        'pubg': '🔫',
        'freefire': '🔥',
        'cod': '💀',
        'valorant': '⚡',
        'clash-royale': '👑',
        'other': '🎮'
    };
    return icons[game] || '🎮';
}

function getGameName(game) {
    const names = {
        'pubg': 'PUBG Mobile',
        'freefire': 'Free Fire',
        'cod': 'Call of Duty',
        'valorant': 'Valorant',
        'clash-royale': 'Clash Royale',
        'other': 'Other'
    };
    return names[game] || 'Other';
}

function joinTournament(hostContact, tournamentTitle) {
    const message = encodeURIComponent(`Hi! I want to join your tournament: ${tournamentTitle}. Found it on VVRS SkillConnect.`);
    const phoneNumber = hostContact.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function loadSquads() {
    const squads = getSquads();
    displaySquads(squads);
}

function displaySquads(squads) {
    const squadsList = document.getElementById('squadsList');
    if (!squadsList) return;
    
    const squadsContainer = squadsList.querySelector('.no-squads') ? squadsList : squadsList.querySelector('.squads-container');
    
    if (squads.length === 0) {
        if (squadsList.querySelector('h3')) {
            squadsList.innerHTML = squadsList.innerHTML.replace(
                squadsList.querySelector('.no-squads').outerHTML,
                '<div class="no-squads"><p>No squad requests yet. Be the first!</p></div>'
            );
        }
        return;
    }
    
    const squadsHTML = squads.map(squad => `
        <div class="squad-card">
            <div class="squad-header">
                <h4 class="squad-title">${squad.gamerName}</h4>
                <span class="squad-game">${getGameIcon(squad.gameSelect)} ${getGameName(squad.gameSelect)}</span>
            </div>
            <div class="squad-info">
                <div class="info-item">
                    <div class="info-label">UID</div>
                    <div class="info-value">${squad.gameUID}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Role</div>
                    <div class="info-value">${squad.playerRole}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Play Time</div>
                    <div class="info-value">${squad.playTime || 'Flexible'}</div>
                </div>
            </div>
            <div class="squad-actions">
                <button class="btn btn-primary" onclick="contactSquadMember('${squad.squadContact}', '${squad.gamerName}')">
                    💬 Contact
                </button>
            </div>
        </div>
    `).join('');
    
    squadsList.innerHTML = `<h3>🎮 Looking for Squad</h3><div class="squads-container">${squadsHTML}</div>`;
}

function contactSquadMember(contact, gamerName) {
    const message = encodeURIComponent(`Hi ${gamerName}! I saw your squad request on VVRS SkillConnect. Let's team up!`);
    const phoneNumber = contact.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Teachers Functions
function loadTeachers() {
    const teachersList = document.getElementById('teachersList');
    if (!teachersList) return;
    
    teachersList.innerHTML = teachersData.map(teacher => `
        <div class="teacher-card">
            <div class="teacher-info">
                <h4>${teacher.name}</h4>
                <p>${teacher.subject}</p>
            </div>
            <div class="teacher-phones">
                ${teacher.phone.map(phone => `
                    <a href="tel:${phone}" class="phone-link">📞 ${phone}</a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function searchTeachers() {
    const searchTerm = document.getElementById('teacherSearch')?.value.toLowerCase() || '';
    
    let filteredTeachers = teachersData;
    if (searchTerm) {
        filteredTeachers = teachersData.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.subject.toLowerCase().includes(searchTerm)
        );
    }
    
    const teachersList = document.getElementById('teachersList');
    if (!teachersList) return;
    
    teachersList.innerHTML = filteredTeachers.map(teacher => `
        <div class="teacher-card">
            <div class="teacher-info">
                <h4>${teacher.name}</h4>
                <p>${teacher.subject}</p>
            </div>
            <div class="teacher-phones">
                ${teacher.phone.map(phone => `
                    <a href="tel:${phone}" class="phone-link">📞 ${phone}</a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Earn Page Functions
function featureProfile() {
    openPaymentModal('Feature Profile', 'Get your profile featured on homepage for 7 days', 50);
}

function promoteSkills() {
    openPaymentModal('Promote Skills', 'Boost your freelance services to top of search results', 30);
}

function buyTemplates() {
    showToast('Template store coming soon! Contact admin for custom templates.', 'info');
}

function openAffiliate(type) {
    const affiliateLinks = {
        'mic': 'https://amazon.in/gaming-microphone',
        'apps': 'https://play.google.com/store/apps/category/PHOTOGRAPHY',
        'gaming': 'https://amazon.in/gaming-accessories'
    };
    
    window.open(affiliateLinks[type] || 'https://amazon.in', '_blank');
}

function donate(amount) {
    openPaymentModal('Support Platform', `Thank you for supporting VVRS SkillConnect! Your donation helps keep the platform free for all students.`, amount);
}

function customDonation() {
    const amount = prompt('Enter donation amount (₹):');
    if (amount && !isNaN(amount) && parseInt(amount) > 0) {
        donate(parseInt(amount));
    }
}

function openStudyBoost() {
    window.open('https://vvrsstudyboost.netlify.app/', '_blank');
}

function openPaymentModal(title, description, amount) {
    const modal = document.getElementById('paymentModal');
    const paymentTitle = document.getElementById('paymentTitle');
    const paymentDescription = document.getElementById('paymentDescription');
    const paymentAmount = document.getElementById('paymentAmount');
    
    if (modal && paymentTitle && paymentDescription && paymentAmount) {
        paymentTitle.textContent = title;
        paymentDescription.textContent = description;
        paymentAmount.textContent = amount;
        modal.classList.add('active');
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function confirmPayment() {
    const title = document.getElementById('paymentTitle')?.textContent || '';
    const amount = document.getElementById('paymentAmount')?.textContent || '';
    
    // Simulate payment confirmation
    showToast(`Payment of ₹${amount} confirmed! ${title} activated.`, 'success');
    
    // Add to featured profiles if it's a feature profile payment
    if (title === 'Feature Profile') {
        const profiles = getProfiles();
        if (profiles.length > 0) {
            const featuredProfiles = getFromStorage('featuredProfiles', []);
            const latestProfile = profiles[profiles.length - 1];
            
            if (!featuredProfiles.find(fp => fp.id === latestProfile.id)) {
                featuredProfiles.push({
                    ...latestProfile,
                    featuredUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                });
                saveToStorage('featuredProfiles', featuredProfiles);
            }
        }
    }
    
    closePaymentModal();
}

// Achievement Page Functions
function loadAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    const totalBadgesEl = document.getElementById('totalBadges');
    const totalPointsEl = document.getElementById('totalPoints');
    
    if (!achievementsGrid) return;
    
    const userAchievements = getUserAchievements();
    const totalPoints = getFromStorage('totalPoints', 0);
    
    if (totalBadgesEl) totalBadgesEl.textContent = userAchievements.length;
    if (totalPointsEl) totalPointsEl.textContent = totalPoints;
    
    achievementsGrid.innerHTML = achievements.map(achievement => {
        const isUnlocked = userAchievements.includes(achievement.id);
        return `
            <div class="achievement-card ${isUnlocked ? 'earned' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <h4 class="achievement-title">${achievement.title}</h4>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-points">+${achievement.points} points</div>
                ${isUnlocked ? '<div class="achievement-status">✅ Unlocked</div>' : '<div class="achievement-status">🔒 Locked</div>'}
            </div>
        `;
    }).join('');
    
    loadProgressItems();
}

function loadProgressItems() {
    const progressItems = document.getElementById('progressItems');
    if (!progressItems) return;
    
    const profiles = getProfiles().length;
    const services = getServices().length;
    const tournaments = getTournaments().length;
    const quizzesTaken = parseInt(localStorage.getItem('quizzesTaken') || '0');
    
    const progressData = [
        { title: 'Create Profile', current: Math.min(profiles, 1), target: 1 },
        { title: 'Post Services', current: Math.min(services, 3), target: 3 },
        { title: 'Host Tournaments', current: Math.min(tournaments, 1), target: 1 },
        { title: 'Complete Quizzes', current: Math.min(quizzesTaken, 5), target: 5 }
    ];
    
    progressItems.innerHTML = progressData.map(item => {
        const percentage = Math.round((item.current / item.target) * 100);
        return `
            <div class="progress-item">
                <div class="progress-info">
                    <div class="progress-title">${item.title}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
                <div class="progress-text">${item.current}/${item.target}</div>
            </div>
        `;
    }).join('');
}

// Form Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            updateStats();
            loadFeaturedProfiles();
            break;
            
        case 'profile.html':
            setupProfileForm();
            break;
            
        case 'peoplefinder.html':
            loadAllProfiles();
            break;
            
        case 'freelance.html':
            setupFreelanceForm();
            break;
            
        case 'gamezone.html':
            setupGamezoneForms();
            break;
            
        case 'teachers.html':
            loadTeachers();
            break;
            
        case 'funzone.html':
            loadFunZone();
            break;
            
        case 'earn.html':
            // Earn page is ready
            break;
            
        case 'achievements.html':
            loadAchievements();
            break;
    }
    
    // Set up theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});

function loadFeaturedProfiles() {
    const featuredProfiles = getFromStorage('featuredProfiles', []);
    const featuredContainer = document.getElementById('featuredProfiles');
    
    if (!featuredContainer) return;
    
    // Filter out expired featured profiles
    const activeFeatured = featuredProfiles.filter(profile => 
        new Date(profile.featuredUntil) > new Date()
    );
    
    if (activeFeatured.length === 0) {
        featuredContainer.innerHTML = `
            <div class="featured-placeholder">
                <p>No featured profiles yet. Be the first to get featured!</p>
                <a href="earn.html" class="btn btn-primary">Get Featured</a>
            </div>
        `;
        return;
    }
    
    featuredContainer.innerHTML = activeFeatured.map(profile => `
        <div class="featured-profile" onclick="viewProfile('${profile.id}')">
            <div class="featured-badge">⭐ Featured</div>
            <h4>${profile.fullName}</h4>
            <p>${profile.className}</p>
            <div class="featured-skills">${profile.skills ? profile.skills.split(',').slice(0, 2).join(', ') : 'No skills listed'}</div>
        </div>
    `).join('');
}

function loadAllProfiles() {
    const profiles = getProfiles();
    displayProfiles(profiles);
}

function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = getProfileFormData();
        
        if (!formData.fullName || !formData.className) {
            showToast('Please fill in all required fields', 'warning');
            return;
        }
        
        const profileId = saveProfile(formData);
        
        if (profileId) {
            showToast('Profile created successfully!', 'success');
            
            // Show success modal
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
            }
            
            // Reset form
            profileForm.reset();
        } else {
            showToast('Error creating profile. Please try again.', 'error');
        }
    });
}

function setupFreelanceForm() {
    const serviceForm = document.getElementById('serviceForm');
    if (!serviceForm) return;
    
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            serviceName: document.getElementById('serviceName').value,
            serviceTitle: document.getElementById('serviceTitle').value,
            serviceCategory: document.getElementById('serviceCategory').value,
            serviceDescription: document.getElementById('serviceDescription').value,
            servicePrice: document.getElementById('servicePrice').value,
            serviceContact: document.getElementById('serviceContact').value
        };
        
        if (!formData.serviceName || !formData.serviceTitle || !formData.serviceCategory || 
            !formData.serviceDescription || !formData.servicePrice || !formData.serviceContact) {
            showToast('Please fill in all required fields', 'warning');
            return;
        }
        
        const serviceId = saveService(formData);
        
        if (serviceId) {
            showToast('Service posted successfully!', 'success');
            serviceForm.reset();
            switchTab('browse');
        } else {
            showToast('Error posting service. Please try again.', 'error');
        }
    });
}

function setupGamezoneForms() {
    // Tournament form
    const tournamentForm = document.getElementById('tournamentForm');
    if (tournamentForm) {
        tournamentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                tournamentTitle: document.getElementById('tournamentTitle').value,
                tournamentGame: document.getElementById('tournamentGame').value,
                hostName: document.getElementById('hostName').value,
                tournamentDate: document.getElementById('tournamentDate').value,
                tournamentTime: document.getElementById('tournamentTime').value,
                entryFee: document.getElementById('entryFee').value,
                prizePool: document.getElementById('prizePool').value,
                tournamentRules: document.getElementById('tournamentRules').value,
                hostContact: document.getElementById('hostContact').value
            };
            
            if (!formData.tournamentTitle || !formData.tournamentGame || !formData.hostName || 
                !formData.tournamentDate || !formData.tournamentTime || !formData.tournamentRules || 
                !formData.hostContact) {
                showToast('Please fill in all required fields', 'warning');
                return;
            }
            
            const tournamentId = saveTournament(formData);
            
            if (tournamentId) {
                showToast('Tournament created successfully!', 'success');
                tournamentForm.reset();
                switchGameTab('tournaments');
            } else {
                showToast('Error creating tournament. Please try again.', 'error');
            }
        });
    }
    
    // Squad form
    const squadForm = document.getElementById('squadForm');
    if (squadForm) {
        squadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                gamerName: document.getElementById('gamerName').value,
                gameSelect: document.getElementById('gameSelect').value,
                gameUID: document.getElementById('gameUID').value,
                playerRole: document.getElementById('playerRole').value,
                playTime: document.getElementById('playTime').value,
                squadContact: document.getElementById('squadContact').value
            };
            
            if (!formData.gamerName || !formData.gameSelect || !formData.gameUID || 
                !formData.playerRole || !formData.squadContact) {
                showToast('Please fill in all required fields', 'warning');
                return;
            }
            
            const squadId = saveSquadRequest(formData);
            
            if (squadId) {
                showToast('Squad request posted successfully!', 'success');
                squadForm.reset();
                loadSquads();
            } else {
                showToast('Error posting squad request. Please try again.', 'error');
            }
        });
    }
}

function loadFunZone() {
    loadDailyMeme();
    loadDailyPoll();
    loadDailyQuiz();
    loadFunStats();
}

function loadFunStats() {
    const memesViewed = localStorage.getItem('memesViewed') || '0';
    const pollsVoted = localStorage.getItem('pollsVoted') || '0';
    const quizzesTaken = localStorage.getItem('quizzesTaken') || '0';
    const funStreak = localStorage.getItem('funStreak') || '0';
    
    const memesViewedEl = document.getElementById('memesViewed');
    const pollsVotedEl = document.getElementById('pollsVoted');
    const quizzesTakenEl = document.getElementById('quizzesTaken');
    const funStreakEl = document.getElementById('funStreak');
    
    if (memesViewedEl) memesViewedEl.textContent = memesViewed;
    if (pollsVotedEl) pollsVotedEl.textContent = pollsVoted;
    if (quizzesTakenEl) quizzesTakenEl.textContent = quizzesTaken;
    if (funStreakEl) funStreakEl.textContent = funStreak;
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update daily streak
    updateDailyStreak();
    
    // Initialize page
    initializePage();
});

function updateDailyStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisitDate');
    const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '0');
    
    if (lastVisit === today) {
        // Already visited today
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
        // Consecutive day
        const newStreak = currentStreak + 1;
        localStorage.setItem('dailyStreak', newStreak.toString());
        localStorage.setItem('funStreak', newStreak.toString());
        
        // Check for streak achievement
        if (newStreak >= 7) {
            checkAchievement('daily_streak');
        }
    } else {
        // Streak broken
        localStorage.setItem('dailyStreak', '1');
        localStorage.setItem('funStreak', '1');
    }
    
    localStorage.setItem('lastVisitDate', today);
}

function initializePage() {
    // This function is called after DOM is loaded
    // Page-specific initialization is handled in the main DOMContentLoaded event
}

// Export functions for global access (if needed)
window.VVRS = {
    toggleTheme,
    openMessageModal,
    closeMessageModal,
    sendMessage,
    previewProfile,
    closePreviewModal,
    shareProfile,
    viewAllProfiles,
    searchProfiles,
    filterProfiles,
    sortProfiles,
    viewProfile,
    closeProfileModal,
    switchTab,
    filterServices,
    hireFreelancer,
    switchGameTab,
    filterTournaments,
    joinTournament,
    contactSquadMember,
    searchTeachers,
    getNewMeme,
    voteInPoll,
    answerQuiz,
    featureProfile,
    promoteSkills,
    buyTemplates,
    openAffiliate,
    donate,
    customDonation,
    openStudyBoost,
    openPaymentModal,
    closePaymentModal,
    confirmPayment
};