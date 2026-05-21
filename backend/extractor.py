import re
import logging
import requests

logger = logging.getLogger(__name__)

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    ),
    'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8',
}

SKIP_EMAIL_PATTERNS = [
    'noreply', 'no-reply', 'example', '@w3.org', '@schema.org',
    '@sentry', '@google', '@facebook', 'wordpress', '@jquery',
]

SKIP_SOCIAL_USERNAMES = {
    'sharer', 'share', 'intent', 'dialog', 'plugins', 'pages',
    'groups', 'events', 'watch', 'hashtag', 'explore', 'reel',
    'p', 'tv', 'stories',
}


def _fetch_html(url: str, timeout: int = 8) -> str:
    """Fetch page HTML, return empty string on any error."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        logger.debug(f"Could not fetch {url}: {e}")
        return ""


def extract_email(html: str) -> str:
    """Return the first plausible contact email found in the HTML."""
    emails = re.findall(
        r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
        html
    )
    for email in emails:
        lower = email.lower()
        if not any(skip in lower for skip in SKIP_EMAIL_PATTERNS):
            return email
    return ""


def extract_instagram(html: str) -> str:
    """Return the Instagram username found in the HTML, or empty string."""
    match = re.search(
        r'instagram\.com/([a-zA-Z0-9_.]{1,30})(?:[/?"]|$)',
        html
    )
    if match:
        username = match.group(1)
        if username.lower() not in SKIP_SOCIAL_USERNAMES:
            return username
    return ""


def extract_facebook(html: str) -> str:
    """Return the Facebook page identifier found in the HTML, or empty string."""
    match = re.search(
        r'facebook\.com/([a-zA-Z0-9_.]{1,60})(?:[/?"]|$)',
        html
    )
    if match:
        slug = match.group(1)
        if slug.lower() not in SKIP_SOCIAL_USERNAMES:
            return slug
    return ""


def enrich_lead(lead: dict) -> dict:
    """
    Fetch the lead's website and extract email + social links.
    Mutates and returns the lead dict.
    """
    website = lead.get('website', '')
    if not website:
        return lead

    html = _fetch_html(website)
    if not html:
        return lead

    if not lead.get('email'):
        lead['email'] = extract_email(html)

    if not lead.get('instagram'):
        lead['instagram'] = extract_instagram(html)

    if not lead.get('facebook'):
        lead['facebook'] = extract_facebook(html)

    return lead
