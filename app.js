/* I&D TV – Web-App (läuft im Auto-Browser, auf dem iPhone und am PC).
   Alle Daten bleiben im Browser (localStorage). Kein Server, kein Konto. */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Symbole (feste, eigene SVGs – keine Nutzerdaten)
  // ---------------------------------------------------------------------------
  const ICONS = {
    tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="6" width="19" height="13" rx="2.5"/><path d="M8 2.5l4 3.5 4-3.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.8 6 3.8 9.5s-1.2 6.8-3.8 9.5c-2.6-2.7-3.8-6-3.8-9.5s1.2-6.8 3.8-9.5z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/><circle cx="3.5" cy="18" r="1" fill="currentColor"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V7.5A1.5 1.5 0 0 1 5.5 6H10"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
    radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20V9M7 14l5-5 5 5M5 4h14"/></svg>'
  };

  function icon(name) {
    const span = document.createElement('span');
    span.className = 'ico';
    span.innerHTML = ICONS[name] || '';
    return span.firstElementChild || span;
  }

  function hydrateIcons(root) {
    root.querySelectorAll('[data-icon]').forEach(function (holder) {
      const name = holder.getAttribute('data-icon');
      if (ICONS[name] && !holder.querySelector('svg')) {
        holder.insertAdjacentHTML('afterbegin', ICONS[name]);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Feste Listen
  // ---------------------------------------------------------------------------
  const COUNTRIES = [
    ['DE', 'Deutschland'], ['TR', 'Türkei'], ['AT', 'Österreich'], ['CH', 'Schweiz'],
    ['AZ', 'Aserbaidschan'], ['EG', 'Ägypten'], ['FR', 'Frankreich'], ['GB', 'Großbritannien'],
    ['IT', 'Italien'], ['NL', 'Niederlande'], ['PL', 'Polen'], ['ES', 'Spanien'],
    ['SA', 'Saudi-Arabien'], ['AE', 'Vereinigte Arabische Emirate'], ['US', 'USA']
  ];
  const LANGUAGES = [
    ['de', 'Deutsch'], ['tr', 'Türkçe'], ['en', 'English'], ['az', 'Azərbaycan dili'],
    ['ar', 'العربية'], ['fr', 'Français'], ['it', 'Italiano'], ['nl', 'Nederlands'],
    ['pl', 'Polski'], ['es', 'Español']
  ];

  /** Offizielle Livestream-Seiten der Sender (legal, kostenlos; erreichbar geprüft am 02.10.2026) */
  const SUGGESTIONS = [
    { name: 'TRT 1', url: 'https://www.tabii.com/tr/watch/live/trt1' },
    { name: 'ATV', url: 'https://www.atv.com.tr/canli-yayin' },
    { name: 'Kanal D', url: 'https://www.kanald.com.tr/canli-yayin' },
    { name: 'Show TV', url: 'https://www.showtv.com.tr/canli-yayin' },
    { name: 'Star TV', url: 'https://www.startv.com.tr/canli-yayin' },
    { name: 'NOW', url: 'https://www.nowtv.com.tr/canli-yayin' },
    { name: 'TV8', url: 'https://www.tv8.com.tr/canli-yayin' }
  ];

  const STREAM_EXT = ['m3u8', 'mp4', 'm4v', 'mov', 'mp3', 'aac', 'm4a'];
  const PAGE_SIZE = 200;
  const MAX_LIST_BYTES = 30 * 1024 * 1024;
  const MAX_LIST_CHANNELS = 20000;

  // ---------------------------------------------------------------------------
  // Speicher (nur in diesem Browser)
  // ---------------------------------------------------------------------------
  const KEY = {
    links: 'idtv.links',
    favorites: 'idtv.favorites',
    lists: 'idtv.lists',
    list: function (id) { return 'idtv.list.' + id; },
    settings: 'idtv.settings',
    recent: 'idtv.recent',
    positions: 'idtv.positions',
    tab: 'idtv.tab'
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  /** Speichert und meldet Fehler (z. B. Speicher voll) – gibt true bei Erfolg zurück */
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      const full = e && (e.name === 'QuotaExceededError' || e.code === 22);
      toast(full ? 'Speicher des Browsers ist voll – bitte eine große Liste löschen.' : 'Speichern war nicht möglich.');
      return false;
    }
  }

  function remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* Speicher nicht verfügbar */ }
  }

  function newId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  const state = {
    links: sanitizeChannels(load(KEY.links, [])),
    favorites: sanitizeChannels(load(KEY.favorites, [])),
    lists: Array.isArray(load(KEY.lists, [])) ? load(KEY.lists, []) : [],
    listChannels: {},
    settings: Object.assign({ country: 'TR', language: 'tr', theme: 'dark' }, load(KEY.settings, {})),
    recent: sanitizeChannels(load(KEY.recent, [])),
    positions: load(KEY.positions, {}) || {},
    filter: 'all',
    query: '',
    visible: PAGE_SIZE,
    editingId: null
  };

  state.lists.forEach(function (list) {
    state.listChannels[list.id] = sanitizeChannels(load(KEY.list(list.id), []));
  });

  // ---------------------------------------------------------------------------
  // Links prüfen
  // ---------------------------------------------------------------------------

  /** Macht aus einer Eingabe einen sicheren Web-Link (nur http/https) – sonst null */
  function normalizeURL(input) {
    let text = String(input || '').trim();
    if (!text) return null;

    if (/\s/.test(text)) {
      const found = text.match(/https?:\/\/[^\s<>"']+/i);
      if (!found) return null;
      text = found[0];
    }

    let candidate;
    const schemeMatch = text.match(/^([a-z][a-z0-9+.-]*):\/\//i);
    if (schemeMatch) {
      const scheme = schemeMatch[1].toLowerCase();
      if (scheme !== 'http' && scheme !== 'https') return null;
      candidate = text;
    } else {
      const colon = text.indexOf(':');
      if (colon !== -1 && text.slice(0, colon).indexOf('.') === -1) return null;
      candidate = 'https://' + text;
    }

    let url;
    try {
      url = new URL(candidate);
    } catch (e) {
      return null;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    const host = url.hostname;
    if (!host || host.indexOf('.') === -1 || host.startsWith('.') || host.endsWith('.')) return null;
    return url;
  }

  function sanitizeChannels(value) {
    if (!Array.isArray(value)) return [];
    const result = [];
    value.forEach(function (item) {
      if (!item || typeof item !== 'object') return;
      const url = normalizeURL(item.url);
      if (!url) return;
      const kind = ['auto', 'web', 'stream'].indexOf(item.kind) !== -1 ? item.kind : 'auto';
      const logo = item.logo ? normalizeURL(item.logo) : null;
      result.push({
        id: typeof item.id === 'string' ? item.id.slice(0, 80) : newId(),
        name: String(item.name || url.hostname).slice(0, 160),
        url: url.href,
        kind: kind,
        logo: logo ? logo.href : null,
        group: item.group ? String(item.group).slice(0, 80) : null
      });
    });
    return result;
  }

  function extension(url) {
    const path = url.pathname.toLowerCase();
    const dot = path.lastIndexOf('.');
    return dot === -1 ? '' : path.slice(dot + 1);
  }

  function isYouTubeHost(host) {
    host = host.toLowerCase();
    return host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com' ||
      host === 'youtu.be' || host === 'music.youtube.com';
  }

  /** Video-ID aus YouTube-Links (watch, youtu.be, shorts, live, embed) */
  function youTubeVideoId(url) {
    if (!isYouTubeHost(url.hostname)) return null;
    let id = null;
    if (url.hostname.toLowerCase() === 'youtu.be') {
      id = url.pathname.split('/')[1];
    } else if (url.pathname === '/watch') {
      id = url.searchParams.get('v');
    } else {
      const match = url.pathname.match(/^\/(shorts|live|embed)\/([^/?#]+)/);
      if (match) id = match[2];
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  }

  function startSeconds(url) {
    const t = url.searchParams.get('t') || url.searchParams.get('start');
    if (!t) return 0;
    const match = String(t).match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
    if (!match) return 0;
    return (parseInt(match[1] || '0', 10) * 3600) + (parseInt(match[2] || '0', 10) * 60) + parseInt(match[3] || '0', 10);
  }

  /** Art des Senders: youtube (Video), stream (Videoplayer) oder web (Webseite) */
  function channelType(channel) {
    const url = new URL(channel.url);
    if (youTubeVideoId(url)) return 'youtube';
    if (channel.kind === 'stream') return 'stream';
    if (channel.kind === 'web') return 'web';
    return STREAM_EXT.indexOf(extension(url)) !== -1 ? 'stream' : 'web';
  }

  /** Hängt bei YouTube-Seiten Land (gl) und Sprache (hl) an */
  function regionalize(url) {
    if (!isYouTubeHost(url.hostname) || url.hostname.toLowerCase() === 'youtu.be') return url;
    const copy = new URL(url.href);
    copy.searchParams.set('gl', state.settings.country);
    copy.searchParams.set('hl', state.settings.language);
    return copy;
  }

  function displayHost(urlString) {
    try {
      return new URL(urlString).hostname.replace(/^www\./, '');
    } catch (e) {
      return urlString;
    }
  }

  // ---------------------------------------------------------------------------
  // M3U-Senderlisten lesen
  // ---------------------------------------------------------------------------
  function parseM3U(text) {
    const lines = String(text).replace(/^﻿/, '').split(/\r?\n/);
    const first = lines.find(function (line) { return line.trim() !== ''; });
    if (!first || first.trim().toUpperCase().indexOf('#EXTM3U') !== 0) {
      throw new Error('Das ist keine M3U-Senderliste (sie muss mit #EXTM3U beginnen).');
    }

    const channels = [];
    let pending = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (/^#EXTINF/i.test(line)) {
        pending = parseInfo(line);
        continue;
      }
      if (/^#EXTGRP:/i.test(line)) {
        const group = line.slice(8).trim();
        if (group && pending && !pending.group) pending.group = group;
        else if (group && !pending) pending = { name: null, logo: null, group: group };
        continue;
      }
      if (line.charAt(0) === '#') continue;

      const url = normalizeStreamLine(line);
      if (url) {
        channels.push({
          id: newId(),
          name: ((pending && pending.name) || url.hostname).slice(0, 160),
          url: url.href,
          kind: 'stream',
          logo: pending && pending.logo ? pending.logo : null,
          group: pending && pending.group ? pending.group.slice(0, 80) : null
        });
        if (channels.length >= MAX_LIST_CHANNELS) break;
      }
      pending = null;
    }

    if (channels.length === 0) {
      if (/#EXT-X-(STREAM-INF|TARGETDURATION|MEDIA-SEQUENCE)/i.test(text)) {
        throw new Error('Das ist ein einzelner Stream, keine Senderliste. Füge ihn unter „Sender“ mit „Link hinzufügen“ hinzu.');
      }
      throw new Error('In der Liste wurden keine abspielbaren Sender gefunden.');
    }
    return channels;
  }

  function normalizeStreamLine(line) {
    try {
      const url = new URL(line);
      if ((url.protocol === 'http:' || url.protocol === 'https:') && url.hostname) return url;
    } catch (e) { /* keine gültige Adresse */ }
    return null;
  }

  function parseInfo(line) {
    const attributes = {};
    const regex = /([A-Za-z0-9_-]+)="([^"]*)"/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      attributes[match[1].toLowerCase()] = match[2];
    }

    // Name = Text nach dem ersten Komma außerhalb von Anführungszeichen
    let name = null;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line.charAt(i);
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) {
        name = line.slice(i + 1).trim();
        break;
      }
    }
    if (!name) name = attributes['tvg-name'] || null;

    let logo = null;
    if (attributes['tvg-logo']) {
      const logoURL = normalizeStreamLine(attributes['tvg-logo']);
      logo = logoURL ? logoURL.href : null;
    }

    return { name: name, logo: logo, group: attributes['group-title'] || null };
  }

  // ---------------------------------------------------------------------------
  // Hilfen für die Oberfläche
  // ---------------------------------------------------------------------------
  const $ = function (selector) { return document.querySelector(selector); };

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        const value = props[key];
        if (value === undefined || value === null || value === false) return;
        if (key === 'className') node.className = value;
        else if (key === 'text') node.textContent = value;
        else if (key === 'onClick') node.addEventListener('click', value);
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  let toastTimer = null;
  function toast(message) {
    const box = $('#toast');
    box.textContent = message;
    box.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { box.hidden = true; }, 2800);
  }

  function isFavorite(channel) {
    return state.favorites.some(function (fav) { return fav.url === channel.url; });
  }

  function toggleFavorite(channel) {
    if (isFavorite(channel)) {
      state.favorites = state.favorites.filter(function (fav) { return fav.url !== channel.url; });
      toast('Aus Favoriten entfernt');
    } else {
      state.favorites.push(Object.assign({}, channel));
      toast('Zu Favoriten hinzugefügt');
    }
    save(KEY.favorites, state.favorites);
    renderAll();
    updatePlayerFavorite();
  }

  function logoFor(channel) {
    const type = channelType(channel);
    const box = el('span', { className: 'logo ' + type, 'aria-hidden': 'true' });
    if (channel.logo) {
      const img = el('img', { src: channel.logo, alt: '', loading: 'lazy', referrerpolicy: 'no-referrer', decoding: 'async' });
      img.addEventListener('error', function () {
        img.remove();
        box.appendChild(icon(type === 'web' ? 'globe' : type === 'youtube' ? 'play' : 'radio'));
      });
      box.appendChild(img);
    } else {
      box.appendChild(icon(type === 'web' ? 'globe' : type === 'youtube' ? 'play' : 'radio'));
    }
    return box;
  }

  function subtitleFor(channel) {
    if (channel.group) return channel.group;
    const type = channelType(channel);
    const label = type === 'youtube' ? 'YouTube' : type === 'stream' ? 'Stream' : 'Webseite';
    return label + ' · ' + displayHost(channel.url);
  }

  /** Eine Zeile: Logo + Name (antippen = abspielen) + Herz (+ Bearbeiten/Löschen bei eigenen Links) */
  function channelRow(channel, options) {
    const opts = options || {};
    const fav = isFavorite(channel);

    const main = el('button', {
      type: 'button',
      className: 'row-main',
      'aria-label': channel.name + ' öffnen'
    }, [
      logoFor(channel),
      el('span', { className: 'row-text' }, [
        el('span', { className: 'row-title', text: channel.name }),
        el('span', { className: 'row-sub', text: subtitleFor(channel) })
      ])
    ]);
    main.addEventListener('click', function () { openChannel(channel); });

    const favBtn = el('button', {
      type: 'button',
      className: 'icon-btn' + (fav ? ' is-on' : ''),
      'aria-pressed': fav ? 'true' : 'false',
      'aria-label': fav ? channel.name + ' aus Favoriten entfernen' : channel.name + ' zu Favoriten hinzufügen'
    }, [icon(fav ? 'heartFill' : 'heart')]);
    favBtn.addEventListener('click', function () { toggleFavorite(channel); });

    const actions = el('span', { className: 'row-actions' }, [favBtn]);

    if (opts.editable) {
      const editBtn = el('button', { type: 'button', className: 'icon-btn', 'aria-label': channel.name + ' bearbeiten' }, [icon('edit')]);
      editBtn.addEventListener('click', function () { openLinkDialog(channel); });
      const delBtn = el('button', { type: 'button', className: 'icon-btn', 'aria-label': channel.name + ' löschen' }, [icon('trash')]);
      delBtn.addEventListener('click', function () { deleteLink(channel); });
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
    }

    return el('li', { className: 'row' }, [main, actions]);
  }

  // ---------------------------------------------------------------------------
  // Reiter „Sender“
  // ---------------------------------------------------------------------------
  function allListChannels() {
    const result = [];
    state.lists.forEach(function (list) {
      (state.listChannels[list.id] || []).forEach(function (ch) { result.push(ch); });
    });
    return result;
  }

  function groups() {
    const seen = new Set();
    const ordered = [];
    allListChannels().forEach(function (ch) {
      const group = ch.group || 'Ohne Gruppe';
      if (!seen.has(group)) {
        seen.add(group);
        ordered.push(group);
      }
    });
    return ordered.slice(0, 80);
  }

  function filteredChannels() {
    let base;
    if (state.filter === 'all') base = state.links.concat(allListChannels());
    else if (state.filter === 'links') base = state.links;
    else {
      const name = state.filter.slice(6);
      base = allListChannels().filter(function (ch) { return (ch.group || 'Ohne Gruppe') === name; });
    }
    const query = state.query.trim().toLocaleLowerCase('de');
    if (!query) return base;
    return base.filter(function (ch) {
      return ch.name.toLocaleLowerCase('de').indexOf(query) !== -1 ||
        (ch.group && ch.group.toLocaleLowerCase('de').indexOf(query) !== -1);
    });
  }

  function renderChips() {
    const box = $('#sender-chips');
    box.textContent = '';
    const items = [['all', 'Alle']];
    if (state.links.length) items.push(['links', 'Meine Links']);
    groups().forEach(function (group) { items.push(['group:' + group, group]); });

    if (!items.some(function (item) { return item[0] === state.filter; })) state.filter = 'all';
    box.hidden = items.length <= 1;

    items.forEach(function (item) {
      const chip = el('button', {
        type: 'button',
        className: 'chip',
        'aria-pressed': item[0] === state.filter ? 'true' : 'false',
        text: item[1]
      });
      chip.addEventListener('click', function () {
        state.filter = item[0];
        state.visible = PAGE_SIZE;
        renderSender();
      });
      box.appendChild(chip);
    });
  }

  function renderSuggestions() {
    const box = $('#suggestions');
    box.textContent = '';
    const missing = SUGGESTIONS.filter(function (s) {
      return !state.links.some(function (l) { return l.url === new URL(s.url).href; });
    });
    if (!missing.length || state.query) return;

    const grid = el('div', { className: 'suggest-grid' });
    missing.forEach(function (suggestion) {
      const btn = el('button', { type: 'button', className: 'suggest-btn', 'aria-label': suggestion.name + ' hinzufügen' }, [
        el('span', { text: suggestion.name }),
        icon('plus')
      ]);
      btn.addEventListener('click', function () {
        addLink({ id: newId(), name: suggestion.name, url: new URL(suggestion.url).href, kind: 'web', logo: null, group: null });
        toast(suggestion.name + ' hinzugefügt');
      });
      grid.appendChild(btn);
    });

    const addAll = el('button', { type: 'button', className: 'btn btn-secondary', text: 'Alle hinzufügen' });
    addAll.addEventListener('click', function () {
      missing.forEach(function (s) {
        state.links.push({ id: newId(), name: s.name, url: new URL(s.url).href, kind: 'web', logo: null, group: null });
      });
      save(KEY.links, state.links);
      renderAll();
      toast(missing.length + ' Sender hinzugefügt');
    });

    box.appendChild(el('div', { className: 'card suggest-card' }, [
      el('div', { className: 'suggest-head' }, [
        el('div', {}, [
          el('h2', { text: 'Türkische Sender – offizielle Seiten' }),
          el('p', { className: 'hint', text: 'Kostenlos und legal direkt von den Sendern. Manche Sendungen sind nur in der Türkei freigeschaltet.' })
        ]),
        addAll
      ]),
      grid
    ]));
  }

  function renderSender() {
    renderChips();
    renderSuggestions();

    const list = $('#sender-list');
    list.textContent = '';
    const channels = filteredChannels();
    const fragment = document.createDocumentFragment();
    const ownIds = new Set(state.links.map(function (l) { return l.id; }));

    channels.slice(0, state.visible).forEach(function (ch) {
      fragment.appendChild(channelRow(ch, { editable: ownIds.has(ch.id) }));
    });
    list.appendChild(fragment);

    const nothingAtAll = state.links.length === 0 && allListChannels().length === 0;
    $('#sender-empty').hidden = !nothingAtAll;
    if (!nothingAtAll && channels.length === 0) {
      list.appendChild(el('li', { className: 'hint', text: state.query ? 'Kein Sender gefunden für „' + state.query + '“.' : 'In dieser Auswahl gibt es keine Sender.' }));
    }

    const more = $('#sender-more');
    more.hidden = channels.length <= state.visible;
    more.textContent = 'Mehr anzeigen (' + (channels.length - Math.min(channels.length, state.visible)) + ' weitere)';
  }

  // ---------------------------------------------------------------------------
  // Reiter „Favoriten“, „Browser“ (zuletzt geöffnet), „Listen“
  // ---------------------------------------------------------------------------
  function renderFavorites() {
    const list = $('#favorites-list');
    list.textContent = '';
    const ownIds = new Set(state.links.map(function (l) { return l.id; }));
    state.favorites.forEach(function (ch) {
      list.appendChild(channelRow(ch, { editable: ownIds.has(ch.id) }));
    });
    $('#favorites-empty').hidden = state.favorites.length > 0;
  }

  function renderRecent() {
    const list = $('#recent-list');
    list.textContent = '';
    state.recent.forEach(function (ch) { list.appendChild(channelRow(ch)); });
    $('#recent-title').hidden = state.recent.length === 0;
  }

  function renderLists() {
    const box = $('#lists-list');
    box.textContent = '';
    state.lists.forEach(function (list) {
      const date = new Date(list.updatedAt || Date.now());
      const sub = (list.count || 0).toLocaleString('de-DE') + ' Sender · ' +
        (list.source === 'link' ? 'Link' : list.source === 'file' ? 'Datei' : 'Text') + ' · Stand ' +
        date.toLocaleString('de-DE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

      const actions = el('span', { className: 'row-actions' });
      if (list.source === 'link' && list.url) {
        const refresh = el('button', { type: 'button', className: 'icon-btn', 'aria-label': list.name + ' aktualisieren' }, [icon('refresh')]);
        refresh.addEventListener('click', function () { refreshList(list, refresh); });
        actions.appendChild(refresh);
      }
      const del = el('button', { type: 'button', className: 'icon-btn', 'aria-label': list.name + ' löschen' }, [icon('trash')]);
      del.addEventListener('click', function () { deleteList(list); });
      actions.appendChild(del);

      box.appendChild(el('li', { className: 'row' }, [
        el('span', { className: 'row-main row-static' }, [
          el('span', { className: 'logo', 'aria-hidden': 'true' }, [icon(list.source === 'link' ? 'link' : 'file')]),
          el('span', { className: 'row-text' }, [
            el('span', { className: 'row-title', text: list.name }),
            el('span', { className: 'row-sub', text: sub })
          ])
        ]),
        actions
      ]));
    });
    $('#lists-empty').hidden = state.lists.length > 0;
  }

  function renderAll() {
    renderSender();
    renderFavorites();
    renderRecent();
    renderLists();
  }

  // ---------------------------------------------------------------------------
  // Eigene Links
  // ---------------------------------------------------------------------------
  function addLink(channel) {
    state.links.push(channel);
    save(KEY.links, state.links);
    renderAll();
  }

  function deleteLink(channel) {
    if (!window.confirm('„' + channel.name + '“ wirklich löschen?')) return;
    state.links = state.links.filter(function (l) { return l.id !== channel.id; });
    save(KEY.links, state.links);
    renderAll();
    toast('Gelöscht');
  }

  function openLinkDialog(channel, prefill) {
    const dialog = $('#link-dialog');
    state.editingId = channel ? channel.id : null;
    $('#link-dialog-title').textContent = channel ? 'Link bearbeiten' : 'Neuer Link';
    $('#link-name').value = channel ? channel.name : (prefill && prefill.name) || '';
    $('#link-url').value = channel ? channel.url : (prefill && prefill.url) || '';
    $('#link-kind').value = channel ? channel.kind : 'auto';
    $('#link-url-hint').classList.remove('error');
    $('#link-url-hint').textContent = 'Webseite, YouTube-Link oder direkter Stream-Link (.m3u8). Fehlt „https://“, wird es ergänzt.';
    dialog.showModal();
    $('#link-name').focus();
  }

  function submitLinkForm(event) {
    event.preventDefault();
    const url = normalizeURL($('#link-url').value);
    const hint = $('#link-url-hint');
    if (!url) {
      hint.textContent = 'Das ist keine gültige Web-Adresse. Beispiel: https://www.trt.net.tr';
      hint.classList.add('error');
      $('#link-url').focus();
      return;
    }
    if (extension(url) === 'm3u') {
      hint.textContent = 'Das ist eine ganze Senderliste (.m3u). Bitte unter „Listen“ hinzufügen.';
      hint.classList.add('error');
      return;
    }

    const name = $('#link-name').value.trim().slice(0, 120) || url.hostname.replace(/^www\./, '');
    const kind = $('#link-kind').value;

    if (state.editingId) {
      const old = state.links.find(function (l) { return l.id === state.editingId; });
      state.links = state.links.map(function (l) {
        return l.id === state.editingId ? Object.assign({}, l, { name: name, url: url.href, kind: kind }) : l;
      });
      // Favorit mitziehen, falls sich der Link geändert hat
      if (old) {
        state.favorites = state.favorites.map(function (f) {
          return f.url === old.url ? Object.assign({}, f, { name: name, url: url.href, kind: kind }) : f;
        });
        save(KEY.favorites, state.favorites);
      }
      save(KEY.links, state.links);
      toast('Änderung gespeichert');
    } else {
      state.links.push({ id: newId(), name: name, url: url.href, kind: kind, logo: null, group: null });
      save(KEY.links, state.links);
      toast('Gespeichert unter Sender › Meine Links');
    }
    $('#link-dialog').close();
    renderAll();
  }

  // ---------------------------------------------------------------------------
  // Senderlisten (M3U)
  // ---------------------------------------------------------------------------
  function storeList(meta, channels) {
    if (!save(KEY.list(meta.id), channels)) return false;
    state.listChannels[meta.id] = channels;
    const index = state.lists.findIndex(function (l) { return l.id === meta.id; });
    if (index === -1) state.lists.push(meta);
    else state.lists[index] = meta;
    save(KEY.lists, state.lists);
    renderAll();
    return true;
  }

  async function downloadList(url) {
    if (location.protocol === 'https:' && url.protocol === 'http:') {
      throw new Error('Diese Liste nutzt unverschlüsseltes http. Der Browser blockiert das auf einer https-Seite. Lade die Datei herunter und nutze „Aus Datei“ oder „Als Text“.');
    }
    let response;
    try {
      response = await fetch(url.href, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
    } catch (e) {
      throw new Error('Die Liste konnte nicht geladen werden. Entweder ist der Server nicht erreichbar oder er erlaubt das Laden von anderen Webseiten nicht. Dann bitte „Als Text“ einfügen.');
    }
    if (!response.ok) throw new Error('Der Server hat die Liste nicht herausgegeben (Fehler ' + response.status + ').');
    const length = Number(response.headers.get('content-length') || 0);
    if (length > MAX_LIST_BYTES) throw new Error('Die Liste ist zu groß (über 30 MB).');
    const text = await response.text();
    if (text.length > MAX_LIST_BYTES) throw new Error('Die Liste ist zu groß (über 30 MB).');
    return parseM3U(text);
  }

  async function submitListForm(event) {
    event.preventDefault();
    const errorBox = $('#list-error');
    errorBox.hidden = true;
    const button = $('#list-save');
    const source = document.querySelector('input[name="list-source"]:checked').value;
    const typedName = $('#list-name').value.trim().slice(0, 120);

    button.disabled = true;
    button.textContent = 'Lädt …';
    try {
      let channels;
      let url = null;
      let name = typedName;

      if (source === 'link') {
        url = normalizeURL($('#list-url').value);
        if (!url) throw new Error('Das ist kein gültiger Link.');
        channels = await downloadList(url);
        name = name || url.hostname;
      } else if (source === 'text') {
        const text = $('#list-text').value;
        if (text.length > MAX_LIST_BYTES) throw new Error('Der Text ist zu groß (über 30 MB).');
        channels = parseM3U(text);
        name = name || 'Eigene Liste';
      } else {
        const file = $('#list-file').files[0];
        if (!file) throw new Error('Bitte eine Datei auswählen.');
        if (file.size > MAX_LIST_BYTES) throw new Error('Die Datei ist zu groß (über 30 MB).');
        channels = parseM3U(await file.text());
        name = name || file.name.replace(/\.[^.]+$/, '');
      }

      const meta = { id: newId(), name: name, source: source, url: url ? url.href : null, count: channels.length, updatedAt: Date.now() };
      if (storeList(meta, channels)) {
        $('#list-dialog').close();
        toast(channels.length.toLocaleString('de-DE') + ' Sender geladen');
      }
    } catch (e) {
      errorBox.textContent = e.message;
      errorBox.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Laden';
    }
  }

  async function refreshList(list, button) {
    button.disabled = true;
    try {
      const channels = await downloadList(new URL(list.url));
      storeList(Object.assign({}, list, { count: channels.length, updatedAt: Date.now() }), channels);
      toast('„' + list.name + '“ aktualisiert');
    } catch (e) {
      toast(e.message);
    } finally {
      button.disabled = false;
    }
  }

  function deleteList(list) {
    if (!window.confirm('Liste „' + list.name + '“ mit allen Sendern löschen?')) return;
    state.lists = state.lists.filter(function (l) { return l.id !== list.id; });
    delete state.listChannels[list.id];
    remove(KEY.list(list.id));
    save(KEY.lists, state.lists);
    renderAll();
    toast('Liste gelöscht');
  }

  function updateListSourceFields() {
    const source = document.querySelector('input[name="list-source"]:checked').value;
    document.querySelectorAll('#list-form [data-source]').forEach(function (field) {
      field.hidden = field.getAttribute('data-source') !== source;
    });
  }

  // ---------------------------------------------------------------------------
  // Öffnen & Player
  // ---------------------------------------------------------------------------
  let currentChannel = null;
  let hls = null;
  let positionTimer = null;
  let lastFocus = null;

  function rememberRecent(channel) {
    state.recent = [Object.assign({}, channel)].concat(state.recent.filter(function (r) { return r.url !== channel.url; })).slice(0, 12);
    save(KEY.recent, state.recent);
  }

  function openChannel(channel) {
    rememberRecent(channel);
    const type = channelType(channel);
    if (type === 'web') {
      // Webseiten öffnen im Browser selbst – zurück geht es mit dem Zurück-Pfeil
      window.location.assign(regionalize(new URL(channel.url)).href);
      return;
    }
    openPlayer(channel, type);
  }

  function openPlayer(channel, type) {
    currentChannel = channel;
    lastFocus = document.activeElement;
    const player = $('#player');
    const stage = $('#player-stage');
    stage.textContent = '';
    setStatus('');
    $('#player-title').textContent = channel.name;
    $('#player-external').href = regionalize(new URL(channel.url)).href;
    updatePlayerFavorite();

    player.hidden = false;
    document.body.style.overflow = 'hidden';
    history.pushState({ idtvPlayer: true }, '', location.href);
    $('#player-close').focus();

    if (type === 'youtube') playYouTube(channel);
    else playStream(channel);
  }

  function playYouTube(channel) {
    const url = new URL(channel.url);
    const id = youTubeVideoId(url);
    const params = new URLSearchParams({
      autoplay: '1',
      playsinline: '1',
      rel: '0',
      hl: state.settings.language
    });
    const start = startSeconds(url);
    if (start > 0) params.set('start', String(start));

    const frame = el('iframe', {
      src: 'https://www.youtube-nocookie.com/embed/' + id + '?' + params.toString(),
      title: channel.name,
      allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
      // YouTube verlangt eine Herkunftsangabe, sonst zeigt der Player einen Fehler
      referrerpolicy: 'strict-origin-when-cross-origin'
    });
    $('#player-stage').appendChild(frame);
    setStatus('Läuft das Video nicht? Manche Videos erlauben kein Einbetten – dann oben rechts „Direkt öffnen“.');
  }

  function playStream(channel) {
    const url = new URL(channel.url);
    if (location.protocol === 'https:' && url.protocol === 'http:') {
      showPlayerError('Dieser Stream nutzt unverschlüsseltes http. Der Browser blockiert ihn innerhalb dieser Seite.', url);
      return;
    }

    const video = el('video', { controls: true, playsinline: true, autoplay: true, preload: 'auto' });
    $('#player-stage').appendChild(video);
    const isHLS = extension(url) === 'm3u8' || /\.m3u8/i.test(url.search);

    video.addEventListener('loadedmetadata', function () { resumePosition(video, url.href); });
    video.addEventListener('error', function () {
      showPlayerError('Der Stream lässt sich nicht abspielen. Prüfe den Link – manche Sender sind nur in ihrem eigenen Land freigeschaltet.', url);
    });

    if (isHLS && window.Hls && window.Hls.isSupported()) {
      hls = new window.Hls({ enableWorker: true, lowLatencyMode: true });
      hls.on(window.Hls.Events.ERROR, function (_event, data) {
        if (data && data.fatal) {
          showPlayerError('Der Stream lässt sich nicht abspielen (' + (data.details || 'Fehler') + '). Manche Sender sind nur in ihrem eigenen Land freigeschaltet oder erlauben das Abspielen in fremden Seiten nicht.', url);
        }
      });
      hls.loadSource(url.href);
      hls.attachMedia(video);
    } else {
      video.src = url.href;
    }

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () { setStatus('Tippe auf ▶, um abzuspielen.'); });
    }

    // Alle 5 Sekunden die Stelle merken (nur bei Videos mit fester Länge)
    positionTimer = setInterval(function () { savePosition(video, url.href); }, 5000);
  }

  function resumePosition(video, key) {
    const saved = state.positions[key];
    const duration = video.duration;
    if (saved && isFinite(duration) && duration > 60 && saved.s < duration - 15) {
      video.currentTime = saved.s;
      setStatus('Weiter ab ' + formatTime(saved.s));
      setTimeout(function () { if ($('#player-status').textContent.indexOf('Weiter ab') === 0) setStatus(''); }, 3500);
    }
  }

  function savePosition(video, key) {
    const duration = video.duration;
    if (!isFinite(duration) || duration <= 60) return;
    const s = video.currentTime;
    if (s < 10 || s > duration - 15) delete state.positions[key];
    else state.positions[key] = { s: Math.floor(s), t: Date.now() };

    const keys = Object.keys(state.positions);
    if (keys.length > 300) {
      keys.sort(function (a, b) { return state.positions[a].t - state.positions[b].t; })
        .slice(0, keys.length - 300)
        .forEach(function (k) { delete state.positions[k]; });
    }
    save(KEY.positions, state.positions);
  }

  function formatTime(seconds) {
    const total = Math.round(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
    return (h > 0 ? h + ':' : '') + mm + ':' + String(s).padStart(2, '0');
  }

  function showPlayerError(message, url) {
    teardownMedia();
    const stage = $('#player-stage');
    stage.textContent = '';
    const open = el('a', { className: 'btn btn-primary', href: url.href, rel: 'noopener noreferrer' }, [icon('external'), 'Direkt öffnen']);
    const retry = el('button', { type: 'button', className: 'btn btn-secondary' }, [icon('refresh'), 'Erneut versuchen']);
    retry.addEventListener('click', function () {
      stage.textContent = '';
      setStatus('');
      playStream(currentChannel);
    });
    stage.appendChild(el('div', { className: 'player-error', role: 'alert' }, [
      el('h2', { text: 'Stream läuft nicht' }),
      el('p', { text: message }),
      el('div', { className: 'button-row' }, [retry, open])
    ]));
  }

  function setStatus(text) {
    $('#player-status').textContent = text;
  }

  function teardownMedia() {
    clearInterval(positionTimer);
    positionTimer = null;
    const video = $('#player-stage video');
    if (video && currentChannel) savePosition(video, currentChannel.url);
    if (hls) {
      hls.destroy();
      hls = null;
    }
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }

  function closePlayer() {
    if ($('#player').hidden) return;
    teardownMedia();
    $('#player-stage').textContent = '';
    $('#player').hidden = true;
    document.body.style.overflow = '';
    currentChannel = null;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function updatePlayerFavorite() {
    if (!currentChannel) return;
    const button = $('#player-fav');
    const fav = isFavorite(currentChannel);
    button.classList.toggle('is-on', fav);
    button.setAttribute('aria-pressed', fav ? 'true' : 'false');
    button.setAttribute('aria-label', fav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen');
    button.textContent = '';
    button.appendChild(icon(fav ? 'heartFill' : 'heart'));
  }

  // ---------------------------------------------------------------------------
  // Reiter „YouTube“ und „Browser“
  // ---------------------------------------------------------------------------
  function fillRegionSelects() {
    const country = $('#yt-country');
    const language = $('#yt-language');
    COUNTRIES.forEach(function (c) {
      country.appendChild(el('option', { value: c[0], text: flag(c[0]) + '  ' + c[1] }));
    });
    LANGUAGES.forEach(function (l) {
      language.appendChild(el('option', { value: l[0], text: l[1] }));
    });
    country.value = state.settings.country;
    language.value = state.settings.language;
    country.addEventListener('change', function () { updateSettings({ country: country.value }); toast('Land: ' + country.selectedOptions[0].textContent.trim()); });
    language.addEventListener('change', function () { updateSettings({ language: language.value }); toast('Sprache: ' + language.selectedOptions[0].textContent.trim()); });
  }

  function flag(code) {
    return code.toUpperCase().replace(/./g, function (ch) { return String.fromCodePoint(127397 + ch.charCodeAt(0)); });
  }

  function openYouTubeHome() {
    const url = new URL('https://m.youtube.com/');
    window.location.assign(regionalize(url).href);
  }

  function submitYouTubeSearch(event) {
    event.preventDefault();
    const query = $('#yt-search').value.trim();
    if (!query) return;
    const url = new URL('https://m.youtube.com/results');
    url.searchParams.set('search_query', query.slice(0, 200));
    window.location.assign(regionalize(url).href);
  }

  function submitYouTubePlay(event) {
    event.preventDefault();
    const hint = $('#yt-link-hint');
    const url = normalizeURL($('#yt-link').value);
    if (!url || !youTubeVideoId(url)) {
      hint.textContent = 'Das ist kein YouTube-Video-Link. Beispiel: https://youtu.be/abc123def45';
      hint.classList.add('error');
      return;
    }
    hint.textContent = 'Ein YouTube-Video-Link wird direkt hier in der App abgespielt.';
    hint.classList.remove('error');
    const channel = { id: newId(), name: 'YouTube-Video', url: url.href, kind: 'auto', logo: null, group: null };
    rememberRecent(channel);
    renderRecent();
    openPlayer(channel, 'youtube');
  }

  function addressToURL(input) {
    const text = String(input || '').trim();
    if (!text) return null;
    const url = normalizeURL(text);
    if (url) return url;
    // Kein Link → als Suche (DuckDuckGo speichert keine Suchprofile)
    const search = new URL('https://duckduckgo.com/');
    search.searchParams.set('q', text.slice(0, 300));
    return search;
  }

  function submitBrowser(event) {
    event.preventDefault();
    const url = addressToURL($('#browser-address').value);
    if (!url) return;
    const isSearch = url.hostname === 'duckduckgo.com' && !normalizeURL($('#browser-address').value);
    const channel = { id: newId(), name: isSearch ? 'Suche: ' + $('#browser-address').value.trim().slice(0, 60) : url.hostname.replace(/^www\./, ''), url: url.href, kind: 'auto', logo: null, group: null };
    openChannel(channel);
  }

  function saveBrowserAddress() {
    const value = $('#browser-address').value.trim();
    const url = normalizeURL(value);
    if (!url) {
      toast('Bitte zuerst eine gültige Adresse eingeben.');
      $('#browser-address').focus();
      return;
    }
    openLinkDialog(null, { url: url.href, name: url.hostname.replace(/^www\./, '') });
  }

  // ---------------------------------------------------------------------------
  // Einstellungen, Sicherung, Darstellung
  // ---------------------------------------------------------------------------
  function updateSettings(patch) {
    state.settings = Object.assign({}, state.settings, patch);
    save(KEY.settings, state.settings);
    applyTheme();
  }

  function applyTheme() {
    const theme = ['dark', 'light', 'auto'].indexOf(state.settings.theme) !== -1 ? state.settings.theme : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  function openSettings() {
    const radio = document.querySelector('input[name="theme"][value="' + state.settings.theme + '"]');
    if (radio) radio.checked = true;
    $('#settings-dialog').showModal();
  }

  function exportData() {
    const data = {
      app: 'I&D TV',
      version: 1,
      exportedAt: new Date().toISOString(),
      links: state.links,
      favorites: state.favorites,
      settings: state.settings,
      lists: state.lists.map(function (list) {
        return { meta: list, channels: state.listChannels[list.id] || [] };
      })
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = el('a', { href: URL.createObjectURL(blob), download: 'idtv-sicherung-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.appendChild(link);
    link.click();
    setTimeout(function () { URL.revokeObjectURL(link.href); link.remove(); }, 1000);
    toast('Sicherung erstellt');
  }

  async function importData(file) {
    try {
      if (file.size > MAX_LIST_BYTES) throw new Error('Datei zu groß.');
      const data = JSON.parse(await file.text());
      if (!data || data.app !== 'I&D TV') throw new Error('Das ist keine I&D-TV-Sicherung.');
      if (!window.confirm('Sicherung laden? Deine aktuellen Daten in diesem Browser werden ersetzt.')) return;

      state.links = sanitizeChannels(data.links);
      state.favorites = sanitizeChannels(data.favorites);
      Object.keys(state.listChannels).forEach(function (id) { remove(KEY.list(id)); });
      state.lists = [];
      state.listChannels = {};
      (Array.isArray(data.lists) ? data.lists : []).forEach(function (entry) {
        if (!entry || !entry.meta) return;
        const channels = sanitizeChannels(entry.channels).slice(0, MAX_LIST_CHANNELS);
        const source = ['link', 'file', 'text'].indexOf(entry.meta.source) !== -1 ? entry.meta.source : 'file';
        const listURL = entry.meta.url ? normalizeURL(entry.meta.url) : null;
        const meta = {
          id: newId(),
          name: String(entry.meta.name || 'Liste').slice(0, 120),
          source: source,
          url: listURL ? listURL.href : null,
          count: channels.length,
          updatedAt: Number(entry.meta.updatedAt) || Date.now()
        };
        if (save(KEY.list(meta.id), channels)) {
          state.lists.push(meta);
          state.listChannels[meta.id] = channels;
        }
      });
      if (data.settings && typeof data.settings === 'object') {
        const s = data.settings;
        updateSettings({
          country: COUNTRIES.some(function (c) { return c[0] === s.country; }) ? s.country : state.settings.country,
          language: LANGUAGES.some(function (l) { return l[0] === s.language; }) ? s.language : state.settings.language,
          theme: ['dark', 'light', 'auto'].indexOf(s.theme) !== -1 ? s.theme : state.settings.theme
        });
        $('#yt-country').value = state.settings.country;
        $('#yt-language').value = state.settings.language;
      }
      save(KEY.links, state.links);
      save(KEY.favorites, state.favorites);
      save(KEY.lists, state.lists);
      renderAll();
      toast('Sicherung geladen');
    } catch (e) {
      toast('Sicherung konnte nicht geladen werden: ' + e.message);
    }
  }

  function resetData() {
    if (!window.confirm('Wirklich ALLE Links, Favoriten und Listen in diesem Browser löschen?')) return;
    Object.keys(state.listChannels).forEach(function (id) { remove(KEY.list(id)); });
    [KEY.links, KEY.favorites, KEY.lists, KEY.recent, KEY.positions].forEach(remove);
    state.links = [];
    state.favorites = [];
    state.lists = [];
    state.listChannels = {};
    state.recent = [];
    state.positions = {};
    $('#settings-dialog').close();
    renderAll();
    toast('Alle Daten gelöscht');
  }

  // ---------------------------------------------------------------------------
  // Navigation zwischen den Reitern
  // ---------------------------------------------------------------------------
  const TABS = ['sender', 'favorites', 'youtube', 'browser', 'lists'];

  function showTab(name, focus) {
    if (TABS.indexOf(name) === -1) name = 'sender';
    TABS.forEach(function (tab) {
      $('#view-' + tab).hidden = tab !== name;
    });
    document.querySelectorAll('.tab').forEach(function (button) {
      if (button.getAttribute('data-tab') === name) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    try { localStorage.setItem(KEY.tab, name); } catch (e) { /* Speicher nicht verfügbar */ }
    history.replaceState(history.state, '', '#' + name);
    if (focus) $('#main').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------------
  function bindEvents() {
    document.querySelectorAll('.tab').forEach(function (button) {
      button.addEventListener('click', function () { showTab(button.getAttribute('data-tab'), true); });
    });
    document.querySelectorAll('[data-action="settings"]').forEach(function (b) { b.addEventListener('click', openSettings); });
    document.querySelectorAll('[data-action="add-link"]').forEach(function (b) { b.addEventListener('click', function () { openLinkDialog(null); }); });
    document.querySelectorAll('[data-action="add-list"]').forEach(function (b) {
      b.addEventListener('click', function () {
        $('#list-form').reset();
        $('#list-error').hidden = true;
        updateListSourceFields();
        $('#list-dialog').showModal();
      });
    });
    document.querySelectorAll('dialog [data-close]').forEach(function (b) {
      b.addEventListener('click', function () { b.closest('dialog').close(); });
    });

    $('#sender-search').addEventListener('input', function (event) {
      state.query = event.target.value;
      state.visible = PAGE_SIZE;
      renderSender();
    });
    $('#sender-more').addEventListener('click', function () {
      state.visible += PAGE_SIZE;
      renderSender();
    });

    $('#link-form').addEventListener('submit', submitLinkForm);
    $('#list-form').addEventListener('submit', submitListForm);
    document.querySelectorAll('input[name="list-source"]').forEach(function (r) { r.addEventListener('change', updateListSourceFields); });
    $('#settings-form').addEventListener('submit', function (event) {
      event.preventDefault();
      $('#settings-dialog').close();
    });
    document.querySelectorAll('input[name="theme"]').forEach(function (r) {
      r.addEventListener('change', function () { updateSettings({ theme: r.value }); });
    });
    $('#export-data').addEventListener('click', exportData);
    $('#import-data').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) importData(file);
      event.target.value = '';
    });
    $('#reset-data').addEventListener('click', resetData);

    $('#yt-open-home').addEventListener('click', openYouTubeHome);
    $('#yt-search-form').addEventListener('submit', submitYouTubeSearch);
    $('#yt-play-form').addEventListener('submit', submitYouTubePlay);
    $('#browser-form').addEventListener('submit', submitBrowser);
    $('#browser-save').addEventListener('click', saveBrowserAddress);

    $('#player-close').addEventListener('click', function () {
      if (history.state && history.state.idtvPlayer) history.back();
      else closePlayer();
    });
    $('#player-fav').addEventListener('click', function () { if (currentChannel) toggleFavorite(currentChannel); });
    window.addEventListener('popstate', closePlayer);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !$('#player').hidden) $('#player-close').click();
    });
    window.addEventListener('pagehide', function () {
      const video = $('#player-stage video');
      if (video && currentChannel) savePosition(video, currentChannel.url);
    });
  }

  function start() {
    applyTheme();
    hydrateIcons(document);
    fillRegionSelects();
    bindEvents();
    renderAll();
    // Nach Rückkehr von einer Webseite im zuletzt genutzten Reiter weitermachen
    const fromHash = location.hash.replace('#', '');
    let stored = 'sender';
    try { stored = localStorage.getItem(KEY.tab) || 'sender'; } catch (e) { /* Speicher nicht verfügbar */ }
    showTab(TABS.indexOf(fromHash) !== -1 ? fromHash : stored, false);
  }

  start();
})();
