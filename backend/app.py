import time
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import GoogleMapsScraper
from extractor import enrich_lead

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "Lead Finder API"})


@app.route('/api/scrape', methods=['POST'])
def scrape():
    data = request.get_json(force=True) or {}
    cities = [str(c).strip() for c in data.get('cities', []) if str(c).strip()]
    categories = [str(c).strip() for c in data.get('categories', []) if str(c).strip()]
    limit = max(1, min(int(data.get('limit', 25)), 500))

    if not cities:
        return jsonify({"error": "Inserisci almeno una città."}), 400
    if not categories:
        return jsonify({"error": "Inserisci almeno una categoria."}), 400

    logger.info(f"Scrape request — cities={cities} categories={categories} limit={limit}")
    start = time.time()

    # Distribute the limit across all city×category combinations
    combos = [(city, cat) for city in cities for cat in categories]
    per_combo = max(1, limit // len(combos))
    remainder = limit - per_combo * len(combos)

    all_leads = []
    scraper = GoogleMapsScraper(headless=True)

    try:
        for i, (city, category) in enumerate(combos):
            # Give the last combo the leftover quota
            quota = per_combo + (remainder if i == len(combos) - 1 else 0)
            try:
                leads = scraper.search(category, city, limit=quota)
            except Exception as e:
                logger.error(f"Scraper error for {category}/{city}: {e}")
                leads = []

            # Enrich each lead with email + social from their website
            for lead in leads:
                try:
                    enrich_lead(lead)
                except Exception as e:
                    logger.debug(f"Enrich error: {e}")

            all_leads.extend(leads)

            if len(all_leads) >= limit:
                break

    finally:
        scraper.close()

    result = all_leads[:limit]
    duration = round(time.time() - start, 1)
    logger.info(f"Scrape done — {len(result)} leads in {duration}s")

    return jsonify({
        "leads": result,
        "count": len(result),
        "duration": duration,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
