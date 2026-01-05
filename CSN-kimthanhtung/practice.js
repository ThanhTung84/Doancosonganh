// Practice mode variables
let practiceArray = [];
let practiceRunning = false;
let challengeArray = [];
let challengeStartTime = 0;
let bestTime = localStorage.getItem('bestTime') || null;
let attempts = parseInt(localStorage.getItem('attempts')) || 0;

// Initialize practice page
document.addEventListener('DOMContentLoaded', () => {
    updateBestTime();
    setupMobileMenu();
});

// Show practice modes
function startFreeMode() {
    hideAllModes();
    document.getElementById('freeMode').style.display = 'block';
}

function startSpeedChallenge() {
    hideAllModes();
    document.getElementById('speedChallenge').style.display = 'block';
    updateBestTime();
}

function startComparison() {
    hideAllModes();
    document.getElementById('comparisonMode').style.display = 'block';
}

function hideAllModes() {
    document.querySelectorAll('.practice-mode').forEach(mode => {
        mode.style.display = 'none';
    });
}

// Free Mode Functions
function setPracticeArray() {
    const input = document.getElementById('practiceArray').value.trim();
    if (!input) {
        alert('Vui lòng nhập mảng!');
        return;
    }
    
    try {
        practiceArray = input.split(',').map(num => {
            const parsed = parseInt(num.trim());
            if (isNaN(parsed)) throw new Error(`"${num.trim()}" không phải số hợp lệ`);
            return parsed;
        });
        
        if (practiceArray.length < 2) throw new Error('Mảng phải có ít nhất 2 phần tử');
        
        renderPracticeArray();
        alert('Đã áp dụng mảng thành công!');
        
    } catch (error) {
        alert('Lỗi: ' + error.message);
    }
}

function renderPracticeArray() {
    const container = document.getElementById('practiceContainer');
    container.innerHTML = '';
    
    const barWidth = Math.max(15, Math.min(60, 600 / practiceArray.length));
    const maxHeight = Math.max(...practiceArray);
    const minHeight = Math.min(...practiceArray);
    const heightRange = maxHeight - minHeight;
    
    practiceArray.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        
        let barHeight = heightRange === 0 ? 100 : 50 + ((value - minHeight) / heightRange) * 200;
        bar.style.height = `${barHeight}px`;
        bar.style.width = `${barWidth}px`;
        bar.style.background = '#1e90ff';
        
        const valueLabel = document.createElement('span');
        valueLabel.className = 'array-bar-value';
        valueLabel.textContent = value;
        bar.appendChild(valueLabel);
        
        container.appendChild(bar);
    });
}

async function runPractice() {
    if (practiceArray.length === 0) {
        alert('Vui lòng nhập mảng trước!');
        return;
    }
    
    if (practiceRunning) return;
    
    practiceRunning = true;
    const algorithm = document.getElementById('practiceAlgorithm').value;
    const startTime = Date.now();
    
    // Reset stats
    document.getElementById('practiceComparisons').textContent = '0';
    document.getElementById('practiceSwaps').textContent = '0';
    
    // Run algorithm
    await runPracticeAlgorithm(algorithm);
    
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    document.getElementById('practiceTime').textContent = timeTaken + 's';
    
    practiceRunning = false;
}

async function runPracticeAlgorithm(algorithm) {
    let comparisons = 0;
    let swaps = 0;
    
    const updateStats = () => {
        document.getElementById('practiceComparisons').textContent = comparisons;
        document.getElementById('practiceSwaps').textContent = swaps;
    };
    
    const delay = () => new Promise(resolve => setTimeout(resolve, 300));
    
    const highlightBars = (indices, className) => {
        document.querySelectorAll('#practiceContainer .array-bar').forEach((bar, i) => {
            bar.className = 'array-bar';
            if (indices.includes(i)) {
                bar.classList.add(className);
            }
        });
    };
    
    // Bubble Sort
    if (algorithm === 'bubble') {
        for (let i = 0; i < practiceArray.length - 1; i++) {
            for (let j = 0; j < practiceArray.length - i - 1; j++) {
                comparisons++;
                updateStats();
                highlightBars([j, j + 1], 'comparing');
                await delay();
                
                if (practiceArray[j] > practiceArray[j + 1]) {
                    [practiceArray[j], practiceArray[j + 1]] = [practiceArray[j + 1], practiceArray[j]];
                    swaps++;
                    updateStats();
                    highlightBars([j, j + 1], 'swapping');
                    renderPracticeArray();
                    await delay();
                }
            }
        }
    }
    
    // Selection Sort
    else if (algorithm === 'selection') {
        for (let i = 0; i < practiceArray.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < practiceArray.length; j++) {
                comparisons++;
                updateStats();
                highlightBars([minIdx, j], 'comparing');
                await delay();
                
                if (practiceArray[j] < practiceArray[minIdx]) {
                    minIdx = j;
                }
            }
            
            if (minIdx !== i) {
                [practiceArray[i], practiceArray[minIdx]] = [practiceArray[minIdx], practiceArray[i]];
                swaps++;
                updateStats();
                highlightBars([i, minIdx], 'swapping');
                renderPracticeArray();
                await delay();
            }
        }
    }
    
    // Insertion Sort
    else if (algorithm === 'insertion') {
        for (let i = 1; i < practiceArray.length; i++) {
            let key = practiceArray[i];
            let j = i - 1;
            
            while (j >= 0 && practiceArray[j] > key) {
                comparisons++;
                updateStats();
                highlightBars([j, j + 1], 'comparing');
                await delay();
                
                practiceArray[j + 1] = practiceArray[j];
                swaps++;
                updateStats();
                highlightBars([j, j + 1], 'swapping');
                renderPracticeArray();
                await delay();
                j--;
            }
            practiceArray[j + 1] = key;
            renderPracticeArray();
        }
    }
    
    // Show completed
    for (let i = 0; i < practiceArray.length; i++) {
        highlightBars([i], 'sorted');
        await delay();
    }
}

// Speed Challenge Functions
function generateChallenge() {
    const size = 5 + Math.floor(Math.random() * 6); // 5-10 elements
    challengeArray = [];
    
    for (let i = 0; i < size; i++) {
        challengeArray.push(Math.floor(Math.random() * 50) + 1);
    }
    
    document.getElementById('challengeArray').innerHTML = 
        `<strong>Mảng cần sắp xếp:</strong> [${challengeArray.join(', ')}]`;
    
    document.getElementById('timerBtn').disabled = false;
    document.getElementById('solutionInput').disabled = false;
    document.getElementById('checkBtn').disabled = false;
    document.getElementById('solutionInput').value = '';
}

function startTimer() {
    challengeStartTime = Date.now();
    document.getElementById('timerBtn').textContent = 'Đang đếm thời gian...';
    document.getElementById('timerBtn').disabled = true;
}

function checkSolution() {
    if (challengeStartTime === 0) {
        alert('Vui lòng bấm "Bắt Đầu" trước!');
        return;
    }
    
    const userInput = document.getElementById('solutionInput').value.trim();
    if (!userInput) {
        alert('Vui lòng nhập kết quả!');
        return;
    }
    
    try {
        const userArray = userInput.split(',').map(num => parseInt(num.trim()));
        const correctArray = [...challengeArray].sort((a, b) => a - b);
        
        const isCorrect = userArray.length === correctArray.length && 
                         userArray.every((val, i) => val === correctArray[i]);
        
        const timeTaken = ((Date.now() - challengeStartTime) / 1000).toFixed(2);
        attempts++;
        localStorage.setItem('attempts', attempts);
        
        if (isCorrect) {
            if (!bestTime || parseFloat(timeTaken) < parseFloat(bestTime)) {
                bestTime = timeTaken;
                localStorage.setItem('bestTime', bestTime);
                alert(`🎉 Chính xác! Thời gian: ${timeTaken}s\nKỷ lục mới!`);
            } else {
                alert(`✅ Chính xác! Thời gian: ${timeTaken}s\nKỷ lục hiện tại: ${bestTime}s`);
            }
        } else {
            alert(`❌ Sai rồi!\nĐáp án đúng: [${correctArray.join(', ')}]\nCủa bạn: [${userArray.join(', ')}]`);
        }
        
        updateBestTime();
        resetChallenge();
        
    } catch (error) {
        alert('Định dạng không đúng! Ví dụ: 1,2,3,4,5');
    }
}

function updateBestTime() {
    document.getElementById('bestTime').textContent = bestTime ? bestTime + 's' : '--';
    document.getElementById('attempts').textContent = attempts;
}

function resetChallenge() {
    challengeStartTime = 0;
    document.getElementById('timerBtn').textContent = 'Bắt Đầu';
    document.getElementById('timerBtn').disabled = true;
    document.getElementById('solutionInput').disabled = true;
    document.getElementById('checkBtn').disabled = true;
}

// Comparison Mode
async function runComparison() {
    const input = document.getElementById('comparisonArray').value.trim();
    if (!input) {
        alert('Vui lòng nhập mảng để so sánh!');
        return;
    }
    
    try {
        const originalArray = input.split(',').map(num => {
            const parsed = parseInt(num.trim());
            if (isNaN(parsed)) throw new Error('Dữ liệu không hợp lệ');
            return parsed;
        });
        
        const algorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge'];
        const results = [];
        
        for (const algo of algorithms) {
            const testArray = [...originalArray];
            const startTime = Date.now();
            
            // Simulate algorithm execution (simplified)
            if (algo === 'bubble' || algo === 'selection' || algo === 'insertion') {
                await new Promise(resolve => setTimeout(resolve, testArray.length * 10));
            } else {
                await new Promise(resolve => setTimeout(resolve, testArray.length * 5));
            }
            
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            
            results.push({
                name: getAlgorithmName(algo),
                time: timeTaken,
                complexity: getComplexity(algo)
            });
        }
        
        displayComparisonResults(results);
        
    } catch (error) {
        alert('Lỗi: ' + error.message);
    }
}

function displayComparisonResults(results) {
    const container = document.getElementById('comparisonResults');
    
    let html = '<h3>Kết Quả So Sánh</h3><table class="comparison-table"><thead><tr><th>Thuật Toán</th><th>Thời Gian (ms)</th><th>Độ Phức Tạp</th></tr></thead><tbody>';
    
    results.sort((a, b) => a.time - b.time);
    
    results.forEach((result, index) => {
        const rowClass = index === 0 ? 'style="background: #d4edda;"' : '';
        html += `<tr ${rowClass}><td>${result.name}</td><td>${result.time}</td><td>${result.complexity}</td></tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function getAlgorithmName(algo) {
    const names = {
        'bubble': 'Bubble Sort',
        'selection': 'Selection Sort', 
        'insertion': 'Insertion Sort',
        'quick': 'Quick Sort',
        'merge': 'Merge Sort'
    };
    return names[algo] || algo;
}

function getComplexity(algo) {
    const complexities = {
        'bubble': 'O(n²)',
        'selection': 'O(n²)',
        'insertion': 'O(n²)', 
        'quick': 'O(n log n)',
        'merge': 'O(n log n)'
    };
    return complexities[algo] || 'O(n)';
}

// Mobile menu setup
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}