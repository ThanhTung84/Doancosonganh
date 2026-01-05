// Quiz data - 30 câu hỏi tổng cộng
const allQuestions = [
    // Câu hỏi cơ bản về Bubble Sort
    {
        question: "Bubble Sort hoạt động bằng cách nào?",
        answers: [
            "Chọn phần tử nhỏ nhất và đặt vào đầu",
            "So sánh các cặp phần tử liền kề và hoán đổi",
            "Chèn phần tử vào vị trí đúng",
            "Chia mảng thành hai phần"
        ],
        correct: 1
    },
    {
        question: "Trong Bubble Sort, sau mỗi lần duyệt mảng, điều gì xảy ra?",
        answers: [
            "Phần tử nhỏ nhất được đặt vào đầu",
            "Phần tử lớn nhất được đặt vào cuối",
            "Mảng được chia đôi",
            "Không có gì thay đổi"
        ],
        correct: 1
    },
    {
        question: "Bubble Sort được gọi là 'nổi bọt' vì?",
        answers: [
            "Phần tử nhỏ 'nổi' lên đầu",
            "Phần tử lớn 'nổi' lên cuối",
            "Thuật toán chậm như bọt",
            "Không có lý do cụ thể"
        ],
        correct: 1
    },
    {
        question: "Trong trường hợp tốt nhất, Bubble Sort có độ phức tạp là?",
        answers: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        correct: 0
    },
    {
        question: "Thuật toán nào có thể dừng sớm nếu mảng đã sắp xếp?",
        answers: [
            "Selection Sort",
            "Insertion Sort",
            "Bubble Sort (với tối ưu)",
            "Không thuật toán nào"
        ],
        correct: 2
    },
    
    // Câu hỏi về Selection Sort
    {
        question: "Selection Sort tìm kiếm gì trong mỗi lần lặp?",
        answers: [
            "Phần tử lớn nhất",
            "Phần tử nhỏ nhất trong phần chưa sắp xếp",
            "Phần tử ở giữa",
            "Phần tử đầu tiên"
        ],
        correct: 1
    },
    {
        question: "Độ phức tạp thời gian của Selection Sort là?",
        answers: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
        correct: 2
    },
    {
        question: "Thuật toán nào thực hiện ít phép hoán đổi nhất?",
        answers: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Cả ba đều như nhau"],
        correct: 1
    },
    {
        question: "Selection Sort luôn thực hiện bao nhiêu phép hoán đổi với mảng n phần tử?",
        answers: ["n", "n-1", "n²", "n(n-1)/2"],
        correct: 1
    },
    {
        question: "Selection Sort có ưu điểm gì so với Bubble Sort?",
        answers: [
            "Nhanh hơn",
            "Ít phép hoán đổi hơn",
            "Ổn định hơn",
            "Dễ cài đặt hơn"
        ],
        correct: 1
    },
    
    // Câu hỏi về Insertion Sort
    {
        question: "Insertion Sort hoạt động giống như việc gì trong thực tế?",
        answers: [
            "Xếp hàng người",
            "Sắp xếp bài trong tay",
            "Tìm kiếm trong từ điển",
            "Đếm tiền"
        ],
        correct: 1
    },
    {
        question: "Insertion Sort hiệu quả nhất khi nào?",
        answers: [
            "Mảng đã sắp xếp ngược",
            "Mảng có kích thước lớn",
            "Mảng gần như đã sắp xếp",
            "Mảng có nhiều phần tử trùng lặp"
        ],
        correct: 2
    },
    {
        question: "Insertion Sort có độ phức tạp không gian (space complexity) là?",
        answers: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correct: 0
    },
    {
        question: "Khi nào Insertion Sort hiệu quả hơn Selection Sort?",
        answers: [
            "Khi mảng đã gần sắp xếp",
            "Khi mảng ngược hoàn toàn",
            "Khi mảng có nhiều phần tử",
            "Không bao giờ"
        ],
        correct: 0
    },
    {
        question: "Insertion Sort có thể sắp xếp online (thời gian thực) không?",
        answers: [
            "Không",
            "Có, khi dữ liệu đến từng phần tử",
            "Chỉ với mảng nhỏ",
            "Chỉ với mảng đã sắp xếp"
        ],
        correct: 1
    },
    
    // Câu hỏi so sánh các thuật toán
    {
        question: "Thuật toán nào là ổn định (stable)?",
        answers: ["Selection Sort", "Bubble Sort", "Cả hai đều ổn định", "Không thuật toán nào ổn định"],
        correct: 1
    },
    {
        question: "Thuật toán nào không ổn định (unstable)?",
        answers: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Cả ba đều ổn định"],
        correct: 1
    },
    {
        question: "Cả 3 thuật toán Bubble, Selection, Insertion đều có độ phức tạp là?",
        answers: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
        correct: 2
    },
    {
        question: "Trong trường hợp xấu nhất, cả 3 thuật toán đều có độ phức tạp là?",
        answers: ["O(n)", "O(n log n)", "O(n²)", "Khác nhau"],
        correct: 2
    },
    {
        question: "Thuật toán nào phù hợp nhất cho dữ liệu nhỏ (< 10 phần tử)?",
        answers: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Cả ba đều tốt"],
        correct: 3
    },
    {
        question: "Với mảng đã sắp xếp, thuật toán nào nhanh nhất?",
        answers: [
            "Bubble Sort (tối ưu)",
            "Selection Sort",
            "Insertion Sort",
            "Cả ba đều như nhau"
        ],
        correct: 2
    },
    {
        question: "Thuật toán nào sử dụng kỹ thuật 'so sánh và hoán đổi liền kề'?",
        answers: ["Selection Sort", "Insertion Sort", "Bubble Sort", "Cả ba"],
        correct: 2
    },
    
    // Câu hỏi nâng cao
    {
        question: "Trong Bubble Sort, sau k lần duyệt, bao nhiêu phần tử đã ở vị trí đúng?",
        answers: ["k phần tử đầu", "k phần tử cuối", "k phần tử giữa", "Không xác định"],
        correct: 1
    },
    {
        question: "Selection Sort có thể được tối ưu để tìm cả min và max cùng lúc không?",
        answers: [
            "Không thể",
            "Có, gọi là Bidirectional Selection Sort",
            "Chỉ với mảng chẵn phần tử",
            "Chỉ với mảng lẻ phần tử"
        ],
        correct: 1
    },
    {
        question: "Thuật toán nào có thể tối ưu để dừng sớm nếu mảng đã sắp xếp?",
        answers: ["Selection Sort", "Insertion Sort", "Bubble Sort", "Cả ba đều có thể"],
        correct: 2
    },
    {
        question: "Insertion Sort thực hiện tối đa bao nhiêu phép so sánh với mảng n phần tử?",
        answers: ["n", "n-1", "n(n-1)/2", "n²"],
        correct: 2
    },
    {
        question: "Bubble Sort có thể được cải tiến để giảm số lần so sánh không?",
        answers: [
            "Không thể",
            "Có, bằng cách đánh dấu vùng đã sắp xếp",
            "Chỉ với mảng nhỏ",
            "Chỉ khi mảng gần sắp xếp"
        ],
        correct: 1
    },
    {
        question: "Selection Sort có ưu điểm gì khi bộ nhớ hạn chế?",
        answers: [
            "Không có ưu điểm",
            "Sử dụng ít bộ nhớ phụ",
            "Ít phép hoán đổi",
            "Cả B và C"
        ],
        correct: 3
    },
    {
        question: "Insertion Sort hoạt động tốt nhất với loại dữ liệu nào?",
        answers: [
            "Dữ liệu ngẫu nhiên",
            "Dữ liệu đã sắp xếp ngược",
            "Dữ liệu gần như đã sắp xếp",
            "Dữ liệu có nhiều giá trị trùng lặp"
        ],
        correct: 2
    },
    {
        question: "Thuật toán nào có thể được song song hóa (parallelized) dễ nhất?",
        answers: [
            "Bubble Sort",
            "Selection Sort", 
            "Insertion Sort",
            "Không thuật toán nào dễ song song hóa"
        ],
        correct: 3
    }
];

// Quiz state
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;
let timerInterval = null;

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get random questions
function getRandomQuestions(count = 10) {
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, count);
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
});

// Start quiz
function startQuiz() {
    // Random 10 câu từ 30 câu
    currentQuiz = getRandomQuestions(10);
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    startTime = Date.now();
    
    document.getElementById('quizSelection').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
    document.getElementById('totalQuestions').textContent = currentQuiz.length;
    
    startTimer();
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const isSelected = userAnswers[currentQuestionIndex] === index;
        const answerDiv = document.createElement('div');
        answerDiv.className = 'form-check mb-3';
        answerDiv.innerHTML = `
            <input class="form-check-input" type="radio" name="answer" id="answer${index}" 
                   value="${index}" ${isSelected ? 'checked' : ''} onchange="selectAnswer(${index})">
            <label class="form-check-label" for="answer${index}">
                ${answer}
            </label>
        `;
        answersContainer.appendChild(answerDiv);
    });
    
    updateButtons();
}

// Select answer
function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    updateButtons();
}

// Update navigation buttons
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    const hasAnswer = userAnswers[currentQuestionIndex] !== null;
    nextBtn.disabled = !hasAnswer;
    
    if (currentQuestionIndex === currentQuiz.length - 1) {
        nextBtn.classList.add('d-none');
        submitBtn.classList.remove('d-none');
        submitBtn.disabled = !hasAnswer;
    } else {
        nextBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');
    }
}

// Navigation functions
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

// Submit quiz
function submitQuiz() {
    clearInterval(timerInterval);
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - startTime) / 1000);
    
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === currentQuiz[index].correct) {
            correctCount++;
        }
    });
    
    showResults(correctCount, totalTime);
}

// Show results
function showResults(correctCount, totalTime) {
    const totalQuestions = currentQuiz.length;
    const wrongCount = totalQuestions - correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    document.getElementById('quizContainer').classList.add('d-none');
    document.getElementById('resultsContainer').classList.remove('d-none');
    
    // Update result display
    document.getElementById('scoreDisplay').textContent = `${correctCount}/${totalQuestions}`;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('wrongCount').textContent = wrongCount;
    document.getElementById('timeDisplay').textContent = formatTime(totalTime);
    
    // Update progress bar
    const resultProgress = document.getElementById('resultProgress');
    resultProgress.style.width = percentage + '%';
    
    // Set result message and icon
    let resultTitle, resultMessage, resultIcon, progressClass;
    
    if (percentage >= 90) {
        resultTitle = "Xuất Sắc!";
        resultMessage = "Bạn đã nắm vững kiến thức về thuật toán sắp xếp!";
        resultIcon = '<i class="fas fa-trophy text-warning fs-1"></i>';
        progressClass = 'bg-success';
    } else if (percentage >= 70) {
        resultTitle = "Tốt!";
        resultMessage = "Bạn có hiểu biết khá tốt về thuật toán sắp xếp.";
        resultIcon = '<i class="fas fa-thumbs-up text-success fs-1"></i>';
        progressClass = 'bg-primary';
    } else if (percentage >= 50) {
        resultTitle = "Trung Bình";
        resultMessage = "Bạn cần ôn tập thêm về thuật toán sắp xếp.";
        resultIcon = '<i class="fas fa-meh text-warning fs-1"></i>';
        progressClass = 'bg-warning';
    } else {
        resultTitle = "Cần Cố Gắng";
        resultMessage = "Hãy học lại các khái niệm cơ bản về thuật toán sắp xếp.";
        resultIcon = '<i class="fas fa-sad-tear text-danger fs-1"></i>';
        progressClass = 'bg-danger';
    }
    
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('resultIcon').innerHTML = resultIcon;
    resultProgress.className = `progress-bar ${progressClass}`;
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').textContent = formatTime(elapsed);
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Restart functions
function restartQuiz() {
    // Giữ nguyên bộ câu hỏi hiện tại
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    startTime = Date.now();
    
    document.getElementById('resultsContainer').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
    
    startTimer();
    showQuestion();
}

function backToSelection() {
    clearInterval(timerInterval);
    document.getElementById('resultsContainer').classList.add('d-none');
    document.getElementById('quizContainer').classList.add('d-none');
    document.getElementById('quizSelection').classList.remove('d-none');
}

// Mobile menu setup
function setupMobileMenu() {
    const menuToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-collapse');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}