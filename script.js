document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    let currentLanguage = 'en';
    
    // Generate QR Code
    const currentUrl = window.location.href;
    new QRCode(document.getElementById("qrcode"), {
        text: currentUrl,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Handle language switching
    const langButtons = document.querySelectorAll('.lang-btn');
    const translations = {
        en: {
            title: "AI Engineering Intern @ ANP",
            location: "Casablanca, Morocco",
            contactTitle: "Contact",
            email: "Email",
            phone: "Call",
            schedule: "Schedule",
            aboutTitle: "About",
            aboutText: "AI Engineer crafting intelligent solutions at the intersection of human needs and data. Turning complex information into accessible magic—with AI agents leading the way. ✨",
            skills: ["AI Technologies", "Machine Learning", "NLP", "Python"],
            connectTitle: "Connect",
            downloadResume: "Download Resume",
            scanInfo: "Scan to save contact or visit my portfolio",
            copyright: "© 2025 Charaf El Yousfi",
            resumeFile: "resume_en.pdf",
            saveContact: "Save Contact",
            contactSaved: "Contact Saved!",
            shareContact: "Share Contact"
        },
        fr: {
            title: "Stagiaire en Ingénierie IA @ ANP",
            location: "Casablanca, Maroc",
            contactTitle: "Contact",
            email: "Email",
            phone: "Appeler",
            schedule: "Planifier",
            aboutTitle: "À propos",
            aboutText: "Ingénieur IA spécialisé dans les frameworks LangChain, les systèmes RAG et les applications de traitement de documents, avec un accent sur l'accessibilité des informations complexes.",
            skills: ["Technologies IA", "Apprentissage Automatique", "TAL", "Python"],
            connectTitle: "Connexion",
            downloadResume: "Télécharger CV",
            scanInfo: "Scannez pour enregistrer le contact ou visiter mon portfolio",
            copyright: "© 2025 Charaf El Yousfi",
            resumeFile: "resume_fr.pdf",
            saveContact: "Enregistrer le contact",
            contactSaved: "Contact enregistré !",
            shareContact: "Partager le contact"
        },
        ar: {
            title: "متدرب هندسة الذكاء الاصطناعي @ ANP",
            location: "الدار البيضاء، المغرب",
            contactTitle: "التواصل",
            email: "البريد",
            phone: "اتصال",
            schedule: "جدولة",
            aboutTitle: "نبذة",
            aboutText: "مهندس ذكاء اصطناعي متخصص في أطر عمل LangChain وأنظمة RAG وتطبيقات معالجة المستندات مع التركيز على جعل المعلومات المعقدة في متناول الجميع.",
            skills: ["تقنيات الذكاء الاصطناعي", "التعلم الآلي", "معالجة اللغة", "بايثون"],
            connectTitle: "التواصل",
            downloadResume: "تحميل السيرة الذاتية",
            scanInfo: "امسح ضوئيًا لحفظ جهة الاتصال أو زيارة معرض أعمالي",
            copyright: "© 2025 شرف اليوسفي",
            resumeFile: "resume_ar.pdf",
            saveContact: "حفظ جهة الاتصال",
            contactSaved: "تم حفظ جهة الاتصال!",
            shareContact: "مشاركة جهة الاتصال"
        }
    };
    
    // Function to apply translations
    function applyTranslation(lang) {
        // Update current language
        currentLanguage = lang;
        
        // Set document language
        document.documentElement.lang = lang;
        
        // Apply translations
        const t = translations[lang];
        
        // Update title
        document.querySelector('.title').textContent = t.title;
        
        // Update location
        const locationEl = document.querySelector('.location');
        locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.location}`;
        
        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles[0].textContent = t.contactTitle;
        sectionTitles[1].textContent = t.aboutTitle;
        sectionTitles[2].textContent = t.connectTitle;
        
        // Update contact buttons
        const contactButtons = document.querySelectorAll('.contact-button span');
        contactButtons[0].textContent = t.email;
        contactButtons[1].textContent = t.phone;
        contactButtons[2].textContent = t.schedule;
        
        // Update about text
        document.querySelector('.about-text').textContent = t.aboutText;
        
        // Update skills
        const skillsContainer = document.querySelector('.skills-container');
        skillsContainer.innerHTML = '';
        t.skills.forEach(skill => {
            const skillBadge = document.createElement('span');
            skillBadge.className = 'skill-badge';
            skillBadge.textContent = skill;
            skillsContainer.appendChild(skillBadge);
        });
        
        // Update download resume button and its href attribute
        const downloadResumeButton = document.querySelector('.download-resume');
        downloadResumeButton.innerHTML = `<i class="fas fa-file-alt"></i><span>${t.downloadResume}</span>`;
        downloadResumeButton.setAttribute('href', t.resumeFile);
        
        // Update save contact button
        const saveContactBtn = document.querySelector('.save-contact-btn span');
        saveContactBtn.textContent = t.saveContact;
        
        // Update share contact button if it exists
        const shareContactBtn = document.querySelector('.share-contact-btn');
        if (shareContactBtn) {
            const shareSpan = shareContactBtn.querySelector('span');
            if (shareSpan) {
                shareSpan.textContent = t.shareContact;
            }
        }
        
        // Update footer text
        const footerTexts = document.querySelectorAll('.card-footer p');
        footerTexts[0].textContent = t.scanInfo;
        footerTexts[1].textContent = t.copyright;
    }
    
    // Set active language and apply translations
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            applyTranslation(lang);
        });
    });
    
    // Check for NFC support
    if ('NDEFReader' in window) {
        const nfcButton = document.createElement('button');
        nfcButton.className = 'nfc-button';
        nfcButton.innerHTML = '<i class="fas fa-wifi"></i> Share via NFC';
        nfcButton.addEventListener('click', async () => {
            try {
                const ndef = new NDEFReader();
                await ndef.write({
                    records: [
                        { recordType: "url", data: window.location.href },
                        { recordType: "text", data: "Charaf El Yousfi - AI Engineer" }
                    ]
                });
                alert("Hold your phone near an NFC-enabled device to share your card");
            } catch (error) {
                console.error("NFC sharing failed:", error);
                alert("NFC sharing failed. Try using the QR code instead.");
            }
        });
        
        document.querySelector('.card-footer').insertBefore(nfcButton, document.querySelector('.qr-code'));
    }
    
    // Save Contact function - supports multiple platforms
    window.saveContact = function() {
        const lang = currentLanguage;
        const t = translations[lang];
        
        // Create vCard data string
        const vCardData = `BEGIN:VCARD
VERSION:3.0
N:El Yousfi;Charaf;;;
FN:Charaf El Yousfi
TITLE:${t.title}
EMAIL:charafelyousfi3@gmail.com
TEL:+212621431215
URL:https://charafelyousfi.vercel.app/
NOTE:AI Engineer crafting intelligent solutions at the intersection of human needs and data.
END:VCARD`;
        
        // Check if Web Share API is available (mainly for Android)
        if (navigator.share && navigator.canShare) {
            // Create file to share
            const vCardFile = new File([vCardData], 'Charaf_El_Yousfi.vcf', {
                type: 'text/vcard',
            });
            
            const shareData = {
                title: 'Charaf El Yousfi Contact',
                text: 'Contact information for Charaf El Yousfi',
                files: [vCardFile]
            };
            
            // Check if sharing files is supported
            if (navigator.canShare(shareData)) {
                navigator.share(shareData)
                    .then(() => {
                        // Success - show feedback
                        showContactSavedFeedback(t.contactSaved);
                    })
                    .catch(err => {
                        console.error('Error sharing: ', err);
                        // Fall back to download
                        downloadVCard(vCardData);
                    });
                return;
            }
        }
        
        // Fall back to direct download if sharing isn't available
        downloadVCard(vCardData);
    };
    
    // Helper function to download vCard
    function downloadVCard(vCardData) {
        const lang = currentLanguage;
        const t = translations[lang];
        
        // Create a Blob with the vCard data
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Charaf_El_Yousfi.vcf';
        
        // Append to the document
        document.body.appendChild(a);
        
        // Trigger the download
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        // Show feedback
        showContactSavedFeedback(t.contactSaved);
    }
    
    // Helper function for showing feedback
    function showContactSavedFeedback(message) {
        const saveBtn = document.querySelector('.save-contact-btn');
        if (saveBtn) {
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = `<i class="fas fa-check"></i><span>${message}</span>`;
            saveBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                const lang = currentLanguage;
                const t = translations[lang];
                saveBtn.innerHTML = `<i class="fas fa-user-plus"></i><span>${t.saveContact}</span>`;
                saveBtn.style.backgroundColor = '';
            }, 3000);
        }
    }
    
    // Add share contact button if Web Share API is available
    if (navigator.share) {
        const shareContactBtn = document.createElement('button');
        shareContactBtn.className = 'share-contact-btn';
        shareContactBtn.innerHTML = `<i class="fas fa-share-alt"></i><span>${translations['en'].shareContact}</span>`;
        shareContactBtn.addEventListener('click', function() {
            const lang = currentLanguage;
            const t = translations[lang];
            
            navigator.share({
                title: 'Charaf El Yousfi',
                text: `${t.title} | +212621431215 | charafelyousfi3@gmail.com`,
                url: window.location.href
            }).then(() => {
                console.log('Contact shared successfully');
            }).catch((error) => {
                console.error('Error sharing', error);
            });
        });
        
        // Add the button after the save contact button
        const contactSection = document.querySelector('.save-contact-btn').parentNode;
        contactSection.appendChild(shareContactBtn);
    }
    
    // Add smooth animations
    document.querySelectorAll('.card-section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add visit tracking (simple method)
    function trackVisit() {
        // This is a very basic implementation
        // In a real-world scenario, you might want to use a proper analytics service
        const visits = localStorage.getItem('card_visits') ? parseInt(localStorage.getItem('card_visits')) : 0;
        localStorage.setItem('card_visits', visits + 1);
        
        // You could implement a server-side tracking endpoint here
        // fetch('/api/track-visit', { method: 'POST' });
    }
    
    trackVisit();
    
    // Apply default language (English)
    applyTranslation('en');
});

// Add service worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}