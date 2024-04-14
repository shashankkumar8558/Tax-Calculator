document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.querySelector('button[type="submit"]');
    const errorIcons = document.querySelectorAll('.error-icon');

    // Function to show or hide error icons
    function toggleErrorIcons(show, errorId) {
        errorIcons.forEach(icon => {
            const iconId = icon.getAttribute('id');
            icon.style.display = show && iconId === errorId ? 'inline-block' : 'none';
        });
    }
    toggleErrorIcons(false); 

    function handleSubmit(e) {
        e.preventDefault();

        const grossIncome = parseFloat(document.getElementById('gross-income').value);
        const extraIncome = parseFloat(document.getElementById('number2').value || 0);
        const ageGroup = document.getElementById('age').value;
        const deduction = parseFloat(document.getElementById('number3').value || 0);

        if (isNaN(grossIncome) || grossIncome < 0) {
            toggleErrorIcons(true, 'error-gross-income');
            return;
        }
        toggleErrorIcons(false, 'error-gross-income');
    
        if (isNaN(extraIncome) || extraIncome < 0) {
            toggleErrorIcons(true, 'error-extra-income');
            return;
        }
        toggleErrorIcons(false, 'error-extra-income');
    
        if (!ageGroup) {
            toggleErrorIcons(true, 'error-age');
            return;
        }
        toggleErrorIcons(false, 'error-age');
    
        if (isNaN(deduction) || deduction < 0) {
            toggleErrorIcons(true, 'error-deduction');
            return;
        }
        toggleErrorIcons(false, 'error-deduction');
    

        let tax = 0;
        const taxableIncome = grossIncome + extraIncome - deduction;

        if (taxableIncome <= 800000) {
            tax = 0;
        } else if (taxableIncome > 800000 && ageGroup === 'under 40') {
            tax = 0.3 * (taxableIncome - 800000);
        } else if (taxableIncome > 800000 && ageGroup === 'between 40 and 60') {
            tax = 0.4 * (taxableIncome - 800000);
        } else if (taxableIncome > 800000 && ageGroup === 'over 60') {
            tax = 0.1 * (taxableIncome - 800000);
        }

        const remaining = taxableIncome - tax;
        showModal(remaining);
    }

    
    function showModal(remaining) {
        const modalContent = document.getElementById('result');
        modalContent.style.display = 'flex'; 
        modalContent.style.justifyContent = 'center';
        modalContent.style.alignItems = 'center'; 
        modalContent.style.flexWrap = 'wrap'
        modalContent.innerHTML = `<p>Your Overall Income Will Be: ₹ ${remaining} after tax deduction.</p>`;

        setTimeout(() => {
            modalContent.style.display = 'none'; 
            toggleErrorIcons(false);
        }, 5000);
    }
    
    submitBtn.addEventListener('click', handleSubmit);
});
