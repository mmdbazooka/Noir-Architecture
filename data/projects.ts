export type Project = {
  number: string;
  title: string;
  location: string;
  year: string;
  type: string;
  image: string;
  alt: string;
  description: string;
  area: string;
  materials: string;
};
export const projects: Project[] = [
  {
    number: "01",
    title: "The Monolith Residence",
    location: "CAPE TOWN, ZA",
    year: "2026",
    type: "PRIVATE RESIDENCE",
    image: "monolith.webp",
    alt: "Sculptural concrete residence with a cantilevered upper floor and warm interior light",
    description:
      "A quiet counterpoint to a dramatic landscape. A single concrete volume reaches toward the horizon, framing the changing light while sheltering a series of intimate living spaces. Architecture that belongs as much to the mountain as to its inhabitants.",
    area: "420 m²",
    materials: "Board-formed concrete · Corten steel · Oak",
  },
  {
    number: "02",
    title: "House of Light",
    location: "MALLORCA, ES",
    year: "2025",
    type: "RESIDENTIAL / INTERIORS",
    image: "light-house.webp",
    alt: "Limestone courtyard with a circular opening, olive tree and reflecting pool",
    description:
      "Here, light is the first building material. An open circular aperture traces the day across limestone walls. Rooms unfold around a planted courtyard, finding a gentle rhythm between enclosure, openness and the Mediterranean sky.",
    area: "310 m²",
    materials: "Local limestone · Lime plaster · Bronze",
  },
  {
    number: "03",
    title: "Stillwater Pavilion",
    location: "OSLO, NO",
    year: "2025",
    type: "CULTURAL / LANDSCAPE",
    image: "stillwater.webp",
    alt: "Minimalist concrete and glass pavilion mirrored in a still lake at dusk",
    description:
      "A place to pause at the edge of the water. A slender roof hovers over a transparent room, allowing the forest, reflections and seasons to become part of the interior. Nothing more than what is necessary; nothing less than what is felt.",
    area: "185 m²",
    materials: "Exposed concrete · Low-iron glass · Ash",
  },
];
