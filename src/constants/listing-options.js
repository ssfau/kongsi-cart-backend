/**
 * Listing option tables.
 *
 * Keep these as simple data tables:
 * - frontend can mirror these values
 * - populate script uses these values to generate sample data
 *
 * Combined name + category so items never mismatch (e.g. rice vs leafy greens).
 */

/**
 * Each row is one valid listing: item name + category together.
 *
 * Example rows you can add:
 *   { itemName: "spinach", category: "leafy greens" },
 *   { itemName: "rice", category: "pantry staples" },
 */
export const LISTING_NAME_CATEGORY_PAIRS = [
  { itemName: "Cameron Highland Spinach", category: "Leafy Greens" },
{ itemName: "Baby Spinach", category: "Leafy Greens" },
{ itemName: "Local Round Cabbage", category: "Leafy Greens" },
{ itemName: "Chinese Napa Cabbage", category: "Leafy Greens" },
{ itemName: "Water Spinach (Kangkung)", category: "Leafy Greens" },
{ itemName: "Organic Kangkung", category: "Leafy Greens" },
{ itemName: "Mustard Greens (Sawi)", category: "Leafy Greens" },
{ itemName: "Sawi Putih (White Mustard)", category: "Leafy Greens" },
{ itemName: "Chinese Kale (Kailan)", category: "Leafy Greens" },
{ itemName: "Baby Kailan", category: "Leafy Greens" },

{ itemName: "Vine-Ripened Tomato", category: "Vegetables" },
{ itemName: "Cherry Tomato", category: "Vegetables" },
{ itemName: "Cameron Highland Carrot", category: "Vegetables" },
{ itemName: "Baby Carrot", category: "Vegetables" },
{ itemName: "Premium Broccoli Crown", category: "Vegetables" },
{ itemName: "Organic Broccoli", category: "Vegetables" },
{ itemName: "Japanese Cucumber", category: "Vegetables" },
{ itemName: "Local Cucumber", category: "Vegetables" },
{ itemName: "Red Cili Padi", category: "Vegetables" },
{ itemName: "Green Chili", category: "Vegetables" },
{ itemName: "Long Purple Eggplant", category: "Vegetables" },
{ itemName: "Round Eggplant", category: "Vegetables" },
{ itemName: "Bombay Red Onion", category: "Vegetables" },
{ itemName: "Yellow Onion", category: "Vegetables" },
{ itemName: "Holland Potato", category: "Vegetables" },
{ itemName: "Sweet Potato", category: "Vegetables" },
{ itemName: "Imported White Garlic", category: "Vegetables" },
{ itemName: "Local Garlic", category: "Vegetables" },
{ itemName: "Sweet Corn", category: "Vegetables" },
{ itemName: "Baby Corn", category: "Vegetables" },

{ itemName: "Fuji Apple", category: "Fruits" },
{ itemName: "Granny Smith Apple", category: "Fruits" },
{ itemName: "Pisang Berangan", category: "Fruits" },
{ itemName: "Pisang Cavendish", category: "Fruits" },
{ itemName: "Mandarin Orange", category: "Fruits" },
{ itemName: "Navel Orange", category: "Fruits" },
{ itemName: "Cameron Highland Strawberry", category: "Fruits" },
{ itemName: "Imported Korean Strawberry", category: "Fruits" },
{ itemName: "Musang King Durian", category: "Fruits" },
{ itemName: "D24 Durian", category: "Fruits" },
{ itemName: "Sekaki Papaya", category: "Fruits" },
{ itemName: "Holland Papaya", category: "Fruits" },
{ itemName: "Seedless Watermelon", category: "Fruits" },
{ itemName: "Yellow Watermelon", category: "Fruits" },
{ itemName: "Harumanis Mango", category: "Fruits" },
{ itemName: "Thai Mango", category: "Fruits" },

{ itemName: "Local White Rice (Beras Tempatan)", category: "Pantry Staples" },
{ itemName: "Basmati Rice", category: "Pantry Staples" },
{ itemName: "Wheat Flour (Tepung Gandum)", category: "Pantry Staples" },
{ itemName: "Self-Raising Flour", category: "Pantry Staples" },
{ itemName: "Light Soy Sauce (Kicap Masin)", category: "Pantry Staples" },
{ itemName: "Sweet Soy Sauce (Kicap Manis)", category: "Pantry Staples" },
{ itemName: "Local Chili Sauce", category: "Pantry Staples" },
{ itemName: "Garlic Chili Sauce", category: "Pantry Staples" },
{ itemName: "Tomato Ketchup", category: "Pantry Staples" },
{ itemName: "Spicy Tomato Ketchup", category: "Pantry Staples" },
{ itemName: "Palm Cooking Oil", category: "Pantry Staples" },
{ itemName: "Sunflower Oil", category: "Pantry Staples" },
{ itemName: "White Sugar", category: "Pantry Staples" },
{ itemName: "Brown Sugar (Gula Melaka Style)", category: "Pantry Staples" },
{ itemName: "Fine Salt", category: "Pantry Staples" },
{ itemName: "Coarse Sea Salt", category: "Pantry Staples" },
{ itemName: "Fresh Santan", category: "Pantry Staples" },
{ itemName: "Boxed Coconut Milk", category: "Pantry Staples" },
{ itemName: "Instant Noodles", category: "Pantry Staples" },
{ itemName: "Rice Vermicelli (Bihun)", category: "Pantry Staples" },
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
