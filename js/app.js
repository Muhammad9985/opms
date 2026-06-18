// ===== Clinic Appointment Management System =====
'use strict';

// ===== Sample Data =====
const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', status: 'Available', patients: 156, rating: 4.8, schedule: '9AM-5PM' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Dermatology', status: 'Available', patients: 203, rating: 4.9, schedule: '9AM-5PM' },
    { id: 3, name: 'Dr. Williams', specialty: 'Orthopedics', status: 'In Session', patients: 178, rating: 4.7, schedule: '10AM-6PM' },
    { id: 4, name: 'Dr. Brown', specialty: 'Pediatrics', status: 'On Leave', patients: 145, rating: 4.6, schedule: '9AM-4PM' },
    { id: 5, name: 'Dr. Davis', specialty: 'General Medicine', status: 'Available', patients: 312, rating: 4.8, schedule: '8AM-4PM' },
];

let patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-0101', email: 'john@email.com', visits: 12, lastVisit: '2026-06-15', blood: 'O+', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0102', email: 'jane@email.com', visits: 8, lastVisit: '2026-06-16', blood: 'A+', address: '456 Oak Ave' },
    { id: 3, name: 'Robert Wilson', age: 58, gender: 'Male', phone: '555-0103', email: 'robert@email.com', visits: 15, lastVisit: '2026-06-17', blood: 'B+', address: '789 Pine Rd' },
    { id: 4, name: 'Emily Chen', age: 27, gender: 'Female', phone: '555-0104', email: 'emily@email.com', visits: 3, lastVisit: '2026-06-10', blood: 'AB+', address: '321 Elm St' },
    { id: 5, name: 'Michael Lee', age: 41, gender: 'Male', phone: '555-0105', email: 'michael@email.com', visits: 6, lastVisit: '2026-06-14', blood: 'A-', address: '654 Birch Ln' },
    { id: 6, name: 'Sarah Parker', age: 35, gender: 'Female', phone: '555-0106', email: 'sarah@email.com', visits: 9, lastVisit: '2026-06-12', blood: 'O-', address: '987 Cedar Dr' },
    { id: 7, name: 'David Brown', age: 52, gender: 'Male', phone: '555-0107', email: 'david@email.com', visits: 20, lastVisit: '2026-06-11', blood: 'B-', address: '147 Maple Way' },
    { id: 8, name: 'Lisa Taylor', age: 29, gender: 'Female', phone: '555-0108', email: 'lisa@email.com', visits: 4, lastVisit: '2026-06-13', blood: 'AB-', address: '258 Walnut Ct' },
];

let appointments = [
    { id: 'APT-001', patient: 'John Doe', doctor: 'Dr. Smith', dept: 'Cardiology', date: '2026-06-18', time: '09:00 AM', type: 'Follow-up', status: 'Completed' },
    { id: 'APT-002', patient: 'Jane Smith', doctor: 'Dr. Johnson', dept: 'Dermatology', date: '2026-06-18', time: '09:30 AM', type: 'New Visit', status: 'In Progress' },
    { id: 'APT-003', patient: 'Robert Wilson', doctor: 'Dr. Williams', dept: 'Orthopedics', date: '2026-06-18', time: '10:00 AM', type: 'Consultation', status: 'Waiting' },
    { id: 'APT-004', patient: 'Emily Chen', doctor: 'Dr. Davis', dept: 'General Medicine', date: '2026-06-18', time: '10:30 AM', type: 'New Visit', status: 'Confirmed' },
    { id: 'APT-005', patient: 'Michael Lee', doctor: 'Dr. Smith', dept: 'Cardiology', date: '2026-06-18', time: '11:00 AM', type: 'Follow-up', status: 'Cancelled' },
    { id: 'APT-006', patient: 'Sarah Parker', doctor: 'Dr. Johnson', dept: 'Dermatology', date: '2026-06-18', time: '11:30 AM', type: 'New Visit', status: 'Confirmed' },
    { id: 'APT-007', patient: 'David Brown', doctor: 'Dr. Smith', dept: 'Cardiology', date: '2026-06-19', time: '09:00 AM', type: 'Follow-up', status: 'Pending' },
    { id: 'APT-008', patient: 'Lisa Taylor', doctor: 'Dr. Davis', dept: 'General Medicine', date: '2026-06-19', time: '10:00 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 'APT-009', patient: 'Mark Anderson', doctor: 'Dr. Williams', dept: 'Orthopedics', date: '2026-06-19', time: '02:00 PM', type: 'New Visit', status: 'Pending' },
    { id: 'APT-010', patient: 'Amy White', doctor: 'Dr. Smith', dept: 'Cardiology', date: '2026-06-20', time: '03:00 PM', type: 'Follow-up', status: 'Confirmed' },
];

let queueData = [
    { token: 'T-003', patient: 'Robert Wilson', doctor: 'Dr. Williams', time: '10:00 AM', status: 'Waiting', waitTime: '15 min' },
    { token: 'T-004', patient: 'Emily Chen', doctor: 'Dr. Davis', time: '10:30 AM', status: 'Waiting', waitTime: '10 min' },
    { token: 'T-006', patient: 'Sarah Parker', doctor: 'Dr. Johnson', time: '11:30 AM', status: 'Waiting', waitTime: '5 min' },
    { token: 'T-007', patient: 'Tom Harris', doctor: 'Dr. Smith', time: '11:00 AM', status: 'Waiting', waitTime: '20 min' },
    { token: 'T-008', patient: 'Nancy Clark', doctor: 'Dr. Davis', time: '11:30 AM', status: 'Waiting', waitTime: '25 min' },
];

let notifications = [
    { id: 1, type: 'success', icon: 'fa-calendar-check', title: 'Appointment Confirmed', msg: 'John Doe confirmed appointment with Dr. Smith at 09:00 AM', time: '5 min ago', unread: true },
    { id: 2, type: 'danger', icon: 'fa-times-circle', title: 'Appointment Cancelled', msg: 'Michael Lee cancelled 11:00 AM appointment', time: '15 min ago', unread: true },
    { id: 3, type: 'warning', icon: 'fa-exclamation-triangle', title: 'Reminder', msg: '3 appointments pending confirmation for tomorrow', time: '30 min ago', unread: true },
    { id: 4, type: 'info', icon: 'fa-clock', title: 'Schedule Change', msg: 'Dr. Brown marked leave for Jun 20-25', time: '1 hour ago', unread: false },
    { id: 5, type: 'success', icon: 'fa-user-plus', title: 'New Patient', msg: 'Lisa Taylor registered as new patient', time: '2 hours ago', unread: false },
    { id: 6, type: 'warning', icon: 'fa-exclamation-circle', title: 'Missed Appointment', msg: 'Patient Mark Anderson missed 9:00 AM slot', time: '3 hours ago', unread: false },
];

// Track current reschedule target
let rescheduleTargetId = null;

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeToggle();
    initSidebar();
    initRoleSelector();
    initAppointmentsTable();
    initPatientCards();
    initDoctorCards();
    initScheduleGrid();
    initQueueList();
    initCalendar();
    initNotifications();
    initCharts();
    initFormValidation();
    initSearch();
    initPatientSearch();
    initMarkAllRead();
    initUserMenu();
    initDashboardViewButtons();
    initChartToggle();
});

// ===== Navigate to Page Helper =====
function navigateToPage(pageName) {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    const target = document.querySelector(`.sidebar-nav .nav-link[data-page="${pageName}"]`);
    if (target) target.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + pageName);
    if (page) page.classList.add('active');
}

// ===== Navigation =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateToPage(page);
            if (window.innerWidth < 992) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    });
}

// ===== Theme Toggle =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', saved);
    updateThemeIcon(saved);
    toggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-bs-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}
function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Sidebar =====
function initSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            sidebar.classList.toggle('show');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });
}

// ===== Role Selector =====
function initRoleSelector() {
    const btns = document.querySelectorAll('.role-selector .btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const role = this.dataset.role;
            applyRoleView(role);
            showToast('Switched to ' + this.textContent.trim() + ' view');
        });
    });
}

function applyRoleView(role) {
    // Show/hide nav items based on role
    const navItems = {
        admin: ['dashboard','appointments','patients','doctors','schedule','queue','calendar','notifications','admin'],
        receptionist: ['dashboard','appointments','patients','queue','calendar','notifications'],
        doctor: ['dashboard','appointments','patients','schedule','calendar','notifications'],
        nurse: ['dashboard','appointments','patients','queue','notifications'],
    };
    const allowed = navItems[role] || navItems.admin;
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        const page = link.dataset.page;
        link.style.display = allowed.includes(page) ? '' : 'none';
    });
    // If current page not allowed, go to dashboard
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const pageId = activePage.id.replace('page-', '');
        if (!allowed.includes(pageId)) navigateToPage('dashboard');
    }
}

// ===== User Menu (Profile, Settings, Logout) =====
function initUserMenu() {
    const userDropdown = document.querySelector('.user-menu + .dropdown-menu');
    if (!userDropdown) return;
    const items = userDropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            if (text === 'Profile') {
                showProfileModal();
            } else if (text === 'Settings') {
                showSettingsModal();
            } else if (text === 'Logout') {
                if (confirm('Are you sure you want to logout?')) {
                    showLoading();
                    setTimeout(() => {
                        hideLoading();
                        showToast('Logged out successfully. Redirecting...', 'info');
                        setTimeout(() => location.reload(), 1500);
                    }, 800);
                }
            }
        });
    });
}

function showProfileModal() {
    const html = `
    <div class="modal fade" id="profileModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title"><i class="fas fa-user"></i> User Profile</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body text-center">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&size=80" class="rounded-circle mb-3" width="80">
                    <h5>System Administrator</h5>
                    <p class="text-muted">admin@clinicare.com</p>
                    <hr>
                    <div class="text-start">
                        <p><strong>Role:</strong> Administrator</p>
                        <p><strong>Department:</strong> Management</p>
                        <p><strong>Employee ID:</strong> EMP-001</p>
                        <p><strong>Joined:</strong> January 2024</p>
                    </div>
                </div>
                <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>
            </div>
        </div>
    </div>`;
    showDynamicModal(html, 'profileModal');
}

function showSettingsModal() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const html = `
    <div class="modal fade" id="settingsModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title"><i class="fas fa-cog"></i> Settings</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Theme</label>
                        <select class="form-select" id="settingsTheme">
                            <option value="light" ${currentTheme==='light'?'selected':''}>Light Mode</option>
                            <option value="dark" ${currentTheme==='dark'?'selected':''}>Dark Mode</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Notification Sound</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="notifSound" checked>
                            <label class="form-check-label" for="notifSound">Enable</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Language</label>
                        <select class="form-select"><option>English</option><option>Spanish</option><option>French</option></select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="saveSettingsBtn">Save Settings</button>
                </div>
            </div>
        </div>
    </div>`;
    showDynamicModal(html, 'settingsModal');
    setTimeout(() => {
        document.getElementById('saveSettingsBtn').addEventListener('click', function() {
            const theme = document.getElementById('settingsTheme').value;
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
            bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
            showToast('Settings saved successfully!');
        });
    }, 300);
}

// ===== Dashboard View Buttons (eye icons on dashboard table) =====
function initDashboardViewButtons() {
    // Handle dashboard static table eye buttons (not the appointments page which uses onclick)
    const dashboardTable = document.querySelector('#page-dashboard table');
    if (dashboardTable) {
        dashboardTable.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            const icon = btn.querySelector('i.fa-eye');
            if (!icon) return;
            const row = btn.closest('tr');
            if (row) {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 5) {
                    const patient = cells[1]?.textContent.trim();
                    const doctor = cells[2]?.textContent.trim();
                    const time = cells[3]?.textContent.trim();
                    const status = cells[4]?.textContent.trim() || '';
                    // Find matching appointment
                    const apt = appointments.find(a => a.patient === patient && a.doctor === doctor);
                    if (apt) {
                        showAppointmentDetailModal(apt.id, apt.patient, apt.doctor, apt.time, apt.status);
                    } else {
                        showAppointmentDetailModal('', patient, doctor, time, status);
                    }
                }
            }
        });
    }
}

function showAppointmentDetailModal(id, patient, doctor, time, status) {
    // Find full appointment data
    const apt = appointments.find(a => a.id === id || a.patient === patient);
    const p = patients.find(pt => pt.name === patient) || {};
    const html = `
    <div class="modal fade" id="viewDetailModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title"><i class="fas fa-clipboard-list"></i> Appointment Details</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <h6 class="text-primary"><i class="fas fa-calendar"></i> Appointment Info</h6>
                            <table class="table table-sm">
                                <tr><td><strong>ID:</strong></td><td>${apt ? apt.id : id}</td></tr>
                                <tr><td><strong>Date:</strong></td><td>${apt ? apt.date : 'Today'}</td></tr>
                                <tr><td><strong>Time:</strong></td><td>${apt ? apt.time : time}</td></tr>
                                <tr><td><strong>Doctor:</strong></td><td>${apt ? apt.doctor : doctor}</td></tr>
                                <tr><td><strong>Department:</strong></td><td>${apt ? apt.dept : '-'}</td></tr>
                                <tr><td><strong>Type:</strong></td><td>${apt ? apt.type : '-'}</td></tr>
                                <tr><td><strong>Status:</strong></td><td><span class="badge ${getStatusClass(apt ? apt.status : status)}">${apt ? apt.status : status}</span></td></tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-primary"><i class="fas fa-user"></i> Patient Info</h6>
                            <table class="table table-sm">
                                <tr><td><strong>Name:</strong></td><td>${patient}</td></tr>
                                <tr><td><strong>Age:</strong></td><td>${p.age || '-'} years</td></tr>
                                <tr><td><strong>Gender:</strong></td><td>${p.gender || '-'}</td></tr>
                                <tr><td><strong>Phone:</strong></td><td>${p.phone || '-'}</td></tr>
                                <tr><td><strong>Email:</strong></td><td>${p.email || '-'}</td></tr>
                                <tr><td><strong>Blood Group:</strong></td><td>${p.blood || '-'}</td></tr>
                                <tr><td><strong>Total Visits:</strong></td><td>${p.visits || '-'}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-warning" onclick="openRescheduleFor('${apt ? apt.id : ''}')"><i class="fas fa-calendar-alt"></i> Reschedule</button>
                    <button class="btn btn-outline-danger" onclick="cancelAppointment('${apt ? apt.id : ''}')"><i class="fas fa-times"></i> Cancel</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;
    showDynamicModal(html, 'viewDetailModal');
}

// ===== Chart Toggle (Week/Month) =====
function initChartToggle() {
    const chartHeader = document.querySelector('#page-dashboard .card-header .btn-group');
    if (!chartHeader) return;
    const btns = chartHeader.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Destroy and recreate chart with different data
            const canvas = document.getElementById('appointmentChart');
            const chart = Chart.getChart(canvas);
            if (chart) chart.destroy();
            const isMonth = this.textContent.trim() === 'Month';
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: isMonth ? ['Week 1','Week 2','Week 3','Week 4'] : ['Mon','Tue','Wed','Thu','Fri','Sat'],
                    datasets: [
                        { label: 'Completed', data: isMonth ? [90,95,88,92] : [18,22,20,24,16,10], backgroundColor: 'rgba(5,150,105,0.7)', borderRadius: 6 },
                        { label: 'Scheduled', data: isMonth ? [120,130,115,125] : [24,28,25,30,22,14], backgroundColor: 'rgba(79,70,229,0.7)', borderRadius: 6 },
                        { label: 'Cancelled', data: isMonth ? [12,8,15,10] : [3,2,4,3,5,1], backgroundColor: 'rgba(220,38,38,0.7)', borderRadius: 6 },
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true }, x: { grid: { display: false } } } }
            });
        });
    });
}

// ===== Appointments Table =====
function initAppointmentsTable() {
    renderAppointmentsTable(appointments);
    // Sorting
    document.querySelectorAll('.sortable').forEach(th => {
        let asc = true;
        th.addEventListener('click', function() {
            const key = this.dataset.sort;
            const sorted = [...appointments].sort((a, b) => {
                if (a[key] < b[key]) return asc ? -1 : 1;
                if (a[key] > b[key]) return asc ? 1 : -1;
                return 0;
            });
            asc = !asc;
            renderAppointmentsTable(sorted);
        });
    });
    // Filtering
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
    // Real-time filter on patient input
    const filterPatient = document.getElementById('filterPatient');
    if (filterPatient) {
        filterPatient.addEventListener('input', applyFilters);
    }
}

function renderAppointmentsTable(data) {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(apt => {
        const statusClass = getStatusClass(apt.status);
        return `<tr>
            <td><span class="token-badge">${apt.id}</span></td>
            <td>${apt.patient}</td>
            <td>${apt.doctor}</td>
            <td>${apt.dept}</td>
            <td>${apt.date}</td>
            <td>${apt.time}</td>
            <td><span class="badge bg-secondary">${apt.type}</span></td>
            <td><span class="badge ${statusClass}">${apt.status}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" title="View" onclick="viewAppointment('${apt.id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-outline-warning" title="Reschedule" onclick="openRescheduleFor('${apt.id}')"><i class="fas fa-calendar-alt"></i></button>
                    <button class="btn btn-outline-danger" title="Cancel" onclick="cancelAppointment('${apt.id}')"><i class="fas fa-times"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');
    // Update count text
    const footer = document.querySelector('#page-appointments .card-footer small');
    if (footer) footer.textContent = `Showing 1-${data.length} of ${data.length} appointments`;
}

function getStatusClass(status) {
    const map = { 'Completed': 'bg-success', 'In Progress': 'bg-primary', 'Waiting': 'bg-warning', 'Confirmed': 'bg-info', 'Cancelled': 'bg-danger', 'Pending': 'bg-secondary', 'No Show': 'bg-dark' };
    return map[status] || 'bg-secondary';
}

function applyFilters() {
    let filtered = [...appointments];
    const patient = document.getElementById('filterPatient').value.toLowerCase();
    const doctor = document.getElementById('filterDoctor').value;
    const dept = document.getElementById('filterDepartment').value;
    const date = document.getElementById('filterDate').value;
    const status = document.getElementById('filterStatus').value;
    if (patient) filtered = filtered.filter(a => a.patient.toLowerCase().includes(patient));
    if (doctor) filtered = filtered.filter(a => a.doctor === doctor);
    if (dept) filtered = filtered.filter(a => a.dept === dept);
    if (date) filtered = filtered.filter(a => a.date === date);
    if (status) filtered = filtered.filter(a => a.status === status);
    renderAppointmentsTable(filtered);
}

// ===== View Appointment =====
function viewAppointment(id) {
    const apt = appointments.find(a => a.id === id);
    if (!apt) return;
    showAppointmentDetailModal(apt.id, apt.patient, apt.doctor, apt.time, apt.status);
}

// ===== Reschedule =====
function openRescheduleFor(id) {
    // Close any open modal first
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(m => {
        const instance = bootstrap.Modal.getInstance(m);
        if (instance) instance.hide();
    });
    rescheduleTargetId = id;
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById('rescheduleModal'));
        modal.show();
    }, 400);
}

// ===== Cancel Appointment =====
function cancelAppointment(id) {
    // Close any open modal first
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(m => {
        const instance = bootstrap.Modal.getInstance(m);
        if (instance) instance.hide();
    });
    setTimeout(() => {
        if (confirm('Cancel appointment ' + id + '?')) {
            const apt = appointments.find(a => a.id === id);
            if (apt) {
                apt.status = 'Cancelled';
                renderAppointmentsTable(appointments);
                addNotification('danger', 'fa-times-circle', 'Appointment Cancelled', `${apt.patient}'s appointment (${id}) has been cancelled`);
                showToast('Appointment ' + id + ' cancelled', 'danger');
            }
        }
    }, 400);
}

// ===== Patient Cards =====
function initPatientCards() {
    renderPatientCards(patients);
}

function renderPatientCards(data) {
    const container = document.getElementById('patientCards');
    if (!container) return;
    container.innerHTML = data.map(p => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="patient-card">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=4f46e5&color=fff&size=60" alt="${p.name}">
                <h6>${p.name}</h6>
                <span class="text-muted">${p.gender}, ${p.age} years</span>
                <div class="patient-meta">
                    <div class="d-flex justify-content-between mt-2">
                        <small><i class="fas fa-phone"></i> ${p.phone}</small>
                    </div>
                    <div class="d-flex justify-content-between mt-1">
                        <small><i class="fas fa-calendar"></i> ${p.visits} visits</small>
                        <small>Last: ${p.lastVisit}</small>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewPatient(${p.id})"><i class="fas fa-eye"></i> View</button>
                    <button class="btn btn-sm btn-outline-success" onclick="bookForPatient('${p.name}')"><i class="fas fa-calendar-plus"></i> Book</button>
                </div>
            </div>
        </div>
    `).join('');
}

function viewPatient(id) {
    const p = patients.find(pt => pt.id === id);
    if (!p) return;
    const patientAppts = appointments.filter(a => a.patient === p.name);
    const html = `
    <div class="modal fade" id="viewPatientModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title"><i class="fas fa-user"></i> Patient Profile - ${p.name}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-4 text-center">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=4f46e5&color=fff&size=100" class="rounded-circle mb-3" width="100">
                            <h5>${p.name}</h5>
                            <span class="badge bg-primary">${p.blood}</span>
                        </div>
                        <div class="col-md-8">
                            <h6 class="text-primary">Demographics</h6>
                            <div class="row mb-2"><div class="col-6"><strong>Age:</strong> ${p.age} years</div><div class="col-6"><strong>Gender:</strong> ${p.gender}</div></div>
                            <div class="row mb-2"><div class="col-6"><strong>Blood:</strong> ${p.blood}</div><div class="col-6"><strong>Visits:</strong> ${p.visits}</div></div>
                            <h6 class="text-primary mt-3">Contact</h6>
                            <div class="row mb-2"><div class="col-6"><strong>Phone:</strong> ${p.phone}</div><div class="col-6"><strong>Email:</strong> ${p.email}</div></div>
                            <div class="mb-2"><strong>Address:</strong> ${p.address}</div>
                            <h6 class="text-primary mt-3">Appointment History</h6>
                            ${patientAppts.length > 0 ? `<table class="table table-sm"><thead><tr><th>Date</th><th>Doctor</th><th>Type</th><th>Status</th></tr></thead><tbody>${patientAppts.map(a => `<tr><td>${a.date}</td><td>${a.doctor}</td><td>${a.type}</td><td><span class="badge ${getStatusClass(a.status)}">${a.status}</span></td></tr>`).join('')}</tbody></table>` : '<p class="text-muted">No appointment history.</p>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" onclick="bookForPatient('${p.name}')"><i class="fas fa-calendar-plus"></i> Book Appointment</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;
    showDynamicModal(html, 'viewPatientModal');
}

function bookForPatient(name) {
    // Close any open modal
    document.querySelectorAll('.modal.show').forEach(m => {
        const inst = bootstrap.Modal.getInstance(m);
        if (inst) inst.hide();
    });
    setTimeout(() => {
        document.getElementById('aptPatientName').value = name;
        const modal = new bootstrap.Modal(document.getElementById('bookAppointmentModal'));
        modal.show();
    }, 400);
}

// ===== Patient Search =====
function initPatientSearch() {
    const searchContainer = document.querySelector('#page-patients .input-group');
    if (!searchContainer) return;
    const input = searchContainer.querySelector('input');
    const btn = searchContainer.querySelector('button');
    const doSearch = () => {
        const q = input.value.toLowerCase();
        const filtered = patients.filter(p => p.name.toLowerCase().includes(q) || p.phone.includes(q));
        renderPatientCards(filtered);
        if (filtered.length === 0) showToast('No patients found', 'warning');
    };
    btn.addEventListener('click', doSearch);
    input.addEventListener('input', doSearch);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') doSearch(); });
}

// ===== Doctor Cards =====
function initDoctorCards() {
    const container = document.getElementById('doctorCards');
    if (!container) return;
    container.innerHTML = doctors.map(d => {
        const statusBadge = d.status === 'Available' ? 'bg-success' : d.status === 'In Session' ? 'bg-warning' : 'bg-danger';
        return `
        <div class="col-lg-4 col-md-6">
            <div class="doctor-card">
                <div class="doctor-card-header">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=fff&color=4f46e5&size=70" alt="${d.name}">
                    <h5 class="mt-2 mb-1">${d.name}</h5>
                    <span>${d.specialty}</span>
                </div>
                <div class="doctor-card-body">
                    <div class="info-row"><span>Status</span><span class="badge ${statusBadge}">${d.status}</span></div>
                    <div class="info-row"><span>Patients</span><span>${d.patients}</span></div>
                    <div class="info-row"><span>Rating</span><span><i class="fas fa-star text-warning"></i> ${d.rating}</span></div>
                    <div class="info-row"><span>Schedule</span><span>${d.schedule}</span></div>
                    <div class="mt-3 text-center">
                        <button class="btn btn-sm btn-primary" onclick="viewDoctorSchedule('${d.name}')"><i class="fas fa-calendar"></i> View Schedule</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

function viewDoctorSchedule(doctorName) {
    // Navigate to Schedule page and highlight the doctor
    navigateToPage('schedule');
    showToast(`Showing schedule for ${doctorName}`);
    // Highlight slots for this doctor in the grid
    setTimeout(() => {
        const slots = document.querySelectorAll('.schedule-grid .slot-filled');
        slots.forEach(slot => {
            slot.style.transition = 'all 0.3s ease';
            if (slot.textContent.trim() === doctorName) {
                slot.style.background = 'rgba(79,70,229,0.3)';
                slot.style.fontWeight = '700';
                slot.style.border = '2px solid var(--primary)';
            } else {
                slot.style.opacity = '0.4';
            }
        });
        // Reset after 4 seconds
        setTimeout(() => {
            slots.forEach(slot => {
                slot.style.opacity = '';
                slot.style.background = '';
                slot.style.fontWeight = '';
                slot.style.border = '';
            });
        }, 4000);
    }, 300);
}

// ===== Schedule Grid =====
function initScheduleGrid() {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;
    const days = ['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const times = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00'];
    const scheduleData = {
        'Mon-9:00': 'Dr. Smith', 'Mon-10:00': 'Dr. Smith', 'Mon-11:00': 'Dr. Smith',
        'Mon-1:00': 'Dr. Johnson', 'Mon-2:00': 'Dr. Johnson',
        'Tue-9:00': 'Dr. Williams', 'Tue-10:00': 'Dr. Williams',
        'Tue-1:00': 'Dr. Davis', 'Tue-2:00': 'Dr. Davis', 'Tue-3:00': 'Dr. Davis',
        'Wed-9:00': 'Dr. Smith', 'Wed-10:00': 'Dr. Johnson',
        'Wed-2:00': 'Dr. Williams', 'Wed-3:00': 'Dr. Williams',
        'Thu-9:00': 'Dr. Davis', 'Thu-10:00': 'Dr. Davis',
        'Thu-1:00': 'Dr. Smith', 'Thu-2:00': 'Dr. Smith',
        'Fri-9:00': 'Dr. Johnson', 'Fri-10:00': 'Dr. Johnson',
        'Fri-1:00': 'Dr. Williams', 'Fri-2:00': 'Dr. Davis',
    };
    const breaks = ['Mon-12:00', 'Tue-12:00', 'Wed-12:00', 'Thu-12:00', 'Fri-12:00', 'Sat-12:00'];
    let html = days.map(d => `<div class="header">${d}</div>`).join('');
    times.forEach(time => {
        html += `<div class="time-slot" style="font-weight:600">${time}</div>`;
        for (let i = 1; i < days.length; i++) {
            const key = `${days[i]}-${time}`;
            const isBreak = breaks.includes(key);
            const doc = scheduleData[key];
            if (isBreak) {
                html += `<div class="time-slot slot-break">Break</div>`;
            } else if (doc) {
                html += `<div class="time-slot slot-filled" onclick="showSlotDetail('${days[i]}','${time}','${doc}')">${doc}</div>`;
            } else {
                html += `<div class="time-slot" onclick="addSlotSchedule('${days[i]}','${time}')"></div>`;
            }
        }
    });
    grid.innerHTML = html;

    // Availability slots
    const slotsContainer = document.getElementById('availabilitySlots');
    if (slotsContainer) {
        slotsContainer.innerHTML = doctors.map(d => `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded" style="cursor:pointer" onclick="viewDoctorSchedule('${d.name}')">
                <div>
                    <strong>${d.name}</strong><br>
                    <small class="text-muted">${d.schedule}</small>
                </div>
                <span class="badge ${d.status === 'Available' ? 'bg-success' : d.status === 'In Session' ? 'bg-warning' : 'bg-danger'}">${d.status}</span>
            </div>
        `).join('');
    }
}

function showSlotDetail(day, time, doctor) {
    showToast(`${doctor} is scheduled on ${day} at ${time}`);
}

function addSlotSchedule(day, time) {
    const modal = new bootstrap.Modal(document.getElementById('scheduleModal'));
    modal.show();
    showToast(`Adding schedule for ${day} at ${time}`, 'info');
}

// ===== Queue List =====
function initQueueList() {
    renderQueueList();
}

function renderQueueList() {
    const container = document.getElementById('queueList');
    if (!container) return;
    container.innerHTML = queueData.map((q, i) => `
        <div class="queue-item" id="queue-${q.token}">
            <div class="queue-number">${i + 1}</div>
            <div class="flex-grow-1">
                <strong>${q.patient}</strong><br>
                <small class="text-muted">${q.doctor} | ${q.time} | Wait: ${q.waitTime}</small>
            </div>
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-success" title="Check In" onclick="checkIn('${q.token}')"><i class="fas fa-check"></i></button>
                <button class="btn btn-outline-danger" title="Remove" onclick="removeFromQueue('${q.token}')"><i class="fas fa-times"></i></button>
            </div>
        </div>
    `).join('');
    // Update queue count
    const countEl = document.getElementById('queueCount');
    if (countEl) countEl.textContent = queueData.length;
}

function checkIn(token) {
    const item = queueData.find(q => q.token === token);
    if (!item) return;
    // Animate removal
    const el = document.getElementById('queue-' + token);
    if (el) {
        el.style.transition = 'all 0.3s ease';
        el.style.background = 'rgba(5,150,105,0.1)';
        el.style.borderLeft = '4px solid var(--success)';
    }
    setTimeout(() => {
        queueData = queueData.filter(q => q.token !== token);
        renderQueueList();
        addNotification('success', 'fa-check-circle', 'Patient Checked In', `${item.patient} (${token}) checked in successfully`);
        showToast(`${item.patient} checked in successfully`);
    }, 500);
}

function removeFromQueue(token) {
    const item = queueData.find(q => q.token === token);
    if (!item) return;
    if (!confirm(`Remove ${item.patient} from queue?`)) return;
    const el = document.getElementById('queue-' + token);
    if (el) {
        el.style.transition = 'all 0.3s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
    }
    setTimeout(() => {
        queueData = queueData.filter(q => q.token !== token);
        renderQueueList();
        showToast(`${item.patient} removed from queue`, 'warning');
    }, 300);
}

// ===== Calendar =====
let calYear = 2026;
let calMonth = 5; // June (0-indexed)

function initCalendar() {
    const container = document.getElementById('calendarView');
    if (!container) return;
    renderMonthCalendar(calYear, calMonth);

    // View toggle
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const view = this.dataset.view;
            if (view === 'month') renderMonthCalendar(calYear, calMonth);
            else if (view === 'week') renderWeekCalendar();
            else renderDayCalendar();
        });
    });

    // Navigation
    document.getElementById('calPrev').addEventListener('click', () => {
        calMonth--;
        if (calMonth < 0) { calMonth = 11; calYear--; }
        updateCalTitle();
        renderMonthCalendar(calYear, calMonth);
    });
    document.getElementById('calNext').addEventListener('click', () => {
        calMonth++;
        if (calMonth > 11) { calMonth = 0; calYear++; }
        updateCalTitle();
        renderMonthCalendar(calYear, calMonth);
    });
}

function updateCalTitle() {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    document.getElementById('calTitle').textContent = `${months[calMonth]} ${calYear}`;
}

function renderMonthCalendar(year, month) {
    const container = document.getElementById('calendarView');
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const today = new Date();
    const todayDate = today.getDate();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Generate events from appointments data
    const events = {};
    appointments.forEach(apt => {
        const d = new Date(apt.date);
        if (d.getFullYear() === year && d.getMonth() === month) {
            const day = d.getDate();
            if (!events[day]) events[day] = [];
            events[day].push({ text: `${apt.time} ${apt.patient.split(' ')[0]}`, cls: apt.status === 'Cancelled' ? 'cal-event-warning' : 'cal-event-primary' });
        }
    });

    let html = '<div class="calendar-grid">';
    dayNames.forEach(d => html += `<div class="cal-header">${d}</div>`);
    for (let i = 0; i < firstDay; i++) html += '<div class="cal-day"></div>';
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === todayDate;
        const dayEvents = events[day] || [];
        html += `<div class="cal-day${isToday ? ' today' : ''}" onclick="showDayAppointments(${year},${month},${day})">
            <div class="day-number">${day}</div>
            ${dayEvents.slice(0, 2).map(e => `<div class="cal-event ${e.cls}">${e.text}</div>`).join('')}
            ${dayEvents.length > 2 ? `<div class="cal-event cal-event-success">+${dayEvents.length - 2} more</div>` : ''}
        </div>`;
    }
    html += '</div>';
    container.innerHTML = html;
}

function showDayAppointments(year, month, day) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const dayAppts = appointments.filter(a => a.date === dateStr);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const html = `
    <div class="modal fade" id="dayApptModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title"><i class="fas fa-calendar-day"></i> Appointments - ${months[month]} ${day}, ${year}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body">
                    ${dayAppts.length > 0 ? dayAppts.map(a => `
                        <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
                            <div><strong>${a.patient}</strong><br><small class="text-muted">${a.doctor} - ${a.time}</small></div>
                            <span class="badge ${getStatusClass(a.status)}">${a.status}</span>
                        </div>
                    `).join('') : '<p class="text-muted text-center">No appointments on this day.</p>'}
                </div>
                <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>
            </div>
        </div>
    </div>`;
    showDynamicModal(html, 'dayApptModal');
}

function renderWeekCalendar() {
    const container = document.getElementById('calendarView');
    const hours = Array.from({length: 10}, (_, i) => `${i + 8}:00`);
    const startDate = 15; // Start from Mon 15th
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => `${d} ${startDate+i}`);
    let html = '<div class="schedule-grid" style="grid-template-columns: 60px repeat(7,1fr)">';
    html += '<div class="header">Time</div>';
    days.forEach(d => html += `<div class="header">${d}</div>`);
    hours.forEach(h => {
        html += `<div class="time-slot" style="font-weight:600;font-size:0.75rem">${h}</div>`;
        days.forEach((d, i) => {
            const dayNum = startDate + i;
            const dateStr = `2026-06-${String(dayNum).padStart(2,'0')}`;
            const apt = appointments.find(a => a.date === dateStr && a.time.startsWith(h.split(':')[0]));
            if (apt) {
                html += `<div class="time-slot slot-filled" style="font-size:0.7rem;cursor:pointer" onclick="viewAppointment('${apt.id}')">${apt.patient.split(' ')[0]}</div>`;
            } else {
                html += '<div class="time-slot"></div>';
            }
        });
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderDayCalendar() {
    const container = document.getElementById('calendarView');
    const hours = Array.from({length: 12}, (_, i) => `${i + 8}:00`);
    const todayAppts = appointments.filter(a => a.date === '2026-06-18');
    let html = '<div class="p-3">';
    html += '<h6 class="mb-3">Thursday, June 18, 2026</h6>';
    hours.forEach(h => {
        const hourNum = parseInt(h);
        const apt = todayAppts.find(a => {
            const aptHour = parseInt(a.time);
            const isPM = a.time.includes('PM') && aptHour !== 12;
            return (isPM ? aptHour + 12 : aptHour) === hourNum;
        });
        html += `<div class="d-flex gap-3 mb-2 p-2 border-start border-3 ${apt ? 'border-primary' : 'border-light'} rounded" ${apt ? `style="cursor:pointer" onclick="viewAppointment('${apt.id}')"` : ''}>
            <span class="text-muted" style="width:60px;font-size:0.8rem">${h}</span>
            ${apt ? `<div><strong>${apt.patient}</strong> - ${apt.doctor} <span class="badge ${getStatusClass(apt.status)} ms-2">${apt.status}</span></div>` : '<span class="text-muted">Available</span>'}
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ===== Notifications =====
function initNotifications() {
    renderNotifications();
}

function renderNotifications() {
    const container = document.getElementById('notificationList');
    if (!container) return;
    container.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.unread ? 'unread' : ''}" id="notif-${n.id}" onclick="markNotifRead(${n.id})" style="cursor:pointer">
            <div class="notification-icon ${n.type}">
                <i class="fas ${n.icon}"></i>
            </div>
            <div class="flex-grow-1">
                <strong>${n.title}</strong>
                <p class="mb-0 text-muted" style="font-size:0.85rem">${n.msg}</p>
                <small class="text-muted">${n.time}</small>
            </div>
            ${n.unread ? '<span class="badge bg-primary">New</span>' : ''}
        </div>
    `).join('');
    // Update badge count in navbar
    const badge = document.querySelector('.notification-btn .badge');
    const unreadCount = notifications.filter(n => n.unread).length;
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? '' : 'none';
    }
}

function markNotifRead(id) {
    const n = notifications.find(x => x.id === id);
    if (n) n.unread = false;
    renderNotifications();
}

function addNotification(type, icon, title, msg) {
    const newId = notifications.length + 1;
    notifications.unshift({ id: newId, type, icon, title, msg, time: 'Just now', unread: true });
    renderNotifications();
}

function initMarkAllRead() {
    const btn = document.querySelector('#page-notifications .btn-outline-secondary');
    if (!btn) return;
    btn.addEventListener('click', function() {
        notifications.forEach(n => n.unread = false);
        renderNotifications();
        showToast('All notifications marked as read');
    });
}

// ===== Charts =====
function initCharts() {
    const ctx = document.getElementById('appointmentChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [
                    { label: 'Completed', data: [18, 22, 20, 24, 16, 10], backgroundColor: 'rgba(5,150,105,0.7)', borderRadius: 6 },
                    { label: 'Scheduled', data: [24, 28, 25, 30, 22, 14], backgroundColor: 'rgba(79,70,229,0.7)', borderRadius: 6 },
                    { label: 'Cancelled', data: [3, 2, 4, 3, 5, 1], backgroundColor: 'rgba(220,38,38,0.7)', borderRadius: 6 },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
            }
        });
    }

    const ctx2 = document.getElementById('analyticsChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Appointments', data: [420, 480, 520, 550, 580, 620], borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.1)', fill: true, tension: 0.4 },
                    { label: 'New Patients', data: [35, 42, 38, 45, 52, 48], borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.1)', fill: true, tension: 0.4 },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

// ===== Form Validation =====
function initFormValidation() {
    // Book Appointment
    const saveBtn = document.getElementById('saveAppointmentBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const form = document.getElementById('appointmentForm');
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            showLoading();
            setTimeout(() => {
                hideLoading();
                // Actually add the appointment
                const newId = 'APT-' + String(appointments.length + 1).padStart(3, '0');
                const newApt = {
                    id: newId,
                    patient: document.getElementById('aptPatientName').value,
                    doctor: document.getElementById('aptDoctor').value,
                    dept: document.getElementById('aptDepartment').value,
                    date: document.getElementById('aptDate').value,
                    time: document.getElementById('aptTime').value,
                    type: document.getElementById('aptType').value,
                    status: 'Confirmed'
                };
                appointments.push(newApt);
                renderAppointmentsTable(appointments);
                const modal = bootstrap.Modal.getInstance(document.getElementById('bookAppointmentModal'));
                modal.hide();
                form.reset();
                form.classList.remove('was-validated');
                addNotification('success', 'fa-calendar-check', 'New Appointment', `${newApt.patient} booked with ${newApt.doctor} on ${newApt.date}`);
                showToast('Appointment booked successfully!');
            }, 1000);
        });
    }

    // Register Patient
    const savePatientBtn = document.getElementById('savePatientBtn');
    if (savePatientBtn) {
        savePatientBtn.addEventListener('click', function() {
            const form = document.getElementById('patientForm');
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            showLoading();
            setTimeout(() => {
                hideLoading();
                // Extract form values
                const inputs = form.querySelectorAll('input, select, textarea');
                const firstName = inputs[0].value;
                const lastName = inputs[1].value;
                const dob = inputs[2].value;
                const gender = inputs[3].value;
                const blood = inputs[4].value;
                const phone = inputs[5] ? inputs[5].value : '';
                const email = inputs[6] ? inputs[6].value : '';
                const address = inputs[7] ? inputs[7].value : '';
                const newPatient = {
                    id: patients.length + 1,
                    name: `${firstName} ${lastName}`,
                    age: dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 0,
                    gender: gender,
                    phone: phone,
                    email: email,
                    visits: 0,
                    lastVisit: '-',
                    blood: blood || '-',
                    address: address
                };
                patients.push(newPatient);
                renderPatientCards(patients);
                const modal = bootstrap.Modal.getInstance(document.getElementById('patientModal'));
                modal.hide();
                form.reset();
                form.classList.remove('was-validated');
                addNotification('success', 'fa-user-plus', 'New Patient Registered', `${newPatient.name} has been registered`);
                showToast('Patient registered successfully!');
            }, 1000);
        });
    }

    // Reschedule
    const rescheduleBtn = document.getElementById('confirmReschedule');
    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', function() {
            const newDate = document.getElementById('rescheduleDate').value;
            const newTime = document.getElementById('rescheduleTime').value;
            if (!newDate) {
                showToast('Please select a new date', 'warning');
                return;
            }
            showLoading();
            setTimeout(() => {
                hideLoading();
                if (rescheduleTargetId) {
                    const apt = appointments.find(a => a.id === rescheduleTargetId);
                    if (apt) {
                        apt.date = newDate;
                        apt.time = newTime;
                        apt.status = 'Confirmed';
                        renderAppointmentsTable(appointments);
                        addNotification('info', 'fa-calendar-alt', 'Appointment Rescheduled', `${apt.patient}'s appointment moved to ${newDate} at ${newTime}`);
                    }
                }
                const modal = bootstrap.Modal.getInstance(document.getElementById('rescheduleModal'));
                modal.hide();
                rescheduleTargetId = null;
                showToast('Appointment rescheduled successfully!');
            }, 800);
        });
    }

    // Schedule Form
    const scheduleModal = document.getElementById('scheduleModal');
    if (scheduleModal) {
        const saveScheduleBtn = scheduleModal.querySelector('.modal-footer .btn-primary');
        if (saveScheduleBtn) {
            saveScheduleBtn.addEventListener('click', function() {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    bootstrap.Modal.getInstance(scheduleModal).hide();
                    showToast('Schedule saved successfully!');
                    initScheduleGrid(); // Refresh
                }, 800);
            });
        }
    }
}

// ===== Global Search =====
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    // Create search results dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    dropdown.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;box-shadow:var(--shadow-lg);max-height:300px;overflow-y:auto;z-index:1000;display:none;';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(dropdown);

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length < 2) { dropdown.style.display = 'none'; return; }

        const results = [];
        patients.filter(p => p.name.toLowerCase().includes(query)).forEach(p => {
            results.push({ icon: 'fa-user', text: p.name, sub: `Patient - ${p.phone}`, action: () => { navigateToPage('patients'); viewPatient(p.id); } });
        });
        doctors.filter(d => d.name.toLowerCase().includes(query)).forEach(d => {
            results.push({ icon: 'fa-user-md', text: d.name, sub: d.specialty, action: () => { navigateToPage('doctors'); } });
        });
        appointments.filter(a => a.patient.toLowerCase().includes(query) || a.doctor.toLowerCase().includes(query) || a.id.toLowerCase().includes(query)).forEach(a => {
            results.push({ icon: 'fa-calendar-check', text: `${a.id} - ${a.patient}`, sub: `${a.doctor} | ${a.date} ${a.time}`, action: () => { navigateToPage('appointments'); viewAppointment(a.id); } });
        });

        if (results.length === 0) {
            dropdown.innerHTML = '<div style="padding:12px;text-align:center;color:var(--text-secondary)">No results found</div>';
        } else {
            dropdown.innerHTML = results.slice(0, 8).map((r, i) => `
                <div class="search-result-item" data-idx="${i}" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border-color);cursor:pointer;transition:background 0.2s">
                    <i class="fas ${r.icon}" style="color:var(--primary);width:20px;text-align:center"></i>
                    <div><strong>${r.text}</strong><br><small style="color:var(--text-secondary)">${r.sub}</small></div>
                </div>
            `).join('');
            dropdown.querySelectorAll('.search-result-item').forEach((item, i) => {
                item.addEventListener('click', () => {
                    results[i].action();
                    dropdown.style.display = 'none';
                    searchInput.value = '';
                });
                item.addEventListener('mouseenter', () => item.style.background = 'rgba(79,70,229,0.05)');
                item.addEventListener('mouseleave', () => item.style.background = '');
            });
        }
        dropdown.style.display = 'block';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Close on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { dropdown.style.display = 'none'; searchInput.blur(); }
    });
}

// ===== Utility Functions =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const body = document.getElementById('toastMessage');
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    body.textContent = message;
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

function showDynamicModal(html, id) {
    // Remove old instance if exists
    const old = document.getElementById(id);
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    const modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
    // Clean up on close
    document.getElementById(id).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// ===== Walk-in Patient =====
document.addEventListener('DOMContentLoaded', function() {
    const walkInBtn = document.getElementById('addWalkInBtn');
    if (walkInBtn) {
        walkInBtn.addEventListener('click', function() {
            const patientModal = new bootstrap.Modal(document.getElementById('patientModal'));
            patientModal.show();
        });
    }

    // Pagination clicks
    document.querySelectorAll('.pagination .page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const li = this.closest('.page-item');
            if (li.classList.contains('disabled') || li.classList.contains('active')) return;
            document.querySelectorAll('.pagination .page-item').forEach(p => p.classList.remove('active'));
            li.classList.add('active');
            showToast('Page loaded');
        });
    });

    // Notification dropdown items click -> navigate to notifications
    document.querySelectorAll('.notification-dropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('notifications');
        });
    });

    // Stat cards click -> navigate to relevant page
    document.querySelectorAll('#page-dashboard .stat-card').forEach((card, i) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const pages = ['appointments', 'appointments', 'appointments', 'appointments'];
            navigateToPage(pages[i] || 'appointments');
        });
    });
});
