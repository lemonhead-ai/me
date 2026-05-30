/**
 * Centralized image configuration.
 *
 * HOW TO USE:
 * 1. Upload your images to Cloudinary (or any CDN).
 * 2. Paste the full URL below, replacing the local path.
 * 3. For Cloudinary, use URLs with f_auto,q_auto for auto format/quality:
 *    e.g. https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto/v1/portfolio/me.jpg
 *
 * The rest of the app reads from this file, so you only change URLs in ONE place.
 */

export const images = {
  // ─── Site Branding ────────────────────────────────
  /** Site logo used in Header and Footer */
  logo: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939720/portlogo_da1bzk.png',
  bloglogo:'https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1779130891/mrtnblog_qnw7js.png',
  /** Portfolio hero/preview image */
  portnew: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939725/portnew_fifhgj.png',

  // ─── 3D Lanyard ───────────────────────────────────
  /** Profile photo texture on the 3D lanyard card */
  profilePhoto: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/v1780132972/me_portfolioo_s3oplr.png',
  /** LinkedIn profile screenshot for the back side */
  linkedinScreenshot: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/v1780146936/linkedin_mtyyei.jpg',
  /** Lanyard band texture */
  lanyardTexture: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939781/lanyard_oufeek.png',
  /** 3D model */
  lanyardModel: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/v1778939788/card_qf8pfc.glb',

  // ─── Logos ────────────────────────────────────────
  greyOnBlack: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939771/greyonblack_yxrtjl.jpg',
  greyOnWhite: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939769/greyonwhite_cj5vxt.jpg',

  // ─── Project Screenshots ─────────────────────────
  projects: {
    educhainai: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939756/educhainai_witrlv.jpg',
    entri: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939752/entri_x6pp89.png',
    kurasmart: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939755/kurasmart_tarlfp.png',
    malibu: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939762/malibu_sy8zps.png',
    portt: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778940585/portt_hek6qf.png',
    pureplast: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939767/pureplast_nr6ong.png',
    readrift: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939749/readrift_wpdrpb.jpg',
    greyonblack: 'https://res.cloudinary.com/dfjwbc8i7/image/upload/f_auto,q_auto/v1778939750/greyonblack_a7vjkl.jpg',
  },
} as const;
