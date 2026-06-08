import { Bed, Bath, Maximize, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ── Inline SVG decorations ────────────────────────────────────────────────────

/** Architectural blueprint grid — replaces blueprint-left.jpg */
function BlueprintSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450 600"
      className="hidden xl:block absolute left-0 top-20 w-[450px] opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      {/* Fine grid */}
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a3a2a" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a2a" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="450" height="600" fill="url(#grid)" />
      {/* Floor-plan outline */}
      <rect x="40" y="60" width="200" height="140" fill="none" stroke="#1a3a2a" strokeWidth="2" />
      <rect x="40" y="60" width="90" height="60" fill="none" stroke="#1a3a2a" strokeWidth="1.5" />
      <rect x="130" y="60" width="110" height="60" fill="none" stroke="#1a3a2a" strokeWidth="1.5" />
      <rect x="40" y="120" width="200" height="80" fill="none" stroke="#1a3a2a" strokeWidth="1.5" />
      {/* Door arcs */}
      <path d="M 40 120 Q 60 120 60 140" fill="none" stroke="#1a3a2a" strokeWidth="1" strokeDasharray="4 2" />
      <path d="M 240 140 Q 240 160 220 160" fill="none" stroke="#1a3a2a" strokeWidth="1" strokeDasharray="4 2" />
      {/* Dimension lines */}
      <line x1="40" y1="230" x2="240" y2="230" stroke="#1a3a2a" strokeWidth="1" markerEnd="url(#arrow)" />
      <text x="140" y="245" fontSize="10" fill="#1a3a2a" textAnchor="middle">12.00 m</text>
      {/* Second structure */}
      <rect x="40" y="300" width="160" height="120" fill="none" stroke="#1a3a2a" strokeWidth="2" />
      <rect x="40" y="300" width="80" height="60" fill="none" stroke="#1a3a2a" strokeWidth="1.5" />
      <rect x="120" y="300" width="80" height="60" fill="none" stroke="#1a3a2a" strokeWidth="1.5" />
      {/* Staircase */}
      {[0, 10, 20, 30, 40].map((y, i) => (
        <rect key={i} x="200" y={300 + y} width={40 - i * 5} height="10" fill="none" stroke="#1a3a2a" strokeWidth="1" />
      ))}
    </svg>
  );
}

/** Topographic contour map — replaces contour-map.svg */
function ContourMapSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className="hidden xl:block absolute right-0 top-0 w-[500px] opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      {[
        "M480,250 C480,380 380,480 250,480 C120,480 20,380 20,250 C20,120 120,20 250,20 C380,20 480,120 480,250 Z",
        "M440,250 C440,360 355,445 250,445 C145,445 60,360 60,250 C60,140 145,55 250,55 C355,55 440,140 440,250 Z",
        "M400,250 C400,340 330,410 250,410 C170,410 100,340 100,250 C100,160 170,90 250,90 C330,90 400,160 400,250 Z",
        "M360,250 C365,325 308,378 250,375 C192,372 138,318 140,250 C142,182 195,125 250,125 C305,125 355,175 360,250 Z",
        "M320,250 C325,308 285,348 250,345 C215,342 178,300 180,250 C182,200 218,158 250,160 C282,162 315,192 320,250 Z",
        "M280,250 C282,288 260,315 250,312 C240,309 218,285 220,250 C222,215 242,192 250,195 C258,198 278,212 280,250 Z",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#1a3a2a" strokeWidth={i % 3 === 0 ? 1.5 : 0.8} />
      ))}
      {/* Elevation labels */}
      <text x="460" y="255" fontSize="9" fill="#1a3a2a">50</text>
      <text x="418" y="255" fontSize="9" fill="#1a3a2a">100</text>
      <text x="374" y="255" fontSize="9" fill="#1a3a2a">150</text>
      <text x="332" y="255" fontSize="9" fill="#1a3a2a">200</text>
    </svg>
  );
}

/** Location route / path map — replaces location-route.svg */
function LocationRouteSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 400"
      className="hidden xl:block absolute right-10 top-24 w-[320px] opacity-40 pointer-events-none"
      aria-hidden="true"
    >
      {/* Roads */}
      <path d="M 60 20 L 60 380" stroke="#2d5a3d" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 20 160 L 300 160" stroke="#2d5a3d" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 60 160 L 200 280 L 280 380" stroke="#2d5a3d" strokeWidth="2" fill="none" strokeDasharray="8 4" strokeLinecap="round" />
      <path d="M 60 80 L 260 80 L 260 160" stroke="#2d5a3d" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blocks */}
      <rect x="80" y="30" width="100" height="50" rx="3" fill="#2d5a3d" fillOpacity="0.15" stroke="#2d5a3d" strokeWidth="1" />
      <rect x="200" y="30" width="80" height="50" rx="3" fill="#2d5a3d" fillOpacity="0.15" stroke="#2d5a3d" strokeWidth="1" />
      <rect x="80" y="180" width="80" height="70" rx="3" fill="#2d5a3d" fillOpacity="0.15" stroke="#2d5a3d" strokeWidth="1" />
      <rect x="180" y="180" width="100" height="70" rx="3" fill="#2d5a3d" fillOpacity="0.15" stroke="#2d5a3d" strokeWidth="1" />
      {/* Pin */}
      <circle cx="60" cy="160" r="10" fill="#2d5a3d" fillOpacity="0.8" />
      <circle cx="60" cy="160" r="4" fill="white" />
      <line x1="60" y1="170" x2="60" y2="185" stroke="#2d5a3d" strokeWidth="2" />
      {/* Label */}
      <text x="76" y="155" fontSize="10" fill="#2d5a3d" fontWeight="bold">You are here</text>
    </svg>
  );
}

/** Tropical plant — replaces plant-left.svg */
function PlantSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 320"
      className="hidden 2xl:block absolute left-0 bottom-0 w-[240px] opacity-90 pointer-events-none"
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M 120 320 C 118 280 115 240 120 180" stroke="#2d5a3d" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M 120 220 C 80 200 30 210 10 180 C 50 170 90 185 120 220 Z" fill="#2d5a3d" fillOpacity="0.7" />
      <path d="M 120 200 C 155 175 190 170 210 140 C 175 145 148 165 120 200 Z" fill="#2d5a3d" fillOpacity="0.7" />
      <path d="M 120 255 C 75 240 40 250 15 230 C 55 218 95 235 120 255 Z" fill="#2d5a3d" fillOpacity="0.5" />
      <path d="M 120 235 C 158 218 195 215 220 190 C 184 193 152 212 120 235 Z" fill="#2d5a3d" fillOpacity="0.5" />
      {/* Top leaf */}
      <path d="M 118 180 C 95 140 80 100 90 60 C 115 95 120 140 118 180 Z" fill="#2d5a3d" fillOpacity="0.8" />
      <path d="M 122 180 C 145 140 160 100 150 60 C 125 95 120 140 122 180 Z" fill="#2d5a3d" fillOpacity="0.6" />
      {/* Leaf veins */}
      <line x1="120" y1="220" x2="40" y2="190" stroke="#1a3a2a" strokeWidth="0.8" opacity="0.5" />
      <line x1="120" y1="200" x2="195" y2="152" stroke="#1a3a2a" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/** Landscape silhouette — replaces landscape-right.svg */
function LandscapeSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 220"
      className="hidden 2xl:block absolute right-0 bottom-0 w-[400px] opacity-60 pointer-events-none"
      aria-hidden="true"
    >
      {/* Mountains / hills */}
      <path d="M 0 220 L 0 160 Q 40 80 100 120 Q 140 60 200 100 Q 240 40 300 90 Q 350 50 400 80 L 400 220 Z"
        fill="#2d5a3d" fillOpacity="0.12" />
      <path d="M 0 220 L 0 180 Q 60 130 120 155 Q 170 110 230 140 Q 290 100 360 130 L 400 115 L 400 220 Z"
        fill="#2d5a3d" fillOpacity="0.18" />
      {/* Tree silhouettes */}
      {[30, 80, 150, 220, 310, 370].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${160 - (i % 3) * 15})`}>
          <rect x="-2" y="15" width="4" height="20" fill="#2d5a3d" fillOpacity="0.4" />
          <polygon points="0,-5 12,20 -12,20" fill="#2d5a3d" fillOpacity="0.4" />
          <polygon points="0,-18 10,8 -10,8" fill="#2d5a3d" fillOpacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────

function PropertyCard({ property }) {
  const statusColor =
    property.status === "Hot Offer"
      ? "bg-red-600"
      : property.status === "New Launch"
      ? "bg-green-700"
      : "bg-slate-800";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <span
          className={`absolute top-4 left-4 ${statusColor} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full`}
        >
          {property.status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-900">{property.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{property.location}</p>

        <div className="mt-4">
          {property.beds > 0 ? (
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Bed size={16} /> {property.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <Bath size={16} /> {property.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <Maximize size={16} /> {property.sqft}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Maximize size={16} /> {property.sqft}
            </div>
          )}
        </div>

        <div className="mt-5 pt-5 border-t flex items-center justify-between">
          <span className="text-xl font-bold text-green-800">{property.price}</span>
          <Link to={`/properties/${property.id}`} className="flex items-center gap-1 text-sm font-medium text-green-800 hover:gap-2 transition-all">
            View Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/properties');
        setProperties(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured properties', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#f5f0e8] py-16 md:py-24"
    >
      {/* Luxury glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-green-900/5 blur-[140px] rounded-full" />
      </div>

      <BlueprintSVG />
      <ContourMapSVG />
      <LocationRouteSVG />
      <PlantSVG />
      <LandscapeSVG />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-green-800">
            OUR PROPERTIES
          </span>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Featured Properties
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Discover our handpicked selection of premium lands, houses and apartments across
            Sri Lanka's most sought-after locations.
          </p>
        </div>

        {loading ? (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin h-12 w-12 text-green-800" />
            </div>
        ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <PropertyCard
                key={`${property.name}-${property.location}`}
                property={property}
                />
            ))}
            </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/lands"
            className="inline-flex items-center gap-2 border border-green-800 text-green-800 px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-green-800 hover:text-white transition-all duration-300"
          >
            Explore More Properties
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}