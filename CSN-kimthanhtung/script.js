// Biến toàn cục
let array = [];
let arraySize = 15;
let speed = 5;
let isRunning = false;
let isPaused = false;
let comparisons = 0;
let swaps = 0;
let currentAlgorithm = 'bubble';

// Thông tin thuật toán
const algorithmInfo = {
    bubble: {
        name: 'Bubble Sort (Sắp Xếp Nổi Bọt)',
        description: 'Thuật toán so sánh các cặp phần tử liền kề và hoán đổi chúng nếu chúng sai thứ tự. Quá trình lặp lại cho đến khi mảng được sắp xếp.',
        complexity: 'O(n²)'
    },
    selection: {
        name: 'Selection Sort (Sắp Xếp Chọn)',
        description: 'Thuật toán tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đặt nó vào đầu. Lặp lại cho đến khi hoàn thành.',
        complexity: 'O(n²)'
    },
    insertion: {
        name: 'Insertion Sort (Sắp Xếp Chèn)',
        description: 'Thuật toán xây dựng mảng đã sắp xếp từng phần tử một bằng cách chèn mỗi phần tử vào vị trí đúng.',
        complexity: 'O(n²)'
    },
    quick: {
        name: 'Quick Sort (Sắp Xếp Nhanh)',
        description: 'Thuật toán chia để trị chọn một phần tử làm pivot và phân hoạch mảng thành hai phần nhỏ hơn và lớn hơn pivot.',
        complexity: 'O(n log n)'
    },
    merge: {
        name: 'Merge Sort (Sắp Xếp Trộn)',
        description: 'Thuật toán chia để trị chia mảng thành các mảng con nhỏ hơn, sắp xếp chúng và sau đó trộn lại.',
        complexity: 'O(n log n)'
    }
};

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    initializeArray();
    setupEventListeners();
    updateAlgorithmInfo();
    setupMobileMenu();
});

// Menu mobile
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Đóng menu khi click vào link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Thiết lập sự kiện
function setupEventListeners() {
    // Nút thuật toán
    document.querySelectorAll('.algo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isRunning) return;
            document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAlgorithm = btn.dataset.algo;
            updateAlgorithmInfo();
            resetArray();
        });
    });

    // Nút điều khiển
    document.getElementById('startBtn').addEventListener('click', startSorting);
    document.getElementById('pauseBtn').addEventListener('click', pauseSorting);
    document.getElementById('resetBtn').addEventListener('click', resetArray);
    document.getElementById('randomBtn').addEventListener('click', randomizeArray);
    document.getElementById('applyCustomBtn').addEventListener('click', applyCustomArray);

    // Xử lý mảng mẫu
    document.querySelectorAll('[data-array]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isRunning) return;
            const arrayStr = btn.dataset.array;
            document.getElementById('customArray').value = arrayStr;
            applyCustomArray();
        });
    });

    // Thanh trượt
    document.getElementById('speedSlider').addEventListener('input', (e) => {
        speed = parseInt(e.target.value);
        document.getElementById('speedValue').textContent = speed;
    });

    document.getElementById('sizeSlider').addEventListener('input', (e) => {
        if (isRunning) return;
        arraySize = parseInt(e.target.value);
        document.getElementById('sizeValue').textContent = arraySize;
        initializeArray();
    });
}

// Cập nhật thông tin thuật toán
function updateAlgorithmInfo() {
    const info = algorithmInfo[currentAlgorithm];
    document.getElementById('algo-name').textContent = info.name;
    document.getElementById('algo-description').textContent = info.description;
    document.getElementById('algo-complexity').textContent = info.complexity;
}

// Khởi tạo mảng
function initializeArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 300) + 20);
    }
    renderArray();
    resetStats();
}

// Render mảng
function renderArray(highlightIndices = [], state = '') {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    
    const barWidth = Math.max(10, Math.min(50, 800 / arraySize));
    const maxHeight = Math.max(...array);
    const minHeight = Math.min(...array);
    const heightRange = maxHeight - minHeight;
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        
        // Tính chiều cao tương đối để hiển thị đẹp hơn
        let barHeight;
        if (heightRange === 0) {
            barHeight = 100; // Nếu tất cả số bằng nhau
        } else {
            barHeight = 50 + ((value - minHeight) / heightRange) * 250; // Scale từ 50px đến 300px
        }
        
        bar.style.height = `${barHeight}px`;
        bar.style.width = `${barWidth}px`;
        
        if (highlightIndices.includes(index)) {
            bar.classList.add(state);
        }
        
        const valueLabel = document.createElement('span');
        valueLabel.className = 'array-bar-value';
        valueLabel.textContent = value;
        bar.appendChild(valueLabel);
        
        container.appendChild(bar);
    });
}

// Hàm delay
function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000 / speed));
}

// Bắt đầu sắp xếp
async function startSorting() {
    if (isRunning) return;
    
    isRunning = true;
    isPaused = false;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('status').textContent = 'Đang chạy';
    
    switch(currentAlgorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
    }
    
    if (!isPaused) {
        await showSorted();
        document.getElementById('status').textContent = 'Hoàn thành';
    }
    
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

// Tạm dừng
function pauseSorting() {
    isPaused = true;
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('status').textContent = 'Tạm dừng';
}

// Reset
function resetArray() {
    isPaused = false;
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    initializeArray();
    document.getElementById('status').textContent = 'Sẵn sàng';
}

// Ngẫu nhiên
function randomizeArray() {
    if (isRunning) return;
    initializeArray();
}

// Áp dụng mảng tùy chỉnh
function applyCustomArray() {
    if (isRunning) return;
    
    const input = document.getElementById('customArray').value.trim();
    if (!input) {
        alert('Vui lòng nhập mảng số!');
        return;
    }
    
    try {
        // Parse mảng từ input
        const customArray = input.split(',').map(num => {
            const parsed = parseInt(num.trim());
            if (isNaN(parsed)) {
                throw new Error(`"${num.trim()}" không phải là số hợp lệ`);
            }
            if (parsed < 1 || parsed > 999) {
                throw new Error(`Số ${parsed} phải trong khoảng 1-999`);
            }
            return parsed;
        });
        
        if (customArray.length < 2) {
            throw new Error('Mảng phải có ít nhất 2 phần tử');
        }
        
        if (customArray.length > 50) {
            throw new Error('Mảng không được quá 50 phần tử');
        }
        
        // Cập nhật mảng và giao diện
        array = [...customArray];
        arraySize = array.length;
        
        // Cập nhật slider
        document.getElementById('sizeSlider').value = arraySize;
        document.getElementById('sizeValue').textContent = arraySize;
        
        renderArray();
        resetStats();
        
        // Hiển thị thông báo thành công
        showMessage('Đã áp dụng mảng tùy chỉnh thành công!', 'success');
        
    } catch (error) {
        alert('Lỗi: ' + error.message + '\n\nVí dụ đúng: 64, 34, 25, 12, 22, 11, 90');
    }
}

// Hiển thị thông báo
function showMessage(text, type = 'info') {
    // Tạo element thông báo
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    if (type === 'success') {
        message.style.background = '#d4edda';
        message.style.color = '#155724';
        message.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        message.style.background = '#f8d7da';
        message.style.color = '#721c24';
        message.style.border = '1px solid #f5c6cb';
    } else {
        message.style.background = '#d1ecf1';
        message.style.color = '#0c5460';
        message.style.border = '1px solid #bee5eb';
    }
    
    document.body.appendChild(message);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Reset thống kê
function resetStats() {
    comparisons = 0;
    swaps = 0;
    updateStats();
}

// Cập nhật thống kê
function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

// Hiển thị hoàn thành
async function showSorted() {
    for (let i = 0; i < array.length; i++) {
        renderArray([i], 'sorted');
        await delay();
    }
}

// BUBBLE SORT
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isPaused) return;
            
            comparisons++;
            updateStats();
            renderArray([j, j + 1], 'comparing');
            await delay();
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                updateStats();
                renderArray([j, j + 1], 'swapping');
                await delay();
            }
        }
        renderArray([array.length - i - 1], 'sorted');
    }
}

// SELECTION SORT
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < array.length; j++) {
            if (isPaused) return;
            
            comparisons++;
            updateStats();
            renderArray([minIdx, j], 'comparing');
            await delay();
            
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            swaps++;
            updateStats();
            renderArray([i, minIdx], 'swapping');
            await delay();
        }
        renderArray([i], 'sorted');
    }
}

// INSERTION SORT
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0 && array[j] > key) {
            if (isPaused) return;
            
            comparisons++;
            updateStats();
            renderArray([j, j + 1], 'comparing');
            await delay();
            
            array[j + 1] = array[j];
            swaps++;
            updateStats();
            renderArray([j, j + 1], 'swapping');
            await delay();
            j--;
        }
        array[j + 1] = key;
    }
}


