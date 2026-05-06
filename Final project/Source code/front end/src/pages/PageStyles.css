/* PageStyles.css — unified styles for all pages */

/* ─── Auth Pages ──────────────────────────────────────────────────────────── */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.auth-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse at top, #0f0f2a 0%, #0a0a1a 100%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  animation: blobFloat 8s ease-in-out infinite;
}
.blob.b1 { width: 500px; height: 500px; top: -150px; left: -150px; background: #7928ca; }
.blob.b2 { width: 600px; height: 600px; bottom: -200px; right: -200px; background: #00b8ff; animation-delay: 2s; }
.blob.b3 { width: 300px; height: 300px; top: 50%; left: 50%; background: #ff0080; animation-delay: 4s; }

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.auth-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.auth-logo {
  text-align: center;
  margin-bottom: 2rem;
}
.logo-icon { font-size: 2.5rem; }
.auth-logo h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0.3rem 0 0;
}
.auth-logo p { color: #8888aa; font-size: 0.85rem; margin-top: 0.25rem; }

.grad-text {
  background: linear-gradient(90deg, #bb86fc, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-title { font-size: 1.6rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem; }
.auth-subtitle { color: #8888aa; text-align: center; font-size: 0.9rem; margin-bottom: 1.5rem; }

.auth-form { display: flex; flex-direction: column; gap: 1.2rem; }

.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.85rem; font-weight: 600; color: #ccc; }
.field input, .field select, .field textarea {
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
}
.field input:focus, .field select:focus {
  outline: none;
  border-color: #bb86fc;
  box-shadow: 0 0 0 3px rgba(187,134,252,0.2);
}
.field input::placeholder { color: #555; }
select option { background: #1a1a2e; color: #fff; }

.btn-primary-full {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #7928ca, #00b8ff);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}
.btn-primary-full:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(121,40,202,0.5);
}
.btn-primary-full:disabled { opacity: 0.5; cursor: not-allowed; }

.auth-switch { text-align: center; color: #8888aa; font-size: 0.9rem; margin-top: 1.5rem; }
.link-btn { background: none; border: none; color: #bb86fc; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
.link-btn:hover { text-decoration: underline; }

/* ─── Alerts ──────────────────────────────────────────────────────────────── */
.alert {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.alert-error { background: rgba(255,51,102,0.1); color: #ff6680; border: 1px solid rgba(255,51,102,0.25); }
.alert-success { background: rgba(0,255,136,0.1); color: #00ff88; border: 1px solid rgba(0,255,136,0.25); }

/* ─── Spinner ─────────────────────────────────────────────────────────────── */
.spinner {
  display: inline-block;
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(10,10,26,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.nav-brand { display: flex; align-items: center; gap: 0.5rem; font-size: 1.4rem; font-weight: 800; color: #fff; }
.nav-right { display: flex; align-items: center; gap: 1rem; }
.user-pill { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.08); padding: 0.4rem 0.9rem; border-radius: 50px; }
.user-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #7928ca, #00b8ff); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; }
.user-name { font-size: 0.9rem; font-weight: 600; color: #eee; }
.btn-ghost { background: none; border: 1px solid rgba(255,255,255,0.2); color: #ccc; padding: 0.4rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
.btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }
.secure-badge { font-size: 0.85rem; color: #00ff88; background: rgba(0,255,136,0.1); padding: 0.4rem 0.8rem; border-radius: 20px; border: 1px solid rgba(0,255,136,0.25); }

/* ─── Dashboard ───────────────────────────────────────────────────────────── */
.dashboard-page { min-height: 100vh; position: relative; }
.dash-bg { position: fixed; inset: 0; z-index: -1; background: radial-gradient(ellipse at top, #0f0f2a 0%, #0a0a1a 100%); }

/* Hero */
.hero-banner {
  background: linear-gradient(135deg, rgba(121,40,202,0.3) 0%, rgba(0,184,255,0.2) 100%);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 3rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.hero-badge {
  display: inline-block;
  background: rgba(187,134,252,0.15);
  color: #bb86fc;
  border: 1px solid rgba(187,134,252,0.3);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.hero-title { font-size: 2.8rem; font-weight: 900; color: #fff; margin: 0 0 0.5rem; }
.hero-sub { color: #8888aa; font-size: 1rem; max-width: 500px; }
.hero-stats { display: flex; gap: 1rem; }
.stat-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 1rem 1.5rem; text-align: center; }
.stat-num { display: block; font-size: 2rem; font-weight: 800; background: linear-gradient(90deg, #bb86fc, #00b8ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.stat-label { font-size: 0.8rem; color: #8888aa; }

/* Filter */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 1.5rem 2rem 0;
}
.filter-chip {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #aaa;
  border-radius: 50px;
  padding: 0.4rem 1.1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-chip:hover { background: rgba(255,255,255,0.12); color: #fff; }
.filter-chip.active { background: linear-gradient(135deg, #7928ca, #00b8ff); border-color: transparent; color: #fff; font-weight: 600; }

/* Events Grid */
.events-main { padding: 1.5rem 2rem 3rem; }
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.event-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.event-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: var(--cat-color, #7928ca);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
.event-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); background: rgba(255,255,255,0.08); }
.event-card:hover::before { transform: scaleX(1); }

.card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.event-emoji { font-size: 2.2rem; }
.card-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; }
.cat-badge { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 50px; }
.slot-badge { font-size: 0.8rem; font-weight: 600; }

.event-name { font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; }
.event-dept { font-size: 0.8rem; color: #8888aa; margin-bottom: 0.6rem; }
.event-desc { font-size: 0.85rem; color: #aaa; margin-bottom: 1rem; line-height: 1.5; }

.event-meta { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; margin-bottom: 1rem; }
.event-meta span { font-size: 0.8rem; color: #999; }

/* Slots bar */
.slots-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-bottom: 1rem; overflow: hidden; }
.slots-progress { height: 100%; border-radius: 2px; transition: width 0.5s ease; }

.card-footer { display: flex; align-items: center; justify-content: space-between; }
.ticket-price { font-size: 1.2rem; font-weight: 800; color: #bb86fc; }
.btn-view { background: none; border: 1px solid rgba(187,134,252,0.4); color: #bb86fc; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
.btn-view:hover { background: rgba(187,134,252,0.1); }

/* Loading skeleton */
.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.skeleton-card {
  height: 280px;
  border-radius: 20px;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

.error-box { text-align: center; padding: 4rem; }
.error-box span { font-size: 3rem; }
.error-box p { color: #aaa; margin: 1rem 0; }
.empty-state { text-align: center; padding: 4rem; font-size: 2rem; }
.empty-state p { color: #aaa; font-size: 1rem; margin-top: 0.5rem; }
.btn-outline { background: none; border: 1px solid rgba(255,255,255,0.3); color: #ccc; padding: 0.6rem 1.5rem; border-radius: 8px; cursor: pointer; margin-top: 1rem; }

.dash-footer { text-align: center; padding: 2rem; color: #444; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.85rem; }

/* ─── Event Modal ─────────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-card {
  background: #111130;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-close {
  position: absolute;
  top: 1rem; right: 1rem;
  background: rgba(255,255,255,0.08);
  border: none; color: #aaa;
  width: 32px; height: 32px;
  border-radius: 50%;
  cursor: pointer; font-size: 0.9rem;
  transition: all 0.2s;
}
.modal-close:hover { background: rgba(255,51,102,0.2); color: #ff6680; }

.modal-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.modal-emoji { font-size: 3rem; }
.modal-event-name { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0; }
.modal-dept { color: #8888aa; font-size: 0.9rem; margin: 0.25rem 0 0; }
.modal-desc { color: #aaa; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; }

.modal-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.modal-info-item {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.mi-icon { font-size: 1.3rem; margin-top: 2px; }
.modal-info-item strong { display: block; font-size: 0.75rem; color: #8888aa; margin-bottom: 0.25rem; font-weight: 600; }
.modal-info-item p { font-size: 0.9rem; color: #eee; margin: 0; }
.mi-time { font-size: 0.8rem; color: #bb86fc; margin-top: 0.1rem; }
.price-text { color: #bb86fc; font-weight: 700; font-size: 1rem !important; }
.slot-text { font-weight: 700; }
.slot-text.available { color: #00ff88; }
.slot-text.low { color: #ffa500; }
.slot-text.sold-out { color: #ff3366; }

.modal-slots-section { margin-bottom: 1.5rem; }
.modal-slots-label { display: flex; justify-content: space-between; font-size: 0.85rem; color: #8888aa; margin-bottom: 0.5rem; }
.modal-slots-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.modal-slots-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }

.modal-actions { display: flex; gap: 1rem; }
.btn-ghost-lg { flex: 1; padding: 0.85rem; background: none; border: 1px solid rgba(255,255,255,0.2); color: #ccc; border-radius: 12px; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
.btn-ghost-lg:hover { background: rgba(255,255,255,0.08); color: #fff; }
.btn-book {
  flex: 2;
  padding: 0.85rem;
  background: linear-gradient(135deg, #7928ca, #00b8ff);
  border: none; color: #fff;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.2s;
}
.btn-book:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(121,40,202,0.5); }
.btn-book:disabled { background: rgba(255,255,255,0.1); color: #555; cursor: not-allowed; }

/* ─── Booking Page ────────────────────────────────────────────────────────── */
.booking-page, .payment-page, .success-page { min-height: 100vh; position: relative; }
.booking-main, .payment-main, .success-main { padding: 2rem; max-width: 1100px; margin: 0 auto; }

.booking-event-strip {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.strip-emoji { font-size: 2.5rem; }
.strip-info h2 { font-size: 1.2rem; font-weight: 700; color: #fff; margin: 0; }
.strip-info p { font-size: 0.85rem; color: #8888aa; margin: 0.25rem 0 0; }
.strip-price { margin-left: auto; text-align: right; }
.strip-price span { font-size: 1.5rem; font-weight: 800; color: #bb86fc; display: block; }
.strip-price small { font-size: 0.75rem; color: #8888aa; }

.booking-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
@media (max-width: 768px) { .booking-grid { grid-template-columns: 1fr; } }

.booking-form-card, .order-summary-card, .payment-form-card, .payment-summary-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 1.75rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.step-badge {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7928ca, #00b8ff);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 800; color: #fff;
}

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

.ticket-counter { display: flex; align-items: center; gap: 0; }
.counter-btn {
  width: 40px; height: 44px;
  background: rgba(187,134,252,0.15);
  border: 1px solid rgba(187,134,252,0.3);
  color: #bb86fc; font-size: 1.2rem; font-weight: 700;
  cursor: pointer; border-radius: 8px;
  transition: background 0.2s;
}
.counter-btn:hover { background: rgba(187,134,252,0.3); }
.tickets-input { text-align: center; flex: 1; border-radius: 0; border-left: none; border-right: none; }
.field-hint { font-size: 0.78rem; color: #8888aa; margin-top: 0.3rem; }

.btn-proceed {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #7928ca, #00b8ff);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  min-height: 52px;
}
.btn-proceed:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(121,40,202,0.5); }
.btn-proceed:disabled { opacity: 0.5; cursor: not-allowed; }

/* Order Summary */
.order-rows { display: flex; flex-direction: column; gap: 0; }
.order-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.9rem; }
.order-row span { color: #8888aa; }
.order-divider { height: 1px; background: rgba(255,255,255,0.12); margin: 0.5rem 0; }
.total-row { padding: 0.9rem 0; }
.total-row span { font-weight: 600; color: #ccc; }
.total-amount { font-size: 1.3rem; color: #00ff88 !important; }

.payment-methods { margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center; }
.pm-label { font-size: 0.8rem; color: #8888aa; margin-bottom: 0.5rem; }
.pm-icons { display: flex; justify-content: center; gap: 0.75rem; font-size: 1.5rem; margin-bottom: 0.3rem; }
.payment-methods small { font-size: 0.75rem; color: #666; }

/* ─── Payment Page ────────────────────────────────────────────────────────── */
.payment-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; }
@media (max-width: 768px) { .payment-grid { grid-template-columns: 1fr; } }

.payment-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.25rem; }
.payment-sub { color: #8888aa; font-size: 0.9rem; margin-bottom: 1.5rem; }

.method-tabs { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
.method-tab {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  color: #aaa; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
}
.method-tab span:first-child { font-size: 1.4rem; }
.method-tab.active { background: rgba(187,134,252,0.15); border-color: rgba(187,134,252,0.4); color: #bb86fc; }
.method-tab:hover:not(.active) { background: rgba(255,255,255,0.08); color: #ccc; }

.pay-method-panel { margin-bottom: 1rem; animation: slideUp 0.3s ease; }

/* UPI */
.upi-illustration { text-align: center; padding: 1.5rem 0; margin-bottom: 1rem; }
.upi-logo { font-size: 2rem; font-weight: 900; background: linear-gradient(90deg, #00b300, #007700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: block; margin-bottom: 0.5rem; }
.qr-placeholder { width: 100px; height: 100px; margin: 0.5rem auto; border: 2px dashed rgba(255,255,255,0.25); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #8888aa; text-align: center; padding: 0.5rem; }

/* QR Code Payment */
.upi-qr-section { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.qr-code-container { 
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(187, 134, 252, 0.4);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.qr-code-image { 
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background: white;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.qr-instruction { 
  font-size: 0.9rem;
  color: #8888aa;
  margin: 0;
  text-align: center;
}
.qr-divider {
  width: 100%;
  text-align: center;
  color: #8888aa;
  font-size: 0.85rem;
  position: relative;
  padding: 0.5rem 0;
}
.qr-divider::before, .qr-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: rgba(255,255,255,0.1);
}
.qr-divider::before { left: 0; }
.qr-divider::after { right: 0; }

.qr-confirm-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-qr-confirm {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #00b300 0%, #007700 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0, 179, 0, 0.3);
}
.btn-qr-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 179, 0, 0.5);
}

.qr-paid-status {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-confirm-payment {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #bb86fc 0%, #7928ca 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(187, 134, 252, 0.3);
}
.btn-confirm-payment:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(187, 134, 252, 0.5);
}

/* Card */
.card-preview {
  background: linear-gradient(135deg, #1a1a4a 0%, #2d1b69 50%, #1a3a4a 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 160px;
  position: relative;
  overflow: hidden;
}
.card-preview::before { content: ""; position: absolute; top: -40px; right: -40px; width: 150px; height: 150px; background: rgba(255,255,255,0.05); border-radius: 50%; }
.card-chip { font-size: 1.2rem; color: gold; margin-bottom: 1rem; letter-spacing: 3px; }
.card-number-display { font-size: 1.1rem; font-weight: 600; letter-spacing: 4px; color: #fff; margin-bottom: 1rem; font-family: monospace; }
.card-bottom { display: flex; justify-content: space-between; }
.card-bottom small { font-size: 0.7rem; color: rgba(255,255,255,0.6); display: block; margin-bottom: 0.2rem; }
.card-bottom p { font-size: 0.9rem; font-weight: 600; color: #fff; margin: 0; letter-spacing: 1px; }

/* Net Banking */
.nb-info { color: #8888aa; font-size: 0.9rem; margin-bottom: 1.5rem; }
.bank-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.bank-tile { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0.75rem; text-align: center; font-size: 0.85rem; font-weight: 600; color: #ccc; cursor: pointer; transition: all 0.2s; }
.bank-tile:hover { background: rgba(187,134,252,0.15); border-color: rgba(187,134,252,0.4); color: #bb86fc; }

.btn-pay {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #00ff88, #00b8ff);
  color: #0a0a1a;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 1rem;
  display: flex; align-items: center; justify-content: center;
  min-height: 52px;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn-pay:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,255,136,0.4); }
.btn-pay:disabled { opacity: 0.5; cursor: not-allowed; }

.review-event { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.review-emoji { font-size: 2rem; }
.review-name { font-weight: 700; color: #fff; font-size: 0.95rem; margin: 0; }
.review-venue { font-size: 0.8rem; color: #8888aa; margin: 0.2rem 0 0; }

.security-note { display: flex; gap: 0.75rem; align-items: flex-start; margin-top: 1.5rem; padding: 1rem; background: rgba(0,255,136,0.05); border-radius: 10px; border: 1px solid rgba(0,255,136,0.15); }
.security-note span { font-size: 1.2rem; }
.security-note p { font-size: 0.8rem; color: #8888aa; margin: 0; line-height: 1.5; }

/* Payment summary card */
.payment-summary-card .section-title { margin-bottom: 1rem; }

/* ─── Success Page ────────────────────────────────────────────────────────── */
.success-main { display: flex; justify-content: center; padding: 3rem 1rem; }
.success-card { max-width: 560px; width: 100%; text-align: center; }

.success-confetti { display: flex; gap: 0.75rem; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem; }
.success-confetti span { animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

.success-icon-circle {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,184,255,0.2));
  border: 2px solid rgba(0,255,136,0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1rem;
  animation: bounceIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); }
  80% { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
}

.success-headline { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
.success-sub { color: #8888aa; font-size: 0.95rem; margin-bottom: 2rem; }

/* Ticket */
.ticket-card {
  background: linear-gradient(135deg, #1a1a3a, #141428);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  text-align: left;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
}
.ticket-header { display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(121,40,202,0.4), rgba(0,184,255,0.3)); }
.ticket-event-emoji { font-size: 2.5rem; }
.ticket-header h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0; }
.ticket-header p { font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0.25rem 0 0; }

.ticket-divider { display: flex; align-items: center; position: relative; padding: 0 1rem; background: #0a0a1a; }
.ticket-hole {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: #0a0a1a;
  border: 1px solid rgba(255,255,255,0.15);
  position: absolute;
  top: -12px;
}
.ticket-hole.left { left: -12px; }
.ticket-hole.right { right: -12px; }
.ticket-dash { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 8px, transparent 8px, transparent 16px); margin: 0.5rem 0; }

.ticket-details { padding: 1.5rem; display: flex; flex-direction: column; gap: 0; }
.td-row { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.875rem; }
.td-row span { color: #8888aa; }
.td-row strong { color: #eee; }
.highlight-row-ticket { margin-top: 0.5rem; padding-top: 0.75rem !important; border-top: 1px dashed rgba(255,255,255,0.2) !important; }
.paid-amount { font-size: 1.2rem; color: #00ff88 !important; }
.status-paid { color: #00ff88 !important; font-size: 0.9rem; }

.success-note { font-size: 0.82rem; color: #666; margin-top: 1rem; }
