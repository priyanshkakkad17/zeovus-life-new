// Browser-safe resolver that maps a product name to one of the extracted bottle
// images in /public/uploads/zeovus_life_bottle_products_v3. Used as a visual
// fallback on product cards when a product has no image_url set in the database.

const IMAGE_DIR = '/uploads/zeovus_life_bottle_products_v3';

const FILES = [
  '001_zeomen_50_bottle.png',
  '002_zeowomen_50_bottle.png',
  '003_zeowomen_probiotic_healthy_ageing_formula_bottle.png',
  '004_coq10_omega_3_antioxidant_formula_bottle.png',
  '005_vitamin_e_selenium_bottle.png',
  '006_vitamin_e_100_iu_bottle.png',
  '007_green_tea_extract_bottle.png',
  '008_spirulina_bottle.png',
  '009_zeomen_fertility_bottle.png',
  '010_zeowomen_essential_multivitamin_formula_bottle.png',
  '011_zeowomen_glutathione_bottle.png',
  '012_vitamin_c_1000mg_acerola_bioflavonoids_bottle.png',
  '013_resveratrol_omega_3_heart_health_formula_bottle.png',
  '014_amla_effervescent_bottle.png',
  '015_glutathione_effervescent_bottle.png',
  '016_garcinia_green_tea_coffee_grape_seed_effervescent_bottle.png',
  '017_skin_toner_effervescent_bottle.png',
  '018_zeomen_multivitamins_bottle.png',
  '019_zeowomen_multivitamin_bottle.png',
  '020_women_s_support_bottle.png',
  '021_zeowomen_advanced_multivitamin_antioxidant_formula_bottle.png',
  '022_zeowomen_comprehensive_multivitamin_botanical_formula_bottle.png',
  '023_multivitamin_effervescent_bottle.png',
  '024_zeomen_health_capsules_bottle.png',
  '025_zeomen_prostate_bottle.png',
  '026_zeomen_sports_bottle.png',
  '027_zeowomen_hair_skin_nails_support_bottle.png',
  '028_vitamin_b2_max_bottle.png',
  '029_vitamin_b1_bottle.png',
  '030_vitamin_b_complex_bottle.png',
  '031_vitamin_b6_bottle.png',
  '032_vitamin_b5_bottle.png',
  '033_chelated_iron_b12_tablets_bottle.png',
  '034_oral_health_lozenges_bottle.png',
  '035_zeowomen_nausea_relief_support_bottle.png',
  '036_kids_probiotic_bottle.png',
  '037_licorice_bottle.png',
  '038_senna_bottle.png',
  '039_triphala_single_herb_bottle.png',
  '040_digestion_support_blend_bottle.png',
  '041_digestive_lozenges_range_bottle.png',
  '042_prebiotic_probiotic_lozenges_bottle.png',
  '043_pre_and_probiotic_effervescent_bottle.png',
  '044_pre_and_probiotic_with_ors_effervescent_bottle.png',
  '045_fungal_diastase_with_pepsin_effervescent_bottle.png',
  '046_zeowomen_urinary_tract_support_bottle.png',
  '047_zeowomen_preconception_bottle.png',
  '048_zeowomen_probiotic_skin_acne_support_bottle.png',
  '049_zeowomen_iron_supplement_tablet_bottle.png',
  '050_l_glutamine_bottle.png',
  '051_iron_probiotic_combination_bottle.png',
  '052_dandelion_bottle.png',
  '053_zeowomen_ovarian_supports_bottle.png',
  '054_zeowomen_fertility_support_folate_inositol_bottle.png',
  '055_women_s_infertility_bottle.png',
  '056_zeowomen_prenatal_bottle.png',
  '057_n_acetyl_cysteine_with_inositol_effervescent_bottle.png',
  '058_zeowomen_menopause_support_bottle.png',
  '059_black_cohosh_bottle.png',
  '060_shatavari_single_herb_bottle.png',
  '061_women_s_wellness_blend_bottle.png',
  '062_pregnancy_care_bottle.png',
  '063_zeowomen_folate_b_vitamin_formula_bottle.png',
  '064_l_methylfolate_bottle.png',
  '065_zeowomen_pregnancy_bottle.png',
  '066_zeowomen_prenatal_folate_iodine_formula_bottle.png',
  '067_zeowomen_prenatal_multivitamin_formula_bottle.png',
  '068_zeowomen_postnatal_bottle.png',
  '069_ferro_folic_tablets_bottle.png',
  '070_ferrous_ascorbate_folic_acid_tablets_bottle.png',
  '071_zeowomen_iron_haemoglobin_support_bottle.png',
  '072_zeowomen_anaemia_support_formula_bottle.png',
  '073_vitamin_b12_bottle.png',
  '074_women_health_lozenges_bottle.png',
  '075_cranberry_bottle.png',
  '076_zeomen_testosterone_support_bottle.png',
  '077_zeomen_stamina_support_bottle.png',
  '078_men_s_wellness_blend_bottle.png',
  '079_zeomen_libido_performance_support_bottle.png',
  '080_zeomen_vitality_bottle.png',
  '081_zeomen_fertility_support_herbal_complex_bottle.png',
  '082_zeomen_strength_enhancement_bottle.png',
  '083_ashwagandha_bottle.png',
  '084_yohimbe_bottle.png',
  '085_saw_palmetto_bottle.png',
  '086_stinging_nettle_bottle.png',
  '087_maca_bottle.png',
  '088_ginseng_bottle.png',
  '089_kids_focus_attention_bottle.png',
  '090_fish_oil_for_kids_bottle.png',
  '091_fish_oil_with_vitamins_for_kids_bottle.png',
  '092_l_tyrosine_bottle.png',
  '093_omega_3_vegan_algal_dha_bottle.png',
  '094_omega_3_vegan_liquid_capsules_bottle.png',
  '095_ginkgo_biloba_bottle.png',
  '096_memory_blend_bottle.png',
  '097_omega_3_500mg_bottle.png',
  '098_omega_180_120_bottle.png',
  '099_omega_360_240_bottle.png',
  '100_omega_2500mg_bottle.png',
  '101_omega_3_90_bottle.png',
  '102_omega_3_60_bottle.png',
  '103_l_theanine_bottle.png',
  '104_st_john_s_wort_bottle.png',
  '105_rhodiola_rosea_bottle.png',
  '106_sleep_tight_blend_bottle.png',
  '107_glycine_forte_bottle.png',
  '108_valerian_root_bottle.png',
  '109_sleep_inducing_lozenges_bottle.png',
  '110_echinacea_bottle.png',
  '111_astragalus_bottle.png',
  '112_immunity_booster_blend_bottle.png',
  '113_immunity_general_health_lozenges_bottle.png',
  '114_immunity_cdz_effervescent_bottle.png',
  '115_ascorbic_acid_effervescent_bottle.png',
  '116_ascorbic_acid_with_zinc_effervescent_bottle.png',
  '117_ascorbic_acid_with_echinacea_effervescent_bottle.png',
  '118_amla_with_vitamin_c_effervescent_bottle.png',
  '119_vitamin_d3_600_iu_bottle.png',
  '120_d3_10000_iu_tablets_bottle.png',
  '121_d3_25000_iu_tablets_bottle.png',
  '122_d3_5000_iu_tablets_bottle.png',
  '123_vitamin_d3_600_iu_cholecalciferol_bottle.png',
  '124_cold_and_cough_lozenges_bottle.png',
  '125_kids_immune_bottle.png',
  '126_lung_health_lozenges_bottle.png',
  '127_n_acetyl_cysteine_effervescent_bottle.png',
  '128_herbal_joint_mobility_formula_bottle.png',
  '129_celadrin_joint_tablets_bottle.png',
  '130_joint_support_bottle.png',
  '131_cissus_collagen_joint_formula_bottle.png',
  '132_turmeric_curcumin_bottle.png',
  '133_joint_rescue_blend_bottle.png',
  '134_joint_bone_health_lozenges_bottle.png',
  '135_curcumin_effervescent_bottle.png',
  '136_glucosamine_chondroitin_collagen_ii_effervescent_bottle.png',
  '137_glucosamine_chondroitin_msm_effervescent_bottle.png',
  '138_omega_3_1800mg_bottle.png',
  '139_kids_calcium_d3_bottle.png',
  '140_vitamin_k2_bottle.png',
  '141_calcium_and_vitamin_d3_bottle.png',
  '142_calcium_vitamin_d_effervescent_bottle.png',
  '143_vitamin_b3_bottle.png',
  '144_vascular_capillary_support_formula_bottle.png',
  '145_diosmin_vascular_support_formula_bottle.png',
  '146_omega_3_cardio_bottle.png',
  '147_omega_3_6_9_fish_flaxseed_avocado_oil_bottle.png',
  '148_fish_oil_omega_3_350mg_bottle.png',
  '149_flaxseed_oil_bottle.png',
  '150_hawthorn_berry_bottle.png',
  '151_cardio_support_blend_bottle.png',
  '152_zeomen_energy_recovery_bottle.png',
  '153_zeomen_metabolism_plus_bottle.png',
  '154_l_carnitine_bottle.png',
  '155_matcha_green_tea_effervescent_bottle.png',
  '156_well_amino_bottle.png',
  '157_electrolytes_effervescent_bottle.png',
  '158_l_methionine_bottle.png',
  '159_l_proline_bottle.png',
  '160_l_proline_l_lysine_bottle.png',
  '161_phosphorus_effervescent_bottle.png',
  '162_potassium_effervescent_bottle.png',
  '163_ors_effervescent_bottle.png',
  '164_weight_balance_blend_bottle.png',
  '165_multi_ingredient_weight_management_formula_bottle.png',
  '166_slimming_tablets_bottle.png',
  '167_garcinia_hca_weight_management_capsules_bottle.png',
  '168_green_coffee_garcinia_weight_management_capsules_bottle.png',
  '169_weight_management_lozenges_bottle.png',
  '170_apple_cider_vinegar_effervescent_bottle.png',
  '171_apple_cider_vinegar_effervescent_plain_bottle.png',
  '172_hair_care_blend_bottle.png',
  '173_skin_and_hair_health_lozenges_bottle.png',
  '174_glutathione_nac_ascorbic_acid_effervescent_bottle.png',
  '175_milk_thistle_bottle.png',
  '176_liver_health_blend_bottle.png',
  '177_hangover_lozenges_bottle.png',
  '178_berberine_bottle.png',
  '179_blood_sugar_control_blend_bottle.png',
  '180_bilberry_bottle.png',
  '181_eye_health_lozenges_bottle.png',
];

const STOP_WORDS = new Set([
  'bottle', 'bottles', 'formula', 'formulas', 'the', 'and', 'with', 'a', 'of', 'for',
  'support', 'supports', 'blend', 'range', 'tablet', 'tablets', 'capsule', 'capsules',
  'effervescent', 'lozenge', 'lozenges', 'plus', 'max',
]);

function tokenize(input) {
  const cleaned = String(input || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+[_\s-]+/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  const meaningful = tokens.filter((t) => !STOP_WORDS.has(t));
  return { joined: tokens.join(' '), meaningful: meaningful.length ? meaningful : tokens };
}

// Pre-tokenise the manifest once.
const INDEX = FILES.map((file) => ({ file, url: `${IMAGE_DIR}/${file}`, tokens: tokenize(file) }));
const BY_JOINED = new Map();
for (const entry of INDEX) if (!BY_JOINED.has(entry.tokens.joined)) BY_JOINED.set(entry.tokens.joined, entry);

function overlap(aTokens, bTokens) {
  const b = new Set(bTokens);
  let hits = 0;
  for (const t of aTokens) if (b.has(t)) hits += 1;
  const denom = Math.max(aTokens.length, bTokens.length);
  return denom === 0 ? 0 : hits / denom;
}

/**
 * Resolve a product name to a bottle image URL, or null if no confident match.
 * @param {string} name product name
 * @param {number} [threshold] minimum token overlap for a fuzzy match
 */
export function resolveBottleImage(name, threshold = 0.6) {
  if (!name) return null;
  const t = tokenize(name);

  const exact = BY_JOINED.get(t.joined);
  if (exact) return exact.url;

  let best = null;
  let bestScore = 0;
  for (const entry of INDEX) {
    const score = overlap(t.meaningful, entry.tokens.meaningful);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best && bestScore >= threshold ? best.url : null;
}
