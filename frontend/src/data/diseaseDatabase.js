export const DISEASES_DATA = [
  {
    id: "bacterial_leaf_blight",
    name: "Bacterial Leaf Blight",
    scientific_name: "Xanthomonas oryzae pv. oryzae",
    pathogen_type: "Bacterial",
    severity_potential: "High",
    favorable_conditions: "High humidity (70-90%), temperatures 25-34°C, strong winds and continuous rain.",
    short_desc: "Water-soaked lesions on leaf tips and margins that turn yellowish-white with wavy margins, leading to rapid blighting.",
    symptoms: [
      "Water-soaked stripes along leaf margins starting from tips",
      "Lesions turn yellowish-white with wavy edges as they enlarge",
      "Milky or amber bacterial ooze droplets on leaves during early morning",
      "Leaves wilt, roll, and turn grayish-green ('Kresek' phase in seedlings)",
      "Severe yield reduction (up to 50-70%) during tillering to panicle stage"
    ],
    causes: [
      "Infection by bacteria Xanthomonas oryzae through leaf wounds or hydathodes",
      "Excessive nitrogenous fertilization without balanced potassium",
      "Deep standing water in nurseries and fields",
      "Contaminated irrigation channels and infected crop stubble"
    ],
    spread_factors: "Wind-driven rain, irrigation runoff, infected plant debris, volunteer rice plants, and weed hosts.",
    seasons: ["Kharif (Monsoon peak)", "Late Rabi"],
    resistant_varieties: ["IR64", "Swarna Sub-1", "Improved Samba Mahsuri", "Ajay", "Rajendra Sweta"],
    image_url: "/samples/bacterial_blight.jpg"
  },
  {
    id: "leaf_blast",
    name: "Leaf Blast",
    scientific_name: "Magnaporthe oryzae (Pyricularia oryzae)",
    pathogen_type: "Fungal",
    severity_potential: "High",
    favorable_conditions: "Night temperatures 17-23°C, relative humidity >90%, prolonged leaf wetness (>10 hours), and heavy dew.",
    short_desc: "Spindle-shaped or diamond-shaped lesions with gray or whitish centers and dark reddish-brown borders.",
    symptoms: [
      "Eye-shaped or diamond-shaped elliptical spots on leaves",
      "Lesion center turns ash-gray or white with brownish or purple margin",
      "Spots coalesce, causing entire leaf blades to wither and dry up ('blast burn')",
      "Can attack collar, neck of panicles ('neck blast'), causing completely empty whiteheads",
      "Severe field lodging and complete crop devastation if untreated"
    ],
    causes: [
      "Airborne fungal spores (conidia) produced in millions on infected leaves",
      "Heavy applications of synthetic nitrogen fertilizer",
      "Drought stress followed by sudden wet cool spells",
      "High planting density resulting in dense, microclimate canopy"
    ],
    spread_factors: "Air currents, wind, dew drops, infected crop residue, susceptible wild grasses.",
    seasons: ["Late Kharif", "Early Rabi (Cool nights with dew)"],
    resistant_varieties: ["Pusa 1609", "CR Dhan 310", "Simhapuri", "TKM 9", "Swarnaprabha"],
    image_url: "/samples/leaf_blast.jpg"
  },
  {
    id: "brown_spot",
    name: "Brown Spot",
    scientific_name: "Bipolaris oryzae (Cochliobolus miyabeanus)",
    pathogen_type: "Fungal",
    severity_potential: "Medium",
    favorable_conditions: "Nutrient-deficient soils (especially low silicon, potassium, zinc), temperature 20-30°C, and prolonged cloudiness.",
    short_desc: "Circular to oval dark brown lesions with yellow halo, heavily linked to poor soil nutrition and drought stress.",
    symptoms: [
      "Small, circular to oval dark brown spots on leaves and glumes",
      "Larger spots develop a gray or light brown center surrounded by yellow chlorotic halo",
      "Infected grains become discolored, spotted, and shriveled ('pecky rice')",
      "Severe seedling blight leading to poor plant stand in dry seedbeds"
    ],
    causes: [
      "Associated with poor soil fertility, zinc deficiency, drought stress, or silicon deficiency",
      "Fungal pathogen Bipolaris oryzae surviving in seed coat and stubble",
      "Nutrient imbalance and light sandy soils lacking organic matter"
    ],
    spread_factors: "Infected seeds, airborne spores, contaminated crop residue, water stress.",
    seasons: ["Kharif", "Rabi (especially rainfed and upland ecology)"],
    resistant_varieties: ["IR36", "Rasi", "CR 1009", "Vandana", "Sahbhagi Dhan"],
    image_url: "/samples/brown_spot.jpg"
  },
  {
    id: "leaf_smut",
    name: "Leaf Smut",
    scientific_name: "Entyloma oryzae",
    pathogen_type: "Fungal",
    severity_potential: "Low",
    favorable_conditions: "High humidity, mature crop stage, moderate temperature (24-28°C), and high nitrogen.",
    short_desc: "Small, angular black spots slightly raised on both leaf surfaces, mostly visible as the crop matures.",
    symptoms: [
      "Small, slightly raised angular black spots (sori) scattered across leaf blades",
      "Spots are covered by the leaf epidermis and do not rupture easily",
      "Affected leaves turn prematurely yellow and dry up from tips",
      "Typically appears late in the growing season during milky to grain maturity stages"
    ],
    causes: [
      "Entyloma oryzae fungus surviving in soil and old crop debris",
      "Late season high humidity and shaded plant canopies",
      "Over-use of urea late in the vegetative phase"
    ],
    spread_factors: "Wind-borne teliospores, irrigation wash, infected straw.",
    seasons: ["Late Kharif (Maturity stage)"],
    resistant_varieties: ["Pusa Basmati 1121", "MTU 1010", "PR 126"],
    image_url: "/samples/leaf_smut.jpg"
  },
  {
    id: "tungro",
    name: "Tungro",
    scientific_name: "Rice Tungro Bacilliform Virus (RTBV) + RTSV",
    pathogen_type: "Viral (Vector: Green Leafhopper)",
    severity_potential: "High",
    favorable_conditions: "Abundance of Green Leafhopper (Nephotettix virescens), temperature 25-30°C, presence of stubbles from previous infected crop.",
    short_desc: "Severe stunting, yellow-orange leaf discoloration, reduced tillering, delayed flowering, and sterile panicles.",
    symptoms: [
      "Severe stunting of plant height and drastically reduced tillering",
      "Leaves turn yellow to vivid orange-yellow starting from the tips down the margins",
      "Young leaves mottled or with pale green to white interveinal stripes",
      "Panicles small, poorly exerted, with high proportion of empty grains",
      "Stunted patches visible randomly across the field"
    ],
    causes: [
      "Co-infection of Rice Tungro Bacilliform Virus (RTBV) and Rice Tungro Spherical Virus (RTSV)",
      "Transmitted non-persistently by the Green Leafhopper (Nephotettix virescens)",
      "Continuous staggered planting creating a non-stop green bridge for leafhoppers"
    ],
    spread_factors: "Green leafhopper vectors hopping from plant to plant, weed hosts, overlapping crop seasons.",
    seasons: ["Kharif", "Summer / Pre-Kharif"],
    resistant_varieties: ["IR64", "Vikramarya", "Nidhi", "Bharani", "Suraksha"],
    image_url: "/samples/tungro.jpg"
  },
  {
    id: "sheath_blight",
    name: "Sheath Blight",
    scientific_name: "Rhizoctonia solani",
    pathogen_type: "Fungal",
    severity_potential: "High",
    favorable_conditions: "High relative humidity (85-100%), temperature 28-32°C, dense foliage canopy, and heavy nitrogen application.",
    short_desc: "Oval or snake-skin lesions on leaf sheaths near water line that expand upward to leaf blades, causing lodging.",
    symptoms: [
      "Initial lesions on leaf sheaths just above the water level",
      "Spots are greenish-gray, oval or irregular with distinctive brown to dark purple margins",
      "Lesions coalesce, creating a banded or 'snake-skin' appearance along the sheath",
      "Infection travels upward to upper leaves and panicles in dense stands",
      "Tillers die, panicles fail to fill, and severe lodging occurs"
    ],
    causes: [
      "Soil-borne sclerotia of Rhizoctonia solani that float on irrigation water",
      "Excessive plant population (>50 hills/m²) and high nitrogen doses (>150 kg N/ha)",
      "Stagnant water and humid dense canopy microclimate"
    ],
    spread_factors: "Floating sclerotia in irrigation water, vegetative mycelial growth across adjacent tillers, infested soil.",
    seasons: ["Kharif (Tillering to heading stage)"],
    resistant_varieties: ["Pankaj", "Swarna", "Tetep (donor)", "IR 20", "ADT 38"],
    image_url: "/samples/sheath_blight.jpg"
  },
  {
    id: "healthy",
    name: "Healthy Paddy Leaf",
    scientific_name: "Oryza sativa (Disease-free)",
    pathogen_type: "None",
    severity_potential: "None",
    favorable_conditions: "Balanced nutrient management, good irrigation drainage, clean seed, and periodic field monitoring.",
    short_desc: "Vibrant emerald green leaves with uniform coloration, intact smooth margins, strong erect stems, and no visible lesions.",
    symptoms: [
      "Uniform, vibrant green or dark green leaf color",
      "Clean, intact margins without necrotic spots or yellow striping",
      "Vigorous tillering and healthy white root system",
      "Erect leaf canopy maximizing sunlight interception"
    ],
    causes: [
      "Optimal crop health, balanced N-P-K-Zn-Si nutrition, and proactive organic prophylaxis"
    ],
    spread_factors: "None",
    seasons: ["All cropping seasons"],
    resistant_varieties: ["All certified high-yielding paddy varieties"],
    image_url: "/samples/healthy.jpg"
  }
];

export const TREATMENTS_DATABASE = {
  bacterial_leaf_blight: {
    disease_name: "Bacterial Leaf Blight",
    summary: "Implement immediate water drainage, withhold additional nitrogen fertilizer, and apply copper-streptomycin bactericidal foliar spray.",
    severity_rules: {
      Low: "Drain standing water for 48 hours to aerate soil. Apply 2 foliar sprays of Pseudomonas fluorescens bio-agent (10g/L). Top-dress with Muriate of Potash (MOP) @ 15 kg/acre to boost cell wall silicon and resistance.",
      Medium: "Immediately withhold urea. Spray Streptocycline @ 6g + Copper Oxychloride (COC 50% WP) @ 500g in 200 liters of water per acre. Ensure spray hits leaf canopy evenly during calm hours.",
      High: "Drain fields completely. Tank mix Copper Hydroxide (Kocide) @ 2g/L with Validamycin 3L @ 2ml/L. Repeat application after 7 days. Clip and safely destroy heavily scorched flag leaves to prevent panicle blighting."
    },
    chemical_treatment: [
      {
        agent: "Streptocycline + Copper Oxychloride 50 WP",
        brand: "Plantomycin / Blitox 50",
        dosage: "6g Streptocycline + 500g COC per 200L water/acre",
        method: "Foliar spray at early appearance of water-soaked lesions",
        safety: "Wear nitrile gloves, apply during early morning or late afternoon, avoid spraying against wind direction."
      },
      {
        agent: "Copper Hydroxide 53.8% DF",
        brand: "Kocide 2000",
        dosage: "2.0 g per liter of water (400g/acre)",
        method: "Thorough coverage of both upper and lower foliage",
        safety: "Pre-harvest interval (PHI) 14 days. Do not mix with acidic compounds."
      },
      {
        agent: "Bismerthiazol (Zinc Thiazole 20% SC)",
        brand: "Thiazon / Bactron",
        dosage: "1.5 - 2.0 ml per liter of water",
        method: "Direct systematic application targeting bacterial xylem vascular system",
        safety: "Keep domestic cattle away from treated field for 48 hours."
      }
    ],
    organic_treatment: [
      {
        method: "Pseudomonas fluorescens Bio-Control",
        dosage: "10 g/L or 2.5 kg/ha foliar spray",
        preparation: "Mix 2.5 kg P. fluorescens in 500L water with 1 kg jaggery solution as surfactant",
        frequency: "Spray at 10-day intervals from active tillering stage"
      },
      {
        method: "Fresh Cow Dung Supernatant Spray",
        dosage: "20% filtered supernatant (20 kg fresh dung in 100L water, filtered through muslin)",
        preparation: "Ferment overnight, filter out fiber, and spray supernatant. Contains natural antagonistic bacilli.",
        frequency: "Single application at initial symptom emergence"
      },
      {
        method: "Neem Seed Kernel Extract (NSKE 5%) + Vermiwash",
        dosage: "50 ml NSKE + 50 ml Vermiwash per 10L water",
        preparation: "Steep 500g powdered neem seed kernels in water overnight, squeeze out active azadirachtin extract",
        frequency: "Every 7 days during high relative humidity periods"
      }
    ],
    preventive_measures: [
      "Avoid clipping seedling tips before transplanting (entry wounds for Xanthomonas)",
      "Adopt split nitrogen application (25% basal, 50% active tillering, 25% panicle initiation)",
      "Maintain balanced potash: Apply extra Muriate of Potash (MOP) to fortify leaf epidermis",
      "Practice alternate wetting and drying (AWD) rather than continuous stagnation",
      "Eradicate weed hosts like wild rice and Leersia hexandra on bunds"
    ],
    timeline: [
      { day: "Day 1", title: "Field Drainage & Isolation", action: "Immediately drain standing flood water. Stop any planned nitrogen or urea top dressing." },
      { day: "Day 3", title: "First Curative Spray", action: "Spray Streptocycline (6g) + Copper Oxychloride (500g) in 200L water per acre during clear weather." },
      { day: "Day 7", title: "Follow-up Assessment & Nutrition", action: "Inspect lesion margins. If yellowing halts, apply Muriate of Potash (15 kg/acre) to restore plant vigor." },
      { day: "Day 14", title: "Biological Barrier", action: "Spray Pseudomonas fluorescens (10g/L) to colonize phyllosphere and prevent secondary reinfection." }
    ],
    seasonal_tips: {
      kharif: "Heavy monsoon rains wash off bactericides rapidly. Always incorporate a non-ionic agricultural wetting agent/sticker (0.5 ml/L). Maintain clean field bunds.",
      rabi: "Dew persistence in early mornings extends infection window. Delay field work until dew evaporates to prevent mechanical spreading on clothing or implements."
    }
  },
  leaf_blast: {
    disease_name: "Leaf Blast",
    summary: "Target fungal spore germination immediately with systemic blasticides like Tricyclazole or Isoprothiolane and maintain adequate field moisture to alleviate water stress.",
    severity_rules: {
      Low: "Apply bio-fungicide Trichoderma viride or Pseudomonas fluorescens @ 2.5 kg/ha. Avoid drought stress in fields; keep soil saturated but not deeply flooded.",
      Medium: "Apply systemic blast fungicide Tricyclazole 75% WP @ 0.6 g/L (120 g/acre). Ensure thorough misting of canopy.",
      High: "Apply combination fungicide Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Kasugamycin 3% SL @ 2.5 ml/L. Repeat in 7-10 days to protect emerging panicles from neck blast devastation."
    },
    chemical_treatment: [
      {
        agent: "Tricyclazole 75% WP",
        brand: "Beam / Baan / Sivic",
        dosage: "0.6 g/L (120 g per 200L water/acre)",
        method: "Systemic preventive & curative foliar application",
        safety: "High safety to beneficial predatory spiders. Pre-harvest interval 21 days."
      },
      {
        agent: "Isoprothiolane 40% EC",
        brand: "Fuji-one",
        dosage: "1.5 ml per liter of water (300 ml/acre)",
        method: "Direct spray on canopy during vegetative to booting stage",
        safety: "Wear eye protection and respirator mask. Toxic to aquatic life in high runoffs."
      },
      {
        agent: "Azoxystrobin + Difenoconazole",
        brand: "Amistar Top",
        dosage: "1.0 ml per liter of water (200 ml/acre)",
        method: "Broad spectrum systemic spray at first sign of spindle spots",
        safety: "Maximum 2 applications per season to prevent pathogen resistance mutation."
      }
    ],
    organic_treatment: [
      {
        method: "Trichoderma harzianum Bio-formulation",
        dosage: "5 g/L foliar spray + 2.5 kg mixed with 100 kg compost as basal",
        preparation: "Incubate Trichoderma with farmyard manure under shade for 7 days before soil/canopy application",
        frequency: "Apply once at 20 DAT (Days After Transplanting) and repeat at booting"
      },
      {
        method: "Panchagavya Organic Elixir (3%)",
        dosage: "30 ml per liter of water (6 liters/acre in 200L water)",
        preparation: "Traditional 5-bovine fermentation containing natural lactic acid bacteria, yeast, and auxins",
        frequency: "Spray every 12 days to strengthen systemic acquired resistance (SAR)"
      },
      {
        method: "Raw Milk + Baking Soda Foliar Spray",
        dosage: "100 ml raw milk + 5 g potassium bicarbonate per liter",
        preparation: "Dilute unpasteurized milk; antiseptic proteins and pH shift inhibit fungal spore germination",
        frequency: "Use as mild prophylaxis when weather forecast indicates blast outbreak conditions"
      }
    ],
    preventive_measures: [
      "Treat seed with Carbendazim 50 WP @ 2g/kg or Trichoderma viride @ 5g/kg seed before sowing",
      "Avoid excessive urea; follow recommended NPK ratio (100:50:50 kg/ha)",
      "Never allow fields to dry into hairline cracks during vegetative stage (water stress predisposes plants to blast)",
      "Burn or deeply plow under straw from previously blast-infected crops",
      "Maintain 20 x 15 cm optimum planting distance to prevent damp stagnant canopy"
    ],
    timeline: [
      { day: "Day 1", title: "Field Irrigation & Scouting", action: "Irrigate field to end water stress. Map hot-spot blast patches across the field." },
      { day: "Day 2", title: "Primary Systemic Spray", action: "Foliar spray Tricyclazole 75% WP @ 0.6g/L with fine hollow cone nozzles." },
      { day: "Day 8", title: "Booting Inspection", action: "Check panicle neck nodes. If spindle spots remain active, rotate to Azoxystrobin (1ml/L)." },
      { day: "Day 15", title: "Resistance Fortification", action: "Foliar spray soluble Potassium Silicate (2 ml/L) to harden outer leaf silica cuticle." }
    ],
    seasonal_tips: {
      kharif: "Frequent monsoon showers wash away contact fungicides; strictly use systemic blasticides with good rainfastness like Tricyclazole.",
      rabi: "Heavy morning winter dew and mist trigger blast explosions. Spray between 10 AM and 2 PM when dew has dried off foliage."
    }
  },
  brown_spot: {
    disease_name: "Brown Spot",
    summary: "Address underlying soil micronutrient deficiencies (potassium, zinc, silicon) and apply protective broad-spectrum fungicides like Mancozeb or Propiconazole.",
    severity_rules: {
      Low: "Foliar spray 0.5% Zinc Sulphate + 1% Urea solution. Add compost or vermicompost to bunds and root zones.",
      Medium: "Spray Mancozeb 75% WP @ 2g/L (400-500g/acre) or Carbendazim 12% + Mancozeb 63% WP @ 1.5g/L.",
      High: "Apply Propiconazole 25% EC (Tilt) @ 1 ml/L or Tebuconazole 25.9% EC @ 1.25 ml/L. Supplement with Chelated Zinc @ 1g/L to overcome nutrient lockout."
    },
    chemical_treatment: [
      {
        agent: "Mancozeb 75% WP",
        brand: "Dithane M-45 / Indofil M-45",
        dosage: "2.0 - 2.5 g per liter of water (500g/acre)",
        method: "Contact protective multi-site protective foliar spray",
        safety: "Avoid inhaling powder during tank mixing. Re-entry period 24 hours."
      },
      {
        agent: "Carbendazim 12% + Mancozeb 63% WP",
        brand: "Saaf / Companion",
        dosage: "1.5 - 2.0 g per liter of water (350-400g/acre)",
        method: "Combination systemic and contact spray targeting both internal mycelium and surface spores",
        safety: "Standard protective mask and gloves required."
      },
      {
        agent: "Propiconazole 25% EC",
        brand: "Tilt / Radar",
        dosage: "1.0 ml per liter of water (200 ml/acre)",
        method: "Apply at early tillering and panicle emergence",
        safety: "PHI 30 days. Store in cool, dark place away from heat."
      }
    ],
    organic_treatment: [
      {
        method: "Zinc-Enriched Organic Manure Slurry",
        dosage: "5 kg Zinc Sulphate mixed into 500 kg well-decomposed cow dung per hectare",
        preparation: "Compost together for 14 days before top dressing around active tillering",
        frequency: "One application before flowering"
      },
      {
        method: "Wood Ash Foliar Dusting / Silica Spray",
        dosage: "15-20 kg/acre sifted hardwood ash dusted early morning, or 2ml/L Potassium Silicate spray",
        preparation: "Wood ash provides natural soluble potassium and silica which thicken cell walls against Bipolaris penetration",
        frequency: "Dust when dew is present on leaves"
      },
      {
        method: "Garlic-Chili Fermented Botanical Extract",
        dosage: "50 ml per 10L water",
        preparation: "Crush 250g garlic cloves and 250g hot green chilies in 1 liter water, ferment 24 hours, strain",
        frequency: "Spray weekly on affected patches"
      }
    ],
    preventive_measures: [
      "Conduct soil health test: rectify acidic soils with agricultural lime and apply basal zinc sulfate (25 kg/ha)",
      "Hot water seed treatment at 52-54°C for 10-12 minutes to kill seed-borne fungal mycelium",
      "Incorporate organic farmyard manure or green manuring to improve soil water retention",
      "Avoid severe drought stress; maintain thin water film during panicle initiation",
      "Use certified disease-free foundation seed from authorized agricultural universities"
    ],
    timeline: [
      { day: "Day 1", title: "Nutrient & Water Evaluation", action: "Assess soil moisture and check for zinc chlorosis. Restore 2-3 cm shallow water level." },
      { day: "Day 3", title: "Curative Fungicide Spray", action: "Spray Mancozeb (2g/L) + Zinc Sulphate (2g/L) in 200L water per acre." },
      { day: "Day 7", title: "Soil Nutrition Boost", action: "Broadcast MOP (Potash) @ 15 kg/acre to replenish plant potassium levels." },
      { day: "Day 14", title: "Grain Spotting Prevention", action: "If booting stage has begun, apply light second spray of Saaf (1.5g/L) to protect glumes." }
    ],
    seasonal_tips: {
      kharif: "Brown spot frequently spikes in rainfed uplands following intermittent dry spells. Apply organic mulch to retain root zone moisture.",
      rabi: "Lighter sandy soils leach potassium rapidly under frequent tubewell irrigation. Split potash doses into two applications."
    }
  },
  leaf_smut: {
    disease_name: "Leaf Smut",
    summary: "Manage late-season nitrogen applications and apply protective copper or triazole fungicides only if infestation threatens the flag leaf.",
    severity_rules: {
      Low: "No chemical intervention needed. Smut is primarily a late-season minor cosmetic pathogen. Maintain balanced irrigation.",
      Medium: "Apply Copper Oxychloride 50 WP @ 2g/L or Hexaconazole 5% SC @ 2ml/L if symptoms appear before milk stage.",
      High: "Apply Propiconazole 25% EC @ 1ml/L or Tebuconazole 250 EC @ 1ml/L to protect flag leaf photosynthesis during grain filling."
    },
    chemical_treatment: [
      {
        agent: "Copper Oxychloride 50% WP",
        brand: "Blitox / Cupramar",
        dosage: "2.0 - 2.5 g per liter of water (500g/acre)",
        method: "Foliar mist covering both leaf surfaces",
        safety: "Do not spray during peak noon heat to avoid phytotoxicity."
      },
      {
        agent: "Hexaconazole 5% SC",
        brand: "Contaf Plus",
        dosage: "2.0 ml per liter of water (400 ml/acre)",
        method: "Systemic triazole spray targeting black sori spread",
        safety: "Standard protective clothing; keep away from water bodies."
      }
    ],
    organic_treatment: [
      {
        method: "Sour Buttermilk Spray (Chhachh)",
        dosage: "50 ml aged sour buttermilk per liter of water",
        preparation: "Ferment buttermilk in copper vessel for 4-5 days until greenish tint appears. Copper lactate suppresses fungal spores.",
        frequency: "Single foliar spray during early morning"
      },
      {
        method: "Neem Oil 10,000 PPM",
        dosage: "3 ml per liter of water with 1 ml liquid soap emulsifier",
        preparation: "Vigorously shake neem oil with detergent water before adding to sprayer tank",
        frequency: "Every 10 days"
      }
    ],
    preventive_measures: [
      "Avoid applying nitrogen fertilizer after heading / panicle emergence stage",
      "Deep plow fields after harvest to bury smut teliospores beneath aerobic decomposition layer",
      "Rotate rice with legumes (mungbean, urdbean, chickpea) to break spore survival cycles",
      "Maintain adequate planting distance to facilitate air circulation in mature canopy"
    ],
    timeline: [
      { day: "Day 1", title: "Severity Inspection", action: "Count spots on flag leaf. If under 5 spots per leaf, defer chemical spray and monitor." },
      { day: "Day 3", title: "Targeted Foliar Shield", action: "If spots exceed threshold on upper canopy, apply Hexaconazole @ 2ml/L." },
      { day: "Day 10", title: "Field Sanitation", action: "Avoid moving machinery from infected field portions to clean adjacent plots." }
    ],
    seasonal_tips: {
      kharif: "Warm humid conditions at the end of monsoon often favor smut spots. Ensure drainage before harvesting.",
      rabi: "Generally very low incidence in dry rabi conditions unless excessive micro-sprinklers are utilized."
    }
  },
  tungro: {
    disease_name: "Tungro Disease",
    summary: "Direct all control efforts immediately against the insect vector Green Leafhopper (Nephotettix virescens) and destroy early virus-infected reservoirs.",
    severity_rules: {
      Low: "Set up light traps (1 per acre) to monitor and trap adult Green Leafhoppers. Rogue out and bury visibly yellow stunted plants.",
      Medium: "Foliar spray Dinotefuran 20% SG @ 0.4 g/L or Thiamethoxam 25% WG @ 0.3 g/L. Spray field bunds where leafhoppers hide.",
      High: "Apply systemic vector control: Pymetrozine 50% WDG @ 0.6 g/L or Imidacloprid 17.8% SL @ 0.5 ml/L. Strictly uproot severely stunted hills to eliminate virus reservoirs."
    },
    chemical_treatment: [
      {
        agent: "Dinotefuran 20% SG",
        brand: "Token / Osheen",
        dosage: "0.4 g per liter of water (80g in 200L water/acre)",
        method: "Foliar spray targeting lower leaf sheaths where leafhoppers reside",
        safety: "Do not spray during bee foraging hours. Highly effective against resistant leafhopper strains."
      },
      {
        agent: "Thiamethoxam 25% WG",
        brand: "Actara / Areva",
        dosage: "0.3 g per liter of water (60g/acre)",
        method: "Fast-acting systemic ingestion & contact insecticide",
        safety: "Wear face mask and protective eye shield."
      },
      {
        agent: "Pymetrozine 50% WDG",
        brand: "Chess",
        dosage: "0.6 g per liter of water (120g/acre)",
        method: "Specific sucking pest blocker; paralyzes leafhopper stylet within 15 minutes",
        safety: "Extremely safe for spiders and natural predators."
      }
    ],
    organic_treatment: [
      {
        method: "Yellow Sticky Traps & Light Traps",
        dosage: "15-20 yellow sticky traps per acre placed just above crop canopy level",
        preparation: "Coat bright yellow plastic sheets with castor oil or sticky glue. Install 200W incandescent lamp over tub of kerosene-water at night.",
        frequency: "Continuous deployment during tillering stage"
      },
      {
        method: "Agniastra Botanical Vector Repellent",
        dosage: "30 ml per liter of water",
        preparation: "Boil 5L cow urine with 500g tobacco, 500g hot chili paste, 500g garlic, and 2kg neem leaves. Dilute 1:20 in water.",
        frequency: "Spray every 5 days on field margins and bunds"
      },
      {
        method: "Beauveria bassiana Entomopathogenic Bio-spray",
        dosage: "5 g per liter of water (1 kg/ha)",
        preparation: "Mix B. bassiana powder in water with 1 ml soap surfactant; fungal spores infect and mummify hopper bodies.",
        frequency: "Apply during humid overcast conditions"
      }
    ],
    preventive_measures: [
      "Synchronize planting across the village to prevent continuous feeding zones for leafhoppers",
      "Adopt Tungro-resistant paddy cultivars (e.g., IR64, Vikramarya, Nidhi)",
      "Plow down rice stubbles immediately after harvest; stubbles host RTBV through winter/fallow",
      "Never nurse seedlings near mature standing crops infested with green leafhoppers",
      "Keep irrigation bunds free of weed grasses (Echinochloa, Cyperus)"
    ],
    timeline: [
      { day: "Day 1", title: "Vector Census & Roguing", action: "Inspect 20 random hills for leafhoppers. Immediately uproot and bury yellowed stunted hills." },
      { day: "Day 2", title: "Targeted Vector Suppression", action: "Spray Dinotefuran 20% SG @ 0.4g/L or Pymetrozine @ 0.6g/L on canopy and surrounding bund weeds." },
      { day: "Day 6", title: "Trap Installation", action: "Deploy yellow sticky traps across the plot to monitor secondary immigration." },
      { day: "Day 12", title: "Tiller Re-growth Support", action: "Spray foliar micronutrient mixture + 1% urea to invigorate unaffected healthy tillers." }
    ],
    seasonal_tips: {
      kharif: "High humidity and continuous green landscape accelerate leafhopper migrations. Monitor seedling nurseries closely.",
      rabi: "Warm dry spells during early spring trigger hopper spikes. Watch for initial leaf yellowing."
    }
  },
  sheath_blight: {
    disease_name: "Sheath Blight",
    summary: "Lower water depth, refrain from excessive nitrogen, and apply targeted sheath-coating fungicides like Validamycin, Hexaconazole, or Thifluzamide.",
    severity_rules: {
      Low: "Drain water to field capacity to reduce humidity around the sheath zone. Spray Pseudomonas fluorescens bio-fungicide @ 2.5 kg/ha.",
      Medium: "Apply Validamycin 3% L @ 2.5 ml/L (500 ml/acre) targeting the bottom 15-20 cm of tillers near water level.",
      High: "Apply Thifluzamide 24% SC (Pulsor) @ 1 ml/L or Azoxystrobin + Difenoconazole @ 1 ml/L. Ensure high spray volume (200-250L/acre) with nozzles directed down at sheath base."
    },
    chemical_treatment: [
      {
        agent: "Validamycin 3% L",
        brand: "Sheathmar / Valida",
        dosage: "2.0 - 2.5 ml per liter of water (500 ml/acre)",
        method: "Directed spray at stem bases and leaf sheaths",
        safety: "Naturally derived bio-antibiotic; very low toxicity to mammals and fish."
      },
      {
        agent: "Thifluzamide 24% SC",
        brand: "Pulsor",
        dosage: "0.75 - 1.0 ml per liter of water (150-200 ml/acre)",
        method: "Modern succinate dehydrogenase inhibitor (SDHI); long 25-day residual sheath shield",
        safety: "Wear protective gear during handling. Maximum 2 sprays per crop cycle."
      },
      {
        agent: "Hexaconazole 5% EC",
        brand: "Contaf",
        dosage: "2.0 ml per liter of water (400 ml/acre)",
        method: "Systemic protective and eradicative spray at appearance of snake-skin lesions",
        safety: "Standard protective protocol; toxic to aquatic invertebrates."
      }
    ],
    organic_treatment: [
      {
        method: "Pseudomonas fluorescens + Trichoderma viride Consortia",
        dosage: "5g P. fluorescens + 5g T. viride per liter of water",
        preparation: "Soak consortia in water with 0.5% jaggery for 2 hours before spraying",
        frequency: "Direct spray at tiller base at 30, 45, and 60 days after transplanting"
      },
      {
        method: "Fermented Plant Juice (Horsetail / Equisetum Extract)",
        dosage: "100 ml per 10L water",
        preparation: "Boil 1 kg dried horsetail fern in 10L water for 30 minutes; rich in bio-silicon that petrifies sheath epidermal cells",
        frequency: "Spray during maximum tillering stage"
      },
      {
        method: "Neem Cake Soil Incorporation",
        dosage: "150 kg neem cake powder per acre applied along with first top dressing",
        preparation: "Neem cake suppresses floating sclerotial survival in soil and slows nitrogen release",
        frequency: "Basal or early tillering"
      }
    ],
    preventive_measures: [
      "Avoid planting more than 2-3 seedlings per hill; avoid excessive hill density (>40 hills/m²)",
      "Skim and burn floating organic debris and sclerotial bodies during field puddling/leveling",
      "Practice alternate wetting and drying (AWD) to allow sunlight to reach the base of tillers",
      "Balance fertilizer with silicon and potash: Apply 40 kg K2O/ha in two splits",
      "Keep field borders clean of susceptible weed species such as Echinochloa colona"
    ],
    timeline: [
      { day: "Day 1", title: "Canopy Aeration & Drainage", action: "Drain standing water to allow air circulation at the lower sheath level." },
      { day: "Day 2", title: "Base-Directed Spray", action: "Spray Validamycin 3L @ 2.5ml/L or Thifluzamide 24% SC @ 1ml/L, aiming nozzles at tiller bases." },
      { day: "Day 7", title: "Ascension Check", action: "Check if lesions have ascended to flag leaf collar. If active, rotate to Azoxystrobin (1ml/L)." },
      { day: "Day 14", title: "Field Sanitation & AWD", action: "Reintroduce intermittent shallow irrigation; maintain AWD water management." }
    ],
    seasonal_tips: {
      kharif: "High vegetative growth in lush monsoon canopies traps 95% humidity at stem bases. Thinning dense hills improves light penetration.",
      rabi: "Warmer late spring conditions speed up mycelial climbing. Scout base of hills weekly."
    }
  },
  healthy: {
    disease_name: "Healthy Paddy Leaf",
    summary: "Crop displays optimum vegetative vigor with no signs of fungal, bacterial, or viral pathogens. Continue balanced crop management.",
    severity_rules: {
      Low: "Maintain current standard agronomic protocol. Continue weekly field scouting.",
      Medium: "Not applicable.",
      High: "Not applicable."
    },
    chemical_treatment: [],
    organic_treatment: [
      {
        method: "Prophylactic Panchagavya Spray",
        dosage: "3% foliar spray (30 ml/L)",
        preparation: "Boosts chlorophyll density, root elongation, and beneficial leaf surface microflora.",
        frequency: "Every 15-20 days"
      },
      {
        method: "Soluble Potassium Silicate Booster",
        dosage: "1.5 - 2.0 ml per liter of water",
        preparation: "Reinforces plant epidermis silica cells, making leaf tissue physically impenetrable to fungal haustoria.",
        frequency: "At active tillering and panicle initiation"
      }
    ],
    preventive_measures: [
      "Maintain balanced N-P-K (120:60:40 kg/ha or as per soil health card recommendations)",
      "Follow Alternate Wetting and Drying (AWD) irrigation to save 25% water and improve root aeration",
      "Inspect field weekly across all four corners and center (W-pattern scouting)",
      "Conserve natural predators such as wolf spiders, damselflies, and mirid bugs by avoiding prophylactic broad-spectrum insecticide sprays"
    ],
    timeline: [
      { day: "Week 1", title: "Standard Scouting", action: "Walk field in W-pattern. Record tiller count and leaf collar coloration." },
      { day: "Week 3", title: "Panicle Initiation Nutrition", action: "Apply final split of Muriate of Potash and light nitrogen as recommended." },
      { day: "Week 6", title: "Pre-flowering Safeguard", action: "Ensure clean water level (2-3 cm) during flowering to avoid grain abortion." }
    ],
    seasonal_tips: {
      kharif: "Ensure drainage ditches are cleared to handle sudden tropical downpours.",
      rabi: "Monitor soil moisture carefully as evapotranspiration rises towards harvest."
    }
  }
};
