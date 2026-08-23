// FILTER - Job Board + Marketplace
const jobBoardCheckbox = document.getElementById('jobBoard');
const jobBoardLabel = document.querySelector('label[for="jobBoard"]');
const marketplaceCheckbox = document.getElementById('marketplace');
const marketplaceLabel = document.querySelector('label[for="marketplace"]');
const companiesCheckbox = document.getElementById('company'); // matches normalize('Companies')
const companiesLabel = document.querySelector('label[for="company"]');
const toolCheckbox = document.getElementById('tool'); // matches normalize('Companies')
const toolLabel = document.querySelector('label[for="tool"]');
jobBoardCheckbox.addEventListener('change', function() {
    if (this.checked) {
        marketplaceCheckbox.checked = false;
        marketplaceLabel.style.opacity = "0.25";
        companiesCheckbox.checked = false;
        companiesLabel.style.opacity = "0.25";
        jobBoardLabel.style.opacity = "1";
        toolCheckbox.checked = false;
        toolLabel.style.opacity = "0.25";
    } else {
        marketplaceLabel.style.opacity = "1";
        companiesLabel.style.opacity = "1";
        toolLabel.style.opacity = "1";
    }
});
marketplaceCheckbox.addEventListener('change', function() {
    if (this.checked) {
        jobBoardCheckbox.checked = false;
        jobBoardLabel.style.opacity = "0.25";
        companiesCheckbox.checked = false;
        companiesLabel.style.opacity = "0.25";
        marketplaceLabel.style.opacity = "1";
        toolCheckbox.checked = false;
        toolLabel.style.opacity = "0.25";
    } else {
        jobBoardLabel.style.opacity = "1";
        companiesLabel.style.opacity = "1";
        toolLabel.style.opacity = "1";
    }
});
companiesCheckbox.addEventListener('change', function() {
    if (this.checked) {
        jobBoardCheckbox.checked = false;
        jobBoardLabel.style.opacity = "0.25";
        marketplaceCheckbox.checked = false;
        marketplaceLabel.style.opacity = "0.25";
        companiesLabel.style.opacity = "1";
        toolCheckbox.checked = false;
        toolLabel.style.opacity = "0.25";
    } else {
        jobBoardLabel.style.opacity = "1";
        marketplaceLabel.style.opacity = "1";
        toolLabel.style.opacity = "1";
    }
});
toolCheckbox.addEventListener('change', function() {
    if (this.checked) {
        jobBoardCheckbox.checked = false;
        jobBoardLabel.style.opacity = "0.25";
        marketplaceCheckbox.checked = false;
        marketplaceLabel.style.opacity = "0.25";
        companiesCheckbox.checked = false;
        companiesLabel.style.opacity = "0.25";
        toolLabel.style.opacity = "1";
    } else {
        jobBoardLabel.style.opacity = "1";
        marketplaceLabel.style.opacity = "1";
        companiesLabel.style.opacity = "1";
    }
});

// FILTER -  Worldwide + United States + Canada
const unitedStatesCheckbox = document.getElementById('unitedStates');
const unitedStatesLabel = document.querySelector('label[for="unitedStates"]');
const canadaCheckbox = document.getElementById('canada');
const canadaLabel = document.querySelector('label[for="canada"]');
unitedStatesCheckbox.addEventListener('change', function() {
    if (this.checked) {
        canadaCheckbox.checked = false;
        canadaLabel.style.opacity = "0.25";
        unitedStatesLabel.style.opacity = "1";
    } else {
        canadaCheckbox.checked = false;
        canadaLabel.style.opacity = "1";
    }
});
canadaCheckbox.addEventListener('change', function() {
    if (this.checked) {
        unitedStatesCheckbox.checked = false;
        unitedStatesLabel.style.opacity = "0.25";
        canadaLabel.style.opacity = "1";
    } else {
        unitedStatesCheckbox.checked = false;
        unitedStatesLabel.style.opacity = "1";
    }
});

// FILTER - Remote + Freelance + Hybrid + OnSite
const remoteCheckbox = document.getElementById('remote');
const remoteLabel = document.querySelector('label[for="remote"]');
const freelanceCheckbox = document.getElementById('freelance');
const freelanceLabel = document.querySelector('label[for="freelance"]');
const hybridCheckbox = document.getElementById('hybrid');
const hybridLabel = document.querySelector('label[for="hybrid"]');
const onSiteCheckbox = document.getElementById('onSite');
const onSiteLabel = document.querySelector('label[for="onSite"]');
remoteCheckbox.addEventListener('change', function() {
    if (this.checked) {
        freelanceCheckbox.checked = false;
        freelanceLabel.style.opacity = "0.25";
        hybridCheckbox.checked = false;
        hybridLabel.style.opacity = "0.25";
        onSiteCheckbox.checked = false;
        onSiteLabel.style.opacity = "0.25";
        remoteLabel.style.opacity = "1";
    } else {
        freelanceLabel.style.opacity = "1";
        hybridLabel.style.opacity = "1";
        onSiteLabel.style.opacity = "1";
    }
});
freelanceCheckbox.addEventListener('change', function() {
    if (this.checked) {
        remoteCheckbox.checked = false;
        remoteLabel.style.opacity = "0.25";
        hybridCheckbox.checked = false;
        hybridLabel.style.opacity = "0.25";
        onSiteCheckbox.checked = false;
        onSiteLabel.style.opacity = "0.25";
        freelanceLabel.style.opacity = "1";
    } else {
        remoteLabel.style.opacity = "1";
        hybridCheckbox.checked = false;
        hybridLabel.style.opacity = "1";
        onSiteLabel.style.opacity = "1";
    }
});
hybridCheckbox.addEventListener('change', function() {
    if (this.checked) {
        techCheckbox.checked = false;
        remoteLabel.style.opacity = "0.25";
        freelanceCheckbox.checked = false;
        freelanceLabel.style.opacity = "0.25";
        onSiteCheckbox.checked = false;
        onSiteLabel.style.opacity = "0.25";
        hybridLabel.style.opacity = "1";
    } else {
        remoteLabel.style.opacity = "1";
        freelanceCheckbox.checked = false;
        freelanceLabel.style.opacity = "1";
        onSiteLabel.style.opacity = "1";
    }
});
onSiteCheckbox.addEventListener('change', function() {
    if (this.checked) {
        remoteCheckbox.checked = false;
        remoteLabel.style.opacity = "0.25";
        freelanceCheckbox.checked = false;
        freelanceLabel.style.opacity = "0.25";
        hybridCheckbox.checked = false;
        hybridLabel.style.opacity = "0.25";
        onSiteLabel.style.opacity = "1";
    } else {
        remoteLabel.style.opacity = "1";
        freelanceCheckbox.checked = false;
        freelanceLabel.style.opacity = "1";
        hybridLabel.style.opacity = "1";
    }
});

// FILTER - Tech + Finance + Gig + Other
const techCheckbox = document.getElementById('tech');
const techLabel = document.querySelector('label[for="tech"]');
const financeCheckbox = document.getElementById('finance');
const financeLabel = document.querySelector('label[for="finance"]');
const gigCheckbox = document.getElementById('gig');
const gigLabel = document.querySelector('label[for="gig"]');
const otherCheckbox = document.getElementById('other');
const otherLabel = document.querySelector('label[for="other"]');
techCheckbox.addEventListener('change', function() {
    if (this.checked) {
        financeCheckbox.checked = false;
        financeLabel.style.opacity = "0.25";
        gigCheckbox.checked = false;
        gigLabel.style.opacity = "0.25";
        otherCheckbox.checked = false;
        otherLabel.style.opacity = "0.25";
        techLabel.style.opacity = "1";
    } else {
        financeLabel.style.opacity = "1";
        gigLabel.style.opacity = "1";
        otherLabel.style.opacity = "1";
    }
});
financeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        techCheckbox.checked = false;
        techLabel.style.opacity = "0.25";
        gigCheckbox.checked = false;
        gigLabel.style.opacity = "0.25";
        otherCheckbox.checked = false;
        otherLabel.style.opacity = "0.25";
        financeLabel.style.opacity = "1";
    } else {
        techLabel.style.opacity = "1";
        gigCheckbox.checked = false;
        gigLabel.style.opacity = "1";
        otherLabel.style.opacity = "1";
    }
});
gigCheckbox.addEventListener('change', function() {
    if (this.checked) {
        techCheckbox.checked = false;
        techLabel.style.opacity = "0.25";
        financeCheckbox.checked = false;
        financeLabel.style.opacity = "0.25";
        otherCheckbox.checked = false;
        otherLabel.style.opacity = "0.25";
        gigLabel.style.opacity = "1";
    } else {
        techLabel.style.opacity = "1";
        financeCheckbox.checked = false;
        financeLabel.style.opacity = "1";
        otherLabel.style.opacity = "1";
    }
});
otherCheckbox.addEventListener('change', function() {
    if (this.checked) {
        techCheckbox.checked = false;
        techLabel.style.opacity = "0.25";
        financeCheckbox.checked = false;
        financeLabel.style.opacity = "0.25";
        gigCheckbox.checked = false;
        gigLabel.style.opacity = "0.25";
        otherLabel.style.opacity = "1";
    } else {
        techLabel.style.opacity = "1";
        financeCheckbox.checked = false;
        financeLabel.style.opacity = "1";
        gigLabel.style.opacity = "1";
    }
});

// FILTER - Public + Private
const publicCheckbox = document.getElementById('public');
const publicLabel = document.querySelector('label[for="public"]');
const privateCheckbox = document.getElementById('private');
const privateLabel = document.querySelector('label[for="private"]');
publicCheckbox.addEventListener('change', function() {
    if (this.checked) {
        privateCheckbox.checked = false;
        privateLabel.style.opacity = "0.25";
        publicLabel.style.opacity = "1";
    } else {
        privateLabel.style.opacity = "1";
    }
});
privateCheckbox.addEventListener('change', function() {
    if (this.checked) {
        publicCheckbox.checked = false;
        publicLabel.style.opacity = "0.25";
        privateLabel.style.opacity = "1";
    } else {
        publicLabel.style.opacity = "1";
    }
});



