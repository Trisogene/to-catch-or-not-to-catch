import { QueryClient, hydrate, dehydrate, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Scripts } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const appCss = "/assets/styles-D_Mlq4Cb.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      gcTime: 1e3 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "toCATCH - Pokémon Pokédex"
      },
      {
        name: "description",
        content: "Explore and discover Pokémon with toCATCH. Browse the complete Pokédex, save your favorites, and get Shakespearean translations of Pokémon descriptions."
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
async function fetchAllPokemonBasicInfo() {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=10000`);
  if (!response.ok) {
    throw new Error("Failed to fetch all Pokemon");
  }
  return response.json();
}
async function fetchPokemonByType(type) {
  const response = await fetch(`${POKEAPI_BASE_URL}/type/${type.toLowerCase()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon by type");
  }
  const data = await response.json();
  return data.pokemon.map((p) => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }));
}
async function fetchPokemonSpecies(name) {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${name.toLowerCase()}`);
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }
  return response.json();
}
function getEnglishFlavorText(entries) {
  const englishEntry = entries.find((entry) => entry.language.name === "en");
  if (!englishEntry) return "";
  return englishEntry.flavor_text.replace(/\f|\n/g, " ").replace(/\s+/g, " ").trim();
}
function extractIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}
async function getPokemonWithDescription(name, url) {
  const id = extractIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  try {
    const [species, pokemonData] = await Promise.all([
      fetchPokemonSpecies(name),
      fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`).then((r) => r.json())
    ]);
    const description = getEnglishFlavorText(species.flavor_text_entries);
    const types = pokemonData.types?.map((t) => t.type.name) || [];
    return {
      id,
      name,
      description,
      imageUrl,
      spriteUrl,
      types,
      height: pokemonData.height || 0,
      weight: pokemonData.weight || 0
    };
  } catch {
    return {
      id,
      name,
      description: "",
      imageUrl,
      spriteUrl,
      types: [],
      height: 0,
      weight: 0
    };
  }
}
const $$splitComponentImporter = () => import("./index-C1DuGq6I.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async () => {
    const basicList = await queryClient.ensureQueryData({
      queryKey: ["allPokemonBasic"],
      queryFn: fetchAllPokemonBasicInfo,
      staleTime: 1e3 * 60 * 60 * 24
      // 24 hours
    });
    const first12 = basicList.results.slice(0, 12);
    await Promise.all(first12.map((pokemon) => queryClient.ensureQueryData({
      queryKey: ["pokemonDetail", pokemon.name],
      queryFn: () => getPokemonWithDescription(pokemon.name, pokemon.url),
      staleTime: 1e3 * 60 * 60 * 24
    })));
    return basicList;
  }
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      queryClient
    },
    dehydrate: () => {
      return {
        queryState: dehydrate(queryClient)
      };
    },
    hydrate: (data) => {
      hydrate(queryClient, data.queryState);
    }
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  fetchPokemonByType as a,
  fetchAllPokemonBasicInfo as f,
  getPokemonWithDescription as g,
  router as r
};
