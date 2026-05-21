import time
import uuid
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

logger = logging.getLogger(__name__)


class GoogleMapsScraper:
    # Selectors for Google consent dialogs (shown in EU/Italy)
    CONSENT_SELECTORS = [
        'button#L2AGLb',                              # "Accept all" button ID
        'button.VfPpkd-LgbsSe[jsname="b3VHJd"]',     # secondary consent button
        'form:nth-of-type(2) button',                  # fallback: second form's button
    ]

    def __init__(self, headless=True):
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('--headless=new')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1400,900')
        options.add_argument('--lang=it-IT,it;q=0.9')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument(
            'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        )
        options.add_experimental_option('excludeSwitches', ['enable-automation'])
        options.add_experimental_option('useAutomationExtension', False)

        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)
        # Hide webdriver flag
        self.driver.execute_script(
            "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        )
        self._consent_handled = False

    def _handle_consent(self):
        """Click through Google's GDPR consent dialog if present."""
        if self._consent_handled:
            return
        time.sleep(2)
        for selector in self.CONSENT_SELECTORS:
            try:
                btn = self.driver.find_element(By.CSS_SELECTOR, selector)
                if btn.is_displayed():
                    btn.click()
                    time.sleep(1.5)
                    self._consent_handled = True
                    logger.info("Consent dialog dismissed.")
                    return
            except Exception:
                continue

    def search(self, category: str, city: str, limit: int = 25) -> list:
        """
        Search Google Maps for businesses matching category+city.
        Returns a list of lead dicts (up to limit).
        """
        query = f"{category} {city}"
        search_url = "https://www.google.com/maps/search/" + query.replace(' ', '+')

        logger.info(f"Searching: {query} (limit={limit})")
        self.driver.get(search_url)
        self._handle_consent()
        time.sleep(3)

        # Collect all place page URLs first (scrolling the results feed)
        place_urls = self._collect_place_urls(limit)
        logger.info(f"Collected {len(place_urls)} place URLs for '{query}'")

        leads = []
        for url in place_urls:
            if len(leads) >= limit:
                break
            self.driver.get(url)
            time.sleep(2.5)
            lead = self._extract_details(category, city)
            if lead:
                lead['id'] = f"lead-{uuid.uuid4().hex[:8]}"
                leads.append(lead)
                logger.info(f"  Extracted: {lead['name']}")

        return leads

    def _collect_place_urls(self, limit: int) -> list:
        """Scroll the results feed and collect unique place page URLs."""
        urls = []
        seen = set()
        max_scrolls = 30
        no_new = 0

        try:
            feed = WebDriverWait(self.driver, 12).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div[role="feed"]'))
            )
        except Exception as e:
            logger.warning(f"Results feed not found: {e}")
            return urls

        for _ in range(max_scrolls):
            if len(urls) >= limit:
                break

            links = self.driver.find_elements(By.CSS_SELECTOR, 'a.hfpxzc')
            added = 0
            for link in links:
                href = link.get_attribute('href')
                if href and href not in seen:
                    seen.add(href)
                    urls.append(href)
                    added += 1
                    if len(urls) >= limit:
                        break

            if added == 0:
                no_new += 1
                if no_new >= 3:
                    break
            else:
                no_new = 0

            # Check if the end-of-list marker is present
            if self.driver.find_elements(By.CSS_SELECTOR, '.HlvSq, .lCjAed'):
                break

            # Scroll the feed panel
            try:
                self.driver.execute_script("arguments[0].scrollTop += 1200", feed)
                time.sleep(1.5)
            except Exception:
                break

        return urls[:limit]

    def _extract_details(self, category: str, city: str) -> dict | None:
        """Extract business details from the currently loaded place page."""
        try:
            wait = WebDriverWait(self.driver, 8)

            # Business name (required)
            try:
                name_el = wait.until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'h1.DUwDvf'))
                )
                name = name_el.text.strip()
            except Exception:
                return None

            if not name:
                return None

            # Address
            address = self._safe_text('button[data-item-id="address"] .Io6YTe')

            # Phone — try several selector variants
            phone = ""
            for sel in [
                'button[data-item-id^="phone:tel"] .Io6YTe',
                'button[data-item-id^="phone"] .Io6YTe',
            ]:
                phone = self._safe_text(sel)
                if phone:
                    break

            # Website
            website = ""
            try:
                web_el = self.driver.find_element(
                    By.CSS_SELECTOR, 'a[data-item-id="authority"]'
                )
                website = (web_el.get_attribute('href') or "").rstrip('/')
            except Exception:
                pass

            return {
                'name': name,
                'category': category,
                'city': city,
                'address': address,
                'phone': phone,
                'email': '',
                'website': website,
                'instagram': '',
                'facebook': '',
            }

        except Exception as e:
            logger.debug(f"Detail extraction failed: {e}")
            return None

    def _safe_text(self, selector: str) -> str:
        try:
            el = self.driver.find_element(By.CSS_SELECTOR, selector)
            return el.text.strip()
        except Exception:
            return ""

    def close(self):
        try:
            self.driver.quit()
        except Exception:
            pass
