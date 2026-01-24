// UI Effects - Login screen and dashboard animations

class UIEffects {
  constructor() {
    this.setupLoginScreen();
    this.setupDashboard();
    this.setupNavigation();
    this.updateSystemTime();
    setInterval(() => this.updateSystemTime(), 1000);
  }

  // ==================== LOGIN SCREEN ====================
  setupLoginScreen() {
    const loginCanvas = document.getElementById('loginCanvas');
    if (!loginCanvas) return;

    const ctx = loginCanvas.getContext('2d');
    let particles = [];
    let scanY = 0;

    // Set canvas size
    const resizeCanvas = () => {
      loginCanvas.width = window.innerWidth;
      loginCanvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particle system for animated background
    class Particle {
      constructor() {
        this.x = Math.random() * loginCanvas.width;
        this.y = Math.random() * loginCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > loginCanvas.width) this.x = 0;
        if (this.x < 0) this.x = loginCanvas.width;
        if (this.y > loginCanvas.height) this.y = 0;
        if (this.y < 0) this.y = loginCanvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(30, 204, 113, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animateLogin = () => {
      // Dark background
      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 0, loginCanvas.width, loginCanvas.height);

      // Grid pattern
      ctx.strokeStyle = 'rgba(30, 204, 113, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < loginCanvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, loginCanvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < loginCanvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(loginCanvas.width, y);
        ctx.stroke();
      }

      // Animated scanning line
      scanY += 1;
      if (scanY > loginCanvas.height) scanY = 0;
      ctx.strokeStyle = 'rgba(30, 204, 113, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(loginCanvas.width, scanY);
      ctx.stroke();

      // Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Radar sweep from center
      const centerX = loginCanvas.width / 2;
      const centerY = loginCanvas.height / 2;
      const time = Date.now() / 3000;
      const angle = (time % 1) * Math.PI * 2;
      const radius = 200;

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      requestAnimationFrame(animateLogin);
    };

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    animateLogin();
  }

  handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
      // Save username and display in topbar
      const loggedUsername = document.getElementById('loggedUsername');
      if (loggedUsername) {
        loggedUsername.textContent = username || 'Operator';
      }
      
      // Transition to main app
      const loginScreen = document.getElementById('loginScreen');
      const mainApp = document.getElementById('mainApp');

      loginScreen.classList.remove('active');
      setTimeout(() => {
        mainApp.classList.add('active');
      }, 100);
    }
  }

  // ==================== DASHBOARD ====================
  setupDashboard() {
    // Dashboard view is now replaced with the map view
    // No need for dashboard canvas animations
  }

  // ==================== NAVIGATION ====================
  setupNavigation() {
    // Screen nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const screen = btn.getAttribute('data-screen');
        this.switchToScreen(screen);
        this.updateActiveNavBtn(btn);
      });
    });

    // Map style buttons
    document.querySelectorAll('.map-style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.map-style-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const style = btn.getAttribute('data-style');
        if (window.mapManager) {
          window.mapManager.changeMapStyle(style);
        }
      });
    });

    // Speed control
    const speedControl = document.getElementById('speedControl');
    if (speedControl) {
      speedControl.addEventListener('input', () => {
        document.getElementById('speedValue').textContent = speedControl.value;
        if (window.skyWatchApp) {
          window.skyWatchApp.animationSpeed = parseInt(speedControl.value);
        }
      });
    }

    // Clear alerts button
    const btnClearAlerts = document.getElementById('btnClearAlerts');
    if (btnClearAlerts) {
      btnClearAlerts.addEventListener('click', () => {
        const alertsList = document.getElementById('alertsList');
        alertsList.innerHTML = '<p style="color: #a8b0be; text-align: center; padding: 20px 0;">No alerts at this time</p>';
        if (window.skyWatchApp) {
          window.skyWatchApp.alerts = [];
        }
      });
    }

    // Logout button
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        mainApp.classList.remove('active');
        loginScreen.classList.add('active');
        document.getElementById('loginForm').reset();
      });
    }
    
    // Footer menu buttons
    document.querySelectorAll('.footer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-footer-action');
        
        // Update active state
        document.querySelectorAll('.footer-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Map action to screen
        const screenMap = {
          'about': 'dashboard',
          'dashboard': 'dashboard',
          'live-tracking': 'live-tracking',
          'missile-testing': 'missile-testing',
          'ai-analysis': 'ai-analysis',
          'alerts': 'alerts',
          'settings': 'settings'
        };
        
        const screen = screenMap[action] || action;
        this.switchToScreen(screen);
      });
    });
  }

  switchToScreen(screen) {
    // Update sidebar content
    document.querySelectorAll('.sidebar-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`screen-${screen}`)?.classList.add('active');

    // Toggle missile mode for map clicks
    if (window.mapManager) {
      window.mapManager.setMissileMode(screen === 'missile-testing');
    }

    // Map is always visible now - no need to toggle views
    const mapView = document.getElementById('mapView');
    if (mapView && !mapView.classList.contains('active')) {
      mapView.classList.add('active');
    }

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-screen') === screen) {
        btn.classList.add('active');
      }
    });
  }

  updateActiveNavBtn(btn) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // ==================== SYSTEM TIME ====================
  updateSystemTime() {
    const now = new Date();
    
    // Use local system time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const timeElement = document.getElementById('systemTime');
    if (timeElement) {
      timeElement.textContent = timeString;
    }
    
    // Update HUD panels
    this.updateHUDPanels();
  }
  
  updateHUDPanels() {
    // Update active assets count
    if (window.skyWatchApp) {
      
      // Update alert count
      const alertCount = window.skyWatchApp.alerts.length;
      const hudAlertCount = document.getElementById('hudAlertCount');
      if (hudAlertCount) {
        hudAlertCount.textContent = alertCount;
        if (alertCount > 0) {
          hudAlertCount.classList.add('has-alerts');
        } else {
          hudAlertCount.classList.remove('has-alerts');
        }
      }
      
      // Update system status - always OPERATIONAL
      const hudSystemStatus = document.getElementById('hudSystemStatus');
      if (hudSystemStatus) {
        hudSystemStatus.textContent = 'OPERATIONAL';
      }
      
      // Update coordinates - center on India
      const hudCoordinates = document.getElementById('hudCoordinates');
      if (hudCoordinates) {
        hudCoordinates.textContent = '20.5937°N, 78.9629°E';
      }
      }
    }
  }

// Initialize UI Effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.uiEffects = new UIEffects();
});
