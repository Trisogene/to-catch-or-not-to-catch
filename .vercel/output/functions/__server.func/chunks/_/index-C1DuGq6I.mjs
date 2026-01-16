import { jsxs, jsx } from "react/jsx-runtime";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button as Button$1 } from "@base-ui/react/button";
import { useQuery, useQueries, useMutation } from "@tanstack/react-query";
import { forwardRef, createElement, useRef, useState, useEffect, useMemo, useCallback } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Menu } from "@base-ui/react/menu";
import { useVirtualizer } from "@tanstack/react-virtual";
import { f as fetchAllPokemonBasicInfo, a as fetchPokemonByType, g as getPokemonWithDescription } from "./router-DzrFZHPu.mjs";
import "@tanstack/react-router";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$c = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$c);
const __iconNode$b = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
      key: "18jl4k"
    }
  ],
  ["path", { d: "M16 8 2 22", key: "vp34q" }],
  ["path", { d: "M17.5 15H9", key: "1oz8nu" }]
];
const Feather = createLucideIcon("feather", __iconNode$a);
const __iconNode$9 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
];
const List = createLucideIcon("list", __iconNode$8);
const __iconNode$7 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
const Moon = createLucideIcon("moon", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "5", r: "3", key: "rqqgnr" }],
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
      key: "56o5sh"
    }
  ]
];
const Weight = createLucideIcon("weight", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const badgeVariants = cva(
  "h-5 gap-1 rounded-full border border-transparent px-2 py-0.5 text-[0.625rem] font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-2.5! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground bg-input/20 dark:bg-input/30",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ className, variant }))
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });
}
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn(
        "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-lg py-4 text-xs/relaxed ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/card flex flex-col",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "gap-1 rounded-t-lg px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-title", className: cn("text-sm font-medium", className), ...props });
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className),
      ...props
    }
  );
}
const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border dark:bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-7 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Button$1,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const TRANSLATIONS_STORAGE_KEY = "shakespeare-translations";
function getTranslationCache() {
  try {
    const stored = localStorage.getItem(TRANSLATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
function getCachedTranslation(pokemonId) {
  const cache = getTranslationCache();
  const entry = cache[pokemonId];
  return entry?.shakespeareanDescription || null;
}
function setCachedTranslation(pokemonId, originalDescription, shakespeareanDescription) {
  const cache = getTranslationCache();
  cache[pokemonId] = {
    originalDescription,
    shakespeareanDescription,
    timestamp: Date.now()
  };
  localStorage.setItem(TRANSLATIONS_STORAGE_KEY, JSON.stringify(cache));
}
const SHAKESPEARE_API_URL = "https://api.funtranslations.com/translate/shakespeare.json";
function isRateLimitError(error) {
  return error instanceof Error && error.name === "RateLimitError" && "waitSeconds" in error;
}
async function translateToShakespearean(text) {
  const response = await fetch(SHAKESPEARE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `text=${encodeURIComponent(text)}`
  });
  if (response.status === 429) {
    const data2 = await response.json();
    const match = data2.error?.message?.match(/(\d+)\s*minutes?\s*and\s*(\d+)\s*seconds?/);
    let waitSeconds = 3600;
    if (match) {
      waitSeconds = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    }
    const error = new Error(data2.error?.message || "Rate limit exceeded");
    error.name = "RateLimitError";
    error.waitSeconds = waitSeconds;
    throw error;
  }
  if (!response.ok) {
    throw new Error("Translation failed");
  }
  const data = await response.json();
  return data.contents.translated;
}
const useAppStore = create()(
  persist(
    (set, get) => ({
      // Favorites Logic
      favorites: [],
      addFavorite: (pokemon) => set((state) => ({
        favorites: [...state.favorites, pokemon]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((p) => p.id !== id)
      })),
      updateFavorite: (pokemon) => set((state) => ({
        favorites: state.favorites.map((p) => p.id === pokemon.id ? { ...p, ...pokemon } : p)
      })),
      toggleFavorite: (pokemon) => set((state) => {
        const exists = state.favorites.some((p) => p.id === pokemon.id);
        if (exists) {
          return { favorites: state.favorites.filter((p) => p.id !== pokemon.id) };
        }
        return { favorites: [...state.favorites, pokemon] };
      }),
      isFavorite: (id) => {
        return get().favorites.some((p) => p.id === id);
      },
      // UI State Logic
      activeTab: "pokemon",
      setActiveTab: (activeTab) => set({ activeTab }),
      searchQuery: "",
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      selectedTypes: [],
      setSelectedTypes: (selectedTypes) => set({ selectedTypes }),
      isSearching: false,
      setIsSearching: (isSearching) => set({ isSearching }),
      // Theme Logic
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          applyTheme(newTheme);
          return { theme: newTheme };
        });
      }
    }),
    {
      name: "tcontc-app-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme
      }),
      // Only persist favorites and theme
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      }
    }
  )
);
function applyTheme(theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    root.classList.add(systemTheme);
    return;
  }
  root.classList.add(theme);
}
function useShakespeareTranslation() {
  const [rateLimitError, setRateLimitError] = useState(null);
  const updateFavorite = useAppStore((state) => state.updateFavorite);
  const mutation = useMutation({
    mutationFn: async (pokemon) => {
      if (!pokemon.description) throw new Error("No description to translate");
      const translation = await translateToShakespearean(pokemon.description);
      setCachedTranslation(pokemon.id, pokemon.description, translation);
      return { id: pokemon.id, translation };
    },
    onSuccess: ({ id, translation }) => {
      setRateLimitError(null);
      updateFavorite({ id, shakespeareanDescription: translation });
    },
    onError: (error) => {
      if (isRateLimitError(error)) {
        setRateLimitError("Rate limit reached (10/hour). Try again later.");
      }
    }
  });
  const translate = useCallback(
    (pokemon) => {
      setRateLimitError(null);
      if (!pokemon.description) return;
      const cached = getCachedTranslation(pokemon.id);
      if (cached) {
        updateFavorite({ id: pokemon.id, shakespeareanDescription: cached });
        return cached;
      }
      mutation.mutate(pokemon);
      return null;
    },
    [mutation, updateFavorite]
  );
  return {
    translate,
    isLoading: mutation.isPending,
    error: rateLimitError,
    activeId: mutation.variables?.id
  };
}
const MIN_CONTENT_HEIGHT = "min-h-[3.75rem]";
function ShakespeareCard({ pokemon }) {
  const { translate, isLoading, error, activeId } = useShakespeareTranslation();
  const cachedTranslation = getCachedTranslation(pokemon.id);
  const isThisLoading = isLoading && activeId === pokemon.id;
  if (cachedTranslation) {
    return /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-border/30", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsx("div", { className: "p-1 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Feather, { className: "h-3 w-3 text-primary" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary uppercase tracking-wider", children: "Shakespearean" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: `text-sm text-foreground/80 italic leading-relaxed ${MIN_CONTENT_HEIGHT}`, children: [
        '"',
        cachedTranslation,
        '"'
      ] })
    ] });
  }
  if (isThisLoading) {
    return /* @__PURE__ */ jsx("div", { className: "pt-3 border-t border-border/30", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: `rounded-xl bg-muted/20 border border-border/30 flex flex-col items-center justify-center gap-2 ${MIN_CONTENT_HEIGHT} py-4`,
        children: [
          /* @__PURE__ */ jsx(LoaderCircle, { className: "h-5 w-5 text-primary animate-spin" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-primary/70 font-medium", children: "Consulting the Bard..." })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsx("div", { className: "pt-3 border-t border-border/30", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary uppercase tracking-wider", children: "Shakespearean" }),
      error ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-destructive font-medium bg-destructive/10 px-3 py-1 rounded-md text-center", children: error }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => translate(pokemon),
            variant: "ghost",
            size: "sm",
            className: "h-7 text-xs gap-1",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "h-3 w-3" }),
              "Try Again"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => translate(pokemon),
          disabled: !pokemon.description,
          size: "sm",
          variant: "default",
          children: "Translate"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col items-center justify-center gap-3 ${MIN_CONTENT_HEIGHT}`, children: /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground/60 italic", children: '"To translate or not to translate..."' }) })
  ] }) });
}
function FavoriteButton({ pokemon }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = favorites.some((p) => p.id === pokemon.id);
  const handleClick = () => {
    setIsAnimating(true);
    toggleFavorite(pokemon);
  };
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      "aria-label": isFavorite ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`,
      className: "p-2 -mr-2 -mt-1 rounded-full hover:bg-primary/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      children: /* @__PURE__ */ jsx(
        Heart,
        {
          className: cn(
            "h-5 w-5 transition-all",
            isAnimating && "animate-heart-bounce",
            isFavorite ? "fill-primary text-primary" : "text-muted-foreground/30 hover:text-primary/60"
          )
        }
      )
    }
  );
}
function PokeballDecoration() {
  return /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-20 h-20 opacity-[0.03] pointer-events-none", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "48", fill: "none", stroke: "currentColor", strokeWidth: "4" }),
    /* @__PURE__ */ jsx("line", { x1: "2", y1: "50", x2: "98", y2: "50", stroke: "currentColor", strokeWidth: "4" }),
    /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "15", fill: "none", stroke: "currentColor", strokeWidth: "4" })
  ] }) });
}
const GLOW_COLORS = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-emerald-500",
  electric: "bg-yellow-400"
};
function PokemonImage({ src, name, primaryType }) {
  const glowColor = GLOW_COLORS[primaryType] || "bg-primary";
  return /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
          glowColor
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: name,
        width: 96,
        height: 96,
        className: "w-full h-full object-contain transition-transform group-hover:scale-110 duration-300 drop-shadow-lg relative z-10",
        loading: "lazy",
        decoding: "async"
      }
    )
  ] });
}
function StatBadge({ icon: Icon2, value, unit }) {
  return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Icon2, { className: "h-3 w-3" }),
    (value / 10).toFixed(1),
    unit
  ] });
}
const TYPE_COLORS$1 = {
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-emerald-500 text-white",
  electric: "bg-yellow-400 text-gray-900",
  ice: "bg-cyan-400 text-gray-900",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-gray-900",
  rock: "bg-stone-500 text-white",
  ghost: "bg-violet-600 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-gray-700 text-white",
  steel: "bg-slate-400 text-gray-900",
  fairy: "bg-pink-300 text-gray-900",
  normal: "bg-gray-400 text-gray-900"
};
function TypeBadge({ type }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider",
        TYPE_COLORS$1[type] || "bg-gray-500 text-white"
      ),
      children: type
    }
  );
}
const TYPE_GRADIENTS = {
  fire: "type-gradient-fire",
  water: "type-gradient-water",
  grass: "type-gradient-grass",
  electric: "type-gradient-electric",
  ice: "type-gradient-ice",
  psychic: "type-gradient-psychic",
  dragon: "type-gradient-dragon",
  dark: "type-gradient-dark",
  fairy: "type-gradient-fairy"
};
function PokemonCard({ details }) {
  const primaryType = details.types?.[0] || "normal";
  const description = details.description || "No description available for this Pokémon.";
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cn(
        "relative p-5 rounded-2xl transition-all duration-300",
        "bg-card/60 backdrop-blur-md",
        "border border-white/10 hover:border-primary/20",
        "shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10",
        "group",
        TYPE_GRADIENTS[primaryType]
      ),
      children: [
        /* @__PURE__ */ jsx(PokeballDecoration, {}),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                PokemonImage,
                {
                  src: details.spriteUrl || details.imageUrl,
                  name: details.name,
                  primaryType
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground/50 font-mono font-semibold", children: [
                "#",
                details.id.toString().padStart(3, "0")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold capitalize text-lg text-foreground group-hover:text-primary transition-colors", children: details.name }),
                /* @__PURE__ */ jsx(FavoriteButton, { pokemon: details })
              ] }),
              details.types?.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 mt-2 flex-wrap", children: details.types.map((type) => /* @__PURE__ */ jsx(TypeBadge, { type }, type)) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
                /* @__PURE__ */ jsx(StatBadge, { icon: Ruler, value: details.height || 0, unit: "m" }),
                /* @__PURE__ */ jsx(StatBadge, { icon: Weight, value: details.weight || 0, unit: "kg" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-border/30", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground/60 mb-2", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Pokédex Entry" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed min-h-[3.75rem]", children: description })
          ] }),
          /* @__PURE__ */ jsx(ShakespeareCard, { pokemon: details })
        ] })
      ]
    }
  );
}
function FavoritesList() {
  const favorites = useAppStore((state) => state.favorites);
  return /* @__PURE__ */ jsxs(Card, { className: "h-full flex flex-col border-0 shadow-none bg-transparent ring-0", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "flex-shrink-0 pb-4 px-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5 text-primary fill-primary" }) }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-bold tracking-tight", children: "Your Favorites" }),
      favorites.length > 0 && /* @__PURE__ */ jsx(Badge, { className: "rounded-full bg-primary/10 text-primary border-0 font-bold", children: favorites.length })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "flex-1 overflow-auto px-2", children: favorites.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-2 animate-float", children: /* @__PURE__ */ jsx(Heart, { className: "h-10 w-10 text-muted-foreground/20 fill-current" }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-foreground/80", children: "No favorites yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Click the heart on any Pokémon to add it here" })
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 pb-4", children: favorites.map((pokemon) => /* @__PURE__ */ jsx(PokemonCard, { details: pokemon }, pokemon.id)) }) })
  ] });
}
function BottomNav() {
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const favoritesCount = useAppStore((state) => state.favorites.length);
  return /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-around h-16", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "link",
        onClick: () => setActiveTab("pokemon"),
        className: cn(
          "flex flex-col items-center gap-1 transition-colors ",
          activeTab === "pokemon" ? "text-primary" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx(List, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Pokémon" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "link",
        onClick: () => setActiveTab("favorites"),
        className: cn(
          "flex flex-col items-center gap-1 transition-colors relative",
          activeTab === "favorites" ? "text-primary" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Heart, { className: cn("h-5 w-5", activeTab === "favorites" && "fill-current") }),
            favoritesCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1.5 -right-2 h-4 min-w-4 px-1 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center", children: favoritesCount })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Favorites" })
        ]
      }
    )
  ] }) });
}
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ jsx(Menu.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Menu.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(
    Menu.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx(
        Menu.Popup,
        {
          "data-slot": "dropdown-menu-content",
          className: cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 dark z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
            className
          ),
          ...props
        }
      )
    }
  ) });
}
const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "steel",
  "dark",
  "fairy"
];
const TYPE_COLORS = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  ice: "bg-cyan-400",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-violet-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
  normal: "bg-gray-400"
};
function SearchBar() {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const selectedTypes = useAppStore((state) => state.selectedTypes);
  const setSelectedTypes = useAppStore((state) => state.setSelectedTypes);
  const setIsSearching = useAppStore((state) => state.setIsSearching);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearchRef = useRef(searchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pendingTypes, setPendingTypes] = useState(selectedTypes);
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchQuery !== debouncedSearchRef.current) {
      setLocalSearch(searchQuery);
      debouncedSearchRef.current = searchQuery;
    }
  }, [searchQuery]);
  useEffect(() => {
    if (localSearch !== debouncedSearchRef.current) {
      setIsSearching(true);
    }
    const timer = setTimeout(() => {
      if (localSearch !== debouncedSearchRef.current) {
        setSearchQuery(localSearch);
        debouncedSearchRef.current = localSearch;
      }
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery, setIsSearching]);
  useEffect(() => {
    if (isFilterOpen) {
      setPendingTypes(selectedTypes);
    }
  }, [isFilterOpen, selectedTypes]);
  const toggleType = (type) => {
    setPendingTypes(
      (current) => current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    );
  };
  const handleOpenChange = (open) => {
    setIsFilterOpen(open);
    if (!open) {
      setSelectedTypes(pendingTypes);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "hidden sm:flex items-center justify-center flex-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[850px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-background border border-border shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:bg-muted/20 transition-all duration-300 rounded-full h-16 pl-0 relative group/pill divide-x divide-border/0 cursor-pointer", children: [
    /* @__PURE__ */ jsxs("label", { className: "flex-[1.5] h-full flex flex-col justify-center px-8 rounded-full cursor-text transition-colors relative z-10", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[11px] font-extrabold tracking-wider text-foreground select-none cursor-pointer pl-0.5", children: "Name" }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: searchInputRef,
            type: "text",
            placeholder: "Search Pokémon...",
            className: "w-full bg-transparent border-0 p-0 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 truncate leading-tight",
            value: localSearch,
            onChange: (e) => setLocalSearch(e.target.value)
          }
        ),
        localSearch && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "Clear search",
            onClick: (e) => {
              e.stopPropagation();
              setLocalSearch("");
              searchInputRef.current?.focus();
            },
            className: "absolute right-0 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground transition-all z-20",
            children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-[1px] h-8 bg-border/40 flex-shrink-0 my-auto hidden group-hover/pill:block" }),
    /* @__PURE__ */ jsxs(DropdownMenu, { open: isFilterOpen, onOpenChange: handleOpenChange, children: [
      /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex-1 h-full flex flex-col justify-center px-8 rounded-full cursor-pointer transition-colors select-none relative z-10 text-left border-l border-border/0 hover:border-border/0 bg-transparent hover:bg-transparent shadow-none focus:ring-0 focus:outline-none", children: [
        /* @__PURE__ */ jsx("div", { className: "w-[1px] h-8 bg-border/40 absolute left-0 top-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-bold tracking-wide text-foreground/80 cursor-pointer mb-0.5 block", children: "Type" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between w-full", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-[15px] truncate block",
              selectedTypes.length > 0 ? "font-semibold text-foreground" : "font-normal text-muted-foreground"
            ),
            children: selectedTypes.length === 0 ? "Any Type" : `${selectedTypes.length} selected`
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(
        DropdownMenuContent,
        {
          align: "end",
          className: "w-[360px] p-0 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-border/60 bg-card/95 backdrop-blur-xl mt-4 overflow-hidden z-50",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-border/50 flex items-center justify-between bg-muted/10", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-xl tracking-tight", children: "Filter by Type" }),
              pendingTypes.length > 0 && /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "link",
                  onClick: (e) => {
                    e.preventDefault();
                    setPendingTypes([]);
                    setSelectedTypes([]);
                  },
                  className: "h-auto p-0 text-xs font-bold text-muted-foreground hover:text-foreground hover:no-underline transition-colors uppercase tracking-wider underline underline-offset-4",
                  children: "Clear all"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 p-6 max-h-[400px] overflow-y-auto custom-scrollbar", children: POKEMON_TYPES.map((type) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  toggleType(type);
                },
                className: cn(
                  "flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border select-none group/item w-full text-left",
                  pendingTypes.includes(type) ? "bg-amber-500/5 border-amber-500/30 shadow-sm" : "hover:bg-muted/50 border-transparent hover:border-border/50"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "w-3 h-3 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white/20 transition-transform group-hover/item:scale-110",
                        TYPE_COLORS[type]
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "capitalize flex-1 text-sm tracking-tight",
                        pendingTypes.includes(type) ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                      ),
                      children: type
                    }
                  ),
                  pendingTypes.includes(type) && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-500 stroke-[3]" })
                ]
              },
              type
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pl-2 pr-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Search Pokémon",
        onClick: () => {
          setSearchQuery(localSearch);
        },
        className: "w-12 h-12 bg-[#FF385C] hover:bg-[#D90B3E] rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer border-none p-0",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            viewBox: "0 0 32 32",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            role: "presentation",
            focusable: "false",
            style: {
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentcolor",
              strokeWidth: 4,
              overflow: "visible"
            },
            children: /* @__PURE__ */ jsx("g", { fill: "none", children: /* @__PURE__ */ jsx("path", { d: "m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" }) })
          }
        )
      }
    ) })
  ] }) });
}
function NavBar() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  return /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 h-20 flex items-center justify-between gap-4 max-w-7xl", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        tabIndex: 0,
        className: "flex items-center gap-3 flex-shrink-0 cursor-pointer group select-none min-w-0",
        onClick: () => window.scrollTo(0, 0),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollTo(0, 0);
          }
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-red-500 blur-md opacity-20 rounded-full group-hover:opacity-40 transition-opacity" }),
            /* @__PURE__ */ jsxs(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                className: "h-8 w-8 sm:h-10 sm:w-10 text-red-600 relative z-10 drop-shadow-sm fill-white",
                children: [
                  /* @__PURE__ */ jsx("title", { children: "Logo" }),
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                  /* @__PURE__ */ jsx("path", { d: "M2.5 12h19" }),
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3", className: "fill-white" }),
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.5", className: "fill-foreground" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "font-extrabold text-lg sm:text-xl leading-none tracking-tighter text-foreground group-hover:text-red-600 transition-colors truncate", children: "toCATCH" }),
            /* @__PURE__ */ jsx("span", { className: "hidden xs:block font-bold text-[10px] leading-tight text-muted-foreground uppercase tracking-[0.2em] mt-0.5 truncate", children: "or not to catch" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SearchBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "sm:hidden text-muted-foreground hover:text-foreground",
          children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: toggleTheme,
          className: "rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
          children: [
            theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
          ]
        }
      )
    ] })
  ] }) });
}
function usePokemonData() {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const selectedTypes = useAppStore((state) => state.selectedTypes);
  const { data: allPokemonData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["allPokemonBasic"],
    queryFn: fetchAllPokemonBasicInfo,
    staleTime: 1e3 * 60 * 60 * 24
    // 24 hours
  });
  const { data: typeFilteredPokemon, isLoading: isLoadingTypes } = useQuery({
    queryKey: ["pokemonByTypes", selectedTypes],
    queryFn: async () => {
      if (selectedTypes.length === 0) return null;
      const nestedResults = await Promise.all(selectedTypes.map((type) => fetchPokemonByType(type)));
      const allResults = nestedResults.flat();
      const seen = /* @__PURE__ */ new Set();
      const deduped = [];
      for (const p of allResults) {
        if (!seen.has(p.name)) {
          seen.add(p.name);
          deduped.push(p);
        }
      }
      return deduped;
    },
    enabled: selectedTypes.length > 0,
    staleTime: 1e3 * 60 * 60
    // 1 hour
  });
  const filteredList = useMemo(() => {
    if (!allPokemonData?.results) return [];
    let list = selectedTypes.length > 0 && typeFilteredPokemon ? typeFilteredPokemon : allPokemonData.results;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.name.includes(q));
    }
    return list;
  }, [allPokemonData, typeFilteredPokemon, searchQuery, selectedTypes]);
  const isLoading = isLoadingAll || selectedTypes.length > 0 && isLoadingTypes;
  return {
    filteredList,
    isLoading
  };
}
function usePokemonDetails(visibleList) {
  const pokemonDetailQueries = useQueries({
    queries: visibleList.map((p) => ({
      queryKey: ["pokemonDetail", p.name],
      queryFn: () => getPokemonWithDescription(p.name, p.url),
      staleTime: 1e3 * 60 * 60
    }))
  });
  const detailsMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    pokemonDetailQueries.forEach((q) => {
      if (q.data) map.set(q.data.name, q.data);
    });
    return map;
  }, [pokemonDetailQueries]);
  return detailsMap;
}
function PokemonList() {
  const isSearching = useAppStore((state) => state.isSearching);
  const parentRef = useRef(null);
  const { filteredList, isLoading } = usePokemonData();
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    const checkColumns = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };
    checkColumns();
    window.addEventListener("resize", checkColumns);
    return () => window.removeEventListener("resize", checkColumns);
  }, []);
  const rowCount = Math.ceil(filteredList.length / columns);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 450,
    // Estimate, will be refined by measureElement
    measureElement: (element) => {
      return element.getBoundingClientRect().height + 24;
    },
    overscan: 3
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const visibleItems = useMemo(() => {
    if (!virtualRows.length) return [];
    const startRow = virtualRows[0].index;
    const endRow = virtualRows[virtualRows.length - 1].index;
    const startIndex = startRow * columns;
    const endIndex = Math.min((endRow + 1) * columns, filteredList.length);
    return filteredList.slice(startIndex, endIndex);
  }, [virtualRows, columns, filteredList]);
  const detailsMap = usePokemonDetails(visibleItems);
  if (isLoading || isSearching) {
    return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pb-6 pt-4 px-6", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-muted/30 animate-shimmer rounded-xl" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto px-6 w-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pb-8", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-96 w-full rounded-3xl bg-muted/20 animate-shimmer border border-border/30"
        },
        i
      )) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pb-6 pt-4 px-6", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "All Pokémon" }),
      /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold", children: filteredList.length })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { ref: parentRef, className: "flex-1 overflow-auto px-6 w-full", children: filteredList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-muted-foreground py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4 animate-float", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 100 100",
          className: "w-12 h-12 text-muted-foreground/30",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "48", fill: "none", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("line", { x1: "2", y1: "50", x2: "98", y2: "50", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "15", fill: "none", stroke: "currentColor", strokeWidth: "4" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-foreground/70", children: "No Pokémon found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your filters" })
    ] }) : /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative"
        },
        children: virtualRows.map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const startItemIndex = rowIndex * columns;
          const itemsInRow = filteredList.slice(
            startItemIndex,
            Math.min(startItemIndex + columns, filteredList.length)
          );
          return /* @__PURE__ */ jsxs(
            "div",
            {
              "data-index": virtualRow.index,
              ref: rowVirtualizer.measureElement,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`
              },
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [
                itemsInRow.map((item) => {
                  const details = detailsMap.get(item.name);
                  const isItemLoading = !details;
                  if (isItemLoading) {
                    return /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "h-[400px] w-full rounded-3xl bg-muted/20 animate-shimmer border border-border/30"
                      },
                      item.name
                    );
                  }
                  return /* @__PURE__ */ jsx(PokemonCard, { details }, details.name);
                }),
                itemsInRow.length < columns && /* @__PURE__ */ jsx("div", { className: "hidden md:block" })
              ]
            },
            virtualRow.key
          );
        })
      }
    ) })
  ] });
}
function App() {
  const activeTab = useAppStore((state) => state.activeTab);
  return /* @__PURE__ */ jsxs("main", { id: "App-Container", className: "h-[100dvh] w-full flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsx("div", { className: "flex-1 w-full min-h-0 container mx-auto px-4 py-4 max-w-7xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 h-full", children: [
      /* @__PURE__ */ jsx("section", { className: `lg:col-span-2 h-full overflow-hidden flex flex-col ${activeTab !== "pokemon" ? "hidden lg:flex" : "flex"}`, children: /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsx(PokemonList, {}) }) }),
      /* @__PURE__ */ jsx("section", { className: `h-full overflow-hidden flex flex-col ${activeTab !== "favorites" ? "hidden lg:flex" : "flex"}`, children: /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsx(FavoritesList, {}) }) })
    ] }) }),
    /* @__PURE__ */ jsx(BottomNav, {})
  ] });
}
export {
  App as component
};
