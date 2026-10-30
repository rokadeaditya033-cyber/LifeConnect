document.addEventListener('DOMContentLoaded', () => {
    const quizBtn = document.getElementById('submitQuizBtn');
    if (quizBtn) {
        quizBtn.addEventListener('click', () => {
            const selected = document.querySelector('input[name="q1"]:checked');
            const result = document.getElementById('quizResult');
            if (!selected) {
                result.innerText = 'Please select an option.';
                result.className = 'text-danger';
                return;
            }
            if (selected.value === 'correct') {
                result.innerText = 'Correct! Whole blood can be safely donated every 3 months.';
                result.className = 'text-success';
            } else {
                result.innerText = 'Incorrect. The correct interval is every 3 months.';
                result.className = 'text-danger';
            }
        });
    }
});
