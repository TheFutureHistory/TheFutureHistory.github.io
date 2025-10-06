// Subscription Manager JavaScript

class SubscriptionManager {
    constructor() {
        console.log('🚀 Initializing SubscriptionManager');
        this.subscriptions = this.loadSubscriptions();
        this.currentEditId = null;
        this.currentSort = { field: null, direction: null }; // Add sorting state
        console.log('📊 Loaded subscriptions:', this.subscriptions);
        this.initializeEventListeners();
        this.updateTotals();
        this.renderTable();
        console.log('✅ SubscriptionManager initialization complete');
    }

    loadSubscriptions() {
        console.log('📥 Loading subscriptions from localStorage');
        const stored = localStorage.getItem('subscriptions');
        const result = stored ? JSON.parse(stored) : [];
        console.log('📥 Loaded data:', result);
        return result;
    }

    saveSubscriptions() {
        console.log('💾 Saving subscriptions to localStorage:', this.subscriptions);
        localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
        console.log('💾 Save complete');
    }

    initializeEventListeners() {
        console.log('🎯 Setting up event listeners');
        
        const self = this;
        
        // Subscription form submit
        const form = document.getElementById('subscriptionForm');
        console.log('🎯 Form element:', form);
        
        if (form) {
            form.addEventListener('submit', function(e) {
                console.log('📝 Form submit event triggered');
                e.preventDefault();
                console.log('📝 Calling addSubscription method');
                self.addSubscription();
            });
            console.log('✅ Form event listener attached');
        } else {
            console.error('❌ Form element not found!');
        }

        // Edit form submit
        const editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', function(e) {
                console.log('✏️ Edit form submit triggered');
                e.preventDefault();
                self.updateSubscription();
            });
            console.log('✅ Edit form event listener attached');
        }

        // Close modal button
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                console.log('❌ Close modal button clicked');
                self.hideEditModal();
            });
            console.log('✅ Close modal event listener attached');
        }

        // Close modal when clicking outside (Edit Modal)
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === e.currentTarget) {
                    console.log('❌ Modal backdrop clicked');
                    self.hideEditModal();
                }
            });
            console.log('✅ Modal backdrop event listener attached');
        }
        
        // Chart modal events
        const chartModal = document.getElementById('chartModal');
        if (chartModal) {
            // Close modal when clicking outside
            chartModal.addEventListener('click', function(e) {
                if (e.target === e.currentTarget) {
                    console.log('❌ Chart modal backdrop clicked');
                    self.hideChartModal();
                }
            });
            console.log('✅ Chart modal backdrop event listener attached');
        }

        const closeChartBtn = document.getElementById('closeChartModalBtn');
        if (closeChartBtn) {
            closeChartBtn.addEventListener('click', function() {
                console.log('❌ Close chart modal button clicked');
                self.hideChartModal();
            });
            console.log('✅ Close chart modal event listener attached');
        }

        // Chart click event
        const categoryChartContainer = document.querySelector('.category-chart-container');
        if (categoryChartContainer) {
            categoryChartContainer.addEventListener('click', function() {
                console.log('📊 Chart clicked - opening full screen modal');
                // Only try to show the chart if there are subscriptions
                if (self.subscriptions.length > 0) {
                    self.showChartModal();
                }
            });
            console.log('✅ Chart click event listener attached');
        }

        // Sort arrows event listeners
        const sortArrows = document.querySelectorAll('.sort-arrow');
        sortArrows.forEach(arrow => {
            arrow.addEventListener('click', function(e) {
                e.stopPropagation();
                const direction = this.getAttribute('data-direction');
                const field = this.closest('.sortable').getAttribute('data-sort');
                console.log(`🔄 Sorting ${field} ${direction}`);
                self.sortSubscriptions(field, direction);
            });
        });
        
        console.log('✅ All event listeners initialized');
    }

    addSubscription() {
        console.log('➕ addSubscription method called');
        
        try {
            const formData = {
                id: Date.now().toString(),
                name: document.getElementById('name').value.trim(),
                price: parseFloat(document.getElementById('price').value),
                renewal: document.getElementById('renewal').value,
                duration: document.getElementById('duration').value,
                category: document.getElementById('category').value
            };
            
            console.log('📝 Form data collected:', formData);

            if (!this.validateSubscription(formData)) {
                console.log('❌ Form validation failed');
                return;
            }
            
            console.log('✅ Form validation passed');

            this.subscriptions.push(formData);
            console.log('📊 Updated subscriptions array:', this.subscriptions);
            
            this.saveSubscriptions();
            this.updateTotals();
            this.renderTable();
            this.clearForm();
            this.showNotification('Subscription added successfully!', 'success');
            console.log('✅ Subscription added successfully');
            
        } catch (error) {
            console.error('❌ Error in addSubscription:', error);
        }
    }

    clearForm() {
        console.log('🧹 Clearing form');
        document.getElementById('subscriptionForm').reset();
        console.log('✅ Form cleared');
    }

    validateSubscription(data) {
        console.log('🔍 Validating subscription data:', data);
        
        if (!data.name || data.name.length === 0) {
            console.log('❌ Validation failed: Missing name');
            alert('Please enter a subscription name');
            return false;
        }
        if (isNaN(data.price) || data.price <= 0) {
            console.log('❌ Validation failed: Invalid price');
            alert('Please enter a valid price');
            return false;
        }
        if (!data.renewal) {
            console.log('❌ Validation failed: Missing renewal date');
            alert('Please select a renewal date');
            return false;
        }
        if (!data.duration) {
            console.log('❌ Validation failed: Missing duration');
            alert('Please select a duration');
            return false;
        }
        if (!data.category) {
            console.log('❌ Validation failed: Missing category');
            alert('Please select a category');
            return false;
        }
        
        console.log('✅ Validation passed');
        return true;
    }

    editSubscription(id) {
        const subscription = this.subscriptions.find(sub => sub.id === id);
        if (!subscription) return;

        this.currentEditId = id;
        
        document.getElementById('editName').value = subscription.name;
        document.getElementById('editPrice').value = subscription.price;
        document.getElementById('editRenewal').value = subscription.renewal;
        document.getElementById('editDuration').value = subscription.duration;
        document.getElementById('editCategory').value = subscription.category;

        this.showEditModal();
    }

    showEditModal() {
        document.getElementById('editModal').classList.add('show');
    }

    hideEditModal() {
        document.getElementById('editModal').classList.remove('show');
        document.getElementById('editForm').reset();
        this.currentEditId = null;
    }

    showChartModal() {
        document.getElementById('chartModal').classList.add('show');
        this.renderFullScreenChart();
    }

    hideChartModal() {
        document.getElementById('chartModal').classList.remove('show');
    }

    renderFullScreenChart() {
        if (this.subscriptions.length === 0) {
            this.showEmptyFullScreenChart();
            return;
        }

        // Calculate category totals (monthly amounts)
        const categoryTotals = {};
        let total = 0;

        this.subscriptions.forEach(sub => {
            const monthlyAmount = this.getMonthlyAmount(sub.price, sub.duration);
            categoryTotals[sub.category] = (categoryTotals[sub.category] || 0) + monthlyAmount;
            total += monthlyAmount;
        });

        this.renderFullScreenCategoryChart(categoryTotals, total);
    }

    showEmptyFullScreenChart() {
        const chartContainer = document.getElementById('fullScreenChart');
        const chartDetails = document.getElementById('chartDetails');
        
        if (!chartContainer) return;
        
        chartContainer.innerHTML = '<svg class="fullscreen-chart" viewBox="0 0 400 400" width="400" height="400"><circle cx="200" cy="200" r="160" fill="none" stroke="var(--white25)" stroke-width="2"/></svg>';
        chartDetails.innerHTML = '<p class="no-data">No subscriptions to display</p>';
    }

    renderFullScreenCategoryChart(categoryTotals, total) {
        const chartContainer = document.getElementById('fullScreenChart');
        const chartDetails = document.getElementById('chartDetails');
        
        if (!chartContainer) return;

        // Get consistent color mapping
        const categoryColorMap = this.getCategoryColorMap();

        // Clear previous chart
        chartContainer.innerHTML = '<svg class="fullscreen-chart" viewBox="0 0 400 400" width="400" height="400"></svg>';
        
        const chart = chartContainer.querySelector('.fullscreen-chart');
        const centerX = 200;
        const centerY = 200;
        const radius = 160;

        let currentAngle = 0;
        let pathElements = '';
        let detailsHTML = '<div class="chart-details-grid">';

        // Check if there's only one category
        const categories = Object.entries(categoryTotals);
        
        if (categories.length === 1) {
            // For single category, draw a full circle
            const [category, amount] = categories[0];
            const color = categoryColorMap[category];
            
            pathElements = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${color}" opacity="0.9"/>`;
            
            // Add text label in center
            pathElements += `
                <text x="${centerX}" y="${centerY - 10}" text-anchor="middle" fill="white" font-size="24" font-weight="bold">${category}</text>
                <text x="${centerX}" y="${centerY + 20}" text-anchor="middle" fill="white" font-size="18">100%</text>
            `;
            
            detailsHTML += `
                <div class="detail-item">
                    <div class="detail-color" style="background-color: ${color}"></div>
                    <div class="detail-info">
                        <div class="detail-category">${category}</div>
                        <div class="detail-amount">$${amount.toFixed(2)}/month (100%)</div>
                    </div>
                </div>
            `;
        } else {
            // For multiple categories, use the existing pie slice logic
            categories.forEach(([category, amount]) => {
                const percentage = (amount / total) * 100;
                const sliceAngle = (percentage / 100) * 360;
                const color = categoryColorMap[category];

                // Calculate path for pie slice
                const startAngle = currentAngle;
                const endAngle = currentAngle + sliceAngle;
                
                const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

                const largeArc = sliceAngle > 180 ? 1 : 0;

                const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${startX} ${startY}`,
                    `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
                    'Z'
                ].join(' ');

                pathElements += `<path d="${pathData}" fill="${color}" opacity="0.9"/>`;

                // Calculate label position (middle of the slice)
                const labelAngle = startAngle + (sliceAngle / 2);
                const labelRadius = radius * 0.7;
                const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
                const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

                // Add text labels on the chart
                if (percentage > 5) { // Only show labels for slices > 5%
                    pathElements += `
                        <text x="${labelX}" y="${labelY - 5}" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${category}</text>
                        <text x="${labelX}" y="${labelY + 10}" text-anchor="middle" fill="white" font-size="12">${percentage.toFixed(0)}%</text>
                    `;
                }

                // Add to details panel
                detailsHTML += `
                    <div class="detail-item">
                        <div class="detail-color" style="background-color: ${color}"></div>
                        <div class="detail-info">
                            <div class="detail-category">${category}</div>
                            <div class="detail-amount">$${amount.toFixed(2)}/month (${percentage.toFixed(1)}%)</div>
                        </div>
                    </div>
                `;

                currentAngle += sliceAngle;
            });
        }

        detailsHTML += '</div>';
        detailsHTML += `<div class="total-summary">Total Monthly: <strong>$${total.toFixed(2)}</strong></div>`;

        chart.innerHTML = pathElements;
        chartDetails.innerHTML = detailsHTML;
    }

    updateSubscription() {
        if (!this.currentEditId) return;

        const formData = {
            name: document.getElementById('editName').value.trim(),
            price: parseFloat(document.getElementById('editPrice').value),
            renewal: document.getElementById('editRenewal').value,
            duration: document.getElementById('editDuration').value,
            category: document.getElementById('editCategory').value
        };

        if (!this.validateSubscription(formData)) {
            return;
        }

        const index = this.subscriptions.findIndex(sub => sub.id === this.currentEditId);
        if (index !== -1) {
            this.subscriptions[index] = { ...this.subscriptions[index], ...formData };
            this.saveSubscriptions();
            this.updateTotals();
            this.renderTable();
            this.hideEditModal();
            this.showNotification('Subscription updated successfully!', 'success');
        }
    }

    deleteSubscription(id) {
        if (confirm('Are you sure you want to delete this subscription?')) {
            this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
            this.saveSubscriptions();
            this.updateTotals();
            this.renderTable();
            this.showNotification('Subscription deleted successfully!', 'success');
        }
    }

    getMonthlyAmount(price, duration) {
        switch (duration) {
            case 'Daily': return price * 30.44; // Average days per month
            case 'Weekly': return price * 4.33; // Average weeks per month
            case 'Monthly': return price;
            case 'Quarterly': return price / 3;
            case 'Semi-Annual': return price / 6;
            case 'Annual': return price / 12;
            default: return 0;
        }
    }

    getDailyAmount(price, duration) {
        switch (duration) {
            case 'Daily': return price;
            case 'Weekly': return price / 7;
            case 'Monthly': return price / 30.44; // Average days per month
            case 'Quarterly': return price / 91.3; // Average days per quarter
            case 'Semi-Annual': return price / 182.6; // Average days per half year
            case 'Annual': return price / 365.25; // Average days per year (including leap years)
            default: return 0;
        }
    }

    getCategoryColor(category) {
        const colors = {
            'Housing': '#6B8E6B',              // Muted Green
            'Food': '#5A7FB8',                 // Muted Blue
            'Transportation': '#B8A054',        // Muted Yellow/Gold
            'Personal Care': '#5A8A8A',        // Muted Red
            'Entertainment': '#8A5A8A',
            'Other': '#B8685A'         // Muted Purple
        };
        
        return colors[category] || '#708090'; // Default muted blue grey
    }

    getCategoryColorMap() {
        const categoryColorMap = {};
        const uniqueCategories = [...new Set(this.subscriptions.map(sub => sub.category))].sort();
        const colors = {
            'Housing': '#6B8E6B',              // Muted Green
            'Food': '#5A7FB8',                 // Muted Blue
            'Transportation': '#B8A054',        // Muted Yellow/Gold
            'Personal Care': '#5A8A8A',        // Muted Red
            'Entertainment': '#8A5A8A',
            'Other': '#B8685A'          // Muted Purple
        };
        
        uniqueCategories.forEach((category) => {
            categoryColorMap[category] = colors[category] || '#708090';
        });
        
        return categoryColorMap;
    }

    updateTotals() {
        console.log('💰 Updating expense totals');
        let dailyTotal = 0;
        let monthlyTotal = 0;
        
        this.subscriptions.forEach(sub => {
            const dailyAmount = this.getDailyAmount(sub.price, sub.duration);
            const monthlyAmount = this.getMonthlyAmount(sub.price, sub.duration);
            console.log(`💰 ${sub.name}: $${sub.price} (${sub.duration}) = $${dailyAmount}/day, $${monthlyAmount}/month`);
            dailyTotal += dailyAmount;
            monthlyTotal += monthlyAmount;
        });

        const weeklyTotal = dailyTotal * 7;
        const quarterlyTotal = monthlyTotal * 3;
        const semiAnnualTotal = monthlyTotal * 6;
        const annualTotal = monthlyTotal * 12;

        console.log(`💰 Totals - Daily: $${dailyTotal.toFixed(2)}, Weekly: $${weeklyTotal.toFixed(2)} Monthly: $${monthlyTotal.toFixed(2)}, Quarterly: $${quarterlyTotal.toFixed(2)}, Semi-Annual: $${semiAnnualTotal.toFixed(2)}, Annual: $${annualTotal.toFixed(2)}`);

        document.getElementById('dailyTotal').textContent = `$${dailyTotal.toFixed(2)}`;
        document.getElementById('weeklyTotal').textContent = `$${weeklyTotal.toFixed(2)}`;
        document.getElementById('monthlyTotal').textContent = `$${monthlyTotal.toFixed(2)}`;
        document.getElementById('quarterlyTotal').textContent = `$${quarterlyTotal.toFixed(2)}`;
        document.getElementById('semiAnnualTotal').textContent = `$${semiAnnualTotal.toFixed(2)}`;
        document.getElementById('annualTotal').textContent = `$${annualTotal.toFixed(2)}`;
        
        this.updateCategoryChart();
        console.log('✅ Totals updated');
    }

    updateCategoryChart() {
        console.log('📊 Updating category chart');
        
        // Check if chart container exists
        const chartContainer = document.getElementById('categoryChart');
        if (!chartContainer) {
            console.warn('Chart container not found, skipping chart update');
            return;
        }
        
        if (this.subscriptions.length === 0) {
            this.showEmptyChart();
            return;
        }

        // Calculate category totals (monthly amounts)
        const categoryTotals = {};
        let total = 0;

        this.subscriptions.forEach(sub => {
            const monthlyAmount = this.getMonthlyAmount(sub.price, sub.duration);
            categoryTotals[sub.category] = (categoryTotals[sub.category] || 0) + monthlyAmount;
            total += monthlyAmount;
        });

        console.log('📊 Category totals:', categoryTotals);

        this.renderCategoryChart(categoryTotals, total);
    }

    showEmptyChart() {
        const chartContainer = document.getElementById('categoryChart');
        if (!chartContainer) return;
        
        const parentContainer = chartContainer.parentElement;
        const noDataMessage = document.getElementById('noDataMessage');

        // Clear chart and labels
        parentContainer.innerHTML = '<svg class="category-chart" id="categoryChart"><circle cx="100" cy="100" r="80" fill="none" stroke="var(--white)" stroke-width="1"/></svg><div class="no-data" id="noDataMessage">No subscriptions to display</div>';
        
        const chart = document.getElementById('categoryChart');
        chart.setAttribute('viewBox', '0 0 200 200');
        
        const newNoDataMessage = document.getElementById('noDataMessage');
        if (newNoDataMessage) {
            newNoDataMessage.style.display = 'block';
        }
    }

    renderCategoryChart(categoryTotals, total) {
        const chartContainer = document.getElementById('categoryChart');
        if (!chartContainer) return;
        
        const parentContainer = chartContainer.parentElement;
        const noDataMessage = document.getElementById('noDataMessage');

        if (noDataMessage) {
            noDataMessage.style.display = 'none';
        }

        // Get consistent color mapping
        const categoryColorMap = this.getCategoryColorMap();

        // Clear previous chart and labels
        const existingLabels = parentContainer.querySelectorAll('.chart-label');
        existingLabels.forEach(label => label.remove());
        
        const chart = document.getElementById('categoryChart');
        const centerX = 100;
        const centerY = 100;
        const radius = 80;

        chart.setAttribute('viewBox', '0 0 200 200');
        chart.setAttribute('width', '200');
        chart.setAttribute('height', '200');

        let currentAngle = 0;
        let pathElements = '';

        // Check if there's only one category
        const categories = Object.entries(categoryTotals);
        
        if (categories.length === 1) {
            // For single category, draw a full circle
            const [category, amount] = categories[0];
            const color = categoryColorMap[category];
            
            pathElements = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${color}" opacity="0.9"/>`;
            
            // Create label for single category
            const label = document.createElement('div');
            label.className = 'chart-label';
            label.innerHTML = `${category}<br>100%`;
            label.style.left = '50%';
            label.style.top = '50%';
            label.style.transform = 'translate(-50%, -50%)';
            
            parentContainer.appendChild(label);
        } else {
            // For multiple categories, use the existing pie slice logic
            categories.forEach(([category, amount]) => {
                const percentage = (amount / total) * 100;
                const sliceAngle = (percentage / 100) * 360;
                const color = categoryColorMap[category];

                // Calculate path for pie slice
                const startAngle = currentAngle;
                const endAngle = currentAngle + sliceAngle;
                
                const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

                const largeArc = sliceAngle > 180 ? 1 : 0;

                const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${startX} ${startY}`,
                    `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
                    'Z'
                ].join(' ');

                pathElements += `<path d="${pathData}" fill="${color}" opacity="0.9"/>`;

                // Calculate label position (middle of the slice)
                const labelAngle = startAngle + (sliceAngle / 2);
                const labelRadius = radius * 0.6;
                const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
                const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

                // Create label element
                const label = document.createElement('div');
                label.className = 'chart-label';
                label.innerHTML = `${category}<br>${percentage.toFixed(0)}%`;
                label.style.left = `${(labelX / 200) * 100}%`;
                label.style.top = `${(labelY / 200) * 100}%`;
                label.style.transform = 'translate(-50%, -50%)';
                
                parentContainer.appendChild(label);

                currentAngle += sliceAngle;
            });
        }

        chart.innerHTML = pathElements;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    renderTable() {
        const tableBody = document.getElementById('tableBody');
        
        if (this.subscriptions.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <h3>No subscriptions yet</h3>
                        <p>Add your first subscription to get started</p>
                    </td>
                </tr>
            `;
            this.updateCategoryChart();
            return;
        }

        tableBody.innerHTML = this.subscriptions.map(sub => {
            const categoryColor = this.getCategoryColor(sub.category);
            return `
                <tr>
                    <td><strong>${sub.name}</strong></td>
                    <td class="price">$${sub.price.toFixed(2)}</td>
                    <td>${this.formatDate(sub.renewal)}</td>
                    <td><span class="duration">${sub.duration}</span></td>
                    <td><span class="category" style="background-color: ${categoryColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; width: 100%;">${sub.category}</span></td>
                    <td class="actions">
                        <button class="edit-btn" onclick="manager.editSubscription('${sub.id}')">
                            Edit
                        </button>
                        <button class="delete-btn" onclick="manager.deleteSubscription('${sub.id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        this.updateCategoryChart();
    }

    sortSubscriptions(field, direction) {
        this.currentSort = { field, direction };
        
        this.subscriptions.sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];
            
            if (field === 'price') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }
            
            if (field === 'renewal') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
        
        this.updateSortIndicators(field, direction);
        this.renderTable();
    }

    updateSortIndicators(activeField, activeDirection) {
        // Reset all arrows
        document.querySelectorAll('.sort-arrow').forEach(arrow => {
            arrow.classList.remove('active');
        });
        
        // Activate the current sort arrow
        const activeArrow = document.querySelector(`[data-sort="${activeField}"] .sort-arrow[data-direction="${activeDirection}"]`);
        if (activeArrow) {
            activeArrow.classList.add('active');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 6px;
            font-weight: 500;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Initialize the subscription manager when the page loads
let manager;
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 DOM Content Loaded - Initializing manager');
    manager = new SubscriptionManager();
    console.log('🌐 Manager initialized:', manager);
});