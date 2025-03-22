document.addEventListener('DOMContentLoaded', function() {
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
            aboutText: "AI Engineer specializing in LangChain frameworks, RAG systems, and document processing applications with a focus on making complex information accessible.",
            skills: ["AI Technologies", "Machine Learning", "NLP", "Python"],
            connectTitle: "Connect",
            downloadResume: "Download Resume",
            scanInfo: "Scan to save contact or visit my portfolio",
            copyright: "© 2025 Charaf El Yousfi"
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
            copyright: "© 2025 Charaf El Yousfi"
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
            copyright: "© 2025 شرف اليوسفي"
        }
    };
    
    // Function to apply translations
    function applyTranslation(lang) {
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
        
        // Update download resume button
        document.querySelector('.download-resume span').textContent = t.downloadResume;
        
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
    
// Add this function to your script.js file
function saveContact() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:El Yousfi;Charaf;;;
FN:Charaf El Yousfi
TITLE:AI Engineering Intern @ ANP
EMAIL:charafelyousfi3@gmail.com
TEL:+212621431215
URL:https://charafelyousfi.vercel.app/
NOTE:AI Engineer crafting intelligent solutions at the intersection of human needs and data.
END:VCARD`;
    
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Charaf_El_Yousfi.vcf';
    a.click();
    
    URL.revokeObjectURL(url);
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