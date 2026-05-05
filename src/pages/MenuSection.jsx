import { useState, useRef, useMemo, useEffect } from "react";
import "./MenuSection.css";
import { allCategories, menuGrouped } from "../data/menuData";

const NON_VEG_KEYWORDS = [
  "chicken", "mutton", "fish", "prawn", "shrimp", "egg", "lamb", "beef",
  "goat", "seafood", "kheema", "keema", "shawarma", "crab", "lobster",
];

function isNonVegItem(item) {
  if (item.tags?.includes("non-veg")) return true;
  if (item.tags?.includes("veg") && !NON_VEG_KEYWORDS.some(k => item.name.toLowerCase().includes(k))) return false;

  if (item.category.toUpperCase().includes("NON VEG")) return true;
  const nameL = item.name.toLowerCase();
  if (nameL.startsWith("veg ")) return false;
  return NON_VEG_KEYWORDS.some((k) => nameL.includes(k));
}

function filterItems(groups, query) {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.items.length > 0);
}

export default function MenuSection({ isMobile: isMobileProp, standalone = false }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileProp || false);

  const itemsTopRef = useRef(null);
  const categoryRefs = useRef({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isMobileProp !== undefined) {
      setIsMobile(isMobileProp);
    } else {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [isMobileProp]);

  useEffect(() => {
    if (standalone) {
      window.scrollTo(0, 0);
    }
  }, [standalone]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [dropdownOpen]);

  const filteredGroups = useMemo(
    () => filterItems(menuGrouped, search),
    [search],
  );

  function selectCategory(cat) {
    setActiveCategory(cat);
    requestAnimationFrame(() => {
      if (cat === "ALL") {
        itemsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const el = categoryRefs.current[cat];
      if (el) {
        const offset = 140; // Height of sticky tabs
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  }

  return (
    <>
      {/* Spacer to clear the absolute navbar when standalone */}
      {standalone && <div className="menu-title-area menu-title-area-standalone" />}

      {/* Mobile: original dropdown | Desktop: sticky pill tabs */}
      {isMobile ? (
        <div ref={dropdownRef} className="menu-dropdown-outer">
          <div className="menu-mobile-header-inner">
            <button
              className="menu-dropdown-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span>{activeCategory}</span>
              <span
                className={`menu-dropdown-chevron${dropdownOpen ? " menu-dropdown-chevron-open" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div className="menu-mobile-search">
              <input
                type="search"
                className="menu-search-input"
                placeholder="Search dishes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {dropdownOpen && (
            <ul className="menu-dropdown-list" role="listbox">
              {allCategories.map((cat) => (
                <li
                  key={cat}
                  role="option"
                  aria-selected={activeCategory === cat}
                  className={`menu-dropdown-option${activeCategory === cat ? " menu-dropdown-option-active" : ""}`}
                  onClick={() => {
                    selectCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="menu-category-tabs">
          <div className="menu-category-tabs-inner">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`menu-tab-item${activeCategory === cat ? " active" : ""}`}
                onClick={() => selectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <section
        id="menu"
        className={`menu-section${standalone ? " menu-section-standalone" : ""}`}
        style={isMobile ? { padding: "0 16px" } : undefined}
      >
        <div className="menu-right">
          {!isMobile && (
            <div className="menu-controls">
              <input
                type="search"
                className="menu-search-input"
                placeholder="Search dishes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div ref={itemsTopRef} className="menu-items-wrapper">
            {filteredGroups.map((group) => (
              <div
                key={group.category}
                className="menu-category-group"
                ref={(el) => {
                  if (el) categoryRefs.current[group.category] = el;
                  else delete categoryRefs.current[group.category];
                }}
              >
                <h3 className="menu-category-title">{group.category}</h3>
                <div className="menu-items-grid">
                  {group.items.map((item) => {
                    const isNonVeg = isNonVegItem(item);
                    return (
                      <article key={item.id} className="menu-item">
                        <div className="menu-item-top-row">
                          <div className="menu-item-top-left">
                            <span
                              className={`menu-item-dot${isNonVeg ? " menu-item-dot-nonveg" : " menu-item-dot-veg"}`}
                              aria-label={isNonVeg ? "Non-veg" : "Veg"}
                            />
                            <span
                              className="menu-item-name"
                              title={item.name}
                              tabIndex={0}
                            >
                              {item.name}
                            </span>
                          </div>
                          <div className="menu-item-price-col">
                            <span className="menu-item-price">{item.price}</span>
                            {item.familyPrice && (
                              <span className="menu-item-family-price">
                                Family&nbsp;{item.familyPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="menu-item-desc">{item.description}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
            {filteredGroups.length === 0 && (
              <p className="menu-empty-state">
                No items found for the selected filters.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
