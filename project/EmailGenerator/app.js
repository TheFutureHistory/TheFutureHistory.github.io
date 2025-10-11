// Generate and display emails when button is clicked
document.getElementById('generateEmails').addEventListener('click', function() {
    // Get input values
    const firstName = document.getElementById('firstName').value.trim().toLowerCase();
    const lastName = document.getElementById('lastName').value.trim().toLowerCase();
    const companyName = document.getElementById('companyName').value.trim().toLowerCase();

    // Generate email addresses
const emails = [
    // Company domain variations
    `${firstName}.${lastName}@${companyName}.com`,
    `${firstName}${lastName}@${companyName}.com`,
    `${firstName}_${lastName}@${companyName}.com`,
    `${firstName}-${lastName}@${companyName}.com`,
    `${lastName}.${firstName}@${companyName}.com`,
    `${lastName}${firstName}@${companyName}.com`,
    `${firstName[0]}${lastName}@${companyName}.com`,
    `${firstName}${lastName[0]}@${companyName}.com`,
    `${firstName[0]}.${lastName}@${companyName}.com`,
    `${firstName}.${lastName[0]}@${companyName}.com`,
    
    // Gmail variations
    `${firstName}.${lastName}@gmail.com`,
    `${firstName}${lastName}@gmail.com`,
    `${firstName}_${lastName}@gmail.com`,
    `${firstName}-${lastName}@gmail.com`,
    `${lastName}.${firstName}@gmail.com`,
    `${firstName[0]}${lastName}@gmail.com`,
    `${firstName}${lastName[0]}@gmail.com`,
    `${firstName[0]}.${lastName}@gmail.com`,
    
    // Outlook variations
    `${firstName}.${lastName}@outlook.com`,
    `${firstName}${lastName}@outlook.com`,
    `${firstName}_${lastName}@outlook.com`,
    `${firstName}-${lastName}@outlook.com`,
    `${lastName}.${firstName}@outlook.com`,
    `${firstName[0]}${lastName}@outlook.com`,
    
    // Hotmail variations
    `${firstName}.${lastName}@hotmail.com`,
    `${firstName}${lastName}@hotmail.com`,
    `${firstName}_${lastName}@hotmail.com`,
    `${firstName}-${lastName}@hotmail.com`,
    `${lastName}.${firstName}@hotmail.com`,
    `${firstName[0]}${lastName}@hotmail.com`,
    `${firstName}.${lastName}@hotmail.co.uk`,
    `${firstName}${lastName}@hotmail.co.uk`,
    
    // Yahoo variations
    `${firstName}.${lastName}@yahoo.com`,
    `${firstName}${lastName}@yahoo.com`,
    `${firstName}_${lastName}@yahoo.com`,
    `${firstName}-${lastName}@yahoo.com`,
    `${lastName}.${firstName}@yahoo.com`,
    `${firstName[0]}${lastName}@yahoo.com`,
    
    // iCloud variations
    `${firstName}.${lastName}@icloud.com`,
    `${firstName}${lastName}@icloud.com`,
    `${firstName}_${lastName}@icloud.com`,
    `${firstName}-${lastName}@icloud.com`,
    `${lastName}.${firstName}@icloud.com`,

    // ISP emails
    `${firstName}.${lastName}@verizon.net`,
    `${firstName}${lastName}@verizon.net`,
    `${firstName}.${lastName}@comcast.net`,
    `${firstName}${lastName}@comcast.net`,
    `${firstName}.${lastName}@att.net`,
    `${firstName}${lastName}@att.net`,
    `${firstName}.${lastName}@sbcglobal.net`,
    `${firstName}${lastName}@sbcglobal.net`,

];

    // Clear previous results
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = '';

    // Display results
    emails.forEach((email, index) => {
        const emailElement = document.createElement('h3');
        emailElement.className = 'resultRow';
        emailElement.id = `emailResult${index + 1}`;
        emailElement.textContent = email;
        resultsDiv.appendChild(emailElement);
    });

    // Add Copy All button
    if (emails.length > 0) {
        const copyAllBtn = document.createElement('button');
        copyAllBtn.id = 'copyAllBtn';
        copyAllBtn.className = 'btn-copy-all';
        copyAllBtn.textContent = 'Copy All';
        resultsDiv.appendChild(copyAllBtn);
    }
});

// Check if inputs are filled to enable button
function checkInput() {
    const companyName = document.getElementById('companyName').value;
    const lastName = document.getElementById('lastName').value;
    const button = document.getElementById('generateEmails');
    
    if (!companyName || !lastName) {
        button.style.opacity = '0.25';
        button.style.pointerEvents = 'none';
    } else {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = "pointer";
    }
}

// Add click event listener to copy emails to clipboard
document.addEventListener('click', function(e) {
    // Copy individual email
    if (e.target.classList.contains('resultRow')) {
        const emailText = e.target.textContent;
        
        navigator.clipboard.writeText(emailText).then(() => {
            const originalText = e.target.textContent;
            
            e.target.textContent = '✓ Copied!';
            e.target.style.background = 'var(--accent-blue)';
            e.target.style.color = 'var(--secondary-color)';
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.background = '';
                e.target.style.color = '';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
    
    // Copy all emails
    if (e.target.id === 'copyAllBtn') {
        const allEmails = Array.from(document.querySelectorAll('.resultRow'))
            .map(el => el.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(allEmails).then(() => {
            const originalText = e.target.textContent;
            
            e.target.textContent = '✓ All Copied!';
            
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy all:', err);
        });
    }
});


        // `${firstName}.${lastName}@hotmail.com`,
        // `${firstName}.${lastName}@yahoo.com`,
        // `${firstName}.${lastName}@outlook.com`,
        // `${firstName}.${lastName}@aol.com`,
        // `${firstName}.${lastName}@icloud.com`,
        // `${firstName}.${lastName}@live.com`,
        // `${firstName}.${lastName}@verizon.net`,
        // `${firstName}.${lastName}@comcast.net`,
        // `${firstName}.${lastName}@hotmail.co.uk`,
        // `${firstName}.${lastName}@tiscali.co.uk`,
        // `${firstName}${lastName}@hotmail.com`,
        // `${firstName}${lastName}@yahoo.com`,
        // `${firstName}${lastName}@outlook.com`,
        // `${firstName}${lastName}@aol.com`,
        // `${firstName}${lastName}@icloud.com`,
        // `${firstName}${lastName}@live.com`,
        // `${firstName}${lastName}@verizon.net`,
        // `${firstName}${lastName}@comcast.net`,
        // `${firstName}${lastName}@hotmail.co.uk`,
        // `${firstName}${lastName}@tiscali.co.uk`,