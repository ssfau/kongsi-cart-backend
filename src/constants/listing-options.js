/**
 * Listing option tables.
 *
 * Keep these as simple data tables:
 * - frontend can mirror these values
 * - populate script uses these values to generate sample data
 *
 * Combined name + category (+ optional group) so items never mismatch.
 */

/**
 * Each row is one valid listing: itemName + category, optionally group (broader bucket).
 *
 * Examples:
 *   { itemName: "Cameron Highland Spinach", category: "spinach", group: "leafy greens" },
 *   { itemName: "Jasmine Rice 10kg", category: "rice", group: "pantry staples" },
 */
export const LISTING_NAME_CATEGORY_PAIRS = [
  { "itemName": "Cameron Highland Spinach", "group": "Leafy Greens", "category": "Spinach" },
    { "itemName": "Baby Spinach", "group": "Leafy Greens", "category": "Spinach" },
    { "itemName": "Local Round Cabbage", "group": "Leafy Greens", "category": "Cabbage" },
    { "itemName": "Chinese Napa Cabbage", "group": "Leafy Greens", "category": "Cabbage" },
    { "itemName": "Water Spinach (Kangkung)", "group": "Leafy Greens", "category": "Kangkung" },
    { "itemName": "Organic Kangkung", "group": "Leafy Greens", "category": "Kangkung" },
    { "itemName": "Mustard Greens (Sawi)", "group": "Leafy Greens", "category": "Sawi" },
    { "itemName": "Sawi Putih (White Mustard)", "group": "Leafy Greens", "category": "Sawi" },
    { "itemName": "Chinese Kale (Kailan)", "group": "Leafy Greens", "category": "Kailan" },
    { "itemName": "Baby Kailan", "group": "Leafy Greens", "category": "Kailan" },
    
    { "itemName": "Vine-Ripened Tomato", "group": "Vegetables", "category": "Tomato" },
    { "itemName": "Cherry Tomato", "group": "Vegetables", "category": "Tomato" },
    { "itemName": "Cameron Highland Carrot", "group": "Vegetables", "category": "Carrot" },
    { "itemName": "Baby Carrot", "group": "Vegetables", "category": "Carrot" },
    { "itemName": "Premium Broccoli Crown", "group": "Vegetables", "category": "Broccoli" },
    { "itemName": "Organic Broccoli", "group": "Vegetables", "category": "Broccoli" },
    { "itemName": "Japanese Cucumber", "group": "Vegetables", "category": "Cucumber" },
    { "itemName": "Local Cucumber", "group": "Vegetables", "category": "Cucumber" },
    { "itemName": "Red Cili Padi", "group": "Vegetables", "category": "Chili" },
    { "itemName": "Green Chili", "group": "Vegetables", "category": "Chili" },
    { "itemName": "Long Purple Eggplant", "group": "Vegetables", "category": "Eggplant" },
    { "itemName": "Round Eggplant", "group": "Vegetables", "category": "Eggplant" },
    { "itemName": "Bombay Red Onion", "group": "Vegetables", "category": "Onion" },
    { "itemName": "Yellow Onion", "group": "Vegetables", "category": "Onion" },
    { "itemName": "Holland Potato", "group": "Vegetables", "category": "Potato" },
    { "itemName": "Sweet Potato", "group": "Vegetables", "category": "Potato" },
    { "itemName": "Imported White Garlic", "group": "Vegetables", "category": "Garlic" },
    { "itemName": "Local Garlic", "group": "Vegetables", "category": "Garlic" },
    { "itemName": "Sweet Corn", "group": "Vegetables", "category": "Corn" },
    { "itemName": "Baby Corn", "group": "Vegetables", "category": "Corn" },
    
    { "itemName": "Fuji Apple", "group": "Fruits", "category": "Apple" },
    { "itemName": "Granny Smith Apple", "group": "Fruits", "category": "Apple" },
    { "itemName": "Pisang Berangan", "group": "Fruits", "category": "Banana" },
    { "itemName": "Pisang Cavendish", "group": "Fruits", "category": "Banana" },
    { "itemName": "Mandarin Orange", "group": "Fruits", "category": "Orange" },
    { "itemName": "Navel Orange", "group": "Fruits", "category": "Orange" },
    { "itemName": "Cameron Highland Strawberry", "group": "Fruits", "category": "Strawberry" },
    { "itemName": "Imported Korean Strawberry", "group": "Fruits", "category": "Strawberry" },
    { "itemName": "Musang King Durian", "group": "Fruits", "category": "Durian" },
    { "itemName": "D24 Durian", "group": "Fruits", "category": "Durian" },
    { "itemName": "Sekaki Papaya", "group": "Fruits", "category": "Papaya" },
    { "itemName": "Holland Papaya", "group": "Fruits", "category": "Papaya" },
    { "itemName": "Seedless Watermelon", "group": "Fruits", "category": "Watermelon" },
    { "itemName": "Yellow Watermelon", "group": "Fruits", "category": "Watermelon" },
    { "itemName": "Harumanis Mango", "group": "Fruits", "category": "Mango" },
    { "itemName": "Thai Mango", "group": "Fruits", "category": "Mango" },
    
    { "itemName": "Local White Rice (Beras Tempatan)", "group": "Pantry Staples", "category": "Beras" },
    { "itemName": "Basmati Rice", "group": "Pantry Staples", "category": "Beras" },
    { "itemName": "Wheat Flour (Tepung Gandum)", "group": "Pantry Staples", "category": "Tepung Gandum" },
    { "itemName": "Self-Raising Flour", "group": "Pantry Staples", "category": "Tepung Gandum" },
    { "itemName": "Light Soy Sauce (Kicap Masin)", "group": "Pantry Staples", "category": "Kicap" },
    { "itemName": "Sweet Soy Sauce (Kicap Manis)", "group": "Pantry Staples", "category": "Kicap" },
    { "itemName": "Local Chili Sauce", "group": "Pantry Staples", "category": "Sos Cili" },
    { "itemName": "Garlic Chili Sauce", "group": "Pantry Staples", "category": "Sos Cili" },
    { "itemName": "Tomato Ketchup", "group": "Pantry Staples", "category": "Sos Tomato" },
    { "itemName": "Spicy Tomato Ketchup", "group": "Pantry Staples", "category": "Sos Tomato" },
    { "itemName": "Palm Cooking Oil", "group": "Pantry Staples", "category": "Minyak Masak" },
    { "itemName": "Sunflower Oil", "group": "Pantry Staples", "category": "Minyak Masak" },
    { "itemName": "White Sugar", "group": "Pantry Staples", "category": "Gula" },
    { "itemName": "Brown Sugar (Gula Melaka Style)", "group": "Pantry Staples", "category": "Gula" },
    { "itemName": "Fine Salt", "group": "Pantry Staples", "category": "Garam" },
    { "itemName": "Coarse Sea Salt", "group": "Pantry Staples", "category": "Garam" },
    { "itemName": "Fresh Santan", "group": "Pantry Staples", "category": "Santan" },
    { "itemName": "Boxed Coconut Milk", "group": "Pantry Staples", "category": "Santan" },
    { "itemName": "Instant Noodles", "group": "Pantry Staples", "category": "Mee" },
    { "itemName": "Rice Vermicelli (Bihun)", "group": "Pantry Staples", "category": "Mee" }
];

export const MALAYSIA_STATE_DISTRICTS = {
  "Johor": ["Johor Bahru", "Tebrau", "Pasir Gudang", "Batu Pahat", "Muar", "Kluang", "Pontian", "Kota Tinggi", "Segamat", "Mersing", "Kulai", "Tangkak", "Iskandar Puteri", "Yong Peng", "Simpang Renggam", "Pengerang"],
  "Kedah": ["Alor Setar", "Sungai Petani", "Kulim", "Langkawi", "Kubang Pasu", "Padang Terap", "Pendang", "Pokok Sena", "Yan", "Baling", "Bandar Baharu", "Sik"],
  "Kelantan": ["Kota Bharu", "Pasir Mas", "Tumpat", "Bachok", "Pasir Puteh", "Tanah Merah", "Machang", "Kuala Krai", "Gua Musang", "Jeli", "Lojing"],
  "Melaka": ["Melaka Tengah", "Alor Gajah", "Jasin", "Hang Tuah Jaya"],
  "Negeri Sembilan": ["Seremban", "Port Dickson", "Nilai", "Jempol", "Kuala Pilah", "Rembau", "Tampin", "Jelebu"],
  "Pahang": ["Kuantan", "Temerloh", "Bentong", "Raub", "Pekan", "Rompin", "Lipis", "Jerantut", "Cameron Highlands", "Bera", "Maran"],
  "Perak": ["Ipoh", "Taiping", "Teluk Intan", "Sitiawan", "Kuala Kangsar", "Kampar", "Batu Gajah", "Seri Iskandar", "Tanjung Malim", "Gerik", "Hilir Perak", "Kerian", "Kinta", "Larut, Matang dan Selama", "Manjung", "Muallim", "Perak Tengah", "Bagan Datuk"],
  "Perlis": ["Kangar", "Arau", "Padang Besar"],
  "Pulau Pinang": ["George Town", "Butterworth", "Bukit Mertajam", "Nibong Tebal", "Balik Pulau", "Bayan Lepas", "Seberang Perai Utara", "Seberang Perai Tengah", "Seberang Perai Selatan", "Timur Laut", "Barat Daya"],
  "Sabah": ["Kota Kinabalu", "Sandakan", "Tawau", "Lahad Datu", "Keningau", "Beaufort", "Semporna", "Kudat", "Papar", "Ranau", "Beluran", "Kinabatangan", "Tuaran", "Penampang", "Kota Belud", "Tenom", "Tambunan", "Sipitang", "Kuala Penyu", "Pitas", "Kota Marudu", "Telupid", "Tongod", "Putatan", "Nabawan", "Kalabakan", "Kunak"],
  "Sarawak": ["Kuching", "Miri", "Sibu", "Bintulu", "Limbang", "Sarikei", "Sri Aman", "Kapit", "Mukah", "Betong", "Samarahan", "Serian", "Bau", "Lundu", "Marudi", "Song", "Julau", "Meradong", "Matu", "Daro", "Dalat", "Balingian", "Tatau", "Sebauh", "Belaga", "Kanowit", "Lawas", "Kabong", "Pusa", "Lubok Antu", "Asajaya", "Tebedu"],
  "Selangor": ["Shah Alam", "Petaling Jaya", "Subang Jaya", "Klang", "Serdang", "Ampang", "Kajang", "Rawang", "Sepang", "Kuala Selangor", "Gombak", "Hulu Langat", "Hulu Selangor", "Sabak Bernam", "Kuala Langat"],
  "Terengganu": ["Kuala Terengganu", "Kemaman", "Dungun", "Besut", "Marang", "Hulu Terengganu", "Setiu", "Kuala Nerus"],
  "W.P. Kuala Lumpur": ["Kuala Lumpur", "Kepong", "Batu", "Wangsa Maju", "Segambut", "Setiawangsa", "Bukit Bintang", "Titiwangsa", "Cheras", "Lembah Pantai", "Seputeh", "Bandar Tun Razak"],
  "W.P. Putrajaya": ["Putrajaya"],
  "W.P. Labuan": ["Labuan"]
};
