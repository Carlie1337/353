"use client"

/**
 * Centralised, singleton Google Maps loader.
 * All map-related helpers and defaults live in this file so that
 * every page/component across the code-base loads the API the same way.
 */

export interface GoogleMapsConfig {
  apiKey: string
  libraries?: string[]
  version?: string
  language?: string
  region?: string
}

declare global {
  interface Window {
    google: any
    __initGoogleMaps: () => void
  }
}

/* ------------------------------------------------------------------ */
/*  ⚙️  DEFAULT CONFIG                                                */
/* ------------------------------------------------------------------ */

export const defaultGoogleMapsConfig: GoogleMapsConfig = {
  // NEXT_PUBLIC_* env vars are statically replaced at build-time
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  libraries: ["places", "geometry"],
  version: "weekly",
  language: "en",
  region: "PH",
}

/* ------------------------------------------------------------------ */
/*  🔄  SINGLETON LOADER                                              */
/* ------------------------------------------------------------------ */

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader
  private isLoading = false
  private isLoaded = false
  private loadPromise: Promise<void> | null = null

  private constructor() {}

  static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader()
    }
    return GoogleMapsLoader.instance
  }

  async load(config: Partial<GoogleMapsConfig> = {}): Promise<void> {
    if (this.isLoaded) return
    if (this.isLoading && this.loadPromise) return this.loadPromise

    const merged = { ...defaultGoogleMapsConfig, ...config }

    if (!merged.apiKey) {
      throw new Error("Google Maps API key missing (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)")
    }

    this.isLoading = true

    this.loadPromise = new Promise<void>((resolve, reject) => {
      // Already present?
      if (window.google?.maps) {
        this.isLoaded = true
        this.isLoading = false
        resolve()
        return
      }

      // Build script URL
      const params = new URLSearchParams({
        key: merged.apiKey,
        libraries: (merged.libraries ?? []).join(","),
        v: merged.version ?? "weekly",
        language: merged.language ?? "en",
        region: merged.region ?? "",
        callback: "__initGoogleMaps",
      })

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
      script.async = true
      script.defer = true

      script.onerror = () => {
        this.isLoading = false
        this.loadPromise = null
        reject(new Error("Failed to load Google Maps script"))
      }

      window.__initGoogleMaps = () => {
        this.isLoaded = true
        this.isLoading = false
        delete window.__initGoogleMaps
        resolve()
      }

      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded || !!window.google?.maps
  }
}

/* ------------------------------------------------------------------ */
/*  🔎  HELPER (re-exported for convenience)                          */
/* ------------------------------------------------------------------ */

export const googleMapsLoader = GoogleMapsLoader.getInstance()

/** Convenience wrapper used throughout the app */
export async function loadGoogleMaps(config: Partial<GoogleMapsConfig> = {}) {
  await googleMapsLoader.load(config)
}

/** Boolean helper to check availability */
export function isGoogleMapsLoaded() {
  return googleMapsLoader.isGoogleMapsLoaded()
}

/* ------------------------------------------------------------------ */
/*  ✨  OPTIONAL UTILS (markers, map, etc.)                            */
/*  – keep lightweight; load() MUST be called first                   */
/* ------------------------------------------------------------------ */

export async function createMap(
  el: HTMLElement,
  options: google.maps.MapOptions & { center?: google.maps.LatLngLiteral } = {},
) {
  if (!isGoogleMapsLoaded()) await loadGoogleMaps()
  return new window.google.maps.Map(el, {
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    zoom: 15,
    center: { lat: 7.0731, lng: 125.6128 },
    ...options,
  })
}

export function createMarker(map: google.maps.Map, opts: google.maps.MarkerOptions = {}) {
  if (!isGoogleMapsLoaded()) throw new Error("Google Maps not loaded yet")
  return new window.google.maps.Marker({ map, ...opts })
}
