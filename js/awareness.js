// BloodConnect - Awareness & Education Hub Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
    initEligibilityChecker();
    initKnowledgeQuiz();
});

/* -------------------------------------------------------------------------
   1. Interactive Donation Eligibility Quick Check
   ------------------------------------------------------------------------- */
function initEligibilityChecker() {
    const form = document.getElementById('eligibilityForm');
    const resetBtn = document.getElementById('resetEligibilityBtn');
    const resultBox = document.getElementById('eligibilityResultBox');

    if (!form || !resultBox) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const age = parseInt(document.getElementById('checkAge').value, 10);
        const weight = parseFloat(document.getElementById('checkWeight').value);
        const hb = document.getElementById('checkHb').value;
        const health = document.getElementById('checkHealth').value;
        const lastDonation = document.getElementById('checkLastDonation').value;
        const tattoo = document.getElementById('checkTattoo').value;

        const deferralReasons = [];

        // Clinical Evaluation Checks
        if (isNaN(age) || age < 18) {
            deferralReasons.push('Age under 18: Voluntary blood donors must be at least 18 years of age.');
        } else if (age > 65) {
            deferralReasons.push('Age over 65: Standard voluntary donor guidelines set the upper limit at 65 years.');
        }

        if (isNaN(weight) || weight < 45) {
            deferralReasons.push('Weight under 45 kg: Minimum weight is 45 kg (50 kg recommended for standard 450ml collection) to prevent post-donation hypovolemia.');
        }

        if (hb === 'low') {
            deferralReasons.push('Low Hemoglobin: Hemoglobin must be at least 12.5 g/dL. Increase dietary iron and re-check in 4–6 weeks.');
        }

        if (health === 'sick') {
            deferralReasons.push('Recent illness: Must be symptom-free without active cold, fever, or antibiotic therapy for at least 48 hours.');
        }

        if (lastDonation === 'recent') {
            deferralReasons.push('Recent donation: Whole blood requires a mandatory 90-day recovery interval for men (120 days for women) to let iron reserves replenish.');
        }

        if (tattoo === 'yes') {
            deferralReasons.push('Recent tattoo or piercing: A 6-month safety window is required to completely rule out blood-borne viral transmission.');
        }

        // Render live result
        if (deferralReasons.length === 0) {
            const hbNote = hb === 'unsure' 
                ? '<br><small style="color: #15803d;"><em>Note: Your hemoglobin will be tested free via finger-prick on-site before collection.</em></small>' 
                : '';

            resultBox.className = 'result-box eligible';
            resultBox.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 2rem; color: #16a34a; margin-top: 2px;"></i>
                    <div>
                        <strong style="font-size: 1.15rem; color: #166534; display: block; margin-bottom: 6px;">
                            🎉 You Are Very Likely Eligible to Donate!
                        </strong>
                        <p style="font-size: 0.95rem; margin-bottom: 12px; color: #14532d;">
                            Based on your parameters (Age: <strong>${age}</strong>, Weight: <strong>${weight} kg</strong>), you meet the core requirements prescribed by health authorities.
                            ${hbNote}
                        </p>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <a href="donate-blood.html" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                                <i class="fa-solid fa-heart-pulse"></i> Register as Donor
                            </a>
                            <a href="blood-camps.html" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                                <i class="fa-solid fa-tent"></i> Find Nearest Camp
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const reasonsHtml = deferralReasons.map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('');
            resultBox.className = 'result-box deferred';
            resultBox.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; color: #d97706; margin-top: 2px;"></i>
                    <div>
                        <strong style="font-size: 1.15rem; color: #92400e; display: block; margin-bottom: 6px;">
                            ⏳ Temporary Deferral Advised
                        </strong>
                        <p style="font-size: 0.93rem; color: #78350f; margin-bottom: 8px;">
                            For your safety and the recipient's well-being, you may need to wait before donating:
                        </p>
                        <ul style="padding-left: 18px; font-size: 0.9rem; color: #78350f; line-height: 1.5; margin-bottom: 10px;">
                            ${reasonsHtml}
                        </ul>
                        <small style="color: #92400e; display: block; font-style: italic;">
                            Temporary deferrals are completely normal and standard medical practice. You can donate once the deferral period passes!
                        </small>
                    </div>
                </div>
            `;
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultBox.className = 'result-box initial';
        resultBox.innerHTML = `
            <i class="fa-solid fa-user-check" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px; display: block;"></i>
            <strong style="display: block; font-size: 1.05rem; margin-bottom: 6px;">Ready to Check</strong>
            <p style="font-size: 0.92rem; margin: 0;">Adjust the parameters on the left and click <strong>Check Eligibility Now</strong> to see your live status.</p>
        `;
    });
}

/* -------------------------------------------------------------------------
   2. Expanded 5-Question Blood Donation Knowledge Quiz
   ------------------------------------------------------------------------- */
function initKnowledgeQuiz() {
    const quizForm = document.getElementById('knowledgeQuizForm');
    const resetQuizBtn = document.getElementById('resetQuizBtn');
    const scoreBanner = document.getElementById('scoreBanner');
    const scoreTitle = document.getElementById('scoreBannerTitle');
    const scoreText = document.getElementById('scoreBannerText');

    if (!quizForm) return;

    // Quiz Questions Data (Keys match radio button group names)
    const quizData = {
        q1: {
            correct: '3months',
            explanation: 'Whole blood can safely be donated every 90 days (3 months) for men and 120 days for women. This spacing provides ample time for erythrocyte production and iron stores to return to optimal levels.'
        },
        q2: {
            correct: 'ABpos',
            explanation: 'AB-positive (AB+) individuals possess both A and B antigens on their red blood cells and have the Rh factor, with zero anti-A or anti-B antibodies in their plasma. This allows them to safely receive red blood cells from any blood type (O-, O+, A-, A+, B-, B+, AB-, AB+).'
        },
        q3: {
            correct: '6months',
            explanation: 'Standard medical protocols enforce a 6-month waiting period after receiving a tattoo or piercing. This deferral window eliminates any theoretical risk of transmitting blood-borne viruses (such as Hepatitis B, Hepatitis C, or HIV).'
        },
        q4: {
            correct: '7to8',
            explanation: 'An average adult human body contains between 4.5 and 5.5 liters of blood. A standard whole blood donation of 350ml to 450ml accounts for only roughly 7% to 8% of total volume, which is quickly regenerated by the body with zero adverse effects.'
        },
        q5: {
            correct: '35to42days',
            explanation: 'Packed red blood cells preserved in anticoagulant solutions (like CPDA-1 or additive solutions like SAGM) at refrigerated temperatures of 2°C to 6°C have an approved shelf life of 35 to 42 days. Platelets, by comparison, expire in just 5 days.'
        }
    };

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let score = 0;
        const total = 5;

        // Loop through each question
        for (let i = 1; i <= total; i++) {
            const qKey = `q${i}`;
            const qInfo = quizData[qKey];
            const card = document.getElementById(`qCard${i}`);
            const feedbackEl = document.getElementById(`qFeedback${i}`);
            const selectedRadio = document.querySelector(`input[name="${qKey}"]:checked`);
            const allLabels = card.querySelectorAll('.quiz-opt-label');

            // Reset label states
            allLabels.forEach(label => {
                label.classList.remove('is-correct', 'is-incorrect');
            });

            const userVal = selectedRadio ? selectedRadio.value : null;
            const isCorrect = userVal === qInfo.correct;

            if (isCorrect) {
                score++;
                card.className = 'quiz-question-card status-correct';
                if (feedbackEl) {
                    feedbackEl.className = 'q-feedback correct';
                    feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong> ${qInfo.explanation}`;
                }
            } else {
                card.className = 'quiz-question-card status-incorrect';
                const prefix = userVal 
                    ? '<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong> ' 
                    : '<strong><i class="fa-solid fa-circle-question"></i> Not answered.</strong> ';
                if (feedbackEl) {
                    feedbackEl.className = 'q-feedback incorrect';
                    feedbackEl.innerHTML = `${prefix}${qInfo.explanation}`;
                }
            }

            // Highlight choice styles
            allLabels.forEach(label => {
                const radio = label.querySelector('input[type="radio"]');
                if (radio.value === qInfo.correct) {
                    label.classList.add('is-correct');
                } else if (selectedRadio && radio === selectedRadio && !isCorrect) {
                    label.classList.add('is-incorrect');
                }
            });
        }

        // Display Score Summary Banner
        const percentage = Math.round((score / total) * 100);
        scoreBanner.classList.remove('perfect', 'good', 'needs-review');
        scoreBanner.classList.add('show');

        if (score === 5) {
            scoreBanner.classList.add('perfect');
            scoreTitle.innerHTML = `<i class="fa-solid fa-trophy" style="color: #eab308; margin-right: 8px;"></i>Perfect Score: 5 / 5 (100%)`;
            scoreText.innerText = 'Outstanding! You have expert-level knowledge of transfusion medicine, donor safety, and blood components.';
        } else if (score >= 3) {
            scoreBanner.classList.add('good');
            scoreTitle.innerHTML = `<i class="fa-solid fa-medal" style="color: #3b82f6; margin-right: 8px;"></i>Great Job: ${score} / ${total} (${percentage}%)`;
            scoreText.innerText = 'You possess a strong understanding of blood donation facts. Review the highlighted explanations below to sharpen your knowledge!';
        } else {
            scoreBanner.classList.add('needs-review');
            scoreTitle.innerHTML = `<i class="fa-solid fa-lightbulb" style="color: #f59e0b; margin-right: 8px;"></i>Knowledge Builder: ${score} / ${total} (${percentage}%)`;
            scoreText.innerText = 'Good effort! Read through the detailed medical feedback under each question to learn more about saving lives through blood donation.';
        }

        // Smooth scroll to top of quiz container so the user immediately sees the score
        scoreBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Reset Quiz
    resetQuizBtn.addEventListener('click', () => {
        quizForm.reset();
        scoreBanner.classList.remove('show', 'perfect', 'good', 'needs-review');

        for (let i = 1; i <= 5; i++) {
            const card = document.getElementById(`qCard${i}`);
            const feedbackEl = document.getElementById(`qFeedback${i}`);
            if (card) {
                card.className = 'quiz-question-card';
                card.querySelectorAll('.quiz-opt-label').forEach(lbl => {
                    lbl.classList.remove('is-correct', 'is-incorrect');
                });
            }
            if (feedbackEl) {
                feedbackEl.className = 'q-feedback';
                feedbackEl.innerHTML = '';
            }
        }
    });
}
