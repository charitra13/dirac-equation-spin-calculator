export interface Element {
  name: string;
  symbol: string;
  number: number;
  mass: string;
  category: string;
  period: number;
  group: number | null;
  block: string;
  description: string;
  electronConfiguration: string;
  discoveredBy?: string;
  yearDiscovered?: string;
}

export const elements: Element[] = [
  {
    name: "Hydrogen",
    symbol: "H",
    number: 1,
    mass: "1.008",
    category: "nonmetal",
    period: 1,
    group: 1,
    block: "s",
    description: "Hydrogen is the chemical element with the symbol H and atomic number 1. With a standard atomic weight of 1.008, hydrogen is the lightest element in the periodic table.",
    electronConfiguration: "1s¹",
    discoveredBy: "Henry Cavendish",
    yearDiscovered: "1766"
  },
  {
    name: "Helium",
    symbol: "He",
    number: 2,
    mass: "4.003",
    category: "noble",
    period: 1,
    group: 18,
    block: "s",
    description: "Helium is a chemical element with the symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table.",
    electronConfiguration: "1s²",
    discoveredBy: "Pierre Janssen",
    yearDiscovered: "1868"
  },
  {
    name: "Lithium",
    symbol: "Li",
    number: 3,
    mass: "6.941",
    category: "alkali",
    period: 2,
    group: 1,
    block: "s",
    description: "Lithium is a chemical element with the symbol Li and atomic number 3. It is a soft, silvery-white alkali metal.",
    electronConfiguration: "1s² 2s¹",
    discoveredBy: "Johan August Arfwedson",
    yearDiscovered: "1817"
  },
  {
    name: "Beryllium",
    symbol: "Be",
    number: 4,
    mass: "9.012",
    category: "alkaline",
    period: 2,
    group: 2,
    block: "s",
    description: "Beryllium is a chemical element with the symbol Be and atomic number 4. It is a relatively rare element in the universe, usually occurring as a product of the spallation of larger atomic nuclei.",
    electronConfiguration: "1s² 2s²",
    discoveredBy: "Louis Nicolas Vauquelin",
    yearDiscovered: "1798"
  },
  {
    name: "Boron",
    symbol: "B",
    number: 5,
    mass: "10.811",
    category: "poor",
    period: 2,
    group: 13,
    block: "p",
    description: "Boron is a chemical element with the symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae, it is a low-abundance element in the Solar System and in the Earth's crust.",
    electronConfiguration: "1s² 2s² 2p¹",
    discoveredBy: "Joseph Louis Gay-Lussac",
    yearDiscovered: "1808"
  },
  {
    name: "Carbon",
    symbol: "C",
    number: 6,
    mass: "12.011",
    category: "nonmetal",
    period: 2,
    group: 14,
    block: "p",
    description: "Carbon is a chemical element with the symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds.",
    electronConfiguration: "1s² 2s² 2p²",
    discoveredBy: "Ancient Egypt",
    yearDiscovered: "3750 BCE"
  },
  {
    name: "Nitrogen",
    symbol: "N",
    number: 7,
    mass: "14.007",
    category: "nonmetal",
    period: 2,
    group: 15,
    block: "p",
    description: "Nitrogen is a chemical element with the symbol N and atomic number 7. It was first discovered and isolated by Scottish physician Daniel Rutherford in 1772.",
    electronConfiguration: "1s² 2s² 2p³",
    discoveredBy: "Daniel Rutherford",
    yearDiscovered: "1772"
  },
  {
    name: "Oxygen",
    symbol: "O",
    number: 8,
    mass: "16.000",
    category: "nonmetal",
    period: 2,
    group: 16,
    block: "p",
    description: "Oxygen is a chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group in the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds.",
    electronConfiguration: "1s² 2s² 2p⁴",
    discoveredBy: "Carl Wilhelm Scheele",
    yearDiscovered: "1771"
  },
  {
    name: "Fluorine",
    symbol: "F",
    number: 9,
    mass: "18.998",
    category: "nonmetal",
    period: 2,
    group: 17,
    block: "p",
    description: "Fluorine is a chemical element with the symbol F and atomic number 9. It is the lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard conditions.",
    electronConfiguration: "1s² 2s² 2p⁵",
    discoveredBy: "André-Marie Ampère",
    yearDiscovered: "1810"
  },
  {
    name: "Neon",
    symbol: "Ne",
    number: 10,
    mass: "20.180",
    category: "noble",
    period: 2,
    group: 18,
    block: "p",
    description: "Neon is a chemical element with the symbol Ne and atomic number 10. It is a noble gas. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.",
    electronConfiguration: "1s² 2s² 2p⁶",
    discoveredBy: "William Ramsay",
    yearDiscovered: "1898"
  },
  // Additional elements for Row 3
  {
    name: "Sodium",
    symbol: "Na",
    number: 11,
    mass: "22.990",
    category: "alkali",
    period: 3,
    group: 1,
    block: "s",
    description: "Sodium is a chemical element with the symbol Na and atomic number 11. It is a soft, silvery-white, highly reactive metal. Sodium is an alkali metal, being in group 1 of the periodic table.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s¹",
    discoveredBy: "Humphry Davy",
    yearDiscovered: "1807"
  },
  {
    name: "Magnesium",
    symbol: "Mg",
    number: 12,
    mass: "24.305",
    category: "alkaline",
    period: 3,
    group: 2,
    block: "s",
    description: "Magnesium is a chemical element with the symbol Mg and atomic number 12. It is a shiny gray solid which bears a close physical resemblance to the other five elements in the second column of the periodic table.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s²",
    discoveredBy: "Joseph Black",
    yearDiscovered: "1755"
  },
  {
    name: "Aluminum",
    symbol: "Al",
    number: 13,
    mass: "26.982",
    category: "poor",
    period: 3,
    group: 13,
    block: "p",
    description: "Aluminum is a chemical element with the symbol Al and atomic number 13. Aluminum has a density lower than those of other common metals, at approximately one third that of steel.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p¹",
    discoveredBy: "Hans Christian Ørsted",
    yearDiscovered: "1824"
  },
  {
    name: "Silicon",
    symbol: "Si",
    number: 14,
    mass: "28.085",
    category: "poor",
    period: 3,
    group: 14,
    block: "p",
    description: "Silicon is a chemical element with the symbol Si and atomic number 14. It is a hard and brittle crystalline solid with a blue-grey metallic lustre.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p²",
    discoveredBy: "Jöns Jakob Berzelius",
    yearDiscovered: "1824"
  },
  {
    name: "Phosphorus",
    symbol: "P",
    number: 15,
    mass: "30.974",
    category: "nonmetal",
    period: 3,
    group: 15,
    block: "p",
    description: "Phosphorus is a chemical element with the symbol P and atomic number 15. Elemental phosphorus exists in two major forms, white phosphorus and red phosphorus.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p³",
    discoveredBy: "Hennig Brand",
    yearDiscovered: "1669"
  },
  {
    name: "Sulfur",
    symbol: "S",
    number: 16,
    mass: "32.065",
    category: "nonmetal",
    period: 3,
    group: 16,
    block: "p",
    description: "Sulfur is a chemical element with the symbol S and atomic number 16. It is abundant, multivalent, and nonmetallic. Under normal conditions, sulfur atoms form cyclic octatomic molecules with a chemical formula S₈.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁴",
    discoveredBy: "Ancient China",
    yearDiscovered: "2500 BCE"
  },
  {
    name: "Chlorine",
    symbol: "Cl",
    number: 17,
    mass: "35.453",
    category: "nonmetal",
    period: 3,
    group: 17,
    block: "p",
    description: "Chlorine is a chemical element with the symbol Cl and atomic number 17. The second-lightest of the halogens, it appears between fluorine and bromine in the periodic table and its properties are mostly intermediate between them.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁵",
    discoveredBy: "Carl Wilhelm Scheele",
    yearDiscovered: "1774"
  },
  {
    name: "Argon",
    symbol: "Ar",
    number: 18,
    mass: "39.948",
    category: "noble",
    period: 3,
    group: 18,
    block: "p",
    description: "Argon is a chemical element with the symbol Ar and atomic number 18. It is in group 18 of the periodic table and is a noble gas. Argon is the third-most abundant gas in the Earth's atmosphere.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶",
    discoveredBy: "Lord Rayleigh",
    yearDiscovered: "1894"
  },
  // Row 4 - only the first few and last elements for this example
  {
    name: "Potassium",
    symbol: "K",
    number: 19,
    mass: "39.098",
    category: "alkali",
    period: 4,
    group: 1,
    block: "s",
    description: "Potassium is a chemical element with the symbol K and atomic number 19. Potassium is a silvery-white metal that is soft enough to be cut with a knife with little force.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
    discoveredBy: "Humphry Davy",
    yearDiscovered: "1807"
  },
  {
    name: "Calcium",
    symbol: "Ca",
    number: 20,
    mass: "40.078",
    category: "alkaline",
    period: 4,
    group: 2,
    block: "s",
    description: "Calcium is a chemical element with the symbol Ca and atomic number 20. As an alkaline earth metal, calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
    discoveredBy: "Humphry Davy",
    yearDiscovered: "1808"
  },
  {
    name: "Scandium",
    symbol: "Sc",
    number: 21,
    mass: "44.956",
    category: "transition",
    period: 4,
    group: 3,
    block: "d",
    description: "Scandium is a chemical element with the symbol Sc and atomic number 21. A silvery-white metallic d-block element, it has historically been classified as a rare-earth element.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²",
    discoveredBy: "Lars Fredrik Nilson",
    yearDiscovered: "1879"
  },
  // Skip many elements to keep the data file manageable
  {
    name: "Krypton",
    symbol: "Kr",
    number: 36,
    mass: "83.798",
    category: "noble",
    period: 4,
    group: 18,
    block: "p",
    description: "Krypton is a chemical element with the symbol Kr and atomic number 36. It is a colorless, odorless, tasteless noble gas that occurs in trace amounts in the atmosphere.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶",
    discoveredBy: "William Ramsay",
    yearDiscovered: "1898"
  },
  // Sample elements from rows 5-7 for demonstration purposes
  {
    name: "Rubidium",
    symbol: "Rb",
    number: 37,
    mass: "85.468",
    category: "alkali",
    period: 5,
    group: 1,
    block: "s",
    description: "Rubidium is a chemical element with the symbol Rb and atomic number 37. Rubidium is a very soft, silvery-white metal in the alkali metal group.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹",
    discoveredBy: "Robert Bunsen",
    yearDiscovered: "1861"
  },
  {
    name: "Xenon",
    symbol: "Xe",
    number: 54,
    mass: "131.293",
    category: "noble",
    period: 5,
    group: 18,
    block: "p",
    description: "Xenon is a chemical element with the symbol Xe and atomic number 54. It is a colorless, dense, odorless noble gas found in Earth's atmosphere in trace amounts.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶",
    discoveredBy: "William Ramsay",
    yearDiscovered: "1898"
  },
  {
    name: "Caesium",
    symbol: "Cs",
    number: 55,
    mass: "132.905",
    category: "alkali",
    period: 6,
    group: 1,
    block: "s",
    description: "Caesium is a chemical element with the symbol Cs and atomic number 55. It is a soft, silvery-golden alkali metal with a melting point of 28.5 °C.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹",
    discoveredBy: "Robert Bunsen",
    yearDiscovered: "1860"
  },
  // Lanthanum (first lanthanide)
  {
    name: "Lanthanum",
    symbol: "La",
    number: 57,
    mass: "138.905",
    category: "lanthanoid",
    period: 6,
    group: 3,
    block: "f",
    description: "Lanthanum is a chemical element with the symbol La and atomic number 57. It is a soft, ductile, silvery-white metal that tarnishes rapidly when exposed to air and is soft enough to be cut with a knife.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 5d¹ 6s²",
    discoveredBy: "Carl Gustaf Mosander",
    yearDiscovered: "1839"
  },
  // Actinium (first actinide)
  {
    name: "Actinium",
    symbol: "Ac",
    number: 89,
    mass: "227.028",
    category: "actinoid",
    period: 7,
    group: 3,
    block: "f",
    description: "Actinium is a chemical element with the symbol Ac and atomic number 89. It is a rare, silvery-white, radioactive, metallic element that is found naturally only in minute amounts.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d¹ 7s²",
    discoveredBy: "Friedrich Oskar Giesel",
    yearDiscovered: "1902"
  },
  // Last few elements
  {
    name: "Radon",
    symbol: "Rn",
    number: 86,
    mass: "222.018",
    category: "noble",
    period: 6,
    group: 18,
    block: "p",
    description: "Radon is a chemical element with the symbol Rn and atomic number 86. It is a radioactive, colorless, odorless, tasteless noble gas.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    discoveredBy: "Friedrich Ernst Dorn",
    yearDiscovered: "1900"
  },
  {
    name: "Francium",
    symbol: "Fr",
    number: 87,
    mass: "223.020",
    category: "alkali",
    period: 7,
    group: 1,
    block: "s",
    description: "Francium is a chemical element with the symbol Fr and atomic number 87. It is extremely radioactive; its most stable isotope, francium-223 has a half-life of only 22 minutes.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s¹",
    discoveredBy: "Marguerite Perey",
    yearDiscovered: "1939"
  },
  {
    name: "Oganesson",
    symbol: "Og",
    number: 118,
    mass: "294",
    category: "noble",
    period: 7,
    group: 18,
    block: "p",
    description: "Oganesson is a synthetic chemical element with the symbol Og and atomic number 118. It was first synthesized in 2002 by a joint team of Russian and American scientists at the Joint Institute for Nuclear Research.",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    discoveredBy: "Joint Institute for Nuclear Research",
    yearDiscovered: "2002"
  }
];

// Function to get element by position in the periodic table
export const getElementByPosition = (period: number, group: number): Element | null => {
  return elements.find(element => element.period === period && element.group === group) || null;
};

// Function to sort elements by atomic number
export const sortedElements = (): Element[] => {
  return [...elements].sort((a, b) => a.number - b.number);
};
