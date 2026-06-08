"use client";

export default function WhatsAppButton() {
  const waUrl = "https://wa.me/6281234567890?text=Halo%20Ritinari%20Karya%20Indonesia,%20saya%20tertarik%20dengan%20kelas%20tari%20dan%20layanan%20Anda.";

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-transform hover:scale-115 active:scale-95 group"
      aria-label="Contact WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping group-hover:hidden"></span>
      <svg
        className="w-7 h-7 relative z-10 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.328 3.825 13.89 2.8 11.99 2.8c-5.439 0-9.861 4.37-9.864 9.8-.001 1.73.488 3.415 1.417 4.921L2.518 21.5l4.129-1.346zM17.15 14.22c-.285-.143-1.687-.828-1.947-.923-.26-.095-.45-.143-.64.143-.19.285-.735.923-.9.11-.165-.19-.33-.38-.73-.58-1.575-.705-2.69-1.54-3.655-3.21-.09-.155.09-.143.27-.5.16-.32.08-.6-.04-.84-.12-.24-.95-2.285-1.3-3.13-.34-.82-.69-.71-.95-.724-.25-.014-.53-.014-.81-.014-.28 0-.74.105-1.13.525-.39.42-1.49 1.455-1.49 3.55 0 2.095 1.525 4.12 1.74 4.41.21.285 3 4.58 7.27 6.42 1.015.44 1.81.7 2.425.895 1.02.32 1.95.275 2.68.165.815-.12 2.485-1.015 2.83-1.995.345-.98.345-1.82.24-1.99-.105-.17-.39-.27-.675-.41z" />
      </svg>
    </a>
  );
}
