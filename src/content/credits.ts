export interface Credit {
  subject: string
  author: string
  license: string
  licenseUrl: string
  source: string
}

/** Attribution for every third-party image shipped with the site. Images were resized and converted to WebP. */
export const imageCredits: Credit[] = [
  {
    subject: 'Distillation columns',
    author: 'Luigi Chiesa',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Colonne_distillazione.jpg',
  },
  {
    subject: 'Column overhead with windsock',
    author: 'CEphoto, Uwe Aranas',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Cologne_Germany_Windsock-in-a-petrochemical-plant-01.jpg',
  },
  {
    subject: 'Shell-and-tube heat exchanger tube bundle',
    author: 'Harald the Bard',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source:
      'https://commons.wikimedia.org/wiki/File:Tube_bundle_of_a_shell_%26_tube_heat_exchanger_(before_assembly)_-_2.jpg',
  },
  {
    subject: 'Crossflow filtration unit',
    author: 'Wikiwayman',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Filtration_unit_(crossflow_filtration).jpg',
  },
  {
    subject: 'Laboratory bioreactors',
    author: 'Habin Zhang',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Bioreactor_for_cell_culture_in_the_laboratory.jpg',
  },
  {
    subject: 'Activated-sludge aeration tank',
    author: 'Vraj Acharya, WELL Labs',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Aeration_tank_activated_sludge_process_STP_Bengaluru_India.jpg',
  },
  {
    subject: 'Algal cultures',
    author: 'Oak Ridge National Laboratory',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Algal_cultures_(51160010381).jpg',
  },
  {
    subject: 'Solar thermal collector',
    author: 'Barelyhere',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Thermal_solar_panel_pipes.JPG',
  },
]
